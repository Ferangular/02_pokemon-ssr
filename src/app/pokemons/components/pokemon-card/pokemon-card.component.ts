import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-blue-500 animate-fadeIn h-44 bg-opacity-25 rounded-lg shadow-md flex flex-col p-4 items-center justify-center cursor-pointer"
      [routerLink]="['/pokemons', pokemon().id]"
    >
      <img
        [src]="pokemonImage()"
        [alt]="pokemon().name"
        class="w-24 h-24"
        width="96px"
        height="96px"
      />

      <div class="text-center mt-2">
        <h2 class="text-xl font-bold capitalize text-white">
          {{ pokemon().name }}
        </h2>
      </div>
    </div>
  `

  ,

})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed( () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ this.pokemon().id }.png`
  );

  // logEffect = effect(() => {
  //   console.log('PokemonCard: ', this.pokemon());
  // });
}
