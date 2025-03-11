import React, { useState } from 'react';
import { 
  Server, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Clock,
  Play,
  Square,
  Trash2,
  CreditCard,
  Cpu,
  HardDrive,
  BarChart3,
  X,
  Check
} from 'lucide-react';

// Mock data for server instances
const mockInstances = [
  {
    id: '1',
    name: 'Data Processing Server',
    type: 'm5.12xlarge',
    status: 'running',
    uptime: '1h 23m',
    cost: 4.5,
    project: 'Customer Churn Prediction',
    createdBy: 'John Doe',
    createdAt: '2023-11-15T10:30:00Z',
    specs: {
      cpu: 48,
      memory: 192,
      storage: 500,
      gpu: 0
    }
  },
  {
    id: '2',
    name: 'Model Training Server',
    type: 'm5.8xlarge',
    status: 'running',
    uptime: '45m',
    cost: 2.1,
    project: 'Customer Churn Prediction',
    createdBy: 'John Doe',
    createdAt: '2023-11-15T11:15:00Z',
    specs: {
      cpu: 32,
      memory: 128,
      storage: 250,
      gpu: 0
    }
  },
  {
    id: '3',
    name: 'GPU Training Server',
    type: 'p3.2xlarge',
    status: 'stopped',
    uptime: '0m',
    cost: 3.06,
    project: 'Fraud Detection System',
    createdBy: 'Jane Smith',
    createdAt: '2023-11-14T09:00:00Z',
    specs: {
      cpu: 8,
      memory: 61,
      storage: 100,
      gpu: 1
    }
  },
  {
    id: '4',
    name: 'Batch Prediction Server',
    type: 'c5.4xlarge',
    status: 'stopped',
    uptime: '0m',
    cost: 0.68,
    project: 'Product Recommendation Engine',
    createdBy: 'Robert Johnson',
    createdAt: '2023-11-13T14:20:00Z',
    specs: {
      cpu: 16,
      memory: 32,
      storage: 100,
      gpu: 0
    }
  },
];

// Instance types
const instanceTypes = [
  { 
    category: 'General Purpose',
    types: [
      { id: 'm5.large', name: 'm5.large', cpu: 2, memory: 8, storage: 50, gpu: 0, costPerHour: 0.096 },
      { id: 'm5.xlarge', name: 'm5.xlarge', cpu: 4, memory: 16, storage: 100, gpu: 0, costPerHour: 0.192 },
      { id: 'm5.2xlarge', name: 'm5.2xlarge', cpu: 8, memory: 32, storage: 100, gpu: 0, costPerHour: 0.384 },
      { id: 'm5.4xlarge', name: 'm5.4xlarge', cpu: 16, memory: 64, storage: 150, gpu: 0, costPerHour: 0.768 },
      { id: 'm5.8xlarge', name: 'm5.8xlarge', cpu: 32, memory: 128, storage: 250, gpu: 0, costPerHour: 1.536 },
      { id: 'm5.12xlarge', name: 'm5.12xlarge', cpu: 48, memory: 192, storage: 500, gpu: 0, costPerHour: 2.304 },
    ]
  },
  {
    category: 'Compute Optimized',
    types: [
      { id: 'c5.large', name: 'c5.large', cpu: 2, memory: 4, storage: 50, gpu: 0, costPerHour: 0.085 },
      { id: 'c5.xlarge', name: 'c5.xlarge', cpu: 4, memory: 8, storage: 100, gpu: 0, costPerHour: 0.17 },
      { id: 'c5.2xlarge', name: 'c5.2xlarge', cpu: 8, memory: 16, storage: 100, gpu: 0, costPerHour: 0.34 },
      { id: 'c5.4xlarge', name: 'c5.4xlarge', cpu: 16, memory: 32, storage: 100, gpu: 0, costPerHour: 0.68 },
    ]
  },
  {
    category: 'Memory Optimized',
    types: [
      { id: 'r5.large', name: 'r5.large', cpu: 2, memory: 16, storage: 50, gpu: 0, costPerHour: 0.126 },
      { id: 'r5.xlarge', name: 'r5.xlarge', cpu: 4, memory: 32, storage: 100, gpu: 0, costPerHour: 0.252 },
      { id: 'r5.2xlarge', name: 'r5.2xlarge', cpu: 8, memory: 64, storage: 100, gpu: 0, costPerHour: 0.504 },
    ]
  },
  {
    category: 'GPU Instances',
    types: [
      { id: 'p3.2xlarge', name: 'p3.2xlarge', cpu: 8, memory: 61, storage: 100, gpu: 1, costPerHour: 3.06 },
      { id: 'p3.8xlarge', name: 'p3.8xlarge', cpu: 32, memory: 244, storage: 250, gpu: 4, costPerHour: 12.24 },
    ]
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

const ServerInstances: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInstanceType, setSelectedInstanceType] = useState<string | null>(null);
  const [newInstanceName, setNewInstanceName] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [storageSize, setStorageSize] = useState(100);
  const [showInstanceMenu, setShowInstanceMenu] = useState<string | null>(null);
  
  // Filter instances based on search term and status filter
  const filteredInstances = mockInstances.filter(instance => {
    const matchesSearch = instance.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          instance.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || instance.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get selected instance type details
  const getSelectedInstanceTypeDetails = () => {
    if (!selectedInstanceType) return null;
    
    for (const category of instanceTypes) {
      const found = category.types.find(type => type.id === selectedInstanceType);
      if (found) return found;
    }
    
    return null;
  };
  
  const selectedTypeDetails = getSelectedInstanceTypeDetails();
  
  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    if (!selectedTypeDetails) return 0;
    
    // Cost per hour
    return selectedTypeDetails.costPerHour;
  };
  
  const estimatedCostPerHour = calculateEstimatedCost();
  const estimatedCostPerDay = estimatedCostPerHour * 24;
  const estimatedCostPerMonth = estimatedCostPerDay * 30;

  // Handle instance action (start, stop, delete)
  const handleInstanceAction = (instanceId: string, action: 'start' | 'stop' | 'delete') => {
    // In a real app, this would call an API to perform the action
    console.log(`${action} instance ${instanceId}`);
    setShowInstanceMenu(null);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Server Instances</h1>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Instance
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
              placeholder="Search instances"
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
                        setStatusFilter('running');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Running
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('stopped');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Stopped
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Server instances list */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredInstances.length > 0 ? (
              filteredInstances.map((instance) => (
                <li key={instance.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md ${
                            instance.status === 'running' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Server className={`h-5 w-5 ${
                              instance.status === 'running' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600 truncate">{instance.name}</p>
                            <p className="mt-1 text-sm text-gray-500 truncate">Type: {instance.type}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            instance.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {instance.status.charAt(0).toUpperCase() + instance.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Cpu className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {instance.specs.cpu} vCPU
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <HardDrive className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {instance.specs.memory} GB RAM
                          </p>
                          {instance.specs.gpu > 0 && (
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <BarChart3 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {instance.specs.gpu} GPU
                            </p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          {instance.status === 'running' ? (
                            <>
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>
                                Uptime: {instance.uptime}
                              </p>
                            </>
                          ) : (
                            <p>
                              Stopped
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CreditCard className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">${instance.cost.toFixed(2)}/hour</span>
                          <span className="ml-4 text-gray-500">Project: {instance.project}</span>
                        </div>
                        <div className="relative">
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setShowInstanceMenu(showInstanceMenu === instance.id ? null : instance.id)}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                          
                          {showInstanceMenu === instance.id && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                              <div className="py-1" role="menu" aria-orientation="vertical">
                                {instance.status === 'stopped' ? (
                                  <button
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                    onClick={() => handleInstanceAction(instance.id, 'start')}
                                  >
                                    <Play className="mr-3 h-4 w-4 text-gray-400" />
                                    Start
                                  </button>
                                ) : (
                                  <button
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                    onClick={() => handleInstanceAction(instance.id, 'stop')}
                                  >
                                    <Square className="mr-3 h-4 w-4 text-gray-400" />
                                    Stop
                                  </button>
                                )}
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleInstanceAction(instance.id, 'delete')}
                                >
                                  <Trash2 className="mr-3 h-4 w-4 text-red-400" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <Server className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No server instances found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new server instance.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Instance
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Create Instance Modal */}
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
                  <Server className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create new server instance</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Configure and launch a new server instance for your machine learning tasks.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="instance-name" className="block text-sm font-medium text-gray-700">
                      Instance name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="instance-name"
                        id="instance-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter instance name"
                        value={newInstanceName}
                        onChange={(e) => setNewInstanceName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                      Project
                    </label>
                    <div className="mt-1">
                      <select
                        id="project"
                        name="project"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={selectedProject || ''}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <option value="">Select a project</option>
                        {mockProjects.map((project) => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Instance type
                    </label>
                    <div className="mt-1 space-y-4">
                      {instanceTypes.map((category) => (
                        <div key={category.category}>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">{category.category}</h4>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {category.types.map((type) => (
                              <div 
                                key={type.id}
                                className={`border rounded-lg p-3 cursor-pointer ${
                                  selectedInstanceType === type.id 
                                    ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50 bg-indigo-50' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                                onClick={() => setSelectedInstanceType(type.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {selectedInstanceType === type.id ? (
                                      <div className="h-4 w-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check className="h-3 w-3 text-white" />
                                      </div>
                                    ) : (
                                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                                    )}
                                    <div className="ml-2">
                                      <p className="text-sm font-medium text-gray-900">{type.name}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">${type.costPerHour.toFixed(3)}/hr</p>
                                </div>
                                <div className="mt-2 flex items-center text-xs text-gray-500 justify-between">
                                  <span>{type.cpu} vCPU</span>
                                  <span>{type.memory} GB RAM</span>
                                  {type.gpu > 0 && <span>{type.gpu} GPU</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="storage" className="block text-sm font-medium text-gray-700">
                      Storage (GB)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="storage"
                        id="storage"
                        min="50"
                        max="1000"
                        step="10"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={storageSize}
                        onChange={(e) => setStorageSize(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  {selectedTypeDetails && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Cost Estimate</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Per hour:</span>
                          <span className="font-medium text-gray-900">${estimatedCostPerHour.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Per day:</span>
                          <span className="font-medium text-gray-900">${estimatedCostPerDay.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Per month:</span>
                          <span className="font-medium text-gray-900">${estimatedCostPerMonth.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2 border-t border-gray-200 mt-2">
                          <span className="text-gray-500">Credits required:</span>
                          <span className="font-medium text-gray-900">{estimatedCostPerHour.toFixed(0)} credits/hour</span>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowCreateModal(false)}
                  disabled={!selectedInstanceType || !newInstanceName || !selectedProject}
                >
                  Launch Instance
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

export default ServerInstances;