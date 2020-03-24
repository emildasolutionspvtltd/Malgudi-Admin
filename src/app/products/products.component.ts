import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AngularFireDatabase } from '@angular/fire/database';
import { SnackbarService } from '../snackbar.service';
import { MatDialog } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { EditfoodService } from '../services/editfood.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
Products
  isEditable: boolean;
  constructor(private dialog:MatDialog,private router:Router, private db : AngularFireDatabase,private ss:SnackbarService, private editobj: EditfoodService) { }

  ngOnInit() {
    this.db.list('/product/allProducts').valueChanges().subscribe( res=>{
      this.Products=res
    
    
    })


  }
  
  public onEditClick() {
    this.isEditable = false;
 
  }
  public onSaveClick() {
    this.isEditable = true;
  }
 
  search($event) {
    
}
Delete(pId){
  this.db.object(`/product/allProducts/${pId}`).remove().catch(x=>{
   this.ss.openSnackBar(x.message,'ok')
  }).then(x=>{
    this.ss.openSnackBar('Its Successfully Deleted', 'Ok')
  })
}

addNew(){
  this.router.navigate(['/dash/new-product'])
  
}



edit(editDetails){
  this.editobj.setDetails(editDetails)
  this.dialog.open(EditProductComponent,{
    width:'50%'
  })

}


}
