import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
const {apiPoke} = environment;

// Video 8

@Injectable({
  providedIn: 'root'
})
export class PokemonPokelogueService {

private _pokemon:Pokemon[] = [];
private _error: string = "";
private _loading: boolean = false;

get pokemon(): Pokemon[] {
  return this._pokemon;
}

get error(): string {
  return this._error;
}

get loading(): boolean {
  return this._loading;
}

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<Pokemon []>(apiPoke)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
    .subscribe({
      next: (pokemon: Pokemon[]) => {
        this._pokemon = pokemon;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })

  }

}

