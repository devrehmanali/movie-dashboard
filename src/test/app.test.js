import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { vi } from 'vitest';
import App from '../App';

// Mock the custom hook `useFetchMovies` to simulate fetched data
vi.mock('./hooks/use-fetch-moveis/useFetchMoveis', () => ({
  useFetchMovies: vi.fn().mockReturnValue({
    movies: [
      { title: 'Inception', year: 2010, genre: ['Action', 'Sci-Fi'], description: 'A mind-bending thriller.' },
      { title: 'Interstellar', year: 2014, genre: ['Drama', 'Sci-Fi'], description: 'A space exploration drama.' },
      { title: 'The Dark Knight', year: 2008, genre: ['Action', 'Crime', 'Drama'], description: 'A superhero crime drama.' },
      { title: 'Avengers: Endgame', year: 2019, genre: ['Action', 'Sci-Fi', 'Adventure'], description: 'The epic conclusion to the Avengers saga.' },
    ],
    loading: false,
    error: null,
  }),
}));

describe('App Component', () => {
  test('renders movie list and movie details correctly', async () => {
    render(<App />);

    // Check if movie titles are displayed
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    expect(screen.getByText('Avengers: Endgame')).toBeInTheDocument();

    // Click on a movie to select it
    fireEvent.click(screen.getByText('Inception'));

    // Verify movie details are displayed after selection
    expect(screen.getByText('A mind-bending thriller.')).toBeInTheDocument();
  });

  test('renders loader when movies are being fetched', async () => {
    // Simulate loading state
    vi.mock('./hooks/use-fetch-moveis/useFetchMoveis', () => ({
      useFetchMovies: vi.fn().mockReturnValue({
        movies: [],
        loading: true,
        error: null,
      }),
    }));

    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument(); // Assuming we have a loader with a data-testid="loader"
  });

  test('filters movies by genre', async () => {
    render(<App />);

    // Select genre filter
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Sci-Fi' } });

    // Wait for the filtered list to update
    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
      expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
    });
  });

  test('searches for movies by title', async () => {
    render(<App />);

    // Type in the search input
    fireEvent.change(screen.getByPlaceholderText('Search by title'), { target: { value: 'Interstellar' } });

    // Verifying that the filtered result is shown
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.queryByText('Inception')).not.toBeInTheDocument();
  });

  test('changes page when pagination buttons are clicked', async () => {
    render(<App />);

    // Click on "Next" button for pagination
    fireEvent.click(screen.getByText('Next'));

    // Verify that pagination updates (if you have a current page indicator, verify it here)
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  test('displays an error message if there is an error fetching data', async () => {
    vi.mock('./hooks/use-fetch-moveis/useFetchMoveis', () => ({
      useFetchMovies: vi.fn().mockReturnValue({
        movies: [],
        loading: false,
        error: 'Error fetching data',
      }),
    }));

    render(<App />);
    expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
  });
});
