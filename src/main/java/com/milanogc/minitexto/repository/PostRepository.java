package com.milanogc.minitexto.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.milanogc.minitexto.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	Page<Post> findByIdLessThan(Long id, Pageable pageable);
}