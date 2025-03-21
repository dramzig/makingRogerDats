import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  CreditCard, 
  DollarSign, 
  Clock, 
  Server, 
  Database, 
  BarChart3,
  Plus,
  Check,
  ArrowRight
} from 'lucide-react';

// Mock credit packages
const creditPackages = [
  { id: '1', name: 'Starter', credits: 100, price: 10, popular: false },
  { id: '2', name: 'Professional', credits: 500, price: 45, popular: true },
  { id: '3', name: 'Enterprise', credits: 2000, price: 160, popular: false },
];

// Mock credit usage history
const usageHistory = [
  { id: '1', date: '2023-11-15', type: 'Compute', description: 'Model training: Feature Engineered GB', credits: -25, project: 'Customer Churn Prediction' },
  { id: '2', date: '2023-11-14', type: 'Storage', description: 'Dataset storage: Customer Data Q2', credits: -2, project: 'Customer Churn Prediction' },
  { id: '3', date: '2023-11-12', type: 'API', description: 'Prediction API calls', credits: -8, project: 'Fraud Detection System' },
  { id: '4', date: '2023-11-10', type: 'Purchase', description: 'Credit package: Professional', credits: 500, project: null },
  { id: '5', date: '2023-11-05', type: 'Compute', description: 'Model training: Random Forest', credits: -18, project: 'Fraud Detection System' },
  { id: '6', date: '2023-11-01', type: 'Storage', description: 'Dataset storage: Fraud Transactions', credits: -1, project: 'Fraud Detection System' },
];

const Credits: React.FC = () => {
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Calculate usage statistics
  const totalUsed = usageHistory
    .filter(item => item.credits < 0)
    .reduce((sum, item) => sum + Math.abs(item.credits), 0);
  
  const computeUsage = usageHistory
    .filter(item => item.type === 'Compute')
    .reduce((sum, item) => sum + Math.abs(item.credits), 0);
  
  const storageUsage = usageHistory
    .filter(item => item.type === 'Storage')
    .reduce((sum, item) => sum + Math.abs(item.credits), 0);
  
  const apiUsage = usageHistory
    .filter(item => item.type === 'API')
    .reduce((sum, item) => sum + Math.abs(item.credits), 0);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Credits</h1>
          <button
            type="button"
            onClick={() => setShowPurchaseModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Buy Credits
          </button>
        </div>
        
        {/* Credit balance */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100">
                <CreditCard className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Credit Balance</h2>
                <p className="text-3xl font-bold text-indigo-600">{user?.credits} credits</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => setShowPurchaseModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Buy Credits
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-md p-2">
                  <Server className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Compute</p>
                  <p className="text-lg font-bold text-gray-900">{computeUsage} credits</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-md p-2">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Storage</p>
                  <p className="text-lg font-bold text-gray-900">{storageUsage} credits</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-md p-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">API Calls</p>
                  <p className="text-lg font-bold text-gray-900">{apiUsage} credits</p>
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
        
        {/* Credit usage history */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Credit Usage History</h2>
          </div>
          <div className="px-6 py-5">
            <ul className="divide-y divide-gray-200">
              {usageHistory.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md ${
                        item.type === 'Compute' ? 'bg-blue-100' : 
                        item.type === 'Storage' ? 'bg-green-100' : 
                        item.type === 'API' ? 'bg-purple-100' : 'bg-yellow-100'
                      }`}>
                        {item.type === 'Compute' && <Server className="h-5 w-5 text-blue-600" />}
                        {item.type === 'Storage' && <Database className="h-5 w-5 text-green-600" />}
                        {item.type === 'API' && <BarChart3 className="h-5 w-5 text-purple-600" />}
                        {item.type === 'Purchase' && <DollarSign className="h-5 w-5 text-yellow-600" />}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.description}</p>
                        {item.project && (
                          <p className="text-xs text-gray-500">Project: {item.project}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 text-right">
                        <p className={`text-sm font-medium ${
                          item.credits > 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {item.credits > 0 ? '+' : ''}{item.credits} credits
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Credit pricing */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Credit Pricing</h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {creditPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`border rounded-lg p-6 ${
                    pkg.popular ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' : 'border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                  <p className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                    <span className="ml-1 text-sm text-gray-500">USD</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {pkg.credits} credits
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    ${(pkg.price / pkg.credits).toFixed(2)} per credit
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      setShowPurchaseModal(true);
                    }}
                    className={`mt-6 w-full inline-flex justify-center items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      pkg.popular 
                        ? 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700' 
                        : 'border-gray-300 text-indigo-600 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => window.open('/login', '_blank')}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Credit usage rates */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Credit Usage Rates</h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-md p-2">
                    <Server className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Compute</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.large</span>
                    <span className="font-medium text-gray-900">2 credits/hour</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.xlarge</span>
                    <span className="font-medium text-gray-900">4 credits/hour</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.2xlarge</span>
                    <span className="font-medium text-gray-900">8 credits/hour</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.4xlarge</span>
                    <span className="font-medium text-gray-900">16 credits/hour</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.8xlarge</span>
                    <span className="font-medium text-gray-900">32 credits/hour</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">m5.12xlarge</span>
                    <span className="font-medium text-gray-900">48 credits/hour</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-md p-2">
                    <Database className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Storage</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Dataset storage</span>
                    <span className="font-medium text-gray-900">0.5 credits/GB/month</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Model storage</span>
                    <span className="font-medium text-gray-900">1 credit/GB/month</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Experiment results</span>
                    <span className="font-medium text-gray-900">0.2 credits/GB/month</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Prediction results</span>
                    <span className="font-medium text-gray-900">0.3 credits/GB/month</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-md p-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">API Calls</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Prediction API</span>
                    <span className="font-medium text-gray-900">0.01 credits/call</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Batch prediction</span>
                    <span className="font-medium text-gray-900">1 credit/1000 records</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Model monitoring</span>
                    <span className="font-medium text-gray-900">5 credits/model/month</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowPurchaseModal(false)}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Purchase Credits</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select a credit package to purchase.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {creditPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`border rounded-lg p-4 cursor-pointer ${
                        selectedPackage === pkg.id 
                          ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50 bg-indigo-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {selectedPackage === pkg.id ? (
                            <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                            <p className="text-xs text-gray-500">{pkg.credits} credits</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${pkg.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Selected package</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedPackage ? creditPackages.find(p => p.id === selectedPackage)?.name : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">Credits</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedPackage ? creditPackages.find(p => p.id === selectedPackage)?.credits : 0}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${selectedPackage ? creditPackages.find(p => p.id === selectedPackage)?.price : 0}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="card-number"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                        Expiration
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="expiration"
                          id="expiration"
                          placeholder="MM/YY"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          placeholder="123"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowPurchaseModal(false)}
                  disabled={!selectedPackage}
                >
                  Purchase
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowPurchaseModal(false)}
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

export default Credits;