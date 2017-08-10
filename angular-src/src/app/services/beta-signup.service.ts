import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class BetaSignupService {

  constructor(private http:Http) { }

  registerBetaSignup(betaSignup){
    return this.http.post('http://localhost:8080/beta/sign-up', betaSignup)
      .map(res => res.json());
  }

  getBetaSignups(){
    return this.http.get('http://localhost:8080/beta/sign-up')
      .map(res => res.json());
  }

}
