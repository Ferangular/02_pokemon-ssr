import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component, effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map, tap } from 'rxjs';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent  {
  // public currentName = signal('Fernando');
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // })
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(
      () => {
        this.loadPokemons(this.currentPage());
      },
      {
        allowSignalWrites: true,
      }
  );


  public loadPokemons(page = 0) {
    this.pokemonsService
        .loadPage(page)
        .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)))
        .subscribe((pokemons) => {
          this.pokemons.set(pokemons);
        });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
