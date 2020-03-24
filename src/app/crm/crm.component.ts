import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {
crm
listData:MatTableDataSource<any>;
orderList :AngularFireList<any>;
array =[];
  constructor(private db:AngularFireDatabase,private storage : AngularFireDatabase,) { }

  ngOnInit() {
    this.getOrders().subscribe(
      list=>{
        let array = list.map(item =>{
          return{
            $key :item.key,
            ...item.payload.val()
          }
        }); 
        this.listData = new MatTableDataSource(array);
      });
  }
  getOrders(){
    this.orderList = this.db.list('crm');
    return this.orderList.snapshotChanges();
  }
  displayedColumns: string[] = ['customer_id','feedback','contact',];


}

