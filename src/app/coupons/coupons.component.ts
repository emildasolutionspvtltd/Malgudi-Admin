import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface PeriodicElement {
  serial_no: string;
  coupon_id:string;
  cpercentage: string;
  
}
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  coupons
  constructor(private db:AngularFireDatabase,private storage : AngularFireDatabase) { }

  ngOnInit() {

    this.db.list('/orders/').valueChanges().subscribe(res =>{
    this.coupons=res
    //console.log(this.order)
    }
    
      )


  }
  displayedColumns: string[] = ['serial_no','coupon_id','percentage'];
  dataSource = this.coupons;

}
