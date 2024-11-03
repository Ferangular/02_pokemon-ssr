import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div class="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      <!-- 12 -->
      <!-- PokemonCard -->
      @for( pokemon of pokemons(); track pokemon.id ) {
        <pokemon-card [pokemon]="pokemon" />
      }

      <!--TODO: Si no hay -->
      <!-- <div
        class="col-span-5 text-center border-white h-28 flex justify-center items-center"
      >
        No hay pokémons
      </div> -->
    </div>
  `,

})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
