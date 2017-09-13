$(document).ready(function(){
	$('#searchForm').on('submit', function(e){
		let searchText = $('#searchText').val();
		//console.log($('#searchText').val());
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText){
	/*axios.get('http://www.omdbapi.com?s='+searchText)
		.then(function(){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});*/

	axios.get('https://api.themoviedb.org/3/search/movie?api_key=7fa43255cc4168cfdf08da2a1b3eeafd&language=en-US&page=1&include_adult=false&query='+searchText)
		.then(function(response){
			console.log(response);
			let movies = response.data.results;
			let output = '';
			$(response.data.results).each(function(index, movie){
				if (movie.poster_path != null){
					output += `
						<div class="col-md-3">
							<div class="well text-center">
								<img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}">
								<h5>${movie.title}</h5>
								<a onclick="getMovie('${movie}')" class = "btn btn-primary" href="#">Movie Details</a>
							</div>
						</div>
					`;
				}
			});

			$('#movies').html(output);
		})
		.catch(function(error){
			console.log(error);
		});
}

function movieSelected(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}

function getMovie(info){
	console.log('1');
	window.location = 'movie.html';
	
	let movie = info;

    let output =`
    	<div class="row">
        	<div class="col-md-4">
            	<img src="${movie.Poster}" class="thumbnail">
          	</div>
          	<div class="col-md-8">
            	<h2>${movie.Title}</h2>
            	<ul class="list-group">
              		<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              		<li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              		<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              		<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              		<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              		<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              		<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            	</ul>
          	</div>
        </div>
        <div class="row">
          	<div class="well">
            	<h3>Plot</h3>
            	${movie.Plot}
            	<hr>
            	<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            	<a href="index.html" class="btn btn-default">Go Back To Search</a>
          	</div>
        </div>
    `;

    $('#movie').html(output);

    //return false;
}