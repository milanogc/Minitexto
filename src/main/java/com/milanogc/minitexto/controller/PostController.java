package com.milanogc.minitexto.controller;

import java.util.ArrayList;
import java.util.Collection;

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

import com.fasterxml.jackson.annotation.JsonRootName;
import com.milanogc.minitexto.domain.Post;
import com.milanogc.minitexto.repository.PostRepository;

@Controller
@RequestMapping("/posts")
public class PostController {
	@Autowired private PostRepository repository;

	@JsonRootName("posts")
	class Posts extends ArrayList<Post> {
		private static final long serialVersionUID = 1L;

		public Posts(Collection<? extends Post> c) {
			addAll(c);
		}
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Posts list() {
		return new Posts(repository.findAll());
	}

	/*@RequestMapping(value = "{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Post get(@PathVariable Long id) {
		return repository.findOne(id);
	}*/

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Post save(@RequestBody Post post) {
		Assert.notNull(post);
		return repository.save(post);
	}

	/*@RequestMapping(value = "{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Post update(@RequestBody Post post, @PathVariable Long id) {
		Assert.isTrue(post.getId().equals(id));
		return repository.save(post);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@PathVariable Long id) {
		repository.delete(id);
	}*/
}