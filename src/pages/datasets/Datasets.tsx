import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Clock,
  Upload,
  FileText,
  Table,
  X,
  ArrowRight
} from 'lucide-react';

// Mock data for datasets
const mockDatasets = [
  {
    id: '1',
    name: 'Customer Data Q1',
    description: 'Customer demographic and behavioral data for Q1',
    project: 'Customer Churn Prediction',
    rows: 15420,
    columns: 24,
    size: '4.2 MB',
    format: 'CSV',
    lastUpdated: '3 days ago',
    createdBy: 'John Doe',
    status: 'processed',
  },
  {
    id: '2',
    name: 'Customer Data Q2',
    description: 'Customer demographic and behavioral data for Q2',
    project: 'Customer Churn Prediction',
    rows: 16850,
    columns: 24,
    size: '4.5 MB',
    format: 'CSV',
    lastUpdated: '1 day ago',
    createdBy: 'John Doe',
    status: 'processed',
  },
  {
    id: '3',
    name: 'Customer Transactions',
    description: 'Transaction history for all customers',
    project: 'Customer Churn Prediction',
    rows: 89750,
    columns: 12,
    size: '12.8 MB',
    format: 'CSV',
    lastUpdated: '5 days ago',
    createdBy: 'Jane Smith',
    status: 'processed',
  },
  {
    id: '4',
    name: 'Fraud Transactions',
    description: 'Known fraudulent transactions for training',
    project: 'Fraud Detection System',
    rows: 5240,
    columns: 18,
    size: '1.8 MB',
    format: 'CSV',
    lastUpdated: '1 week ago',
    createdBy: 'Robert Johnson',
    status: 'processed',
  },
  {
    id: '5',
    name: 'Product Catalog',
    description: 'Complete product catalog with attributes',
    project: 'Product Recommendation Engine',
    rows: 12500,
    columns: 32,
    size: '8.4 MB',
    format: 'JSON',
    lastUpdated: '2 weeks ago',
    createdBy: 'Alice Williams',
    status: 'processed',
  },
  {
    id: '6',
    name: 'User Interactions',
    description: 'User-product interaction data',
    project: 'Product Recommendation Engine',
    rows: 245000,
    columns: 8,
    size: '18.2 MB',
    format: 'CSV',
    lastUpdated: '3 days ago',
    createdBy: 'David Brown',
    status: 'processing',
  },
  {
    id: '7',
    name: 'Sales Data Q2',
    description: 'Quarterly sales data by region and product',
    project: 'Price Optimization',
    rows: 8750,
    columns: 15,
    size: '3.1 MB',
    format: 'Excel',
    lastUpdated: '4 days ago',
    createdBy: 'Jane Smith',
    status: 'processed',
  },
];

const Datasets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  
  // Filter datasets based on search term, status filter, and format filter
  const filteredDatasets = mockDatasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dataset.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dataset.status === statusFilter;
    const matchesFormat = formatFilter === 'all' || dataset.format.toLowerCase() === formatFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesFormat;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Datasets</h1>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="-ml-1 mr-2 h-5 w-5" />
            Upload Dataset
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
              placeholder="Search datasets"
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
                        setStatusFilter('processed');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Processed
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setStatusFilter('processing');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Processing
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
                  id="format-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                >
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  Format: {formatFilter === 'all' ? 'All' : formatFilter}
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {/* Dropdown menu for format filter */}
              {showFormatDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="format-filter">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setFormatFilter('all');
                        setShowFormatDropdown(false);
                      }}
                    >
                      All
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setFormatFilter('CSV');
                        setShowFormatDropdown(false);
                      }}
                    >
                      CSV
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setFormatFilter('JSON');
                        setShowFormatDropdown(false);
                      }}
                    >
                      JSON
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        setFormatFilter('Excel');
                        setShowFormatDropdown(false);
                      }}
                    >
                      Excel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Datasets list */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredDatasets.length > 0 ? (
              filteredDatasets.map((dataset) => (
                <li key={dataset.id}>
                  <Link to={`/datasets/${dataset.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md ${
                            dataset.status === 'processed' ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            <Database className={`h-5 w-5 ${
                              dataset.status === 'processed' ? 'text-green-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600 truncate">{dataset.name}</p>
                            <p className="mt-1 text-sm text-gray-500 truncate">{dataset.description}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            dataset.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Table className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {dataset.rows.toLocaleString()} rows × {dataset.columns} columns
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {dataset.format} • {dataset.size}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            Updated {dataset.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="text-gray-500">
                          Project: {dataset.project}
                        </div>
                        <div>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No datasets found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by uploading a new dataset.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Upload className="-ml-1 mr-2 h-5 w-5" />
                    Upload Dataset
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Upload Dataset Modal */}
      {showUploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowUploadModal(false)}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowUploadModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Upload dataset</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Upload a CSV, Excel, or JSON file to create a new dataset.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="dataset-name" className="block text-sm font-medium text-gray-700">
                      Dataset name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="dataset-name"
                        id="dataset-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter dataset name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="dataset-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="dataset-description"
                        name="dataset-description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your dataset"
                      ></textarea>
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
                      >
                        <option value="">Select a project</option>
                        <option value="1">Customer Churn Prediction</option>
                        <option value="2">Fraud Detection System</option>
                        <option value="3">Product Recommendation Engine</option>
                        <option value="4">Price Optimization</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      File
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          CSV, Excel, or JSON up to 50MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="process-immediately"
                          name="process-immediately"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="process-immediately" className="font-medium text-gray-700">
                          Process immediately
                        </label>
                        <p className="text-gray-500">
                          Start processing the dataset as soon as it's uploaded.
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
                  onClick={() => setShowUploadModal(false)}
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowUploadModal(false)}
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

export default Datasets;