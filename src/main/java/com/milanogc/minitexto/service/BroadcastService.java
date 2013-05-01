package com.milanogc.minitexto.service;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class BroadcastService {
	private static Set<Connection> connections = Collections.newSetFromMap(new ConcurrentHashMap<Connection, Boolean>());

	public MessageInbound createConnection() {
		return new Connection();
	}

	@Async
	public void execute() throws IOException {
		for (Connection connection : connections) {
			connection.getWsOutbound().writeTextData('1');
			connection.getWsOutbound().flush();
		}
	}

	private class Connection extends MessageInbound {
		@Override
		protected void onOpen(WsOutbound outbound) {
			connections.add(this);
			super.onOpen(outbound);
		}

		@Override
		protected void onClose(int status) {
			connections.remove(this);
			super.onClose(status);
		}

		@Override
		protected void onTextMessage(CharBuffer cb) throws IOException {}

		@Override
		protected void onBinaryMessage(ByteBuffer bb) throws IOException {}
	}
}