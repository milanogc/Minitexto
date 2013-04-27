package com.milanogc.minitexto.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.milanogc.minitexto.domain.Post;
import com.milanogc.minitexto.domain.Posts;
import com.milanogc.minitexto.repository.PostRepository;

@Controller
@RequestMapping("posts")
public class PostController {
	@Autowired private PostRepository repository;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Posts list() {
		return new Posts(repository.findAll());
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Post save(@RequestBody Post post) {
		Assert.notNull(post);
		post.setPublishedAt(new Date());
		return repository.save(post);
	}
}