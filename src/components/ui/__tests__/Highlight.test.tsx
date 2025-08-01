import { render, screen } from '@testing-library/react';
import { Highlight } from '../Highlight';

describe('Highlight', () => {
  it('should render plain text when no indices are provided', () => {
    render(<Highlight text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.queryByRole('mark')).not.toBeInTheDocument();
  });

  it('should highlight a single match', () => {
    render(<Highlight text="Hello World" indices={[[6, 10]]} />);
    const highlighted = screen.getByRole('mark');
    expect(highlighted).toHaveTextContent('World');
  });

  it('should highlight multiple non-overlapping matches', () => {
    render(<Highlight text="Hello World" indices={[[0, 4], [6, 10]]} />);
    const highlighted = screen.getAllByRole('mark');
    expect(highlighted).toHaveLength(2);
    expect(highlighted[0]).toHaveTextContent('Hello');
    expect(highlighted[1]).toHaveTextContent('World');
  });

  it('should merge and highlight overlapping matches', () => {
    render(<Highlight text="Hello World" indices={[[0, 4], [2, 6]]} />);
    const highlighted = screen.getByRole('mark');
    expect(highlighted).toHaveTextContent('Hello W');
  });

  it('should handle matches at the beginning and end of the string', () => {
    render(<Highlight text="Hello World" indices={[[0, 4], [6, 10]]} />);
    const highlighted = screen.getAllByRole('mark');
    expect(highlighted[0]).toHaveTextContent('Hello');
    expect(highlighted[1]).toHaveTextContent('World');
  });
});
