import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators'
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material'
import { SnackbarService } from '../snackbar.service';
import { VeiwDetailsComponent } from '../veiw-details/veiw-details.component';
import { NavigationExtras } from '@angular/router';
import { element } from 'protractor';
export interface DialogData {
  pushId:any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
//orders
  constructor(private dialog:MatDialog,private db:AngularFireDatabase,private storage : AngularFireDatabase,private snack :SnackbarService) { }
listData:MatTableDataSource<any>;
orderList :AngularFireList<any>;
array =[];
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
    this.orderList = this.db.list('orders');
    return this.orderList.snapshotChanges();
  }
  
  displayedColumns: string[] = ['orderid','status','details'];

  veiwDetails(key:string){
    console.log(key)
    let hello:string = key
  
   this.dialog.open(VeiwDetailsComponent, {
    height:"80%",
    minWidth:"600px",

    data:{ pushKey:hello}
   });
  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }


  public getColor(status : string): string{

    return status=="Delivered"? "green" :"red";
 }
}

