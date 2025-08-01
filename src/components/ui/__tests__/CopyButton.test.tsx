import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CopyButton } from '../CopyButton';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';

// Mock the useCopyToClipboard hook
vi.mock('@hooks/useCopyToClipboard');

describe('CopyButton', () => {
  const mockCopy = vi.fn();

  beforeEach(() => {
    (useCopyToClipboard as jest.Mock).mockReturnValue({
      copied: false,
      copy: mockCopy,
    });
  });

  it('should render with the default text "Copy"', () => {
    render(<CopyButton textToCopy="test" />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should call the copy function with the correct text on click', () => {
    const textToCopy = 'Hello, World!';
    render(<CopyButton textToCopy={textToCopy} />);
    fireEvent.click(screen.getByText('Copy'));
    expect(mockCopy).toHaveBeenCalledWith(textToCopy);
  });

  it('should display "Copied!" when the copied state is true', () => {
    (useCopyToClipboard as jest.Mock).mockReturnValue({
      copied: true,
      copy: mockCopy,
    });
    render(<CopyButton textToCopy="test" />);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });
});
