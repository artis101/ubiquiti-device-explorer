import { StatusScreen } from './StatusScreen';

export function LoadingScreen() {
  return (
    <StatusScreen
      status="loading"
      title="Loading UIDB data..."
      message="Fetching device information"
    />
  );
}
