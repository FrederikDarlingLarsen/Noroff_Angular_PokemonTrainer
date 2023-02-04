import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {

  public isFavourite: boolean = false;
  @Input() pokemonId: string ="";

  get loading(): boolean {
    return this.favouriteService.loading;
  }

  constructor(
    private userService: UserService,
    private readonly favouriteService: FavouriteService) 
    {}
    
  ngOnInit(): void {
    // Check if it's a favourite or not
    this.isFavourite = this.userService.inFavourites(this.pokemonId); //
  }

  // Add the Pokemon to the favourites
  onFavouriteClick(): void {
    // alert("Added " + this.pokemonId + " to favourites");
    this.favouriteService.addToFavourites(this.pokemonId)
    .subscribe({
      next: (user: User) => {
        console.log("NEXT", user);
        this.isFavourite = this.userService.inFavourites(this.pokemonId);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      } 
    })
  }
  

}
