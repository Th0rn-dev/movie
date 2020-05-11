const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "5a0b2578",
            s: searchTerm
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

createAutoComplete({
    root: document.querySelector(".autocomplete"),
    renderOption(movie) {
        const imageSRC = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
            <img src="${imageSRC}" />
            ${movie.Title} (${movie.Year})
         `;
    },
    onOptionSelect(movie) {
        onMovieSelect(movie);
    },
    inputValue(movie) {
        return movie.Title;
    }
});


const onMovieSelect = async movie => {
    const response = await axios.get(
        "http://www.omdbapi.com/",
        {
            params: {
                apikey: "5a0b2578",
                i: movie.imdbID
            }
        }
    );
    document.querySelector("#summary").innerHTML = movieTemplates(response.data);
}



// // autocomplete 2
// const root2 = document.querySelector(".autocomplete-2");
// root2.innerHTML = `
// <label><b>Search For a Movie</b></label>
// <input class="input" />
// <div class="dropdown">
//     <div class="dropdown-menu">
//         <div class="dropdown-content results"></div>
//     </div>
// </div>
// `;
//
// const input2 = document.querySelector('input');
// const dropdown2 = document.querySelector(".dropdown");
// const resultsWrapper2 = document.querySelector(".results");
//
// const onInput = async event => {
//     const movies = await fetchData(event.target.value);
//
//     if (!movies.length) {
//         dropdown.classList.remove("is-active");
//         return;
//     }
//     resultsWrapper.innerHTML = "";
//     dropdown.classList.add("is-active");
//     for (let movie of movies) {
//         const option = document.createElement("A");
//         const imageSRC = movie.Poster === "N/A" ? "" : movie.Poster;
//
//         option.classList.add("dropdown-item");
//         option.innerHTML = `
//             <img src="${imageSRC}" />
//             ${movie.Title}
//          `;
//         option.addEventListener("click", () => {
//             dropdown.classList.remove("is-active");
//             input.value = movie.Title;
//             onMovieSelect(movie);
//         })
//         resultsWrapper.appendChild(option);
//     }
// };
// input.addEventListener("input", debounce(onInput, 500));
// document.addEventListener("click", event => {
//     if (!root.contains(event.target)) {
//         dropdown.classList.remove("is-active");
//     }
// });
//
// const onMovieSelect = async movie => {
//     const response = await axios.get(
//         "http://www.omdbapi.com/",
//         {
//             params: {
//                 apikey: "5a0b2578",
//                 i: movie.imdbID
//             }
//         }
//     );
//     document.querySelector("#summary").innerHTML = movieTemplates(response.data);
// }



const movieTemplates = (movieDetail) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image is-96x96">
                <img src="${movieDetail.Poster}" alt="">
            </p>
        </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};