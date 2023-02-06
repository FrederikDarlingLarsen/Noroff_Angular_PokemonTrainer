import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonPokelogueService } from 'src/app/services/pokemon-pokelogue/pokemon-pokelogue.service';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {

  
 get username(): string | undefined {
  return this.userService.user?.username
 }
 

  get pokemon(): Pokemon[] | undefined {
    return this.pokemonCatalogueService.pokemon;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  get pageNum(): number {
    return this.pokemonCatalogueService.pageNum;
  }

  



  constructor(
    private readonly pokemonCatalogueService: PokemonPokelogueService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
 
    //sessionStorage.setItem("hasFetched", "false");

      this.pokemonCatalogueService.findAllPokemon();
   
    
    
   
 
}
}
