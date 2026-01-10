import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTestStore } from '../test/testUtils';
import ContactForm from './ContactForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A contact form component with validation, Redux state management, and error handling. Includes fields for name, email, and message with real-time validation.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the component',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type StoryArgs = {
  theme: 'light' | 'dark';
};

export const Default: StoryObj<typeof meta> = {
  args: {
    theme: 'light',
  },
  render: (args) => {
    const typedArgs = args as unknown as StoryArgs;
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', typedArgs.theme);
      return () => document.documentElement.removeAttribute('data-theme');
    }, [typedArgs.theme]);

    const store = createTestStore({
      theme: {
        isDarkMode: typedArgs.theme === 'dark',
      },
    });

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      </Provider>
    );
  },
};
