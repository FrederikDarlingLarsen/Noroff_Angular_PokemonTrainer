import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
const {apiPoke} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonPokelogueService {

private _pokemon:Pokemon[] = [];
private _error: string = "";
private _loading: boolean = false;
private _idPokemon: string[] = [];

get pokemon(): Pokemon[] {
  return this._pokemon;
}

get error(): string {
  return this._error;
}

get loading(): boolean {
  return this._loading;
}

get idPokemon(): string[] {
  return this._idPokemon;
}

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {

    if (this._pokemon.length > 0 || this.loading) {
      return;
    }
  
    this._loading = true;
    this.http.get<Pokemon[]>(`${apiPoke}?limit=900&offset=0`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
    .subscribe({
      next: (pokemon: any) => {
        this._pokemon = pokemon.results
        this.getImagePaths()
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public getImagePaths(): void {
    // let imageUrl = this._pokemon[0].url
    // const id = imageUrl.split('/').filter(Boolean).pop();
    // const path =`/assets/image/${id}.png`
    // this._idPokemon = path
    
    for (let i = 0; i < this._pokemon.length; i++) {
      let imageUrl = this._pokemon[i].url
      const id = imageUrl.split('/').filter(Boolean).pop();
      const path =`/assets/image/${id}.png` 
      this._pokemon[i].image=path
    }
    }

    public pokemonById(id: string): Pokemon | undefined {
      return this._pokemon.find((pokemon: Pokemon) => pokemon.name === id); //Might not work
    }

  }



