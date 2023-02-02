import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly loginSevice: LoginService,
    private readonly userService: UserService,
    ){}
    
    public loginSubmit(loginForm: NgForm): void {

      const {username} = loginForm.value;
      console.log(username);

      this.loginSevice.login(username)
      .subscribe({
        next: (user: User) => {
           // do we need the user?
           //redirect to catalogue page
           this.userService.user = user;
           this.login.emit();
        },
        error: () => {

        }
      })


    }

}
