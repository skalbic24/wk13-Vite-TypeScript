/* rework your CRD app from last week to use Vite and Typescript:
1.Create a new Vite Project
    -Vanilla 
    -TypeScript
2.Copy the CRD app code into the new project
3.Fix any Typerscript types errors
4.Separate the code into multiple files
5.Testing
   -Here are the other requirements:
   -It should run with the Vite command "npm run dev"
   -It should be written in TypeScript
   -It should have no type errors
   -There should be at least 3 Typescript .ts files that use import and export to work together
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMovies, postMovie, updateMovie, deleteMovie } from './services/MovieService';
import { Movie } from './components/MovieCard';
import { MovieList } from './components/MovieList';

class MovieReviews {
    private movieList: MovieList;
    private lastAddedMovie: Movie | null;

    constructor() {
        this.movieList = new MovieList('results'); // Initialize movie list
        this.lastAddedMovie = null; // Track last added movie
    }

    async initApp() {
        const searchBar = document.getElementById('searchBar') as HTMLInputElement;
        const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
        const updateButton = document.getElementById('updateLastAdded') as HTMLButtonElement;
        const deleteButton = document.getElementById('deleteLastAdded') as HTMLButtonElement;

        searchButton.addEventListener('click', async () => {
            const searchTerm = searchBar.value.trim();
            console.log('Button clicked, search term:', searchTerm);
            if (searchTerm) {
                const newMovie: Omit<Movie, 'id'> = {
                    Title: searchTerm,
                    Year: 2024, // Example year
                    Poster: 'https://via.placeholder.com/300', // Placeholder image
                };
                console.log('New movie object:', newMovie);
                try {
                    const addedMovie = await postMovie(newMovie); // Add movie to the database
                    this.lastAddedMovie = addedMovie; // Set the last added movie correctly
                    searchBar.value = ''; // Clear input
                    this.fetchMovies(); // Refresh the movie list
                } catch (error) {
                    console.error('Error adding movie:', error);
                }
            } else {
                console.log('Please enter a movie title.');
            }
        });

        updateButton.addEventListener('click', async () => {
            if (this.lastAddedMovie) {
                // Create an updated movie object
                const updatedMovie: Movie = {
                    ...this.lastAddedMovie,
                    Title: 'Updated Movie Title', // Change the title to your desired update
                    Year: this.lastAddedMovie.Year // Keep other properties the same or modify as needed
                };
        
                console.log('Updating movie:', updatedMovie); // Log the movie being updated
        
                try {
                    await updateMovie(this.lastAddedMovie.id, updatedMovie); // Call updateMovie function
                    this.fetchMovies(); // Refresh the movie list to see the update
                } catch (error) {
                    console.error('Error updating movie:', error);
                }
            } else {
                console.log('No movie to update.');
            }
        });

        deleteButton.addEventListener('click', async () => {
            if (this.lastAddedMovie) {
                await deleteMovie(this.lastAddedMovie.id); // Delete the movie
                this.lastAddedMovie = null; // Clear the last added movie
                this.fetchMovies(); // Refresh the movie list
            } else {
                console.log('No movie to delete.');
            }
        });

        this.fetchMovies(); // Initial fetch of movies
    }

    async fetchMovies() {
        try {
            console.log('Fetching movies...');
            const movies = await fetchMovies(); // Fetch movies from the server
            console.log('Fetched movies:', movies); // Log fetched movies
            this.movieList.render(movies); // Render the movie list
            if (movies.length > 0) {
                this.lastAddedMovie = movies[movies.length - 1]; // Track the last added movie
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
}

const app = new MovieReviews();
app.initApp(); // Initialize the application