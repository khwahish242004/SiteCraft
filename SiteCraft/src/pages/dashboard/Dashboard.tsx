import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Layout, Globe, Settings } from 'lucide-react';
import Button from '../../components/shared/Button';
import { useAuth } from '../../contexts/AuthContext';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
}

interface Project {
  id: string;
  name: string;
  template: string;
  lastEdited: string;
  status: 'draft' | 'published';
  url?: string;
}

const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Business Portfolio',
    description: 'Professional template for businesses and entrepreneurs',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Business'
  },
  {
    id: 'template-2',
    name: 'Creative Blog',
    description: 'Modern blog template for creators and writers',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Blog'
  },
  {
    id: 'template-3',
    name: 'E-commerce Store',
    description: 'Complete template for online stores',
    thumbnail: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'E-commerce'
  }
];

// Mock projects data - in a real app, this would come from an API
const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'My Portfolio',
    template: 'Business Portfolio',
    lastEdited: '2024-03-15',
    status: 'published',
    url: 'https://myportfolio.com'
  },
  {
    id: 'project-2',
    name: 'Tech Blog',
    template: 'Creative Blog',
    lastEdited: '2024-03-14',
    status: 'draft'
  }
];

const Dashboard = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    setShowTemplates(true);
  };

  const handleSelectTemplate = (template: Template) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: 'Untitled Project',
      template: template.name,
      lastEdited: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setProjects([...projects, newProject]);
    setShowTemplates(false);
    navigate(`/editor/${newProject.id}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/editor/${projectId}`);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your websites and create new ones</p>
          </div>
          <Button
            onClick={handleCreateNew}
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Create New Website
          </Button>
        </div>

        {showTemplates ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Choose a Template</h2>
              <Button
                variant="outline"
                onClick={() => setShowTemplates(false)}
              >
                Back to Projects
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer"
                  onClick={() => handleSelectTemplate(template)}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{template.description}</p>
                    <span className="mt-2 inline-block px-2 py-1 text-sm font-medium text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/30 rounded">
                      {template.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Layout className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    </div>
                    <span className={`px-2 py-1 text-sm font-medium rounded ${
                      project.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Template: {project.template}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>Last edited: {project.lastEdited}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project.id)}
                      leftIcon={<Edit2 className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                    {project.status === 'published' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.url, '_blank')}
                        leftIcon={<Globe className="h-4 w-4" />}
                      >
                        Visit
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Settings className="h-4 w-4" />}
                    >
                      Settings
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      leftIcon={<Trash2 className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;