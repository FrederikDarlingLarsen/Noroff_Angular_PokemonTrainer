import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of, switchMap } from 'rxjs'
import { User } from '../models/user.model';

const {apiTrainers, apiKey} = environment


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  public login(trainerName: string): Observable<User>{
    return this.checkTrainer(trainerName)
    .pipe(
      switchMap((trainer: User | undefined) => {
        if(trainer === undefined){ // user does not exist
          return this.createUser(trainerName)
        }
        return of(trainer)
      })
    )
  }

 // check if user exists
 private checkTrainer(trainerName: string): Observable<User | undefined>{
  return this.http.get<User[]>(`${apiTrainers}?username=${trainerName}`)
  .pipe(
    map((response: User[]) => response.pop())
  )
}

   // if not user, create user
   private createUser(username: string): Observable<User>{

    const user = {
      username,
      pokemon: []
    };
    //user

    //headers  _> api key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<User>(apiTrainers, user, {
      headers
    })
    // POST request
  }
}