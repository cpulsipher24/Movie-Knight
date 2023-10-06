console.log('Project 1');
var googleAPI = "AIzaSyDYfYSjUZu51mSR2k_mShQ61eObLzdWbOQ"
var omdbAPI = "5cce91e1"
var omdbURL = "http://www.omdbapi.com/?apikey="+omdbAPI+"&type=movie&plot=full"
var movieDB = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=5535f86488fe8a8a5507b13f60959e68"
var cardContainer = document.querySelector(".movie-cards")
var sort = document.querySelector(".sort");


sort.addEventListener('change', function() {
    var selectedFilter = sort.value;
    sortAndPopulateMovies(selectedFilter);
});

sort.onchange = init

console.log (omdbURL)

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
                <footer>
                <p class = "card-header-title text-lightish">Viewer rating ${movies.vote_average}/10</p>
                </footer>
            </div>`                                          
}


function init () {
    cardContainer.innerHTML = ""
    fetch(movieDB).then(response => response.json()).then(data => {
        data.results.forEach(movies =>{
           getMovies=genCard(movies)
           cardContainer.insertAdjacentHTML("beforeend", getMovies)
           console.log(data.results)
        })
        
    })
}

function sortAndPopulateMovies(filter) {
    cardContainer.innerHTML = "";
    fetch(movieDB)
        .then(response => response.json())
        .then(data => {
            if (filter === 'popularity') {
                // Sort movies by popularity in descending order
                data.results.sort((a, b) => b.popularity - a.popularity);
            } else if (filter === 'releaseDate') {
                // Sort movies by release date in descending order
                data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            } else {
                // Sort movies by average viewer rating in descending order
                data.results.sort((a, b) => {
                    console.log('a.vote_average:', a.vote_average, 'b.vote_average:', b.vote_average);
                    return b.vote_average - a.vote_average;
                });
            }
            data.results.forEach(movie => {
                const movieCard = genCard(movie);
                cardContainer.insertAdjacentHTML("beforeend", movieCard);
                console.log(movie.title, movie.popularity);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}
document.addEventListener('DOMContentLoaded', function () {    
    $(document).on('click', '.card', function (){
        var movie = this.children[1].textContent.split(/\s+/).join("+")
        localStorage.setItem("title", movie)
        document.location.assign("./Assets/second_page.html")
                    
    })
})

// Functions to open and close the Modal
function openModal() {
    var modal = document.querySelector(".modal");
    modal.classList.add("is-active");
}
function closeModal() {
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active");
}

// Event listeners to close the modal
var modalWall = document.querySelector(".modal-background");
var modalClose = document.querySelector(".modal-close");
modalWall.addEventListener("click", function() {
    closeModal();
});
modalClose.addEventListener("click", function() {
    closeModal();
});

init()