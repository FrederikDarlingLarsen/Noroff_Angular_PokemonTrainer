import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageUtil } from 'src/app/utils/storage.utils';
import { environment } from 'src/environments/environment';
const { apiPoke } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonPokelogueService {
  private _allPokemon: Pokemon[] | undefined = [];

  private _pokemon: Pokemon[] | undefined = [];
  private _error: string = '';
  private _loading: boolean = false;

  public hasFetched: boolean = false;

  private _limit: number = 12;
  private _offset: number = 0;
  private _pageNum: number = 1;

  get pokemon(): Pokemon[] | undefined {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  get offset(): number {
    return this._offset;
  }

  get pageNum(): number {
    return this._pageNum;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllPokemon(): void {
    if (StorageUtil.storageRead<boolean>('hasFetched') === false) {
      if (this._pokemon) {
        if (this._pokemon.length > 0 || this.loading) {
          return;
        }
      }

      this._loading = true;
      this.http
        .get<Pokemon[]>(`${apiPoke}?limit=1000&offset=0`)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe({
          next: (pokemon: any) => {
            this._allPokemon = pokemon.results;
            this.getImagePaths();
            if (this._allPokemon) {
              StorageUtil.storageSave<Pokemon[]>(
                StorageKeys.Pokemon,
                this._allPokemon
              );
              StorageUtil.storageSave<boolean>('hasFetched', true);
            }

            if (this._allPokemon) {
              this._pokemon = [];
              for (let i = this._offset; i < this._limit + this._offset; i++) {
                this._pokemon?.push(this._allPokemon[i]);
              }
            }
          },
          error: (error: HttpErrorResponse) => {
            this._error = error.message;
          },
        });
    } else {
      console.log('yay');
      this._allPokemon = StorageUtil.storageRead<Pokemon[]>(
        StorageKeys.Pokemon
      );

          //set this._pokemon to the number of pokemon with correct limit and offset.
      if (this._allPokemon) {
        this._pokemon = [];
        for (let i = this._offset; i < this._limit + this._offset; i++) {
          this._pokemon?.push(this._allPokemon[i]);
        }
      }
    }
  }

  public getImagePaths(): void {
    if (this._allPokemon) {
      for (let i = 0; i < this._allPokemon.length; i++) {
        let imageUrl = this._allPokemon[i].url;
        const id = imageUrl.split('/').filter(Boolean).pop();

        const path = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        this._allPokemon[i].image = path;
      }
    }
  }

  public nextPage(): void {
    this._offset += this._limit;
    this._pageNum++;
    this.findAllPokemon();
  }

  public previousPage(): void {
    this._offset -= this._limit;
    this._pageNum--;
    this.findAllPokemon();
  }

  public pokemonById(id: string): Pokemon | undefined {
    if (this._pokemon) {
      return this._pokemon.find((pokemon: Pokemon) => pokemon.name === id);
    } else {
      return undefined;
    }
  }
}
