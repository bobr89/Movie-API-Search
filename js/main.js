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
			let results = response.data.results;
			let output = '';
			$(response.data.results).each(function(index, movie){
				if (movie.poster_path != null){
					output += `
						<div class="col-md-3">
							<div class="well text-center">
								<img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}">
								<h5>${movie.title}</h5>
								<a onclick="getMovie(${movie})" class = "btn btn-primary" href="#">Movie Details</a>
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

function getMovie(info){
	//window.location = 'movie.html';
	console.log(info);
	
	let movie = info;

    let output =`
    	
    `;

    $('#movie').html(output);

    //return false;
}


function movieSelected(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}