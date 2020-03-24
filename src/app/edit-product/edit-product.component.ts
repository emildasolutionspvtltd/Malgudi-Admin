import { Component, OnInit } from '@angular/core';
import { EditfoodService } from '../services/editfood.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  
  passedPid
  dataHolder = {}
  Progress
  DownloadUrl
  constructor(public editObj: EditfoodService, private storage :AngularFireStorage,private db: AngularFireDatabase,public dialogRef: MatDialogRef<EditProductComponent>) {
this.DownloadUrl=this.editObj.form.get('DownloadUrl').value



  }
getImage(event){
   const file = event.target.files[0];
   const filePath = `productPhoto/${this.passedPid}`;
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

    
    this.DownloadUrl=res


    
   })
   
  }
)

 
}
  onAdds(){
   
    this.db.list(`product/allProducts/`).update(this.passedPid,{
      'prodDescription': this.editObj.form.get('pDesc').value,
      'prodName': this.editObj.form.get('pName').value,
      'prodPrice': this.editObj.form.get('price').value,
      'prodQuantity': this.editObj.form.get('pQuant').value,
      'DownloadUrl':this.DownloadUrl,
      
    }
    ).then(x=>{
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
