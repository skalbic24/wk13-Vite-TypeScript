import { Movie } from '../components/MovieCard';

const url = `http://localhost:3000/`;

/**
 * Fetches all movies from the server.
 */
export async function fetchMovies(): Promise<Movie[]> {
    const res = await fetch(url + "movies");
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json(); // Ensure this returns an array of Movie objects
}

/**
 * Posts a new movie to the server.
 */
export async function postMovie(movie: Omit<Movie, 'id'>): Promise<Movie> {
    const response = await fetch(url + "movies", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
    });

    if (!response.ok) throw new Error('Error adding movie');
    return await response.json();
}

/**
 * Updates an existing movie on the server.
 */
export async function updateMovie(id: number, updatedMovie: Movie): Promise<void> {
    const response = await fetch(`${url}movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
        const errorText = await response.text(); // Log the error response for debugging
        console.error('Failed to update movie:', errorText);
        throw new Error('Error updating movie');
    }
}

/**
 * Deletes a movie from the server.
 */
export async function deleteMovie(id: number): Promise<void> {
    const response = await fetch(`${url}movies/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error deleting movie');
}