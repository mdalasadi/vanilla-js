// Init TMDB
const tmdb = new TMDB();

// Fetch Movies
async function fetchMovies() {
  const movies = await tmdb.fetchMovies();
  // Display movies on DOM
  setTimeout(() => {
    UI.displayShowcase(movies.results[0]);
    UI.displayMoviesOnDOM(movies.results);
  }, 2000);
}

// EVENTS
// - Load movies
document.addEventListener('DOMContentLoaded', fetchMovies);

// - load movie details
document.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.parentElement.matches('[data-id]')) {
    const movieID = +e.target.parentElement.dataset.id;
    const movieDetails = await tmdb.movieDetails(movieID);
    const movieCredits = await tmdb.getCredits(movieID);
    const movieImages = await tmdb.getImages(movieID);

    // Display the movie's details
    UI.displayMovieDetail(movieDetails, movieCredits, movieImages);
  }
});

// - reload the page
document.querySelector('.logo').addEventListener('click', () => {
  window.location.reload();
});

// - Load more movies event
document.addEventListener('scroll', async (e) => {
  if (
    e.target.querySelector('.popular-movies-grid') &&
    window.innerHeight + window.scrollY - 47 > document.body.clientHeight
  ) {
    tmdb.setNextPageOfMovies();
    const movies = await tmdb.fetchMovies();
    setTimeout(() => {
      UI.displayNextPageOfMovies(movies.results);
    }, 500);
  }
});

// - Search for movies
document.addEventListener('keyup', async (e) => {
  if (e.target.matches('#search[type="search"]') && e.target.value.trim()) {
    const query = e.target.value.trim();
    const movies = await tmdb.searchForMovies(query);
    movies.results.length ? UI.displaySearchedMovies(movies.results) : null;
  }
})