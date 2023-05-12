const movies = document.querySelector(".movies");
const movie_search = document.querySelector("#movie_name__search");
const API_KEY = "2e768499-4cc9-4da1-92e3-f3ddbc19f1f3";
const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

getMovies(API_URL);

/* async function getMovies(url) {
    const resp = await fetch(url, {
        headers:  {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        }
    });
    const responseData = await resp.json();

    displayMovies(responseData);
    
} */


const displayMovies = (data) => {

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movie_item = document.createElement("div");
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
        movie_item.classList.add("movie_item");
        movie_item.innerHTML = `
        <div class="movie_poster">
            <img src="${movie.posterUrl}" class="movie_image" alt="${movie.nameRu}">
        </div>                
        <div class="movie_rate ${rateColor(movie.rating)}"><p class="movie_rate__number">${movie.rating}</p></div>
        <div class="movie_info">
            <h3 class="movie_info__heading">${movie.nameRu}</h3>
            <p class="movie_info__genre">${genr}</p>
        </div>
        `;
       
        movies.append(movie_item);
       
    });
    
};


movie_search.addEventListener("change", (e) => {
    e.preventDefault();
    const API_MOVIE_SEARCH = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${movie_search.value}`;
    console.log(movie_search.value);
    getMovies(API_MOVIE_SEARCH);
})