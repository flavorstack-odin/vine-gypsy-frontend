import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionManagerService } from 'src/app/_services/session/session-manager.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm: FormGroup;
  auth = getAuth();
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionManagerService,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  // get username() {
  //   return this.loginForm.get('username');
  // }
  // get password() {
  //   return this.loginForm.get('password');
  // }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    // this.authService.SignIn(
    //   this.loginForm.value['email'],
    //   this.loginForm.value['password']
    // );
    this.afAuth
      .signInWithEmailAndPassword(
        this.loginForm.value['email'],
        this.loginForm.value['password']
      )
      .then((result) => {
        console.log('result=======', result);
        let data = result.user;
        sessionStorage.setItem(
          'userdetails',
          JSON.stringify({ user_id: data?.uid, email: data?.email })
        );
        this.router.navigate(['uploadProduct']);
        this.ngZone.run(() => {
          this.router.navigate(['/uploadProduct']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    sessionStorage.setItem('tokenId', 'logged In successfully');
    // signInWithEmailAndPassword(
    //   this.auth,
    //   this.loginForm.value['email'],
    //   this.loginForm.value['password']
    // )
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //     console.log('result=======', userCredential);
    //     let data = userCredential.user;
    //     sessionStorage.setItem(
    //       'userdetails',
    //       JSON.stringify({ user_id: data?.uid, email: data?.email })
    //     );
    //     this.ngZone.run(() => {
    //       this.router.navigate(['uploadProduct']);
    //     });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    // sessionStorage.setItem('tokenId', 'logged In successfully');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
}
