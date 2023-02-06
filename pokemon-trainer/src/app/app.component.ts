import { Component, OnInit } from '@angular/core';
import { PokemonPokelogueService } from './services/pokemon-pokelogue/pokemon-pokelogue.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokemon-trainer';

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonPokelogueService) 
  { }
  
  ngOnInit(): void {
    if (this.userService.user) {
      this.pokemonService.findAllPokemon();
    }
  }
}
