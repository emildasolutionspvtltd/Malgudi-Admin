import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { SnackbarService } from '../snackbar.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatTableDataSource} from '@angular/material';
import { EditfoodService } from '../services/editfood.service';
import {MatDialog,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material'
import { Router } from '@angular/router';
import { EditCategoriesComponent } from '../edit-categories/edit-categories.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})


export class CategoriesComponent implements OnInit {
  listData:MatTableDataSource<any>;
orderList :AngularFireList<any>;
array =[];
  Category
  passedPid
  DownloadUrl
  addCat = new FormGroup({
    'categoryName' : new FormControl('',Validators.required),
    'categoryDescription':  new FormControl('',Validators.required),
    'file' : new FormControl('',Validators.required),
  });

  constructor(private af:AngularFireDatabase, private router:Router,private dialog : MatDialog,private storage : AngularFireStorage,private snack :SnackbarService,private editobj: EditfoodService) { }

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

  displayedColumns: string[] = ['categoryName','categoryDescription','buttons'];
  

  upload(event){

    const UId = this.af.createPushId()
    const file = event.target.files[0];
    const filePath = `category/${UId}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.percentageChanges().subscribe(res=>{
      //console.log(res)
      //this.Progress=res
      
})
task.then(
  x=>{
   ref.getDownloadURL().subscribe(res=>{
     //console.log(res)
    this.DownloadUrl=res
   })
   
  }
)


}

getOrders(){
  this.orderList = this.af.list('/category');
  return this.orderList.snapshotChanges();
}
  addCategory(){

if(this.DownloadUrl){
if (this.addCat.valid){
  const newId = this.af.createPushId()
  const pushObject = this.addCat.value
  pushObject.pId=newId
  pushObject.downloadUrl= this.DownloadUrl
    this.af.list('/category').update(newId,pushObject).then(x=>{
this.addCat.reset()
this.snack.openSnackBar("Category added SuccessFully  👍 ","Ok")
      }).catch(err=>{
      this.snack.openSnackBar(err,"Ok")
    })

}else{this.snack.openSnackBar("Please fill a valid Input","Ok")
}
}
  
  else{
    this.snack.openSnackBar("Add a category Image","Ok")

  }}

  Delete(pId){
    this.af.object(`/category/${pId}`).remove().catch(x=>{
     this.snack.openSnackBar(x.message,'ok')
    }).then(x=>{
      this.snack.openSnackBar('Its Successfully Deleted', 'Ok')
    })
  }
  edit(element){
    this.editobj.setDetail3(element)
    this.passedPid = this.editobj.getpId()
    this.dialog.open(EditCategoriesComponent,{
      width:'50%'
    })
    
  }
  Add(){
    this.router.navigate(['/dash/categories/editcategories'])
  }
  
}

