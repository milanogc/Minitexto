package com.milanogc.minitexto.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public Posts find(@RequestParam(required = false) Long id, @RequestParam(required = false) boolean newer) {
		Page<Post> posts;

		if (newer) {
			if (id == null) {
				id = Long.MIN_VALUE;
			}

			posts = repository.findByIdGreaterThan(id, new PageRequest(0, 10, Sort.Direction.ASC, "id"));
		}
		else {
			if (id == null) {
				id = Long.MAX_VALUE;
			}

			posts = repository.findByIdLessThan(id, new PageRequest(0, 10, Sort.Direction.DESC, "id"));
		}

		return new Posts(posts.getContent());
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