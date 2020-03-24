import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
UserData
  constructor(private auth : AuthService,private router :Router ) { }
  screenWidth: number;
  willit:boolean;
  ngOnInit() {
    this.auth.user$.subscribe(res=>{
      this.UserData=res
      //console.log(res)
    })
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      
      this.screenWidth = window.innerWidth;
    };
    

  }



  logout()
  {
    this.auth.signOut().then(res=>{
      this.router.navigate(['/login'])
    })
  }

}
