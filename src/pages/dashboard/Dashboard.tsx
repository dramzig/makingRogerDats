import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FolderKanban, 
  Database, 
  Beaker, 
  Brain, 
  BarChart3, 
  Server, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for the dashboard
  const stats = [
    { name: 'Active Projects', value: 12, icon: FolderKanban, color: 'bg-blue-500' },
    { name: 'Datasets', value: 48, icon: Database, color: 'bg-green-500' },
    { name: 'Experiments', value: 36, icon: Beaker, color: 'bg-purple-500' },
    { name: 'Trained Models', value: 24, icon: Brain, color: 'bg-indigo-500' },
  ];

  const recentActivity = [
    { id: 1, type: 'model', name: 'Customer Churn Predictor', status: 'Training completed', time: '2 hours ago' },
    { id: 2, type: 'dataset', name: 'Sales Data Q2', status: 'Processing completed', time: '5 hours ago' },
    { id: 3, type: 'experiment', name: 'Price Optimization', status: 'Started', time: '1 day ago' },
    { id: 4, type: 'project', name: 'Fraud Detection System', status: 'Created', time: '2 days ago' },
  ];

  const activeInstances = [
    { id: 1, name: 'Data Processing', type: 'm5.12xlarge', status: 'Running', time: '1h 23m', cost: 4.5 },
    { id: 2, name: 'Model Training', type: 'm5.8xlarge', status: 'Running', time: '45m', cost: 2.1 },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div>
            <span className="mr-2 text-sm text-gray-500">Welcome back,</span>
            <span className="font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to={`/${stat.name.toLowerCase().replace(' ', '-')}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Server Instances */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Active Server Instances</h2>
              <Link to="/server-instances" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </Link>
            </div>
            <div className="p-5">
              {activeInstances.length > 0 ? (
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {activeInstances.map((instance) => (
                      <li key={instance.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-indigo-100 rounded-md p-2">
                              <Server className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{instance.name}</p>
                              <p className="text-sm text-gray-500">{instance.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4 text-right">
                              <p className="text-sm font-medium text-gray-900">{instance.status}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {instance.time}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">${instance.cost.toFixed(2)}</p>
                              <p className="text-xs text-gray-500">per hour</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Server className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No active instances</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start a new server instance to process data or train models.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/server-instances"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="-ml-1 mr-2 h-5 w-5" />
                      New Instance
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-5">
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              {activity.type === 'model' && <Brain className="h-5 w-5 text-indigo-600" />}
                              {activity.type === 'dataset' && <Database className="h-5 w-5 text-green-600" />}
                              {activity.type === 'experiment' && <Beaker className="h-5 w-5 text-purple-600" />}
                              {activity.type === 'project' && <FolderKanban className="h-5 w-5 text-blue-600" />}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900">
                                  {activity.name}
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {activity.status}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Usage */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Credit Usage</h2>
            <Link to="/credits" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Buy more credits
            </Link>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{user?.credits} credits</p>
                <p className="text-sm text-gray-500">remaining in your account</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-700">Credits running low</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Usage this month</h3>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-md p-2">
                      <Server className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Compute</p>
                      <p className="text-lg font-bold text-gray-900">245 credits</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-md p-2">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Storage</p>
                      <p className="text-lg font-bold text-gray-900">78 credits</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-md p-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">API Calls</p>
                      <p className="text-lg font-bold text-gray-900">32 credits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Usage trend</h3>
              <div className="mt-2 h-24 bg-gray-50 rounded-lg flex items-end justify-between px-4 py-2">
                {/* Simplified chart representation */}
                {[35, 42, 28, 45, 55, 38, 60, 75, 58, 62, 48, 30].map((value, i) => (
                  <div 
                    key={i} 
                    className="w-4 bg-indigo-500 rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;