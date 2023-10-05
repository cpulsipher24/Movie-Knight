var movie = localStorage.getItem("title")
var movieDiv = document.querySelector(".movie-details")
var titleHeader = document.querySelector(".title")

titleHeader.addEventListener("click", function (){
  document.location.assign("../index.html")
})

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
      radius:"500",
      type:["movie_theater"]
    }

    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
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


