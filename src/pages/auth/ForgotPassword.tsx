import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (err) {
      setError('Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Reset your password</h3>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          {message}
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            We'll send you a link to reset your password.
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Sending reset link...
              </>
            ) : (
              'Send reset link'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;