import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTestStore } from '../test/testUtils';
import ProjectDetail from './ProjectDetail';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProjectDetail> = {
  title: 'Components/ProjectDetail',
  component: ProjectDetail,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the component',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    title: {
      control: 'text',
      description: 'Project title',
    },
    description: {
      control: 'text',
      description: 'Project description',
    },
    technologies: {
      control: 'object',
      description: 'Array of technologies used',
    },
    category: {
      control: 'text',
      description: 'Project category',
    },
    featured: {
      control: 'boolean',
      description: 'Whether the project is featured',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type StoryArgs = {
  theme: 'light' | 'dark';
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
};

export const Default: StoryObj<typeof meta> = {
  args: {
    theme: 'light',
    title: 'Project Hub - GitHub Pages',
    description: 'A website to showcase various projects',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    featured: true,
  },
  render: (args) => {
    const typedArgs = args as unknown as StoryArgs;
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', typedArgs.theme);
      return () => document.documentElement.removeAttribute('data-theme');
    }, [typedArgs.theme]);

    const mockProjectData = {
      id: 'web-hub',
      title: typedArgs.title,
      description: typedArgs.description,
      image: '/placeholder.png',
      link: 'https://example.com',
      technologies: typedArgs.technologies,
      category: typedArgs.category,
      featured: typedArgs.featured,
    };

    const store = createTestStore({
      projects: {
        projects: [mockProjectData],
        filteredProjects: [],
        selectedProject: mockProjectData,
        filter: 'all',
        loading: false,
        error: null,
      },
      theme: {
        isDarkMode: typedArgs.theme === 'dark',
      },
    });

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ProjectDetail />
        </BrowserRouter>
      </Provider>
    );
  },
};