import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { StorageUtil } from 'src/app/utils/storage.utils';
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

public hasFetched: boolean = false;


private _limit: number = 8;
private _offset: number = 0;



get pokemon(): Pokemon[] {
  return this._pokemon;
}

get error(): string {
  return this._error;
}

get loading(): boolean {
  return this._loading;
}

get offset(): number{
  return this._offset;
}

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void {


 //   if(StorageUtil.storageRead<boolean>("hasFetched") === false){
    this._loading = true;
    this.http.get<Pokemon[]>(`${apiPoke}?limit=${this._limit}&offset=${this._offset}`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
    .subscribe({
      next: (pokemon: any) => {
        this._pokemon = pokemon.results
        this.getImagePaths()
   //     StorageUtil.storageSave<Pokemon[] >(StorageKeys.Pokemon, this._pokemon) 
     ///   StorageUtil.storageSave<boolean>("hasFetched", true)
        
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
      
    })
  //}
 // else{
   //    console.log("yay")
 
   //  }


}

  

  public getImagePaths(): void {
    for (let i = 0; i < this._pokemon.length; i++) {
      let imageUrl = this._pokemon[i].url
      const id = imageUrl.split('/').filter(Boolean).pop();
      const path =`/assets/image/${id}.png` 
      this._pokemon[i].image=path
    }
    }

    public nextPage(): void{
      this._offset += this._limit;
      console.log("hello")
      this.findAllPokemon()
     }
    
     public previousPage(): void{
      this._offset -= this._limit;
      this.findAllPokemon()
     }
    
  }



