$(document).ready(function () {
  // $.ajax({
  //   url: 'http://www.omdbapi.com/?apikey=1b229f84&s=' + $('#search-keyword').val(),
  //   success: (results) => {
  //     const movies = results.Search;
  //     let cards = ``;
  //     movies.forEach((movie) => {
  //       cards += `<div class="card group" >
  //                 <img src="${movie.Poster}" class="card-img" />
  //                 <div class="card-body">
  //                   <h5 class="card-title">${movie.Title}</h5>
  //                   <p class="card-text">${movie.Year}</p>
  //                   <a class="card-btn group-hover:-translate-y-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 transition-all duration-300" data-imdbid="${movie.imdbID}">Show details</a>
  //                 </div>
  //               </div>`;
  //     });
  //     $('.movies-container').html(cards);
  //     $('.card-btn').click(function () {
  //       setMoviesDetail($(this).data('imdbid'));
  //     });
  //   },
  //   error: (e) => {
  //     console.log(e);
  //   },
  // });

  $('#search-btn').click(async function () {
    const searchKeyword = $('#search-keyword').val();
    const movies = await getMovies(searchKeyword);
    showCards(movies);
  });

  function getMovies(searchKeyword) {
    return fetch('https://www.omdbapi.com/?apikey=1b229f84&s=' + searchKeyword)
      .then((response) => response.json())
      .then((data) => data.Search);
  }

  function showCards(movies) {
    let cards = '';
    movies.forEach((movie) => {
      cards += returnCards(movie);
    });
    $('#movies-container').html(cards);
  }

  function returnCards(movie) {
    return `<div class="card group" >
              <img src="${movie.Poster}" class="card-img" />
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}</p>
                <a class="card-btn group-hover:-translate-y-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 transition-all duration-300" data-imdbid="${movie.imdbID}">Show details</a>
              </div>
            </div>`;
  }

  $(document).click(async function (e) {
    if ($(e.target).hasClass('card-btn')) {
      const dataMovie = await getMovieDetail($(e.target).data('imdbid'));
      const movieDetail = returnMovieDetail(dataMovie);

      $('#detail').html(movieDetail);
      $('#movies-detail').attr('is-open', true);
      $('#backdrop').attr('is-open', true);
    } else if ($(e.target).hasClass('close-btn')) {
      $('#movies-detail').attr('is-open', false);
      $('#backdrop').attr('is-open', false);
      setTimeout(function () {
        $('#detail').empty();
      }, 500);
    }
  });

  function getMovieDetail(imdbid) {
    return fetch('https://www.omdbapi.com/?apikey=1b229f84&i=' + imdbid)
      .then((response) => response.json())
      .then((data) => data);
  }

  function returnMovieDetail(movieDetail) {
    return `<div id="movies-detail-container" class="fixed top-0 bottom-0 left-0 right-0 items-center justify-center flex">
              <div id="movies-detail" class="absolute flex bg-zinc-800 z-10">
                <div>
                  <img class="w-[20rem] object-cover" src="${movieDetail.Poster}" alt="${movieDetail.Title} Picture" />
                </div>
                <div class="p-4">
                  <ul class="w-[30rem]">
                    <li class="list-detail"><h4 class="font-semibold text-2xl mb-5">${movieDetail.Title} (${movieDetail.Year})</h4></li>
                    <li class="list-detail"><h4><strong class="underline">Director</strong> - ${movieDetail.Director}</h4></li>
                    <li class="list-detail"><h4><strong class="underline">Actors</strong> - ${movieDetail.Actors}</h4></li>
                    <li class="list-detail mb-5"><h4><strong class="underline">Writer</strong> - ${movieDetail.Writer}</h4></li>
                    <li class="list-detail"><h4><strong class="underline">Plot</strong> - <br> ${movieDetail.Plot}</h4></li>
                  </ul>
                </div>
                <a class="block close-btn absolute z-20 -top-4 -right-4 cursor-pointer bg-red-500 p-1">
                  <img src="image/logo/close-btn.svg" alt="close-btn" class="close-btn w-10" />
                </a>
              </div>
              <div id="backdrop" class="bg-zinc-900/60 z-0 absolute top-0 bottom-0 right-0 left-0"></div>
            </div>`;
  }
});
