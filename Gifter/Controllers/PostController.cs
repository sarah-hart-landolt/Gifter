﻿using Microsoft.AspNetCore.Mvc;
using Gifter.Data;
using Gifter.Repositories;
using Gifter.Models;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Gifter.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.UserProfileId = currentUserProfile.Id;
            post.DateCreated = DateTime.Now;

            _postRepository.Add(post);
            return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_postRepository.Search(q, sortDesc));
        }

        [HttpGet("hottest")]
        public IActionResult Hottest(DateTime since)
        {
            return Ok(_postRepository.Hottest(since));
        }

        [HttpGet("user/{id}")]
        public IActionResult GetByUser(int id)
        {
            var posts = _postRepository.GetByUserProfileId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFireBaseUserId(firebaseUserId);
        }
    }
}