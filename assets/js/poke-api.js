const pokeApi = {};

// função recebe um objeto com os detalhes do pokemon da api externa e converte para formato local de pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
  // instancia um novo pokemon
  const pokemon = new Pokemon();
  // preenche os dados
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  // adiciona os tipos do pokemon no array
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  // adiciona a foto do pokemon
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  // devolve o pokemon
  return pokemon;
}

// função realiza uma requisição para obter os detalhes de um Pokémon da API externa
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

// função faz a requisição de um array de 10 pokemons
pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return await fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    // para cada pokemon da lista, faz uma requisição de seus detalhes
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    // retorna uma promise com o array de detalhes do pokemon
    .then((detailRequests) => Promise.all(detailRequests))
    // retorna os detalhes
    .then((pokemonsDetails) => pokemonsDetails);
};