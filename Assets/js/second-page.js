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
function initAutocomplete() {
const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  }); 
}    

window.initAutocomplete = initAutocomplete;
init()
