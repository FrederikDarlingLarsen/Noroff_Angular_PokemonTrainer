import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {


  constructor(private readonly router: Router){}

  handleLogin(): void {
   // StorageUtil.storageSave<boolean>("hasFetched", false);
    this.router.navigateByUrl('/pokelogue')
  }


}
