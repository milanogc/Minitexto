package com.milanogc.minitexto.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.milanogc.minitexto.service.BroadcastService;

public class BroadcastServlet extends WebSocketServlet {
	private static final long serialVersionUID = 1L;
	@Autowired private BroadcastService broadcastService;

	@Override
	protected StreamInbound createWebSocketInbound(String protocol, HttpServletRequest request) {
		return broadcastService.createConnection();
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, config.getServletContext());
		super.init(config);
	}
}