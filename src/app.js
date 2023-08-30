//Selectors
const searchBar = document.getElementById('search')
const pokedex = document.getElementById('pokemonRow')
const modal = document.getElementById('exampleModal')
const modalBody = document.getElementById('modalBody')



/**
 * The fetchPokemon function fetches data for the first 150 Pokemon from the PokeAPI and then displays
 * the Pokemon's name, ID, image, and type.
 */
const fetchPokemon = async() => {
    const promises = [];
    for(let i = 1; i <= 150; i ++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push( fetch(url).then((res) => res.json()))
    }

    Promise.all(promises).then( results => {
        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${data.id}.png`,
            type: data.types.map( type => 
                type.type.name).join(', '),
            abilities: data.abilities.map(ability =>
                ability.ability.name).join(', '),
            weight: data.weight,
            height: data.height,
            baseExperience: data.base_experience


        }));
        console.log(pokemon);
        displayPokemon(pokemon);
        modalPopup(pokemon)
    });
};


/**
 * The function `displayPokemon` takes an array of Pokemon objects, and generates HTML code to display
 * each Pokemon's image, name, type, and a button for more details.
 * The `pokemon` parameter is an array of objects. Each object represents a Pokemon
 * and has the following properties:
 */
const displayPokemon = (pokemon) => {
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
                <button type="button" class="btn btn-danger" id="modalBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                See Details
                </button>
            </div>
          </div>
            `
        ).join('')
        
        pokedex.innerHTML = pokemonRender
}

const modalPopup = (pokemon) => {
    const modalRender = pokemon.map((poke) => 
        `
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                    
                    <h5 class="modal-title" id="${poke.name}"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody">
            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
      </div>
        `
    ).join('')
    console.log(pokemon.name);
    modal.innerHTML = modalRender
}

fetchPokemon()