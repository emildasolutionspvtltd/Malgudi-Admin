import { Injectable, RendererFactory2 } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EditfoodService {

  dataHolder = {}
  passedID
  possible ={}
  form = new FormGroup({
    'pName' : new FormControl('',Validators.required),
    'pDesc': new FormControl('',Validators.required),
    'price': new FormControl('',Validators.required),
    'pQuant': new FormControl('',Validators.required),
    'DownloadUrl': new FormControl('',Validators.required),
  })
  addSupplier = new FormGroup({
    'suppliername': new FormControl('',Validators.required),
    'compname':new FormControl('',Validators.required),
    'phone': new FormControl('',Validators.required),
    'Mobile': new FormControl('',Validators.required),
    'Fax': new FormControl('',Validators.required),
    'Email' : new FormControl('',Validators.required),
    'Website' : new FormControl('',Validators.required),

  })
  addCat = new FormGroup({
    'categoryName' : new FormControl('',Validators.required),
    'categoryDescription':  new FormControl('',Validators.required),
    'downloadUrl': new FormControl('',Validators.required),
  });
  constructor( private db: AngularFireDatabase) { }
  setDetails(details){
    this.dataHolder = details
    this.passedID = details.pId
    this.form.setValue({
      'pName': details.prodName,
      'pDesc': details.prodDescription,
      'price': details.prodPrice,
      'pQuant': details.prodQuantity,
      'DownloadUrl': details.DownloadUrl,

    })
    
  }
  setDetail2(detail){
    this.dataHolder = detail
    this.passedID = detail.pId
    this.addSupplier.setValue({
    'suppliername': detail.suppliername,
    'compname':detail.compname,
    'phone': detail.phone,
    'Mobile': detail.Mobile,
    'Fax' : detail.Fax,
   'Email' :detail.Email,
    'Website' : detail.Website,
    })
  }

  setDetail3(dets){
    this.dataHolder = dets
    this.passedID = dets.pId
    this.addCat.setValue({
      'categoryName' : dets.categoryName,
      'categoryDescription': dets.categoryDescription,
      'downloadUrl' : dets.downloadUrl
    })
  }

  getpId(){
    return this.passedID
  }
}
