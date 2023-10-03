var movie = localStorage.getItem("title")
var movieDiv = document.querySelector(".movie-details")

movieDiv.innerHTML = ""
//make changes here for bulma/css or any additions or subtractions to the html for the cards
var genDetails = (movieInfo) =>{
    return `<div class = "image is-128x128">
                <img src="https://image.tmdb.org/t/p/original${movieInfo.poster_path}" alt="${movieInfo.title} poster">
            </div>
            <div class="movie-description">
                <h2>${movieInfo.title}</h2>
                <p>${movieInfo.overview}</p>
            </div>`
}

function init () {    
    var movieData = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=5535f86488fe8a8a5507b13f60959e68`
    fetch(movieData).then(response => response.json()).then(data => {
        console.log(data)
        var movieInfo = data.results[0]
        var generator =genDetails(movieInfo)
        movieDiv.insertAdjacentHTML("beforeend", generator)
     })
}

init()
