import { Movie, createMovieCard } from './MovieCard';

export class MovieList {
    private container: HTMLDivElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLDivElement;
    }

    render(movies: Movie[]): void {
        this.container.innerHTML = ''; // Clear previous results
        movies.forEach(movie => {
            const card = createMovieCard(movie);
            this.container.appendChild(card);
        });
    }
}