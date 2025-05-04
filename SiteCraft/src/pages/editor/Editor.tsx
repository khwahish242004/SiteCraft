import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Save, Eye, ArrowLeft, Layout, Type, Image, Grid, Box, Link as LinkIcon } from 'lucide-react';
import Button from '../../components/shared/Button';
import toast from 'react-hot-toast';

interface ComponentData {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
}

const defaultComponents: ComponentData[] = [
  {
    id: 'header-1',
    type: 'heading',
    content: 'Welcome to my website',
    styles: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: '1rem'
    }
  },
  {
    id: 'paragraph-1',
    type: 'paragraph',
    content: 'This is a sample paragraph. Edit this text to add your own content.',
    styles: {
      fontSize: '1rem',
      color: '#4a4a4a',
      lineHeight: '1.6',
      marginBottom: '1rem'
    }
  }
];

const Editor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [components, setComponents] = useState<ComponentData[]>(defaultComponents);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // In a real app, fetch project data from API
    console.log('Loading project:', projectId);
  }, [projectId]);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    
    const newComponent: ComponentData = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Heading' : type === 'paragraph' ? 'New Paragraph' : '',
      styles: {
        fontSize: type === 'heading' ? '2rem' : '1rem',
        color: '#1a1a1a',
        marginBottom: '1rem'
      }
    };
    
    setComponents([...components, newComponent]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleComponentClick = (component: ComponentData) => {
    setSelectedComponent(component);
  };

  const handleContentChange = (content: string) => {
    if (!selectedComponent) return;

    const updatedComponents = components.map(comp =>
      comp.id === selectedComponent.id ? { ...comp, content } : comp
    );
    
    setComponents(updatedComponents);
    setSelectedComponent({ ...selectedComponent, content });
  };

  const handleStyleChange = (property: string, value: string) => {
    if (!selectedComponent) return;

    const updatedStyles = { ...selectedComponent.styles, [property]: value };
    const updatedComponents = components.map(comp =>
      comp.id === selectedComponent.id ? { ...comp, styles: updatedStyles } : comp
    );
    
    setComponents(updatedComponents);
    setSelectedComponent({ ...selectedComponent, styles: updatedStyles });
  };

  const handleSave = () => {
    // In a real app, save to backend
    toast.success('Changes saved successfully!');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                >
                  Back to Dashboard
                </Button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Website Editor
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  {previewMode ? 'Edit Mode' : 'Preview'}
                </Button>
                <Button
                  onClick={handleSave}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Components Sidebar */}
            {!previewMode && (
              <div className="col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Components
                  </h2>
                  <div className="space-y-3">
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'heading')}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Type className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Heading</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'paragraph')}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Type className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Paragraph</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'image')}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Image className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Image</span>
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'button')}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Box className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Button</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas */}
            <div className={`${previewMode ? 'col-span-12' : 'col-span-6'}`}>
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 min-h-[600px] p-8"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {components.map((component) => (
                  <div
                    key={component.id}
                    onClick={() => !previewMode && handleComponentClick(component)}
                    className={`relative ${!previewMode ? 'hover:outline hover:outline-2 hover:outline-blue-500 cursor-pointer' : ''} ${
                      selectedComponent?.id === component.id ? 'outline outline-2 outline-blue-500' : ''
                    }`}
                    style={component.styles}
                  >
                    {component.type === 'heading' && <h2>{component.content}</h2>}
                    {component.type === 'paragraph' && <p>{component.content}</p>}
                    {component.type === 'image' && (
                      <img
                        src={component.content || 'https://via.placeholder.com/400x300'}
                        alt="Content"
                        className="max-w-full h-auto"
                      />
                    )}
                    {component.type === 'button' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        {component.content || 'Click me'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Properties Sidebar */}
            {!previewMode && (
              <div className="col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Properties
                  </h2>
                  {selectedComponent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Content
                        </label>
                        <textarea
                          value={selectedComponent.content}
                          onChange={(e) => handleContentChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Font Size
                        </label>
                        <input
                          type="text"
                          value={selectedComponent.styles.fontSize}
                          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Color
                        </label>
                        <input
                          type="text"
                          value={selectedComponent.styles.color}
                          onChange={(e) => handleStyleChange('color', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a component to edit its properties
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;