import { describe, it, expect } from 'vitest'
import Post from '../Post'
import User from '../User'

describe('Post Model', () => {
  it('should create a post with a specific id', () => {
    const post = new Post('1');
    expect(post.id).toBe('1');
  });

  it('should allow setting a message', () => {
    const post = new Post('1');
    post.message = 'Test message';
    expect(post.message).toBe('Test message');
  });

  it('should associate a user with a post', () => {
    const user = new User('1');
    const post = new Post('1');
    post.user = user;
    expect(post.user).toBe(user);
  });
});
