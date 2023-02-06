import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { PokemonPokelogueService } from '../pokemon-pokelogue/pokemon-pokelogue.service';
import { UserService } from '../user.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonPokelogueService,
    private readonly userService: UserService
  ) {}

  public addToFavourites(pokemonId: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('addToFavourites: No user');
    }

    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined =
      this.pokemonService.pokemonById(pokemonId); //

    if (!pokemon) {
      throw new Error('addToFavourites: No Pokemon with id: ' + pokemonId);
    }

    // Does the Pokemon exist in favourites
    if (this.userService.inFavourites(pokemonId)) {
      this.userService.removeFromFavourites(pokemonId);
    } else {
      this.userService.addToFavourites(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    this._loading = true;

    return this.http
      .patch<User>(
        `${apiTrainers}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        }),
        finalize(() => {
          this._loading = false;
        })
      );
  }
}
