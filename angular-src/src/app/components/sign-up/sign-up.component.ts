import { Component, OnInit } from '@angular/core';
import { BetaSignupService } from '../../services/beta-signup.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signups: any;
  email: String;
  game: String;

  constructor(
    private validateService: ValidateService,
    private betaSignupService: BetaSignupService,
    private _flashMessagesService: FlashMessagesService,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
    this.betaSignupService.getBetaSignups().subscribe(signups => {
      this.signups = signups;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSignupSubmit(){
    const betaSignup = {
      email: this.email,
      game: this.game
    }

    //Validate email
    if (!this.validateService.validateEmail(betaSignup.email)) {
      this._flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    
    // Register user
    this.betaSignupService.registerBetaSignup(betaSignup).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 3000 });
        this.ngOnInit();
        this.router.navigate(['/sign-up']);
      } else {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/sign-up']);
      }
    });
  }
}
