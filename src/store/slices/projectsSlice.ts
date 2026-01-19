import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: Project | null;
  filter: string;
  loading: boolean;
  error: string | null;
}

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetchProjects',
  async () => {
    // Simulate API call
    const basePath = import.meta.env.BASE_URL;
    return new Promise<Project[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'web-hub',
            title: 'Project Hub - GitHub Pages',
            description: 'Using HTML & CSS, I created a website a place to allow users to roam through some of the projects that I\'ve enjoyed making in my free time.',
            image: `${basePath}project-hub.png`,
            link: 'https://lucacamilleri.github.io/home',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            featured: true,
          },
          {
            id: 'iron-flex',
            title: 'IronFlex - Fitness App',
            description: 'A comprehensive fitness application prototype designed in Figma with a focus on user experience and modern UI design principles.',
            image: `${basePath}project-1.png`,
            link: 'https://www.figma.com/proto/jWzXDMr9JaYDEjl6664FHk/IronFlex-%7C-Fitness-App?node-id=27-298&node-type=canvas&t=u0pa6MW8dsB26hLs-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
            technologies: ['Figma', 'UI/UX', 'Prototyping'],
            category: 'design',
            featured: true,
          },
          {
            id: 'waterwell',
            title: 'WaterWell IoT Project',
            description: 'An IoT project focused on water management and monitoring using modern web technologies.',
            image: `${basePath}water-well-system.png`,
            link: 'https://lucacamilleri.github.io/iot-project/home',
            technologies: ['React.js', 'IoT', 'JavaScript'],
            category: 'web',
            featured: false,
          },
          {
            id: 'planpal',
            title: 'PlanPal - Assignment Management App',
            description: 'An assignment management web application made with ViteJS to help users organize their daily tasks efficiently.',
            image: `${basePath}planpal.png`,
            link: 'https://planpal-two.vercel.app/#/',
            technologies: ['Vite.js','CSS','Firebase'],
            category: 'web',
            featured: false
          },
          {
            id: 'lumin',
            title: 'Lumin - 3D Platformer Game Concept',
            description: 'A single page web application for a 3D platformer game concept, showcasing engaging gameplay mechanics and immersive environments.',
            image: `${basePath}lumin.png`,
            link: 'https://lucacamilleri.github.io/lumin-game/',
            technologies: ['React.js', 'CSS'],
            category: 'web',
            featured: false,
          }
        ]);
      }, 500);
    });
  }
);

const initialState: ProjectsState = {
  projects: [],
  filteredProjects: [],
  selectedProject: null,
  filter: 'all',
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      if (action.payload === 'all') {
        state.filteredProjects = state.projects;
      } else {
        state.filteredProjects = state.projects.filter(
          (project) => project.category === action.payload
        );
      }
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = state.projects.find(
        (project) => project.id === action.payload
      ) || null;
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.filteredProjects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      });
  },
});

export const { setFilter, setSelectedProject, clearSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;
