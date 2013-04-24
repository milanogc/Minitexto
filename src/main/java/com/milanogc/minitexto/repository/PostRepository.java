package com.milanogc.minitexto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.milanogc.minitexto.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}