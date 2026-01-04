import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ContactForm from '../components/ContactForm';
import { createTestStore } from '../test/testUtils';

describe('ContactForm Component', () => {
  it('renders all form fields correctly', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty required fields', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('displays email validation error for invalid email', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('updates form fields when user types', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message content' } });

    expect((nameInput as HTMLInputElement).value).toBe('John Doe');
    expect((emailInput as HTMLInputElement).value).toBe('john@example.com');
    expect((messageInput as HTMLTextAreaElement).value).toBe('Test message content');
  });

  it('submits form with valid data', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'This is a test message that is long enough' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument();
    });
  });

  it('disables form inputs while submitting', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'Test message content here' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Check that button shows loading state
    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
  });
});
