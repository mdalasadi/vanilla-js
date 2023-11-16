class UI {
  static displayShowcase(movie) {
    const showCase = document.createElement('section');
    showCase.id = 'backdrop_path';
    const bg = `background: url('${
      movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        : 'assets/images/no-image.png'
    }') no-repeat center center/cover`;
    showCase.setAttribute('style', bg);
    showCase.innerHTML = `
      <div class="container movie-story">
        <div>
          <h1>${movie.title}</h1>
          <p>${movie.overview}</p>
        </div>
      </div>
    `;

    document.getElementById('header').append(showCase);
  }

  static displayMoviesOnDOM(movies) {
    const moviesGrid = document.createElement('section');
    moviesGrid.id = 'home-b';
    moviesGrid.innerHTML = `
      <div class="container">
        <h2 class="title">Popular Movies</h2>
        <div class="popular-movies-grid">
          ${movies
            .map((movie) => {
              return `<div>
              <a href="#" data-id=${movie.id}>
                <img src="${
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    : 'assets/images/no-image.png'
                }" alt="${movie.title}" width="150">
              </a>
            </div>`;
            })
            .join('')}
        </div>
      </div>
    `;

    const searchSection = `
    <section id="home-a">
      <div class="container">
        <div class="search">
          <i class="fas fa-search"></i>
          <input type="search" id="search" placeholder="Search for a movie...">
        </div>
      </div>
    </section>
    `;

    document.getElementById('main').insertAdjacentElement('afterbegin', moviesGrid);
    document.getElementById('main').insertAdjacentHTML('afterbegin', searchSection);
  }

  static displayNextPageOfMovies(movies) {
    const moreMovies = movies
      .map((movie) => {
        return `<div>
            <a href="#" data-id=${movie.id}>
              <img src="${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : 'assets/images/no-image.png'
              }" alt="${movie.title}" width="150">
            </a>
        </div>`;
      })
      .join('');
    document.querySelector('.popular-movies-grid').insertAdjacentHTML('beforeend', moreMovies);
  }

  static formatMoney(money) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(money);
  }

  static displayMovieDetail(movie, credits, images) {
    const director = credits.crew.filter((current) => current.job === 'Director')[0].name;
    const showCase = document.createElement('section');
    showCase.id = 'movie-showcase';
    const bg = `background: url('${
      images.backdrops.length
        ? `https://image.tmdb.org/t/p/original/${
            images.backdrops[Math.floor(Math.random() * images.backdrops.length)].file_path
          }`
        : 'assets/images/no-image.png'
    }') no-repeat center center/cover`;
    showCase.setAttribute('style', bg);

    showCase.innerHTML = `
      <div class="container movie-card">
        <img src="${
          images.posters.length
            ? `https://image.tmdb.org/t/p/original/${
                images.posters[Math.floor(Math.random() * images.posters.length)].file_path
              }`
            : 'assets/images/no-image.png'
        }" alt="" width="150">
        <div>
          <h1 class="movie-title">${movie.title}<span>(${movie.status})</span></h1>
          <h3>PlOT</h3>
          <p class="movie-desc">${movie.overview}</p>
          <small>GENRES:</small>
          <ul class="genres">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
          </ul>
          <small>IMDB RATING:</small>
          <div class="rating">
            <div style="width: ${movie.vote_average * 10}%;"><span>${
      movie.vote_average
    }</span></div>
          </div>
          <h5 class="director">DIRECTOR: <span class="director-name">${director}</span></h5>
        </div>
      </div>
    `;

    const movieBar = `
    <section id="movie-a">
      <div class="container">
        <div class="detail">
          <div>
            <i class="fas fa-clock fa-2x"></i>
            <h3>Running Time: <span>${Math.trunc(movie.runtime / 60)}h ${
      movie.runtime % 60
    }m</span></h3>
          </div>
          <div>
            <i class="fas fa-money-bill-alt fa-2x"></i>
            <h3>Budget: <span>${this.formatMoney(movie.budget)}</span></h3>
          </div>
          <div>
            <i class="fas fa-ticket-alt fa-2x"></i>
            <h3>Revenue <span>${this.formatMoney(movie.revenue)}</span></h3>
          </div>
        </div>
      </div>
    </section>
    `;

    const movieCredits = `
    <section id="movie-b">
      <div class="container">
        <h2 class="title">Actors</h2>
        <div class="actors-grid">
          ${credits.cast
            .map((actor) => {
              return `<div>
              <img src="${
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                  : 'assets/images/no-image.png'
              }" alt="${actor.name}">
              <div>
                <h4>${actor.name}</h4>
                <h5>${actor.character}</h5>
              </div>
            </div>`;
            })
            .join('')}
        </div>
      </div>
    </section>
    `;

    document.getElementById('backdrop_path')
      ? document.getElementById('backdrop_path').remove()
      : null;
    document.getElementById('header').append(showCase);
    while (document.getElementById('main').firstChild) {
      document.getElementById('main').firstChild.remove();
    }
    document.getElementById('main').insertAdjacentHTML('afterbegin', movieBar);
    document.getElementById('main').insertAdjacentHTML('beforeend', movieCredits);
  }

  static displaySearchedMovies(movies) {
    const searchedMovies = movies
      .map((movie) => {
        return `<div>
          <a href="#" data-id=${movie.id}>
            <img src="${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : 'assets/images/no-image.png'
            }" alt="${movie.title}" width="150">
          </a>
      </div>`;
      })
      .join('');

    while (document.querySelector('.popular-movies-grid').firstChild) {
      document.querySelector('.popular-movies-grid').firstChild.remove();
    }
    document.querySelector('.popular-movies-grid').insertAdjacentHTML('beforeend', searchedMovies);
  }
}
