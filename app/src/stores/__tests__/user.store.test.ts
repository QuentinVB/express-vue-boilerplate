import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '../user'; 
import { describe, it, expect, beforeEach } from 'vitest';

describe('User Store', () => {
  // Arrange
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with correct default values', () => {
    // Arrange
    const store = useUserStore();

    // Act & Assert
    expect(store.userName).toBe(''); // Assert
    expect(store.credits).toBe(0); // Assert
    expect(store.IsLogged).toBe(false); // Assert
  });

  it('should reset values correctly', () => {
    // Arrange
    const store = useUserStore();
    
    // Act
    store.userName = 'Test User';
    store.credits = 100;
    store.IsLogged = true;
    
    store.$reset(); // Appeler la fonction de reset
    
    // Assert
    expect(store.userName).toBe(''); // Assert
    expect(store.credits).toBe(0); // Assert
    expect(store.IsLogged).toBe(false); // Assert
  });

  it('should update userName correctly', () => {
    // Arrange
    const store = useUserStore();
    
    // Act
    store.userName = 'New User';
    
    // Assert
    expect(store.userName).toBe('New User'); // Assert
  });

  it('should update credits correctly', () => {
    // Arrange
    const store = useUserStore();
    
    // Act
    store.credits = 200;
    
    // Assert
    expect(store.credits).toBe(200); // Assert
  });

  it('should update IsLogged correctly', () => {
    // Arrange
    const store = useUserStore();
    
    // Act
    store.IsLogged = true;
    
    // Assert
    expect(store.IsLogged).toBe(true); // Assert
  });
});
