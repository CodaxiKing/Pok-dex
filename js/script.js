const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__Type');
const pokemonPeso = document.querySelector('.pokemon__Peso');
const pokemonTamanho = document.querySelector('.pokemon__Tamanho');
const pokemonVelocidade = document.querySelector('.pokemon__Velocidade');
const pokemonDefesa = document.querySelector('.pokemon__Defesa');
const pokemonAtaque = document.querySelector('.pokemon__Ataque');
const pokemonHp = document.querySelector('.pokemon__Hp');
const pokemonHabilidades = document.querySelector('.pokemon__Habilidades');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    console.log(data)
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonType.innerHTML = data.types.map((type) => type.type.name).join("/");
    pokemonHabilidades.innerHTML = data.abilities.map((ability) => ability.ability.name).join("<br>");
    pokemonHp.innerHTML = data.stats.find((stat) => stat.stat.name == "hp").base_stat;
    pokemonDefesa.innerHTML = data.stats.find((stat) => stat.stat.name == "defense").base_stat;
    pokemonAtaque.innerHTML = data.stats.find((stat) => stat.stat.name == "attack").base_stat;
    pokemonVelocidade.innerHTML = data.stats.find((stat) => stat.stat.name == "speed").base_stat;

    pokemonPeso.innerHTML = data.weight/10+" KG";
    pokemonTamanho.innerHTML = data.height/10+" M";
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
