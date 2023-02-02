import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "pokelogue",
    component: CataloguePage,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
