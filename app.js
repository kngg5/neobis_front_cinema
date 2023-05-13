const movies = document.querySelector(".movies");
const movie_search = document.querySelector("#movie_name__search");
const API_KEY = "2e768499-4cc9-4da1-92e3-f3ddbc19f1f3";
const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

getMovies(API_URL);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers:  {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        }
    });
    const responseData = await resp.json();
   
    displayMovies(responseData);   
}

function displayMovies(data){

    document.querySelector(".movies").innerHTML = "";

    if(data.films) {
        data.films.forEach((movie) => {
            const movie_item = document.createElement("div");
            movie_item.classList.add("movie_item");
            function rateColor(rate) {
                if(rate >= 7) {
                    return "green";
                } else if(rate > 5) {
                    return "yellow";
                } else {
                    return "red";
                }
            };
            const genr = Array.from(movie.genres.values())
                .map(obj => obj.genre)
                .join(', ');
           
            movie_item.innerHTML = `
            <div class="movie_poster">
                <img src="${movie.posterUrl}" class="movie_image" alt="${movie.nameRu}">
            </div>                
            <div class="movie_rate ${rateColor(movie.rating)}"><p class="movie_rate__number">${movie.rating}</p></div>
            <div class="movie_info">
                <h3 class="movie_info__heading">${movie.nameRu}</h3>
                <p class="movie_info__genre">${genr}</p>
            </div>`;
            movies.append(movie_item);
    
        });  
    } else {
        console.log("No movies found");
    }

};


movie_search.addEventListener("change", (e) => {
    e.preventDefault();
    const API_MOVIE_SEARCH = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${movie_search.value}`;
    console.log(movie_search.value);
    getMovies(API_MOVIE_SEARCH);
})


const upcomingMovies = document.querySelector(".upcoming_movies");
upcomingMovies.addEventListener("click", () => {
    
    console.log("upcoming movie is clicked");
    var year =  new Date().getFullYear();
    var month = new Date().toLocaleString('en-us', { month: 'long' }).toUpperCase();
   const API_GET_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY`;
    
    getMovies(API_GET_PREMIERES);
});


const bestMovies = document.querySelector(".best_movies");
bestMovies.addEventListener("click", () => {
    const API_BEST_MOVIES = 
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
    getMovies(API_BEST_MOVIES);
    
});

const expectedMovies = document.querySelector(".expected_movies");
expectedMovies.addEventListener("click", () => {
    const API_EXPECTED_MOVIES =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1';
    getMovies(API_EXPECTED_MOVIES);
}); 

const digitalReleases = document.querySelector(".digital_releases");
digitalReleases.addEventListener("click", () => {
    var year =  new Date().getFullYear();
    var month = new Date().toLocaleString('en-us', { month: 'long' }).toUpperCase();
    const API_DIGITAL_RELEASES = 
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=MAY&page=1";
    console.log("digital releases is clicked");
    getMovies(API_DIGITAL_RELEASES);
});