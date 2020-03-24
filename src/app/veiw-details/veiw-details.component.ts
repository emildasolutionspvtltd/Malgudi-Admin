import { Component, OnInit, Inject, ViewChild, ElementRef,Directive,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';
import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';







@Component({
  selector: 'app-veiw-details',
  templateUrl: './veiw-details.component.html',
  styleUrls: ['./veiw-details.component.scss']
})


export class VeiwDetailsComponent implements OnInit {
  @ViewChild('parent',{static:true}) parent : ElementRef;
  opts
  orders
  address
  recentStatus
  user
  

  constructor(private route: ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFireDatabase) {

  }


  ngOnInit() {
    console.log(this.data)

    this.db.object(`/orders/${this.data.pushKey}`).valueChanges().subscribe(res => {
      this.orders = res
      console.log(res)
      this.db.object(`/users/${this.orders.uId}`).valueChanges().subscribe(res => {
        this.user = res
        console.log(this.user)



      })
    })
    this.db.object(`/orders/${this.data.pushKey}/deliveryAddress`).valueChanges().subscribe(res => {
      this.address = res
      console.log(res)
    })


  }
  update(data) {

    console.log(this.recentStatus, data)

    this.db.object(`/orders/${data}`).update({ status: this.recentStatus }).catch(error => {
      console.log(error)
    })

  }

  downloadPdf(){
   
    console.log("downloading pdf")
    let doc = new jsPDF('p','mm','a4');
    let specialElementHandlers ={
      '#editor' : function(element , renderer){
        return true;
      }
    };


    let parent = this.parent.nativeElement;

    html2canvas(parent).then(canvas => {
      var imagewidth=198;
var pageheight = 295;
var imgHeight = canvas.height * imagewidth / canvas.width;
var heightLeft = imgHeight;



      const contentDataURl = canvas.toDataURL('image.png');
      var position = 0;
      doc.addImage(contentDataURl,'PNG',10,10,imagewidth,imgHeight);
      doc.save('file.pdf')
    });
  }
}




