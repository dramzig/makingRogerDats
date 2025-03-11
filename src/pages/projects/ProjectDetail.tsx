import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Database, 
  Beaker, 
  Brain, 
  BarChart3, 
  Users, 
  Settings, 
  Plus,
  Clock,
  Calendar,
  ChevronRight,
  Upload,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock project data
const mockProject = {
  id: '1',
  name: 'Customer Churn Prediction',
  description: 'Predict which customers are likely to cancel their subscription based on historical behavior and demographic data.',
  status: 'active',
  createdAt: '2023-10-15',
  lastUpdated: '2 days ago',
  createdBy: 'John Doe',
  team: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Owner' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer' }
  ],
  datasets: [
    { id: '1', name: 'Customer Data Q1', rows: 15420, columns: 24, lastUpdated: '3 days ago' },
    { id: '2', name: 'Customer Data Q2', rows: 16850, columns: 24, lastUpdated: '1 day ago' },
    { id: '3', name: 'Customer Transactions', rows: 89750, columns: 12, lastUpdated: '5 days ago' }
  ],
  experiments: [
    { id: '1', name: 'Baseline Models', status: 'completed', models: 5, lastUpdated: '1 week ago' },
    { id: '2', name: 'Feature Engineering', status: 'completed', models: 3, lastUpdated: '4 days ago' },
    { id: '3', name: 'Hyperparameter Tuning', status: 'running', models: 0, lastUpdated: '1 day ago' },
    { id: '4', name: 'Ensemble Methods', status: 'draft', models: 0, lastUpdated: '2 days ago' },
    { id: '5', name: 'Neural Network Approach', status: 'draft', models: 0, lastUpdated: '2 days ago' }
  ],
  models: [
    { id: '1', name: 'Random Forest Classifier', experiment: 'Baseline Models', accuracy: 0.82, f1: 0.79, lastUpdated: '1 week ago' },
    { id: '2', name: 'Gradient Boosting', experiment: 'Baseline Models', accuracy: 0.85, f1: 0.83, lastUpdated: '1 week ago' },
    { id: '3', name: 'Logistic Regression', experiment: 'Baseline Models', accuracy: 0.76, f1: 0.74, lastUpdated: '1 week ago' },
    { id: '4', name: 'SVM Classifier', experiment: 'Baseline Models', accuracy: 0.79, f1: 0.77, lastUpdated: '1 week ago' },
    { id: '5', name: 'Decision Tree', experiment: 'Baseline Models', accuracy: 0.78, f1: 0.75, lastUpdated: '1 week ago' },
    { id: '6', name: 'Feature Engineered RF', experiment: 'Feature Engineering', accuracy: 0.87, f1: 0.85, lastUpdated: '4 days ago' },
    { id: '7', name: 'Feature Engineered GB', experiment: 'Feature Engineering', accuracy: 0.89, f1: 0.87, lastUpdated: '4 days ago', selected: true },
    { id: '8', name: 'Feature Engineered LR', experiment: 'Feature Engineering', accuracy: 0.81, f1: 0.79, lastUpdated: '4 days ago' }
  ],
  predictions: [
    { id: '1', name: 'July Predictions', model: 'Feature Engineered GB', records: 5240, createdAt: '3 days ago' },
    { id: '2', name: 'August Predictions', model: 'Feature Engineered GB', records: 5380, createdAt: '1 day ago' }
  ]
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const project = mockProject; // In a real app, you would fetch the project by ID
  
  // Find the selected model
  const selectedModel = project.models.find(model => model.selected);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/projects" className="hover:text-gray-700">Projects</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-medium">{project.name}</span>
        </div>
        
        {/* Project header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-blue-100">
              <FolderKanban className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </button>
          </div>
        </div>
        
        {/* Project metadata */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Created on {project.createdAt}</span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Last updated {project.lastUpdated}</span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">{project.team.length} team members</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`${
                activeTab === 'datasets'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('datasets')}
            >
              Datasets ({project.datasets.length})
            </button>
            <button
              className={`${
                activeTab === 'experiments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('experiments')}
            >
              Experiments ({project.experiments.length})
            </button>
            <button
              className={`${
                activeTab === 'models'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('models')}
            >
              Models ({project.models.length})
            </button>
            <button
              className={`${
                activeTab === 'predictions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('predictions')}
            >
              Predictions ({project.predictions.length})
            </button>
            <button
              className={`${
                activeTab === 'team'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('team')}
            >
              Team ({project.team.length})
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project summary */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Summary</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-md p-2">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Datasets</p>
                        <p className="text-lg font-bold text-gray-900">{project.datasets.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-md p-2">
                        <Beaker className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Experiments</p>
                        <p className="text-lg font-bold text-gray-900">{project.experiments.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-md p-2">
                        <Brain className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Models</p>
                        <p className="text-lg font-bold text-gray-900">{project.models.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-md p-2">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Predictions</p>
                        <p className="text-lg font-bold text-gray-900">{project.predictions.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selected model */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Model</h2>
                {selectedModel ? (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-md">
                          <Brain className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{selectedModel.name}</p>
                          <p className="text-xs text-gray-500">From experiment: {selectedModel.experiment}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Accuracy: {selectedModel.accuracy.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">F1 Score: {selectedModel.f1.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Make Predictions
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Brain className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No model selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select a model from your experiments to make predictions.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Recent activity */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center ring-8 ring-white">
                              <Beaker className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  Hyperparameter Tuning experiment started
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                1 day ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                              <Database className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  Customer Data Q2 dataset uploaded
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                1 day ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                              <BarChart3 className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  August Predictions created
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                1 day ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                              <Brain className="h-5 w-5 text-indigo-600" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  Feature Engineered GB model selected as production model
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                4 days ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Datasets Tab */}
          {activeTab === 'datasets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Datasets</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dataset
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {project.datasets.map((dataset) => (
                    <li key={dataset.id}>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-md">
                                <Database className="h-5 w-5 text-blue-600" />
                              </div>
                              <p className="ml-3 text-sm font-medium text-indigo-600 truncate">{dataset.name}</p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {dataset.rows.toLocaleString()} rows
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                {dataset.columns} columns
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>
                                Updated {dataset.lastUpdated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Experiments Tab */}
          {activeTab === 'experiments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Experiments</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus className="h-4 w-4 mr-2" />
                  New Experiment
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {project.experiments.map((experiment) => (
                    <li key={experiment.id}>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-md ${
                                experiment.status === 'completed' ? 'bg-green-100' : 
                                experiment.status === 'running' ? 'bg-yellow-100' : 'bg-gray-100'
                              }`}>
                                <Beaker className={`h-5 w-5 ${
                                  experiment.status === 'completed' ? 'text-green-600' : 
                                  experiment.status === 'running' ? 'text-yellow-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <p className="ml-3 text-sm font-medium text-indigo-600 truncate">{experiment.name}</p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                experiment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                experiment.status === 'running' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {experiment.models} models
                              </p>
                              {experiment.status === 'draft' && (
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <Play className="h-4 w-4 mr-1" />
                                    Start
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>
                                Updated {experiment.lastUpdated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Models Tab */}
          {activeTab === 'models' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Models</h2>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {project.models.map((model) => (
                    <li key={model.id}>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-indigo-100 p-2 rounded-md">
                                <Brain className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-indigo-600 truncate">{model.name}</p>
                                <p className="text-xs text-gray-500">From experiment: {model.experiment}</p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              {model.selected ? (
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Selected for Production
                                </p>
                              ) : (
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Select for Production
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex space-x-6">
                              <p className="flex items-center text-sm text-gray-500">
                                Accuracy: {model.accuracy.toFixed(2)}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                F1 Score: {model.f1.toFixed(2)}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>
                                Created {model.lastUpdated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Predictions</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus className="h-4 w-4 mr-2" />
                  New Prediction
                </button>
              </div>
              
              {selectedModel ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {project.predictions.map((prediction) => (
                      <li key={prediction.id}>
                        <a href="#" className="block hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-green-100 p-2 rounded-md">
                                  <BarChart3 className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-indigo-600 truncate">{prediction.name}</p>
                                  <p className="text-xs text-gray-500">Using model: {prediction.model}</p>
                                </div>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Download
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  {prediction.records.toLocaleString()} records
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <p>
                                  Created {prediction.createdAt}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No predictions available</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a model from your experiments to make predictions.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {project.team.map((member) => (
                    <li key={member.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                              alt=""
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex items-center">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.role === 'Owner' ? 'bg-purple-100 text-purple-800' : 
                              member.role === 'Editor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.role}
                            </p>
                            <button className="ml-2 text-gray-400 hover:text-gray-500">
                              <Settings className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;