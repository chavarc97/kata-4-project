//Selectors
const searchBar = document.getElementById('search')
const pokedex = document.getElementById('pokemonRow')


/**
 * The fetchPokemon function fetches data for the first 150 Pokemon from the PokeAPI and then displays
 * the Pokemon's name, ID, image, and type.
 */
const fetchPokemon = () => {
    const promises = [];
    for(let i = 1; i <= 150; i ++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push( fetch(url).then((res) => res.json()))
    }

    Promise.all(promises).then( results => {
        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map( type => 
                type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};


/**
 * The function `displayPokemon` takes an array of Pokemon objects, and generates HTML code to display
 * each Pokemon's image, name, type, and a button for more details.
 * @param pokemon - The `pokemon` parameter is an array of objects. Each object represents a Pokemon
 * and has the following properties:
 */
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonRender = pokemon
        .map( (pokeman) =>
            `
            <div class="card col-lg-6 mb-4 ml-5" style="width: 18rem;">
            <img src="${pokeman.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${pokeman.name}</h5>
                <p class="card-text">
                <strong>Type:</strong> ${pokeman.type}
                </p>
                <button class="btn btn-danger" id="modalBtn">See details</button>
            </div>
          </div>
            `
        ).join('')
        pokedex.innerHTML = pokemonRender
}

fetchPokemon()