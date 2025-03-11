import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Calendar,
  Users,
  Clock
} from 'lucide-react';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    name: 'Customer Churn Prediction',
    description: 'Predict which customers are likely to cancel their subscription',
    datasets: 3,
    experiments: 5,
    models: 2,
    status: 'active',
    lastUpdated: '2 days ago',
    createdBy: 'John Doe',
    team: ['John Doe', 'Jane Smith', 'Robert Johnson'],
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    name: 'Fraud Detection System',
    description: 'Identify fraudulent transactions in real-time',
    datasets: 2,
    experiments: 8,
    models: 3,
    status: 'active',
    lastUpdated: '5 hours ago',
    createdBy: 'Jane Smith',
    team: ['Jane Smith', 'Robert Johnson'],
    createdAt: '2023-11-02',
  },
  {
    id: '3',
    name: 'Product Recommendation Engine',
    description: 'Personalized product recommendations based on user behavior',
    datasets: 5,
    experiments: 12,
    models: 4,
    status: 'active',
    lastUpdated: '1 week ago',
    createdBy: 'Robert Johnson',
    team: ['Robert Johnson', 'John Doe', 'Alice Williams', 'David Brown'],
    createdAt: '2023-09-28',
  },
  {
    id: '4',
    name: 'Price Optimization',
    description: 'Optimize pricing strategy for maximum revenue',
    datasets: 2,
    experiments: 6,
    models: 1,
    status: 'archived',
    lastUpdated: '3 weeks ago',
    createdBy: 'Alice Williams',
    team: ['Alice Williams', 'David Brown'],
    createdAt: '2023-08-15',
  },
  {
    id: '5',
    name: 'Customer Segmentation',
    description: 'Group customers based on behavior and preferences',
    datasets: 1,
    experiments: 3,
    models: 2,
    status: 'active',
    lastUpdated: '4 days ago',
    createdBy: 'David Brown',
    team: ['David Brown', 'John Doe'],
    createdAt: '2023-10-05',
  },
];

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Filter projects based on search term and status filter
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Project
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
              placeholder="Search projects"
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
                >
                  <Filter className="mr-2 h-5 w-5 text-gray-400" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              {/* Dropdown menu for status filter */}
              <div className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="status-filter">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    onClick={() => setStatusFilter('archived')}
                  >
                    Archived
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects list */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <li key={project.id}>
                  <Link to={`/projects/${project.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-md ${project.status === 'active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <FolderKanban className={`h-6 w-6 ${project.status === 'active' ? 'text-green-600' : 'text-gray-600'}`} />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600 truncate">{project.name}</p>
                            <p className="mt-1 text-sm text-gray-500 truncate">{project.description}</p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {project.team.length} team members
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            Created on {project.createdAt}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            Updated {project.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="flex space-x-4">
                          <span className="text-gray-500">{project.datasets} Datasets</span>
                          <span className="text-gray-500">{project.experiments} Experiments</span>
                          <span className="text-gray-500">{project.models} Models</span>
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
                <FolderKanban className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new project.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Project
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <FolderKanban className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create new project</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a new project to organize your datasets, experiments, and models.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                      Project name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="project-name"
                        id="project-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter project name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="project-description"
                        name="project-description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your project"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="team-members" className="block text-sm font-medium text-gray-700">
                      Team members
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="team-members"
                        id="team-members"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Add team members by email"
                      />
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Create
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

export default Projects;