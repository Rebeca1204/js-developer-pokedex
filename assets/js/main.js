const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

// função recebe um objeto pokemon e retorna o html do <li>
function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// função faz a requisição de um array de 10 pokemons
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // para cada objeto, pega o li
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    // adiciona o li no html da página
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

// evento click do botão "carregar mais"
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  //  verifica se tem mais 10 pokemons para carregar
  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    // se não tiver, carrega os pokemons restantes
    loadPokemonItens(offset, newLimit);
    // remove o botão "carregar mais"
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    // se tiver, carrega mais 10 pokemons
    loadPokemonItens(offset, limit);
  }
});