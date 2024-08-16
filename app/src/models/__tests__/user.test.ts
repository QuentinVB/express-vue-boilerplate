import { describe, it, expect } from 'vitest'
import User from '../User'

describe('User Model', () => {
  it('should create a user with a specific id', () => {
    const user = new User('1');
    expect(user.id).toBe('1');
  });

  it('should have a default userName of "anonyme"', () => {
    const user = new User('1');
    expect(user.userName).toBe('anonyme');
  });

  it('should allow setting a userName and email', () => {
    const user = new User('1');
    user.userName = 'TestUser';
    user.email = 'test@example.com';
    expect(user.userName).toBe('TestUser');
    expect(user.email).toBe('test@example.com');
  });

  it('should handle account creation and last connection dates', () => {
    const user = new User('1');
    const creationDate = new Date('2023-01-01');
    const lastConnectionDate = new Date('2023-08-15');
    user.accountCreation = creationDate;
    user.accountLastConnection = lastConnectionDate;

    expect(user.accountCreation).toBe(creationDate);
    expect(user.accountLastConnection).toBe(lastConnectionDate);
  });
});
