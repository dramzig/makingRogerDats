import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Brain, 
  ChevronRight, 
  Beaker, 
  BarChart3, 
  Clock, 
  User, 
  Settings, 
  Download, 
  CheckCircle,
  ArrowRight,
  Eye,
  X,
  FileText,
  Code,
  Server
} from 'lucide-react';

// Mock model data
const mockModel = {
  id: '7',
  name: 'Feature Engineered GB',
  description: 'Gradient boosting model with feature engineering for customer churn prediction',
  type: 'Gradient Boosting',
  framework: 'scikit-learn',
  version: '1.0.0',
  experiment: {
    id: '2',
    name: 'Feature Engineering'
  },
  project: {
    id: '1',
    name: 'Customer Churn Prediction'
  },
  metrics: {
    accuracy: 0.89,
    precision: 0.88,
    recall: 0.87,
    f1: 0.87,
    auc: 0.94,
    confusionMatrix: {
      truePositive: 1250,
      falsePositive: 170,
      trueNegative: 3450,
      falseNegative: 180
    }
  },
  hyperparameters: {
    n_estimators: 150,
    learning_rate: 0.1,
    max_depth: 8,
    subsample: 0.8,
    min_samples_split: 5,
    min_samples_leaf: 2,
    max_features: 'sqrt'
  },
  featureImportance: [
    { feature: 'tenure', importance: 0.25 },
    { feature: 'monthly_charges', importance: 0.20 },
    { feature: 'contract_type', importance: 0.15 },
    { feature: 'total_charges', importance: 0.12 },
    { feature: 'payment_method', importance: 0.10 },
    { feature: 'online_security', importance: 0.05 },
    { feature: 'tech_support', importance: 0.04 },
    { feature: 'internet_service', importance: 0.03 },
    { feature: 'online_backup', importance: 0.03 },
    { feature: 'paperless_billing', importance: 0.03 }
  ],
  status: 'production',
  createdAt: '2023-11-10T14:45:00Z',
  createdBy: 'John Doe',
  size: '6.2 MB',
  predictions: [
    { id: '1', name: 'July Predictions', records: 5240, createdAt: '2023-11-12T10:30:00Z' },
    { id: '2', name: 'August Predictions', records: 5380, createdAt: '2023-11-14T14:15:00Z' }
  ],
  deployments: [
    { 
      id: '1', 
      environment: 'production', 
      version: '1.0.0', 
      status: 'active', 
      deployedAt: '2023-11-11T09:30:00Z',
      endpoint: 'https://api.aiplatform.example/models/feature-engineered-gb/predict'
    }
  ],
  performanceOverTime: [
    { date: '2023-11-11', accuracy: 0.89, requests: 1200 },
    { date: '2023-11-12', accuracy: 0.88, requests: 1500 },
    { date: '2023-11-13', accuracy: 0.89, requests: 1800 },
    { date: '2023-11-14', accuracy: 0.87, requests: 2100 },
    { date: '2023-11-15', accuracy: 0.88, requests: 1900 }
  ]
};

const ModelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployEnvironment, setDeployEnvironment] = useState('production');
  const model = mockModel; // In a real app, you would fetch the model by ID
  
  // Calculate confusion matrix percentages
  const totalPredictions = 
    model.metrics.confusionMatrix.truePositive + 
    model.metrics.confusionMatrix.falsePositive + 
    model.metrics.confusionMatrix.trueNegative + 
    model.metrics.confusionMatrix.falseNegative;
  
  const tpPercent = (model.metrics.confusionMatrix.truePositive / totalPredictions * 100).toFixed(1);
  const fpPercent = (model.metrics.confusionMatrix.falsePositive / totalPredictions * 100).toFixed(1);
  const tnPercent = (model.metrics.confusionMatrix.trueNegative / totalPredictions * 100).toFixed(1);
  const fnPercent = (model.metrics.confusionMatrix.falseNegative / totalPredictions * 100).toFixed(1);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/models" className="hover:text-gray-700">Models</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-medium">{model.name}</span>
        </div>
        
        {/* Model header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-md">
              <Brain className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold text-gray-900">{model.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{model.description}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              model.status === 'production' ? 'bg-green-100 text-green-800' : 
              model.status === 'deployed' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {model.status === 'production' && <CheckCircle className="inline-block h-3 w-3 mr-1" />}
              {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
            </span>
            <button 
              onClick={() => setShowDeployModal(true)}
              className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowRight className="h-4 w-4 mr-1" />
              Deploy
            </button>
          </div>
        </div>
        
        {/* Model metadata */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <Beaker className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">
                Experiment: <Link to={`/experiments/${model.experiment.id}`} className="text-indigo-600 hover:text-indigo-500">{model.experiment.name}</Link>
              </span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Type: {model.type} ({model.framework})</span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Created: {new Date(model.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Created by: {model.createdBy}</span>
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
                activeTab === 'performance'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('performance')}
            >
              Performance
            </button>
            <button
              className={`${
                activeTab === 'features'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`${
                activeTab === 'deployments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('deployments')}
            >
              Deployments
            </button>
            <button
              className={`${
                activeTab === 'predictions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('predictions')}
            >
              Predictions
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Model summary */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Model Summary</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-md p-2">
                        <FolderKanban className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Project</p>
                        <Link to={`/projects/${model.project.id}`} className="text-lg font-bold text-indigo-600 hover:text-indigo-500">
                          {model.project.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-md p-2">
                        <Beaker className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Experiment</p>
                        <Link to={`/experiments/${model.experiment.id}`} className="text-lg font-bold text-indigo-600 hover:text-indigo-500">
                          {model.experiment.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Model Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.type}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Framework</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.framework}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Version</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.version}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Size</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.size}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                        <dd className="mt-1 text-sm text-gray-900">{new Date(model.createdAt).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Created By</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.createdBy}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            model.status === 'production' ? 'bg-green-100 text-green-800' : 
                            model.status === 'deployed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Predictions</dt>
                        <dd className="mt-1 text-sm text-gray-900">{model.predictions.length}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Performance Metrics</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Accuracy</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">{model.metrics.accuracy.toFixed(2)}</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Precision</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">{model.metrics.precision.toFixed(2)}</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Recall</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">{model.metrics.recall.toFixed(2)}</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">F1 Score</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">{model.metrics.f1.toFixed(2)}</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">AUC</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">{model.metrics.auc.toFixed(2)}</dd>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick actions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button 
                    onClick={() => setShowDeployModal(true)}
                    className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center"
                  >
                    <div className="bg-indigo-100 rounded-md p-2">
                      <ArrowRight className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">Deploy Model</p>
                      <p className="text-xs text-gray-500">Deploy this model to production</p>
                    </div>
                  </button>
                  <Link to="/predictions" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center">
                    <div className="bg-green-100 rounded-md p-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">Make Predictions</p>
                      <p className="text-xs text-gray-500">Use this model for predictions</p>
                    </div>
                  </Link>
                  <button className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex items-center">
                    <div className="bg-blue-100 rounded-md p-2">
                      <Download className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">Download Model</p>
                      <p className="text-xs text-gray-500">Download model artifacts</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Performance Metrics</h2>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Confusion Matrix</h3>
                <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-gray-900">True Positive</p>
                    <p className="text-2xl font-bold text-green-700">{model.metrics.confusionMatrix.truePositive}</p>
                    <p className="text-xs text-gray-500">{tpPercent}%</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-gray-900">False Positive</p>
                    <p className="text-2xl font-bold text-red-700">{model.metrics.confusionMatrix.falsePositive}</p>
                    <p className="text-xs text-gray-500">{fpPercent}%</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-gray-900">False Negative</p>
                    <p className="text-2xl font-bold text-red-700">{model.metrics.confusionMatrix.falseNegative}</p>
                    <p className="text-xs text-gray-500">{fnPercent}%</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-gray-900">True Negative</p>
                    <p className="text-2xl font-bold text-green-700">{model.metrics.confusionMatrix.trueNegative}</p>
                    <p className="text-xs text-gray-500">{tnPercent}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Metrics Over Time</h3>
                <div className="h-64 bg-gray-50 rounded-lg p-4">
                  {/* Simplified chart representation */}
                  <div className="h-full flex items-end space-x-8">
                    {model.performanceOverTime.map((point, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-indigo-500 rounded-t"
                          style={{ height: `${point.accuracy * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(point.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Accuracy over the last 5 days
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-indigo-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-700">Accuracy</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Detailed Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Accuracy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.metrics.accuracy.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Ratio of correctly predicted observations to the total observations
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Precision
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.metrics.precision.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Ratio of correctly predicted positive observations to the total predicted positives
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Recall
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.metrics.recall.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Ratio of correctly predicted positive observations to all actual positives
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          F1 Score
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.metrics.f1.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Weighted average of Precision and Recall
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          AUC
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.metrics.auc.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Area Under the ROC Curve, measures the model's ability to discriminate between classes
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Feature Importance</h2>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Feature Importance Ranking</h3>
                <div className="space-y-4">
                  {model.featureImportance.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-24">{feature.feature}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-indigo-600 h-3 rounded-full" 
                            style={{ width: `${feature.importance * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">{(feature.importance * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Hyperparameters</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(model.hyperparameters).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-sm text-gray-500">{key}:</dt>
                        <dd className="text-sm font-medium text-gray-900">{value.toString()}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Model Interpretation</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-4">
                    This gradient boosting model makes predictions primarily based on customer tenure, monthly charges, and contract type. 
                    Customers with longer tenure and longer contract terms are less likely to churn, while those with higher monthly charges 
                    are more likely to churn. Payment method is also a significant factor, with electronic payment methods associated with 
                    lower churn rates.
                  </p>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Insights:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Tenure is the most important predictor of churn (25% importance)</li>
                    <li>Monthly charges account for 20% of the model's predictive power</li>
                    <li>Contract type (15% importance) shows that month-to-month contracts have higher churn rates</li>
                    <li>Payment method (10% importance) indicates electronic payment methods correlate with lower churn</li>
                    <li>Online security and tech support services are moderately important features</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Deployments Tab */}
          {activeTab === 'deployments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Deployments</h2>
                <button 
                  onClick={() => setShowDeployModal(true)}
                  className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Deploy Model
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Active Deployments
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Currently active deployments of this model.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  {model.deployments.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {model.deployments.map((deployment) => (
                        <li key={deployment.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-md ${
                                deployment.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                <Server className={`h-5 w-5 ${
                                  deployment.status === 'active' ? 'text-green-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {deployment.environment.charAt(0).toUpperCase() + deployment.environment.slice(1)} Environment
                                </p>
                                <p className="text-xs text-gray-500">
                                  Version: {deployment.version} • Deployed: {new Date(deployment.deployedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                deployment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Code className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                                {deployment.endpoint}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-end space-x-2">
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Test Endpoint
                            </button>
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              View Logs
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-12 text-center">
                      <Server className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No deployments</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This model hasn't been deployed yet.
                      </p>
                      <div className="mt-6">
                        <button 
                          onClick={() => setShowDeployModal(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <ArrowRight className="-ml-1 mr-2 h-5 w-5" />
                          Deploy Model
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    API Usage
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Example code for using the model API.
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                  <pre>
{`# Python example
import requests
import json

url = "${model.deployments[0]?.endpoint || 'https://api.aiplatform.example/models/feature-engineered-gb/predict'}"
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}

data = {
  "features": {
    "tenure": 36,
    "monthly_charges": 89.95,
    "contract_type": "One year",
    "payment_method": "Credit card",
    "online_security": True,
    "tech_support": False
  }
}

response = requests.post(url, headers=headers, data=json.dumps(data)) 
if response.status_code == 200:
    prediction = response.json()
    print(f"Churn Prediction: {prediction['result']}")
    print(f"Probability: {prediction['probability']:.2f}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
`}</pre>
                </div>
              </div>
            </div>
          )}
          
          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Predictions</h2>
                <Link
                  to="/predictions"
                  className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  New Prediction
                </Link>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recent Predictions
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Predictions made using this model.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  {model.predictions.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {model.predictions.map((prediction) => (
                        <li key={prediction.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-md">
                                <BarChart3 className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {prediction.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {prediction.records.toLocaleString()} records • {new Date(prediction.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </button>
                              <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-12 text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No predictions</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        No predictions have been made with this model yet.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/predictions"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <BarChart3 className="-ml-1 mr-2 h-5 w-5" />
                          Make Predictions
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Deploy Model Modal */}
      {showDeployModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDeployModal(false)}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowDeployModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <ArrowRight className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Deploy Model
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Deploy this model to make it available for predictions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
                      Environment
                    </label>
                    <select
                      id="environment"
                      name="environment"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={deployEnvironment}
                      onChange={(e) => setDeployEnvironment(e.target.value)}
                    >
                      <option value="development">Development</option>
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="version" className="block text-sm font-medium text-gray-700">
                      Version
                    </label>
                    <input
                      type="text"
                      name="version"
                      id="version"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={model.version}
                      readOnly
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-md p-2">
                        <Server className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Compute Resources</p>
                        <p className="text-xs text-gray-500">
                          Select the compute resources for this deployment
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="instance-type" className="block text-sm font-medium text-gray-700">
                        Instance Type
                      </label>
                      <select
                        id="instance-type"
                        name="instance-type"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="t2.medium">t2.medium (2 vCPU, 4 GB RAM) - $0.05/hr</option>
                        <option value="t2.large">t2.large (2 vCPU, 8 GB RAM) - $0.09/hr</option>
                        <option value="t2.xlarge">t2.xlarge (4 vCPU, 16 GB RAM) - $0.18/hr</option>
                      </select>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="autoscaling" className="block text-sm font-medium text-gray-700">
                        Autoscaling
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          id="autoscaling"
                          name="autoscaling"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="autoscaling" className="ml-2 block text-sm text-gray-900">
                          Enable autoscaling
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Cost Estimate</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Per hour:</span>
                        <span className="font-medium text-gray-900">$0.05</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Per day:</span>
                        <span className="font-medium text-gray-900">$1.20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Per month:</span>
                        <span className="font-medium text-gray-900">$36.00</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500">Credits required:</span>
                        <span className="font-medium text-gray-900">1 credit/hour</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowDeployModal(false)}
                >
                  Deploy
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowDeployModal(false)}
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

export default ModelDetail;

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