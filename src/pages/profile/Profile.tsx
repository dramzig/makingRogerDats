import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  Check,
  X,
  Save,
  Loader2
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    modelTraining: true,
    dataProcessing: true,
    credits: true,
    marketing: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      // Show error
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Update profile
      await updateProfile({
        name: formData.name,
      });
      
      // In a real app, you would also update password and notification preferences
      
      setIsEditing(false);
    } catch (error) {
      // Handle error
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm text-gray-500">Update your account details and preferences.</p>
            </div>
            <div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                <div className="sm:col-span-6">
                  <div className="flex items-center">
                    <img
                      className="h-24 w-24 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    {isEditing && (
                      <div className="ml-5">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Change avatar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                      />
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <>
                    <div className="sm:col-span-6">
                      <h3 className="text-md font-medium text-gray-900">Change Password</h3>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current password
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New password
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm new password
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {isEditing && (
                  <div className="sm:col-span-6">
                    <h3 className="text-md font-medium text-gray-900">Notification Preferences</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose how you want to receive notifications.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email"
                            type="checkbox"
                            checked={notifications.email}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-gray-700">
                            Email notifications
                          </label>
                          <p className="text-gray-500">Receive notifications via email.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="browser-notifications"
                            name="browser"
                            type="checkbox"
                            checked={notifications.browser}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="browser-notifications" className="font-medium text-gray-700">
                            Browser notifications
                          </label>
                          <p className="text-gray-500">Receive browser notifications when you're online.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="model-training"
                            name="modelTraining"
                            type="checkbox"
                            checked={notifications.modelTraining}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="model-training" className="font-medium text-gray-700">
                            Model training events
                          </label>
                          <p className="text-gray-500">Get notified when your models start or finish training.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="data-processing"
                            name="dataProcessing"
                            type="checkbox"
                            checked={notifications.dataProcessing}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="data-processing" className="font-medium text-gray-700">
                            Data processing events
                          </label>
                          <p className="text-gray-500">Get notified when your data processing tasks complete.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="credits"
                            name="credits"
                            type="checkbox"
                            checked={notifications.credits}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="credits" className="font-medium text-gray-700">
                            Credit alerts
                          </label>
                          <p className="text-gray-500">Get notified when your credits are running low.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing"
                            name="marketing"
                            type="checkbox"
                            checked={notifications.marketing}
                            onChange={handleNotificationChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketing" className="font-medium text-gray-700">
                            Marketing communications
                          </label>
                          <p className="text-gray-500">Receive updates about new features and promotions.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {isEditing && (
                  <div className="sm:col-span-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
            <p className="mt-1 text-sm text-gray-500">View your account details and subscription information.</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Credit Balance</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{user?.credits} credits</span>
                  </div>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                <dd className="mt-1 text-sm text-gray-900">January 15, 2023</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">API Keys</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-mono">••••••••••••••••••••••••</span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Show
                    </button>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Regenerate API Key
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Danger Zone</h2>
            <p className="mt-1 text-sm text-gray-500">Irreversible actions for your account.</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LogOut className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-red-700">
                      Sign out from all devices
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <button
                        className="whitespace-nowrap font-medium text-red-700 hover:text-red-600"
                      >
                        Sign out
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-red-700">
                      Delete your account and all associated data
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <button
                        className="whitespace-nowrap font-medium text-red-700 hover:text-red-600"
                      >
                        Delete account
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;