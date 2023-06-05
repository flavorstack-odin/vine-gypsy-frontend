// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { BehaviorSubject, Observable } from "rxjs";
// import { map } from "rxjs/operators";

// import { environment } from "../../../environments/environment";
// import { User } from "../../_models/auth/user";
// import { SessionManagerService } from "../session/session-manager.service";

// @Injectable({ providedIn: "root" })
// export class AuthenticationService {
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;
//   api_url = environment.apiUrl;
//   constructor(
//     private http: HttpClient,
//     private sessionManager: SessionManagerService
//   ) {
//     this.currentUserSubject = new BehaviorSubject<User>(
//       JSON.parse(localStorage.getItem("currentUser"))
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User {
//     console.log(
//       "Current user value in Login : " + this.currentUserSubject.value
//     );
//     return this.currentUserSubject.value;
//   }

//   login(userName: string, password: string) {
//     return this.http
//       .post<any>(`${environment.apiUrl}/v1/loginSeller`, { userName, password })
//       .pipe(
//         map((user) => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           // localStorage.setItem('token', JSON.stringify(user.token));
//           console.log(user.token);
//           this.sessionManager.setToken(user.token);
//           sessionStorage.setItem("user", user.token);
//           let userInfo = this.sessionManager.getUserInfo();
//           this.sessionManager.setUserInfo(userInfo);
//           this.currentUserSubject.next(user);
//           return user;
//         })
//       );
//   }

//   // POST
//   // /v1/registerSeller

//   register(
//     userName: string,
//     password: string,
//     fullName: string,
//     email: string
//   ) {
//     return this.http.post<any>(`${environment.apiUrl}/v1/registerSeller`, {
//       userName,
//       password,
//       fullName,
//       email,
//     });
//   }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     localStorage.clear();
//     this.currentUserSubject.next(null);
//   }
//   //   GET
//   // /v1/verifySeller/{userId}
//   verifySeller(id: any) {
//     return this.http.get(this.api_url + "/v1/verifySeller/" + id);
//   }
// }
import { Injectable, NgZone } from '@angular/core';
// import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
