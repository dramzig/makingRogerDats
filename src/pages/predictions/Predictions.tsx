import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Clock,
  Download,
  Eye,
  Brain,
  FileText,
  X
} from 'lucide-react';

// Mock data for predictions
const mockPredictions = [
  {
    id: '1',
    name: 'July Predictions',
    description: 'Monthly churn predictions for July',
    model: 'Feature Engineered GB',
    project: 'Customer Churn Prediction',
    records: 5240,
    createdAt: '2023-11-12T10:30:00Z',
    createdBy: 'John Doe',
    lastUpdated: '3 days ago',
    format: 'CSV',
    size: '1.2 MB'
  },
  {
    id: '2',
    name: 'August Predictions',
    description: 'Monthly churn predictions for August',
    model: 'Feature Engineered GB',
    project: 'Customer Churn Prediction',
    records: 5380,
    createdAt: '2023-11-14T14:15:00Z',
    createdBy: 'John Doe',
    lastUpdated: '1 day ago',
    format: 'CSV',
    size: '1.3 MB'
  },
  {
    id: '3',
    name: 'Fraud Detection - Week 45',
    description: 'Weekly fraud detection predictions',
    model: 'Fraud Detection XGBoost',
    project: 'Fraud Detection System',
    records: 12450,
    createdAt: '2023-11-13T09:20:00Z',
    createdBy: 'Jane Smith',
    lastUpdated: '2 days ago',
    format: 'JSON',
    size: '3.5 MB'
  },
  {
    id: '4',
    name: 'Product Recommendations - User Batch 12',
    description: 'Product recommendations for user batch 12',
    model: 'Product Recommendation CF',
    project: 'Product Recommendation Engine',
    records: 8750,
    createdAt: '2023-11-11T16:45:00Z',
    createdBy: 'Robert Johnson',
    lastUpdated: '4 days ago',
    format: 'JSON',
    size: '2.8 MB'
  },
  {
    id: '5',
    name: 'Price Optimization - Q4 Products',
    description: 'Price optimization predictions for Q4 products',
    model: 'Price Optimization LGBM',
    project: 'Price Optimization',
    records: 3250,
    createdAt: '2023-11-10T11:30:00Z',
    createdBy: 'Alice Williams',
    lastUpdated: '5 days ago',
    format: 'CSV',
    size: '0.9 MB'
  }
];

// Mock projects for dropdown
const mockProjects = [
  { id: '1', name: 'Customer Churn Prediction' },
  { id: '2', name: 'Fraud Detection System' },
  { id: '3', name: 'Product Recommendation Engine' },
  { id: '4', name: 'Price Optimization' },
  { id: '5', name: 'Customer Segmentation' },
];

// Mock models for dropdown
const mockModels = [
  { id: '7', name: 'Feature Engineered GB', project: 'Customer Churn Prediction' },
  { id: '9', name: 'Fraud Detection XGBoost', project: 'Fraud Detection System' },
  { id: '10', name: 'Product Recommendation CF', project: 'Product Recommendation Engine' },
  { id: '11', name: 'Price Optimization LGBM', project: 'Price Optimization' },
];

const Predictions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [predictionName, setPredictionName] = useState('');
  const [predictionDescription, setPredictionDescription] = useState('');
  const [predictionType, setPredictionType] = useState('batch');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Filter predictions based on search term, project filter, and model filter
  const filteredPredictions = mockPredictions.filter(prediction => {
    const matchesSearch = prediction.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prediction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || prediction.project === projectFilter;
    const matchesModel = modelFilter === 'all' || prediction.model === modelFilter;
    return matchesSearch && matchesProject && matchesModel;
  });

  // Filter models based on selected project
  const filteredModels = projectFilter === 'all' 
    ? mockModels 
    : mockModels.filter(model => model.project === projectFilter);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Predictions</h1>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Prediction
          </button>
        </div>
        
        {/* Filters and search */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-64 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search predictions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative inline-block text-left w-full sm:w-auto">
              <div className="flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="project-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                >
                  <FolderKanban className="mr-2 h-5 w-5 text-gray-400" />
                  Project: {projectFilter === 'all' ? 'All' : projectFilter}
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {/* Dropdown menu for project filter */}
              {showProjectDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="project-filter">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setProjectFilter('all');
                        setShowProjectDropdown(false);
                      }}
                    >
                      All
                    </button>
                    {mockProjects.map((project) => (
                      <button
                        key={project.id}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                        onClick={() => {
                          setProjectFilter(project.name);
                          setShowProjectDropdown(false);
                        }}
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative inline-block text-left w-full sm:w-auto">
              <div className="flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="model-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                >
                  <Brain className="mr-2 h-5 w-5 text-gray-400" />
                  Model: {modelFilter === 'all' ? 'All' : modelFilter}
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {/* Dropdown menu for model filter */}
              {showModelDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="model-filter">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setModelFilter('all');
                        setShowModelDropdown(false);
                      }}
                    >
                      All
                    </button>
                    {mockModels.map((model) => (
                      <button
                        key={model.id}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                        onClick={() => {
                          setModelFilter(model.name);
                          setShowModelDropdown(false);
                        }}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Predictions list */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((prediction) => (
                <li key={prediction.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-md">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600 truncate">{prediction.name}</p>
                            <p className="mt-1 text-sm text-gray-500 truncate">{prediction.description}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <div className="flex space-x-2">
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </button>
                            <button className="text-gray-400 hover:text-gray-500">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Brain className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {prediction.model}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {prediction.records.toLocaleString()} records • {prediction.format} • {prediction.size}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            Created {prediction.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Project: {prediction.project}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No predictions found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new prediction.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Prediction
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Create Prediction Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowCreateModal(false)}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowCreateModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create new prediction</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Generate predictions using a trained model.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="prediction-name" className="block text-sm font-medium text-gray-700">
                      Prediction name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="prediction-name"
                        id="prediction-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter prediction name"
                        value={predictionName}
                        onChange={(e) => setPredictionName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="prediction-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="prediction-description"
                        name="prediction-description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your prediction"
                        value={predictionDescription}
                        onChange={(e) => setPredictionDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <div className="mt-1">
                      <select
                        id="model"
                        name="model"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={selectedModel || ''}
                        onChange={(e) => setSelectedModel(e.target.value)}
                      >
                        <option value="">Select a model</option>
                        {filteredModels.map((model) => (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Prediction type
                    </label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="prediction-type-single"
                          name="prediction-type"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          checked={predictionType === 'single'}
                          onChange={() => setPredictionType('single')}
                        />
                        <label htmlFor="prediction-type-single" className="ml-3 block text-sm font-medium text-gray-700">
                          Single prediction
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="prediction-type-batch"
                          name="prediction-type"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          checked={predictionType === 'batch'}
                          onChange={() => setPredictionType('batch')}
                        />
                        <label htmlFor="prediction-type-batch" className="ml-3 block text-sm font-medium text-gray-700">
                          Batch prediction
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {predictionType === 'single' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Input Features
                      </label>
                      <div className="mt-1 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label htmlFor="tenure" className="block text-xs font-medium text-gray-500">
                            tenure
                          </label>
                          <input
                            type="number"
                            name="tenure"
                            id="tenure"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="36"
                          />
                        </div>
                        <div>
                          <label htmlFor="monthly_charges" className="block text-xs font-medium text-gray-500">
                            monthly_charges
                          </label>
                          <input
                            type="number"
                            name="monthly_charges"
                            id="monthly_charges"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="89.95"
                          />
                        </div>
                        <div>
                          <label htmlFor="contract_type" className="block text-xs font-medium text-gray-500">
                            contract_type
                          </label>
                          <select
                            id="contract_type"
                            name="contract_type"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Month-to-month</option>
                            <option>One year</option>
                            <option>Two year</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="payment_method" className="block text-xs font-medium text-gray-500">
                            payment_method
                          </label>
                          <select
                            id="payment_method"
                            name="payment_method"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Electronic check</option>
                            <option>Mailed check</option>
                            <option>Bank transfer</option>
                            <option>Credit card</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <button 
                          type="button"
                          className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          + Add more features
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload data file
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only" 
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            CSV or JSON up to 10MB
                          </p>
                        </div>
                      </div>
                      {selectedFile && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>Selected: {selectedFile.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-md p-2">
                        <Server className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Compute estimate</p>
                        <p className="text-xs text-gray-500">
                          {predictionType === 'batch' ? 'Batch prediction: 1 credit per 1000 records' : 'Single prediction: 0.01 credits'}
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowCreateModal(false)}
                  disabled={!predictionName || !selectedModel || (predictionType === 'batch' && !selectedFile)}
                >
                  Generate Prediction
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;

// Helper component for the FolderKanban icon since it's not in lucide-react
const FolderKanban = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M8 10v4" />
      <path d="M12 10v2" />
      <path d="M16 10v6" />
    </svg>
  );
};

// Helper component for the Server icon since we're using it
const Server = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );
};