export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading UIDB data...
        </h2>
        <p className="text-gray-600">Fetching device information</p>
      </div>
    </div>
  );
}