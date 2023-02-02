import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  
  // Video 8 - 13min ish
  @Input() pokemon: Pokemon[] =[];

  constructor() {}

  ngOnInit(): void {
    
  }

}
