import { Component, OnInit } from '@angular/core';
import { EditfoodService } from '../services/editfood.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  passedPid
  dataHolder = {}
  Progress
  downloadUrl
  constructor(public editObj: EditfoodService, private db: AngularFireDatabase,private storage :AngularFireStorage,public dialogRef: MatDialogRef<EditCategoriesComponent>) { 
this.downloadUrl = this.editObj.addCat.get('downloadUrl').value


  }
 

  
  getImage(event){
    const file = event.target.files[0];
    const filePath = `category/${this.passedPid}`;
    const ref = this.storage.ref(filePath);
     const task = ref.put(file);
 
     task.percentageChanges().subscribe(res=>{
       console.log(res)
       this.Progress=res
       
 })
 task.then(
  x=>{
   ref.getDownloadURL().subscribe(res=>{
    console.log(res)

    
    this.downloadUrl=res


    
   })
   
  }
)

 
}
  onAdds(){

    this.db.list(`category`).update(this.passedPid,{
        'categoryName' : this.editObj.addCat.get('categoryName').value,
        'categoryDescription': this.editObj.addCat.get('categoryDescription').value,
        'downloadUrl':this.downloadUrl
    }).then(x=>{
      
      console.log('DOnee!!!!!!!!!!!!!!')
      if(this.Progress==100){this.closefunc()}
    })
  }
  closefunc(){
    this.dialogRef.close()
  }
  ngOnInit() {
    this.passedPid = this.editObj.getpId()
    console.log(this.passedPid)
  }

}
