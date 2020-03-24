import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import{ User } from './user.model'
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,private router:Router,private ss:SnackbarService) {


 


    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.db.object(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }




   

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
    
    this.db.object(`admin/${credential.user.uid}`).valueChanges().subscribe(res=>{
if(res){
  this.router.navigate(['/dash'])
  this.ss.openSnackBar('Your logged In','Ok')
  return this.updateUserData(credential.user);

  

}
else{
this.afAuth.auth.signOut()
this.ss.openSnackBar('Your not a admin','Ok')

}

    })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef:AngularFireObject<User>= this.db.object(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 
    return userRef.set( data )


  }
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
