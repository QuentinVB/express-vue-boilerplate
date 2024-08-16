import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PostItem from '../PostItem.vue'
import Post from '../../models/Post'
import User from '../../models/User'

describe('PostItem.vue', () => {
  it('renders the message correctly', () => {
    const user = new User('1');
    user.userName = 'Test User';
    const post = new Post('1');
    post.message = 'Hello World!';
    post.user = user;

    const wrapper = mount(PostItem, {
      props: {
        post,
      },
    });

    expect(wrapper.text()).toContain('Hello World!');
  });

  it('displays the correct user information', () => {
    const user = new User('1');
    user.userName = 'Test User';
    const post = new Post('1');
    post.message = 'Test message';
    post.user = user;

    const wrapper = mount(PostItem, {
      props: {
        post,
      },
    });

    expect(wrapper.text()).toContain('Test User');
  });

  it('renders correctly without a user name', () => {
    const user = new User('1');
    const post = new Post('1');
    post.message = 'Test message without user';
    post.user = user;

    const wrapper = mount(PostItem, {
      props: {
        post,
      },
    });

    expect(wrapper.text()).toContain('anonyme');
  });
});
