export interface Movie {
    Title: string;
    Year: number; 
    Poster: string;
    id: number; 
}

export function createMovieCard(movie: Movie): HTMLElement {
    const card = document.createElement('div');
    const poster = document.createElement('img');
    const info = document.createElement('h5');

    card.setAttribute('class', 'card');
    poster.setAttribute('class', 'poster');
    poster.src = movie.Poster;
    info.innerText = `${movie.Title} (${movie.Year})`;

    card.appendChild(poster);
    card.appendChild(info);
    
    return card;
}