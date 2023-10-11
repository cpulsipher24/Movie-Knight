let moviesData = [];
var searchInput = document.querySelector('.input.is-rounded.is-primary');
var googleAPI = "AIzaSyDYfYSjUZu51mSR2k_mShQ61eObLzdWbOQ"
var movieDB = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=5535f86488fe8a8a5507b13f60959e68"
var cardContainer = document.querySelector(".movie-cards")
var sort = document.querySelector(".sort");

cardContainer.innerHTML = ""

sort.addEventListener('change', function() {
    cardContainer.innerHTML = ""
});

sort.onchange = init


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


function init() {
    fetch(movieDB)
        .then(response => response.json())
        .then(data => {
            moviesData = data.results;
            const filter = sort.value;
            if (filter === 'popularity') {
                data.results.sort((a, b) => b.popularity - a.popularity);
            } else if (filter === 'releaseDate') {
                data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            } else {
                data.results.sort((a, b) => b.vote_average - a.vote_average);
            }

            // Populate movie cards based on the sorted/filtered data
            data.results.forEach(movie => {
                const movieCard = genCard(movie);
                cardContainer.insertAdjacentHTML('beforeend', movieCard);
            });
        });
}

// Add an event listener for the input to enable real-time searching
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = filterMoviesBySearchTerm(moviesData, searchTerm);
    populateMovieCards(filteredMovies);
});

function filterMoviesBySearchTerm(movies, searchTerm) {
    return movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
}
function populateMovieCards(movies) {
    cardContainer.innerHTML = "";  // Clear the current movie cards

    movies.forEach(movie => {
        const movieCard = genCard(movie);
        cardContainer.insertAdjacentHTML('beforeend', movieCard);
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const autoCompleteResults = getAutocompleteResults(moviesData, searchTerm);
    // Display autocomplete results
    displayAutocompleteResults(autoCompleteResults);
});

// Function to get autocomplete results
function getAutocompleteResults(data, searchTerm) {
    return data.filter(movie => movie.title.toLowerCase().includes(searchTerm));
}

// Function to display autocomplete results
function displayAutocompleteResults(results) {
    const autocompleteResultsElement = document.querySelector('.search-history');
    
    if (results.length === 0 || searchInput.value === '') {
        autocompleteResultsElement.innerHTML = ""; // Clear results if no matches or no search term
        return;
    }

    autocompleteResultsElement.innerHTML = ""; // Clear previous results

    results.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.textContent = movie.title;
        autocompleteResultsElement.appendChild(resultItem);
    });
}

// Add an event listener for the input to enable autocomplete
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const autoCompleteResults = getAutocompleteResults(moviesData, searchTerm);
    displayAutocompleteResults(autoCompleteResults);
});
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