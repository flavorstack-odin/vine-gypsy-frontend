import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  product_list: any;
  dealerDetails: any;
  bidItem_list: any;
  date: any;
  user_list: any;
  balingUnits: any;
  inboundLogistics: any;
  quantity: any = [];
  product: any;
  sum: any;
  outboundLogistics: any;
  bidTxns: any;
  constructor(
    private appService: AppServiceService,
    private firestore: AngularFirestore
  ) {}
  ngOnInit(): void {
    this.getFireStoreItems();
    this.getDealerDetails();
    this.getBidItems();
    this.getUserList();
    this.getBalingUnits();
    this.getinboundLogistics();
    this.getOutboundLogistics();
    this.getbidTxns();
    this.retrieveDocuments();
    this.date = new Date();
    console.log(this.date);
  }
  getFireStoreItems() {
    this.appService.getFirestoreData().subscribe((res: any) => {
      this.product_list = res;
      this.product = this.product_list;
      this.product.forEach((qty: any) => {
        console.log('qty', qty);
        return this.quantity.push(qty.quantity);
        console.log('this.fireStoreData', this.product_list);
        // Object.keys(qty.quantity).forEach((key) => {
        //   this.quantity.push(this.product_list[key]);
        // });
      });
      console.log('quantity', this.quantity);
      this.sum = this.quantity.reduce(
        (partialSum: any, a: any) => partialSum + a,
        0
      );
      console.log('sum', this.sum);
    });
  }
  getDealerDetails() {
    this.appService.getDealerDetails().subscribe((res: any) => {
      this.dealerDetails = res;
      console.log('this.fireStoreData', this.dealerDetails);
    });
  }

  getBidItems() {
    this.appService.getBidItems().subscribe((res: any) => {
      this.bidItem_list = res;
      console.log('this.bidItem_list', this.bidItem_list);
    });
  }

  getUserList() {
    this.appService.getUserDetails().subscribe((res: any) => {
      this.user_list = res;
      console.log('this.user_list', this.user_list);
    });
  }

  getBalingUnits() {
    this.appService.getbalingUnits().subscribe((res: any) => {
      this.balingUnits = res;
      console.log('this.balingUnits', this.balingUnits);
    });
  }
  getinboundLogistics() {
    this.appService.getUserDetails().subscribe((res: any) => {
      this.inboundLogistics = res;
      console.log('this.inboundLogistics', this.inboundLogistics);
    });
  }

  getOutboundLogistics() {
    this.appService.getOutboundLogistics().subscribe((res: any) => {
      this.outboundLogistics = res;
      console.log('this.outboundLogistics', this.outboundLogistics);
    });
  }

  getbidTxns() {
    this.appService.getbidTxns().subscribe((res: any) => {
      this.bidTxns = res;
      console.log('this.bidTxns', this.bidTxns);
    });
  }

  // getProductOfLast30Days() {
  //   const collectionRef = this.firestore.collection('products');
  //   const startDate = new Date();
  //   startDate.setDate(startDate.getDate() - 30);
  //   const startDateTimestamp = this.firestore.Timestamp.fromDate(startDate);
  //   const query = collectionRef.where('createdDate', '>=', startDateTimestamp);
  // }

  // getDocumentsByCreatedDate() {
  //   const collectionRef = this.firestore.collection('documents');

  //   const startDate = new Date();
  //   startDate.setDate(startDate.getDate() - 30);
  //   const startDateTimestamp = firestore.Timestamp.fromDate(startDate);

  //   const query = collectionRef.where('createdDate', '>=', startDateTimestamp);

  //   query.valueChanges().subscribe((documents) => {
  //     console.log(documents);
  //     // Process the retrieved documents here
  //   });
  // }

  getDocumentsByCreatedDate() {
    const collectionRef = this.firestore.collection('products');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const queryFn: QueryFn = (ref) => ref.where('createdTime', '>=', startDate);
    return collectionRef.stateChanges(['added']).pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  retrieveDocuments() {
    this.getDocumentsByCreatedDate().subscribe((documents) => {
      console.log('documents', documents);
      // Process the retrieved documents here
    });
  }
}
