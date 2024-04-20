const API_KEY = 'your_api_key_here';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `${API_URL}/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(API_URL + '/discover/movie?sort_by=popularity.desc');

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
}

form.addEventListener('submit', handleFormSubmit);

function showMovies(movies) {
    main.innerHTML = '';
    if (movies.length === 0) {
        main.innerHTML = '<h2>No movies found</h2>';
    } else {
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie;
            const movieEl = createMovieElement(title, poster_path, vote_average, overview);
            main.appendChild(movieEl);
        });
    }
}

function createMovieElement(title, posterPath, voteAverage, overview) {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img src="${IMG_PATH + posterPath}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(voteAverage)}">${voteAverage}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `;
    return movieEl;
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}
