import { render, screen } from '@testing-library/react';
import MovieDetailsCard from '../../components/movei/movei-details-card';

describe('MovieDetailsCard Component', () => {
  const movie = {
    title: 'Inception',
    year: 2010,
    description: 'A mind-bending thriller.',
  };

  test('renders movie title and description', () => {
    render(<MovieDetailsCard movie={movie} />);

    // Check if the movie title and description are rendered
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('A mind-bending thriller.')).toBeInTheDocument();
  });
});
