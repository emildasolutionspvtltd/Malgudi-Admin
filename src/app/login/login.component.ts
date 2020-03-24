import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private af:AngularFireAuth,private db:AngularFireDatabase,private auth:AuthService) { 
   

  }

loginForm= new FormGroup({
  emailId: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
})


  ngOnInit() {
  }
login(){
  
  this.auth.googleSignin().catch(res=>console.log(res))



  // this.db.object(`admin/${x.user.uid}`).valueChanges().subscribe(res=>{
  //   if(res=="admin"){
  //     this.router.navigate(['/dash']);


//   }


// })



// })
  
}
}
