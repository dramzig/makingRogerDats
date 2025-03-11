import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Clock,
  BarChart3,
  Beaker,
  CheckCircle,
  ArrowUpDown,
  Download
} from 'lucide-react';

// Mock data for models
const mockModels = [
  {
    id: '1',
    name: 'Random Forest Classifier',
    description: 'Baseline random forest model for customer churn prediction',
    experiment: 'Baseline Models',
    project: 'Customer Churn Prediction',
    accuracy: 0.82,
    f1: 0.79,
    status: 'deployed',
    lastUpdated: '1 week ago',
    createdBy: 'John Doe',
    type: 'Random Forest',
    framework: 'scikit-learn',
    size: '4.2 MB'
  },
  {
    id: '2',
    name: 'Gradient Boosting',
    description: 'Baseline gradient boosting model for customer churn prediction',
    experiment: 'Baseline Models',
    project: 'Customer Churn Prediction',
    accuracy: 0.85,
    f1: 0.83,
    status: 'deployed',
    lastUpdated: '1 week ago',
    createdBy: 'John Doe',
    type: 'Gradient Boosting',
    framework: 'scikit-learn',
    size: '5.8 MB'
  },
  {
    id: '3',
    name: 'Logistic Regression',
    description: 'Baseline logistic regression model for customer churn prediction',
    experiment: 'Baseline Models',
    project: 'Customer Churn Prediction',
    accuracy: 0.76,
    f1: 0.74,
    status: 'archived',
    lastUpdated: '1 week ago',
    createdBy: 'John Doe',
    type: 'Logistic Regression',
    framework: 'scikit-learn',
    size: '1.2 MB'
  },
  {
    id: '4',
    name: 'SVM Classifier',
    description: 'Baseline SVM model for customer churn prediction',
    experiment: 'Baseline Models',
    project: 'Customer Churn Prediction',
    accuracy: 0.79,
    f1: 0.77,
    status: 'archived',
    lastUpdated: '1 week ago',
    createdBy: 'John Doe',
    type: 'SVM',
    framework: 'scikit-learn',
    size: '2.5 MB'
  },
  {
    id: '5',
    name: 'Decision Tree',
    description: 'Baseline decision tree model for customer churn prediction',
    experiment: 'Baseline Models',
    project: 'Customer Churn Prediction',
    accuracy: 0.78,
    f1: 0.75,
    status: 'archived',
    lastUpdated: '1 week ago',
    createdBy: 'John Doe',
    type: 'Decision Tree',
    framework: 'scikit-learn',
    size: '1.8 MB'
  },
  {
    id: '6',
    name: 'Feature Engineered RF',
    description: 'Random forest model with feature engineering for customer churn prediction',
    experiment: 'Feature Engineering',
    project: 'Customer Churn Prediction',
    accuracy: 0.87,
    f1: 0.85,
    status: 'deployed',
    lastUpdated: '4 days ago',
    createdBy: 'John Doe',
    type: 'Random Forest',
    framework: 'scikit-learn',
    size: '4.5 MB'
  },
  {
    id: '7',
    name: 'Feature Engineered GB',
    description: 'Gradient boosting model with feature engineering for customer churn prediction',
    experiment: 'Feature Engineering',
    project: 'Customer Churn Prediction',
    accuracy: 0.89,
    f1: 0.87,
    status: 'production',
    lastUpdated: '4 days ago',
    createdBy: 'John Doe',
    type: 'Gradient Boosting',
    framework: 'scikit-learn',
    size: '6.2 MB'
  },
  {
    id: '8',
    name: 'Feature Engineered LR',
    description: 'Logistic regression model with feature engineering for customer churn prediction',
    experiment: 'Feature Engineering',
    project: 'Customer Churn Prediction',
    accuracy: 0.81,
    f1: 0.79,
    status: 'deployed',
    lastUpdated: '4 days ago',
    createdBy: 'John Doe',
    type: 'Logistic Regression',
    framework: 'scikit-learn',
    size: '1.4 MB'
  },
  {
    id: '9',
    name: 'Fraud Detection XGBoost',
    description: 'XGBoost model for fraud detection',
    experiment: 'Fraud Detection Baseline',
    project: 'Fraud Detection System',
    accuracy: 0.92,
    f1: 0.90,
    status: 'production',
    lastUpdated: '2 days ago',
    createdBy: 'Jane Smith',
    type: 'XGBoost',
    framework: 'xgboost',
    size: '8.1 MB'
  },
  {
    id: '10',
    name: 'Product Recommendation CF',
    description: 'Collaborative filtering model for product recommendations',
    experiment: 'Recommendation Algorithms',
    project: 'Product Recommendation Engine',
    accuracy: 0.88,
    f1: 0.86,
    status: 'production',
    lastUpdated: '3 days ago',
    createdBy: 'Robert Johnson',
    type: 'Collaborative Filtering',
    framework: 'surprise',
    size: '12.4 MB'
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

const Models: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [sortBy, setSortBy] = useState('accuracy');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Filter models based on search term, status filter, and project filter
  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || model.status === statusFilter;
    const matchesProject = projectFilter === 'all' || model.project === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });
  
  // Sort models
  const sortedModels = [...filteredModels].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'accuracy') {
      comparison = a.accuracy - b.accuracy;
    } else if (sortBy === 'f1') {
      comparison = a.f1 - b.f1;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'lastUpdated') {
      // Simple comparison for mock data
      comparison = a.lastUpdated.localeCompare(b.lastUpdated);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Models</h1>
          <Link
            to="/experiments"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Create Experiment
          </Link>
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
              placeholder="Search models"
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
                  id="status-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  <Filter className="mr-2 h-5 w-5 text-gray-400" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {/* Dropdown menu for status filter */}
              {showStatusDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="status-filter">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('all');
                        setShowStatusDropdown(false);
                      }}
                    >
                      All
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('production');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Production
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('deployed');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Deployed
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('archived');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Archived
                    </button>
                  </div>
                </div>
              )}
            </div>
            
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
          </div>
        </div>
        
        {/* Models table */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          {sortedModels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => toggleSort('name')}
                      >
                        Model
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'name' ? 'text-gray-900' : 'text-gray-400'}`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project / Experiment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => toggleSort('accuracy')}
                      >
                        Accuracy
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'accuracy' ? 'text-gray-900' : 'text-gray-400'}`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => toggleSort('f1')}
                      >
                        F1 Score
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'f1' ? 'text-gray-900' : 'text-gray-400'}`} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button 
                        className="group inline-flex items-center"
                        onClick={() => toggleSort('lastUpdated')}
                      >
                        Last Updated
                        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortBy === 'lastUpdated' ? 'text-gray-900' : 'text-gray-400'}`} />
                      </button>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedModels.map((model) => (
                    <tr key={model.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 p-2 rounded-md">
                            <Brain className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-indigo-600">
                              <Link to={`/models/${model.id}`}>
                                {model.name}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-500">{model.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{model.project}</div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center">
                            <Beaker className="h-4 w-4 text-gray-400 mr-1" />
                            {model.experiment}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{model.accuracy.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{model.f1.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          model.status === 'production' ? 'bg-green-100 text-green-800' : 
                          model.status === 'deployed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {model.status === 'production' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          {model.lastUpdated}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <BarChart3 className="h-5 w-5" />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <Brain className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No models found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Create an experiment to train new models.
              </p>
              <div className="mt-6">
                <Link
                  to="/experiments"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Create Experiment
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Models;

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