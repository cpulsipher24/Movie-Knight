console.log('Project 1');
var googleAPI = "AIzaSyDYfYSjUZu51mSR2k_mShQ61eObLzdWbOQ"
var omdbAPI = "5cce91e1"
var omdbURL = "http://www.omdbapi.com/?apikey="+omdbAPI+"&type=movie&plot=full"
var movieDB = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=5535f86488fe8a8a5507b13f60959e68'

var cardContainer = document.querySelector(".movie-cards")

console.log (omdbURL)

cardContainer.innerHTML = ""

//make changes here for bulma/css or any additions or subtractions to the html for the cards
var genCard = (movies) =>{
    return `<div class = "card has-background-black-ter text-lightish column is-one-quarter movies">
                <div class="card-image">
                    <figure class="image">
                        <img src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="${movies.title} poster">
                    </figure>
                </div>
                <header class = "card-header">
                    <p class = "card-header-title text-lightish">${movies.original_title}
                    </p>
                </header>
            </div>`                                          
}


function init () {
    fetch(movieDB).then(response => response.json()).then(data => {
        data.results.forEach(movies =>{
           getMovies=genCard(movies)
           cardContainer.insertAdjacentHTML("beforeend", getMovies)
           console.log(movies)
        })
        
    })
    
}

document.addEventListener('DOMContentLoaded', function () {    
    $(document).on('click', '.card', function (){
        var movie = this.children[1].textContent.split(/\s+/).join("+")
        console.log(movie)
        localStorage.setItem("title", movie)
        document.location.assign("./Assets/second_page.html")
                    
    })
})
init()