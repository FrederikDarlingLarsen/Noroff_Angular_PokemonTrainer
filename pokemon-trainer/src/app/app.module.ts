import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { ProfilePage } from './pages/profile/profile.page';
import { FavouriteButtonComponent } from './components/favourite-button/favourite-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Decorator
@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    LoginFormComponent,
    CataloguePage,
    PokemonListComponent,
    ProfilePage,
    FavouriteButtonComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
