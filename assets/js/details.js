// Obtendo a URL da página atual
const urlParams = new URLSearchParams(window.location.search);

// Pegando o valor do parâmetro 'pokemon'
let pokemon = urlParams.get("pokemon");
pokemon = JSON.parse(pokemon);

// Obtendo o elemento da página que irá receber os dados
const pokemonDetail = document.getElementById("pokemon-detail");

// Função que recebe um objeto pokemon e retorna o html da página detalhes
function convertPokemonToDetail(pokemon) {
  return `
        <section class="poke ${pokemon.type}" id="${pokemon.number}">
        <div class="titles"> 
                <h1 class="name ">${pokemon.name}</h1>
                <span class="number">#${pokemon.number}</span>
        </div>
            <div class="detail">
                <ul class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type">${type}</li>`)
                      .join("")}
                </ul>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </section>
    `;
}

pokemonDetail.innerHTML += convertPokemonToDetail(pokemon);
