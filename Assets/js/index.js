console.log('Project 1');
var googleAPI = "AIzaSyDYfYSjUZu51mSR2k_mShQ61eObLzdWbOQ"
var omdbAPI = "5cce91e1"
var omdbURL = "http://www.omdbapi.com/?apikey="+omdbAPI+"&type=movie&plot=full"
var movieDB = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=5535f86488fe8a8a5507b13f60959e68'
console.log (omdbURL)

function init () {
    fetch(movieDB).then(response => response.json()).then(data => {
        for(i=0; i<data.results.length; i++) {
            movieTitle = data.results[i].title
        }
        
        console.log(data)

    })
    
}
init()