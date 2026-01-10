import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the navbar',
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

    return (
      <BrowserRouter>
        <Navbar theme={typedArgs.theme} />
      </BrowserRouter>
    );
  },
};
