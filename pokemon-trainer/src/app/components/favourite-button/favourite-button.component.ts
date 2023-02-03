import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {

  @Input() pokemonId: string ="";

  get loading(): boolean {
    return this.favouriteService.loading;
  }

  constructor(
    private readonly favouriteService: FavouriteService) 
    {}
    
  ngOnInit(): void {
      
  }

  // Add the Pokemon to the favourites
  onFavouriteClick(): void {
    // alert("Added " + this.pokemonId + " to favourites");
    this.favouriteService.addToFavourites(this.pokemonId)
    .subscribe({
      next: (response: User) => {
        console.log("NEXT", response);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      } 
    })
  }
  

}
