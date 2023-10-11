var movieDiv = document.querySelector(".movie-details")
var titleHeader = document.querySelector(".title")
var historyDiv = document.querySelector(".history")

movieDiv.innerHTML=""
historyDiv.innerhtml=""

titleHeader.addEventListener("click", function (){
  document.location.assign("../index.html")
})

//event listener for history cards
document.addEventListener('DOMContentLoaded', function () {    
  $(document).on('click', '.card', function (){
      var movie = this.children[1].textContent.split(/\s+/).join("+")    
      var existingEntries = JSON.parse(localStorage.getItem("titles"));
      if(existingEntries == null) existingEntries = [];
      var entry = movie.toLowerCase()
      existingEntries.unshift(entry);
      //removes duplicates from array before upload to local storage
      uniq = [...new Set(existingEntries)];     
      if(uniq.length>5){
          uniq.pop()
      }
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
}//edit css here
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
  var movieData = `https://api.themoviedb.org/3/search/movie?query=${movie[0]}&api_key=5535f86488fe8a8a5507b13f60959e68`
  fetch(movieData).then(response => response.json()).then(data => {
    var movieInfo = data.results[0]
    var generator =genDetails(movieInfo)
    movieDiv.insertAdjacentHTML("beforeend", generator)
// generates card for the previously clicked movies in local storage
  for(i=1; i<movie.length; i++){
    var movieData = `https://api.themoviedb.org/3/search/movie?query=${movie[i]}&api_key=5535f86488fe8a8a5507b13f60959e68`
    fetch(movieData).then(response => response.json()).then(data => {
      var movieInfo = data.results[0]
      var generator =genCard(movieInfo)     
      historyDiv.insertAdjacentHTML("beforeend", generator)  
  })    
  }
})
}

var map;
var service;
var infowindow;
var infowindow = null;
//generates map
function initialize() {
  var unitedStates = new google.maps.LatLng(38,-97);
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: unitedStates,
    zoom: 4
  });
  //takes input and applies auto complete
  var input = document.getElementById("pac-input")
  let autocomplete =new google.maps.places.Autocomplete(input)

  autocomplete.bindTo("bounds", map)
  
  let marker = new google.maps.Marker({
    map: map
  })
//event listener for autocomplete
  google.maps.event.addListener(autocomplete,"place_changed", () =>{
    let place = autocomplete.getPlace()

    if(place.geometry.viewport){
      map.fitBounds(place.geometry.viewport)
    }else{
      map.setCenter(place.geomtry.location)
      map.setZoom(17)
    }
    marker.setPosition(place.geometry.location)
    marker.setVisible(false)
//nearby places search parameters
    let request = {
      keyword:"theater",
      location:place.geometry.location,
      radius:"50000",
      type:"movie_theater"
    }

    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
  })

}

function createMarker(place){
  var marker= new google.maps.Marker({
    map:map,
    position:place.geometry.location,
  })
  const contentString = '<div>'+
                        '<h1 class="infoWindowTitle">'+place.name+'</h1>'+
                        '<p class="infoWindowAddr">'+place.vicinity+'</p>'
                        '</div>';
//opens info window for pins. closes old infowindows in new pin click
  google.maps.event.addListener(marker, 'click', function(){
    if(infowindow) {
      infowindow.close();
   }
   infowindow = new google.maps.InfoWindow();
   infowindow.setContent(contentString)
    infowindow.open(map, marker)
  })
}

function callback (results, status){
if(status == google.maps.places.PlacesServiceStatus.OK){
  for (var i = 0; i < results.length; i++){
    var place = results[i]
    createMarker(place)
  }
}
}
init()


