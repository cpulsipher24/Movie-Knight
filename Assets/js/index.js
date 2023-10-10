console.log('Project 1');
var googleAPI = "AIzaSyDYfYSjUZu51mSR2k_mShQ61eObLzdWbOQ"
var omdbAPI = "5cce91e1"
var omdbURL = "http://www.omdbapi.com/?apikey="+omdbAPI+"&type=movie&plot=full"
var movieDB = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=5535f86488fe8a8a5507b13f60959e68"
var cardContainer = document.querySelector(".movie-cards")
var sort = document.querySelector(".sort");

cardContainer.innerHTML = ""

sort.addEventListener('change', function() {
    cardContainer.innerHTML = ""
});

sort.onchange = init

console.log (omdbURL)

//make changes here for bulma/css or any additions or subtractions to the html for the cards
//generates a card per movie title
var genCard = (movies) =>{
    return `<div class = "card has-background-black-ter text-lightish column is-one-quarter movies">
                <div class="card-image">
                    <figure class="image">
                        <img src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="${movies.title} poster">
                    </figure>
                </div>
                <header class = "card-header">
                    <p class = "card-header-title text-lightish">${movies.title}
                    </p>
                </header>
                <footer>
                <p class = "card-header-title text-lightish">Viewer rating ${movies.vote_average}/10</p>
                </footer>
            </div>`                                          
}


function init () {
    fetch(movieDB).then(response => response.json()).then(data => {
        var filter= sort.value;
        if (filter === 'popularity') {
            // Sort movies by popularity in descending order
            data.results.sort((a, b) => b.popularity - a.popularity);
            
        } else if (filter === 'releaseDate') {
            // Sort movies by release date in descending order
            data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            
        } else {
            // Sort movies by average viewer rating in descending order
            data.results.sort((a, b) => b.vote_average - a.vote_average);
            
        }
        data.results.forEach(movies =>{

           getMovies=genCard(movies)
           cardContainer.insertAdjacentHTML("beforeend", getMovies)
           console.log(movies)
        })
        
    })
}

//on card click fetches and exports a new array to local storage and changes to second page
document.addEventListener('DOMContentLoaded', function () {    
    $(document).on('click', '.card', function (){
        var movieSlice = this.children[1].textContent.split(/\s+/).join("+")
        var movie = movieSlice.slice(1, movieSlice.length -1)
        var existingEntries = JSON.parse(localStorage.getItem("titles"));
        if(existingEntries == null) existingEntries = [];
        var entry = movie
        existingEntries.unshift(entry);
        //removes duplicates from array before upload to local storage
        uniq = [...new Set(existingEntries)];     
        if(uniq.length>5){
            uniq.pop()
        }
        localStorage.setItem("titles", JSON.stringify(uniq));
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