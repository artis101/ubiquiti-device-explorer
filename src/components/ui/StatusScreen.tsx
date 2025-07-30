
import React from 'react';

interface StatusScreenProps {
  status: 'loading' | 'error';
  title: string;
  message: string;
  onRetry?: () => void;
}

export function StatusScreen({ status, title, message, onRetry }: StatusScreenProps) {
  const isError = status === 'error';

  const icon = isError ? (
    <svg
      className="h-8 w-8 text-red-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ) : (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <div className="text-center">
          <div
            className={`w-16 h-16 ${isError ? 'bg-red-100' : 'bg-blue-600'} rounded-full flex items-center justify-center mx-auto mb-4"`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="text-gray-600 mb-6">
            <p>{message}</p>
          </div>
          {isError && onRetry && (
            <button
              onClick={onRetry}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
