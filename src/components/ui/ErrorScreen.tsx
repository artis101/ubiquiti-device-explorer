import { StatusScreen } from './StatusScreen';

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <StatusScreen
      status="error"
      title="Failed to load UIDB data"
      message={error}
      onRetry={onRetry}
    />
  );
}
