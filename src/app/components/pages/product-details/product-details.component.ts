import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  productDetails: any;
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private appService: AppServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.productId = params.get('id');
      console.log('this.productId', this.productId);
    });
    this.retrieveDocument();
  }

  retrieveDocument() {
    this.appService
      .getProductDetailsDocumentById(this.productId)
      .subscribe((snapshot) => {
        this.productDetails = snapshot.data();
        console.log('productDetails', this.productDetails);
      });
  }
}
