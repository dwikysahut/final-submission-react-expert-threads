/* eslint-disable import/no-extraneous-dependencies */
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 * - RegisterInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should handle name typing correctly
 *   - should call register function when login button is clicked
 */
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import AuthForm from './AuthForm';

expect.extend(matchers);
describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<AuthForm isRegister={false} title="Login" onSubmitHandler={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    // Action
    await userEvent.type(usernameInput, 'usernametest');

    expect(usernameInput).toHaveValue('usernametest');
    // Assert
  });
  it('should handle password typing correctly', async () => {
    // Arrange
    render(<AuthForm isRegister={false} title="Login" onSubmitHandler={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
    // Assert
  });
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<AuthForm onSubmitHandler={mockLogin} title="Login" isRegister={false} />);

    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByText('Submit');

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'usernametest',
      password: 'passwordtest',
      name: '',
    });
  });
});
describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<AuthForm isRegister title="Login" onSubmitHandler={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    // Action
    await userEvent.type(usernameInput, 'usernametest');

    expect(usernameInput).toHaveValue('usernametest');
    // Assert
  });
  it('should handle password typing correctly', async () => {
    // Arrange
    render(<AuthForm isRegister title="Login" onSubmitHandler={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
    // Assert
  });
  it('should handle name typing correctly', async () => {
    // Arrange
    render(<AuthForm isRegister title="Login" onSubmitHandler={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama');

    // Action
    await userEvent.type(nameInput, 'namaInput');

    expect(nameInput).toHaveValue('namaInput');
    // Assert
  });
  it('should call register function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<AuthForm onSubmitHandler={mockLogin} title="Login" isRegister />);

    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const nameInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'namatest');
    const registerButton = await screen.getByText('Submit');

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'usernametest',
      password: 'passwordtest',
      name: 'namatest',
    });
  });
});
