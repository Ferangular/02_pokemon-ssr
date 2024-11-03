
const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;


( async () => {

  const fs = require( 'fs' );

  // Pokémons por Ids
  const pokemonIds = Array.from( { length: TOTAL_POKEMONS }, ( _, i ) => i + 1 );
  let fileContent = pokemonIds.map(
    id => `/pokemons/${ id }`
  ).join( '\n' );


  // Paginas de Pokémons
  for ( let index = 1; index <= TOTAL_PAGES; index++ ) {
    fileContent += `\n/pokemons/page/${ index }`;
  }


  // Por nombres de Pokémons
  const pokemonNameList = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }` )
    .then( res => res.json() );

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${ pokemon.name }`
  ).join( '\n' );



  fs.writeFileSync( 'routes.txt', fileContent );

  console.log( 'Routes.txt Generated' );

} )();