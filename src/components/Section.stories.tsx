import { useEffect } from 'react';
import Section from './Section';
import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    headerText: {
      control: 'text',
      description: 'Section header text',
    },
    headerDescription: {
      control: 'text',
      description: 'Section description text',
    },
    buttonText: {
      control: 'text',
      description: 'Button text (optional)',
    },
    buttonLink: {
      control: 'text',
      description: 'Button link/route (optional)',
    },
  },
};

export default meta;

type StoryArgs = {
  theme: 'light' | 'dark';
  headerText: string;
  headerDescription: string;
  buttonText?: string;
  buttonLink?: string;
};

export const Default: StoryObj<typeof meta> = {
  args: {
    headerText: 'About Me',
    headerDescription: "I'm a web developer passionate about creating great user experiences.",
    buttonText: "Contact me",
    buttonLink: "/contact",
    icon: ""
  },
  render: (args) => {
    const typedArgs = args as unknown as StoryArgs;
    useEffect(() => {
      const theme = typedArgs.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return () => document.documentElement.removeAttribute('data-theme');
    }, [typedArgs.theme]);

    return (
      <BrowserRouter>
        <Section
          headerText={typedArgs.headerText}
          headerDescription={typedArgs.headerDescription}
          buttonText={typedArgs.buttonText}
          buttonLink={typedArgs.buttonLink}
        />
      </BrowserRouter>
    );
  },
};
