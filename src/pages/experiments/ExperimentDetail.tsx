{/* Fix the unexpected closing parenthesis and provide proper structure */}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExperimentDetail: React.FC = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [showModelCompareModal, setShowModelCompareModal] = useState(false);

  // Mock experiment data
  const experiment = {
    models: [
      { id: '1', name: 'Random Forest', metrics: { accuracy: 0.85, precision: 0.83, recall: 0.82, f1: 0.83, auc: 0.89 } },
      { id: '2', name: 'XGBoost', metrics: { accuracy: 0.87, precision: 0.86, recall: 0.85, f1: 0.85, auc: 0.91 } },
      { id: '3', name: 'LightGBM', metrics: { accuracy: 0.86, precision: 0.84, recall: 0.83, f1: 0.84, auc: 0.90 } }
    ]
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {showModelCompareModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Compare Models</h3>
                    
                    {selectedModels.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200 mt-4">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Metric
                            </th>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <th key={model.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {model.name}
                                </th>
                              ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Accuracy
                            </td>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {model.metrics.accuracy.toFixed(2)}
                                </td>
                              ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Precision
                            </td>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {model.metrics.precision.toFixed(2)}
                                </td>
                              ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Recall
                            </td>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {model.metrics.recall.toFixed(2)}
                                </td>
                              ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              F1 Score
                            </td>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {model.metrics.f1.toFixed(2)}
                                </td>
                              ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              AUC
                            </td>
                            {experiment.models
                              .filter(model => selectedModels.includes(model.id))
                              .map(model => (
                                <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {model.metrics.auc.toFixed(2)}
                                </td>
                              ))}
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Select at least one model to compare
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setShowModelCompareModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentDetail;