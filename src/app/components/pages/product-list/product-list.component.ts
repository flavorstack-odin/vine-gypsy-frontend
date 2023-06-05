import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  product_list: any;
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private appService: AppServiceService
  ) {}
  ngOnInit(): void {
    this.getFireStoreItems();
  }

  getFireStoreItems() {
    this.appService.getFirestoreData().subscribe((res: any) => {
      this.product_list = res;
      console.log('this.fireStoreData', this.product_list);
    });
  }
}
