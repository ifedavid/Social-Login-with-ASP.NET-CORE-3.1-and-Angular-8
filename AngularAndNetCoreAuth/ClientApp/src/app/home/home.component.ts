import { Component } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AccountService } from '../services/account.service';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //create array to store user data we need
  userData: any[] = [];

  // create a field to hold error messages so we can bind it to our template
  resultMessage: string;

  //For the loader
  public loading = false;


  constructor(private authService: AuthService, private accountService: AccountService) {
  }

  ngOnInit() {
  }



  signInWithGoogle(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.loading = true;
    this.authService.signIn(platform).then(
      (response) => {
        // Get all user details
        console.log(platform + ' logged in user data is= ', response);

        // Take the details we need and store in an array
        this.userData.push({
          UserId: response.id,
          Provider: response.provider,
          FirstName: response.firstName,
          LastName: response.lastName,
          EmailAddress: response.email,
          PictureUrl: response.photoUrl,
          OauthToken: response.authToken
        });

        // Take the array and send to our account.service.login method
        this.accountService.Login(this.userData[0]).subscribe(
          result => {
            console.log('success', result);
            window.location.reload();

          },
          error => {
            this.resultMessage = 'There was an error with our database. Sorry!';
            console.log(error);
            this.loading = false;
          }
        );
      },
      error => {
        console.log(error);
        this.resultMessage = error;
        this.loading = false;
      }
    );
  }

  signInWithFacebook(platform: string): void {
    this.loading = true;
    platform = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(platform).then(
      (response) => {
        console.log(platform + ' logged in user data is= ', response);

        // Take the details we need and store in an array
        this.userData.push({
          UserId: response.id,
          Provider: response.provider,
          FirstName: response.firstName,
          LastName: response.lastName,
          EmailAddress: response.email,
          PictureUrl: response.photoUrl,
          OauthToken: response.authToken
        });

        // Take the array and send to our account.service.login method
        this.accountService.Login(this.userData[0]).subscribe(
          result => {
            console.log('success', result);
            window.location.reload();

          },
          error => {
            this.loading = false;
            this.resultMessage = 'There was an error from our database. Sorry!';
            console.log(error);
          }
        );

      },
      error => {
        console.log(error);
        this.loading = false;
        this.resultMessage = error;
      }
    );
  }

  signOut(): void {
    this.loading = true;
    this.authService.signOut();
    this.accountService.Logout();
    console.log('User has signed our');
    this.resultMessage = 'User has signed out';
    window.location.reload();
  }
}
