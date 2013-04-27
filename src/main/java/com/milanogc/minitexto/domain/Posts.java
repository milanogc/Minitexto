package com.milanogc.minitexto.domain;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("posts")
public class Posts extends ArrayList<Post> {
	private static final long serialVersionUID = 1L;

	public Posts(Collection<? extends Post> c) {
		addAll(c);
	}
}