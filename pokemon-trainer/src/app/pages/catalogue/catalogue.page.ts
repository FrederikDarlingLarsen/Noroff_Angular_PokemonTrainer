import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonPokelogueService } from 'src/app/services/pokemon-pokelogue/pokemon-pokelogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit {

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  get idPokemon(): string[] {
    return this.pokemonCatalogueService.idPokemon;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonPokelogueService
  ) {}

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
  }
}
