import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;

  public get user(): User | undefined {
    return this._user;
  }

  public set user(user: User | undefined){
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
  }

  public inFavourites(pokemonId: string): boolean {
    if (this._user) {
      return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonId)); //
    }
    return false;

  }

  public addToFavourites(pokemon: Pokemon): void {
    if (this._user) {
      this._user.pokemon.push(pokemon);
    }
  }

  // Update the user to remove the Pokemon from favourites
  public removeFromFavourites(pokemonId: string): void {
    if (this._user) {
      this._user.pokemon = this._user.pokemon.filter((pokemon: Pokemon) => pokemon.name !== pokemonId);
    }
  }

}
