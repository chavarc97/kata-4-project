//Selectors
const searchBar = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const pokedex = document.getElementById('pokemonRow')
const modal = document.getElementById('exampleModal')
const modalBody = document.getElementById('modalBody')
let pokemon;




/**
 * The fetchPokemon function fetches data from the PokeAPI and creates an array of Pokemon objects with
 * their names, IDs, and image URLs.
 */
const fetchPokemon = async() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    pokemon = data.results.map( (result, i) => ({
        name: result.name,
        id: i +1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
    }))
    displayPokemon(pokemon)
       /*  modalPopup(pokemon) */
    
};

searchBtn.addEventListener('click', () =>{
    let pokeSearch = searchBar.value
    let searchArray = pokemon.filter(((pokeman) => {
       return pokeman.name == pokeSearch
    })) 
    const pokemonRender = searchArray
        .map( (pokeman) =>
            `
        <div class="card col-lg-6 mb-4 ml-5" style="width: 18rem;">
            <img src="${pokeman.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${pokeman.name}</h5>
                <p class="card-text">
                <strong>Type:</strong> ${pokeman.type}
                </p>
                <button type="button" class="btn btn-danger" id="modalBtn" data-bs-toggle="modal" onclick="getId(${pokeman.id})" data-bs-target="#exampleModal">
                See Details
                </button>
            </div>
        </div>
        <div class="d-grid gap-2">
             <button class="btn btn-danger" onclick="fetchPokemon()" type="button">Return</button>
        </div>
            `
        ).join('')
        
        pokedex.innerHTML = pokemonRender
})


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
                <h5 class="card-title text-capitalize">${pokeman.name}</h5>
                <p class="card-text">
                </p>
                <button type="button" class="btn btn-danger" id="modalBtn" data-bs-toggle="modal" onclick="getId(${pokeman.id})" data-bs-target="#exampleModal">
                See Details
                </button>
            </div>
          </div>
            `
        ).join('')
        
        pokedex.innerHTML = pokemonRender
}

/* 
* This function gets the pokemon id and fetch each pokemon returning details to the pokeDetails variables
*/
const getId = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const pokeDetails = await res.json();
    console.log(pokeDetails);
    displayModal(pokeDetails)
    /* const pokeDetails = data */
}


/* 
* This function opens a popup using bootstrap's modal adding more information such as type, measurements, abilities ... etc
*/
const displayModal = (pokeDetails) => {
    const type = pokeDetails.types.map( type => type.type.name ).join(', ')
    const abilities = pokeDetails.abilities.map( ability => ability.ability.name).join(', ')
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetails.id}.png`
    
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-2 text-capitalize" id="exampleModalLabel">${pokeDetails.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${image}" class="card-img-top">
      <h1 class="modal-title fs-3 text-capitalize" id="exampleModalLabel">Abilities:</h1>
      <h1 class="modal-title fs-4 text-capitalize" id="exampleModalLabel">${abilities}</h1>
      <h3 class="modal-title fs-5 text-capitalize" id="exampleModalLabel"<strong>Type: </strong>${type}</h3>
      <h3 class="modal-title fs-5" id="exampleModalLabel"<strong>Base xp: </strong>${pokeDetails.base_experience} xp</h3>
      <h3 class="modal-title fs-5" id="exampleModalLabel"<strong>Height: </strong>${pokeDetails.height} cm</h3>
      <h3 class="modal-title fs-5" id="exampleModalLabel"<strong>Weight: </strong>${pokeDetails.weight} Kg</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `
}

fetchPokemon()