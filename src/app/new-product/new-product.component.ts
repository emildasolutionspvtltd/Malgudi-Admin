import { SnackbarService } from './../snackbar.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  Category
  Progress
  DownloadUrl
  constructor(private db: AngularFireDatabase ,private storage : AngularFireStorage ,private snack: SnackbarService,private router:Router) {



   }
addProduct = new FormGroup({
  prodName: new FormControl('',Validators.required),
  prodId: new FormControl('',Validators.required),
  prodDescription: new FormControl('',Validators.required),
  prodPrice: new FormControl('',Validators.required),
  prodQuantity: new FormControl('',Validators.required),
  prodCategory:new FormControl('',Validators.required),
  file:new FormControl('')
})
  ngOnInit() {

    this.db.list('/category/').valueChanges().subscribe(res =>{
    this.Category=res
    //console.log(this.Category)
    }
    
      )

  }
  onAdds(){
    this.router.navigate(['/dash/categories'])
  }


  addProducts(){
    if(this.addProduct.valid){
     if(this.DownloadUrl){

      const newId = this.db.createPushId()
       const pushObject = this.addProduct.value
       pushObject.pId=newId
       pushObject.DownloadUrl= this.DownloadUrl
     this.db.list('product/allProducts/').update(newId,pushObject).then(x=>{
       this.addProduct.reset()
       this.Progress=0
      

       this.snack.openSnackBar("👍🏻 Product added SucessFully","Ok")
     }).catch(err=>{
       console.log(err)
     })
     
     
     // console.log()
    }

     else{
    this.snack.openSnackBar("Please Upload the Image","Ok")
    }}
    else{
      this.snack.openSnackBar("❌  Please fill an Valid Input","Ok")
    }
    
    
  }
  

  upload(event){

    const UId = this.db.createPushId()
    const file = event.target.files[0];
    const filePath = `productPhoto/${UId}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.percentageChanges().subscribe(res=>{
      //console.log(res)
      this.Progress=res
      
})
task.then(
  x=>{
   ref.getDownloadURL().subscribe(res=>{
    // console.log(res)
    this.DownloadUrl=res
   })
   
  }
)


}



 
  
   

}
