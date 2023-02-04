import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonPokelogueService } from 'src/app/services/pokemon-pokelogue/pokemon-pokelogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  
  // Video 8 - 13min ish
  @Input() pokemon: Pokemon[] | undefined = [];

 canPrevious = false;

  constructor(private readonly pokemonCatalogueService: PokemonPokelogueService) {}

  public onNextClicked(): void{
    if(!this.canPrevious){
       this.canPrevious=true;
    }
    this.pokemonCatalogueService.nextPage()
    }

    public onPreviousClicked(): void{
      this.pokemonCatalogueService.previousPage()
      if(this.pokemonCatalogueService.offset ===0){
        this.canPrevious=false;
      }}

  ngOnInit(): void {
    
  }

}
