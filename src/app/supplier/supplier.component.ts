import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer, MaxLengthValidator } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../snackbar.service';
import {ReactiveFormsModule} from '@angular/forms'
import { EditfoodService } from '../services/editfood.service';
export interface PeriodicElement {
  serial_no: string;
  suppliername:string;
  phone: string;
  Email: string;
}
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  listData:MatTableDataSource<any>;
  orderList :AngularFireList<any>;
  array =[];
  Progress
  Supplier ={}
  passedPid
  constructor(private fb: FormBuilder,private db: AngularFireDatabase,private snack: SnackbarService,public editobj: EditfoodService) { 

  }
  addSupplier = new FormGroup({
    'suppliername': new FormControl('',Validators.required),
    'compname':new FormControl('',Validators.required),
    'phone': new FormControl('',Validators.required),
    'Mobile': new FormControl('',Validators.required),
    'Fax': new FormControl(''),
    'Email' : new FormControl(''),
    'Website' : new FormControl(''),

  })

  ngOnInit() {
    
    this.getSupplier().subscribe(
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
  displayedColumns: string[] = ['suppliername','phone','Email',"buttons"];
 
  getSupplier(){
    this.orderList = this.db.list('suppliers');
    return this.orderList.snapshotChanges();
  }

submit(){
  console.log(this.addSupplier.value)
  if(this.addSupplier.valid)
{
  const newId = this.db.createPushId()
  const pushObject = this.addSupplier.value
  pushObject.pId=newId
  console.log(this.addSupplier.value)
  this.db.list('/suppliers').update(newId,pushObject).then(x=>{
    console.log("success")
    this.addSupplier.reset()
       this.Progress=0
      

       this.snack.openSnackBar("👍🏻 Product added SucessFully","Ok")
  })
}
else{
  console.log("validate properly")
}
}
Delete(pId){
  this.db.object(`/suppliers/${pId}`).remove().catch(x=>{
   this.snack.openSnackBar(x.message,'ok')
  }).then(x=>{
    this.snack.openSnackBar('Its Successfully Deleted', 'Ok')
  })
}

edit(element){
  this.editobj.setDetail2(element)
  this.passedPid = this.editobj.getpId()
  console.log(element)
  
}
onAdds(){
  console.log(this.passedPid)
  this.db.list(`suppliers`).update(this.passedPid,{
    'suppliername': this.editobj.addSupplier.get('suppliername').value,
    'compname':this.editobj.addSupplier.get('compname').value,
    'phone':this.editobj.addSupplier.get('phone').value,
    'Mobile': this.editobj.addSupplier.get('Mobile').value,
    'Fax': this.editobj.addSupplier.get('Fax').value,
    'Email' : this.editobj.addSupplier.get('Email').value,
    'Website' : this.editobj.addSupplier.get('Website').value,
  
  }).then(x=>{
    console.log('yaay')
  })
  
}

}


