var movieDiv = document.querySelector(".movie-details")
var titleHeader = document.querySelector(".title")
var historyDiv = document.querySelector(".history")

movieDiv.innerHTML=""
historyDiv.innerhtml=""

titleHeader.addEventListener("click", function (){
  document.location.assign("../index.html")
})


document.addEventListener('DOMContentLoaded', function () {    
  $(document).on('click', '.card', function (){
      var movie = this.children[1].textContent.split(/\s+/).join("+")    
      console.log(movie)
      var existingEntries = JSON.parse(localStorage.getItem("titles"));
      if(existingEntries == null) existingEntries = [];
      var entry = movie
      existingEntries.unshift(entry);
      //removes duplicates from array before upload to local storage
      uniq = [...new Set(existingEntries)];     
      if(uniq.length>5){
          uniq.pop()
      }
      console.log(uniq)
      localStorage.setItem("titles", JSON.stringify(uniq));
      document.location.reload()
                  
  })
})

//make changes here for bulma/css or any additions or subtractions to the html for the cards
//generates details for the movie that was selected on the previous page
var genDetails = (movieInfo) =>{
    return `<div class = "image is-128x128">
                <img src="https://image.tmdb.org/t/p/original${movieInfo.poster_path}" alt="${movieInfo.title} poster">
            </div>
            <div class="movie-description">
                <h2>${movieInfo.title}</h2>
                <p>${movieInfo.overview}</p>
            </div>`
}
//generates a card for selection history
var genCard = (movieInfo) =>{
  return `<div class = "card has-background-black-ter text-lightish column is-one-quarter movies">
              <div class="card-image">             
                  <figure class="image">
                      <img src="https://image.tmdb.org/t/p/original${movieInfo.poster_path}" alt="${movieInfo.title} poster">
                  </figure>                  
              </div>
              <p class = "hidden">${movieInfo.title}<p>
          </div>`                                        
}

function init () {
  //fetches local storage and generates details for the movie that was clicked
  var movie = JSON.parse(localStorage.getItem("titles"));
  console.log (movie)
  var movieData = `https://api.themoviedb.org/3/search/movie?query=${movie[0]}&api_key=5535f86488fe8a8a5507b13f60959e68`
  console.log(movieData)
  fetch(movieData).then(response => response.json()).then(data => {
    var movieInfo = data.results[0]
    var generator =genDetails(movieInfo)
    movieDiv.insertAdjacentHTML("beforeend", generator)
// generates card for the previously clicked movies in local storage
  for(i=1; i<movie.length; i++){
    var movieData = `https://api.themoviedb.org/3/search/movie?query=${movie[i]}&api_key=5535f86488fe8a8a5507b13f60959e68`
    console.log(movieData)
    fetch(movieData).then(response => response.json()).then(data => {
      var movieInfo = data.results[0]
      console.log(movieInfo)
      var generator =genCard(movieInfo)     
      historyDiv.insertAdjacentHTML("beforeend", generator)  
  })    
  }
})
}

var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  var input = document.getElementById("pac-input")
  let autocomplete =new google.maps.places.Autocomplete(input)
  
  autocomplete.bindTo("bounds", map)
  
  let marker = new google.maps.Marker({
    map: map
  })

  google.maps.event.addListener(autocomplete,"place_changed", () =>{
    let place = autocomplete.getPlace()
    console.log(place)

    if(place.geometry.viewport){
      map.fitBounds(place.geometry.viewport)
    }else{
      map.setCenter(place.geomtry.location)
      map.setZoom(17)
    }
    marker.setPosition(place.geometry.location)
    marker.setVisible(true)

    let request = {
      location:place.geometry.location,
      radius:"50000",
      type:["movie_theater"]
    }

    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
    console.log(request)
  })

}

function createMarker(place){
  var marker= new google.maps.Marker({
    map:map,
    position:place.geometry.location
  })

  google.maps.event.addListener(marker, 'click', function(){
    alert(place.name)
  })
}

function callback (results, status){
if(status == google.maps.places.PlacesServiceStatus.OK){
  for (var i = 0; i < results.length; i++){
    var place = results[i]
    createMarker(place)
    console.log(place)
  }
}
}
init()


