import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
import {
  AngularFirestore,
  CollectionReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
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
  documents$: any;
  productsin30Days: any;
  bidTxnin30Days: any;
  bidInfoin30Days: any;
  scrapDealerin30Days: any;
  balingUnitin30Days: any;
  inboundLogisticsin30Days: any;
  outboundLogisticsin30Days: any;
  usersin30Days: any;
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
    // this.retrieveDocuments();
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
    this.getProductsByCreatedDate();
  }
  getDealerDetails() {
    this.appService.getDealerDetails().subscribe((res: any) => {
      this.dealerDetails = res;
      console.log('this.fireStoreData', this.dealerDetails);
    });
    this.getDealerByCreatedDate();
  }

  getBidItems() {
    this.appService.getBidItems().subscribe((res: any) => {
      this.bidItem_list = res;
      console.log('this.bidItem_list', this.bidItem_list);
    });
    this.getBidInfoByCreatedDate();
  }

  getUserList() {
    this.appService.getUserDetails().subscribe((res: any) => {
      this.user_list = res;
      console.log('this.user_list', this.user_list);
    });
    this.getUsersByCreatedDate();
  }

  getBalingUnits() {
    this.appService.getbalingUnits().subscribe((res: any) => {
      this.balingUnits = res;
      console.log('this.balingUnits', this.balingUnits);
    });
    this.getBalingUnitByCreatedDate();
  }
  getinboundLogistics() {
    this.appService.getUserDetails().subscribe((res: any) => {
      this.inboundLogistics = res;
      console.log('this.inboundLogistics', this.inboundLogistics);
    });
    this.getinboundLogisticsByCreatedDate();
  }

  getOutboundLogistics() {
    this.appService.getOutboundLogistics().subscribe((res: any) => {
      this.outboundLogistics = res;
      console.log('this.outboundLogistics', this.outboundLogistics);
    });
    this.getoutboundLogisticsByCreatedDate();
  }

  getbidTxns() {
    this.appService.getbidTxns().subscribe((res: any) => {
      this.bidTxns = res;
      console.log('this.bidTxns', this.bidTxns);
    });
    this.getBidTxnByCreatedDate();
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

  getProductsByCreatedDate() {
    const collectionRef = this.firestore.collection('products');
    const collectionName = 'products';

    // const startDate = new Date();
    // startDate.setDate(startDate.getDate() - 30);

    // const date = new Date(
    //   startDate.setDate(startDate.getDate() - 3)
    // ).toISOString();

    // const currentDate = new Date();
    // const thirtyDaysAgo = new Date();
    // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    // const queryFn: QueryFn = (ref) => ref.where('ceatedDate', '>=', startDate);
    // console.log('queryFn', queryFn);
    // return collectionRef.stateChanges(['added']).pipe(
    //   map((actions) =>
    //     actions.map((a) => {
    //       const data: any = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     })
    //   )
    // );

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        // Process the retrieved documents here
        this.productsin30Days = documents;
        console.log(' this.productsin30Days', this.productsin30Days);
      });
  }

  // retrieveDocuments() {
  //   this.getDocumentsByCreatedDate().subscribe((documents) => {
  //     console.log('documents', documents);
  //     // Process the retrieved documents here
  //   });

  //   // this.documents$ = this.appService
  //   //   .getDocumentsWithinLast30Days('products', 'createdDate')
  //   //   .subscribe((res: any) => {
  //   //     console.log('documents$', res);
  //   //   });
  // }

  getBidTxnByCreatedDate() {
    const collectionRef = this.firestore.collection('bidTxn');
    const collectionName = 'bidTxn';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.bidTxnin30Days = documents;
        // Process the retrieved documents here
        console.log('this.bidTxnin30Days', this.bidTxnin30Days);
      });
  }
  getBidInfoByCreatedDate() {
    const collectionRef = this.firestore.collection('bidInfo');
    const collectionName = 'bidInfo';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.bidInfoin30Days = documents;
        // Process the retrieved documents here
        console.log('bidInfoin30Days', this.bidInfoin30Days);
      });
  }

  getDealerByCreatedDate() {
    const collectionRef = this.firestore.collection('scrapDealer');
    const collectionName = 'scrapDealer';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.scrapDealerin30Days = documents;
        // Process the retrieved documents here
        console.log('scrapDealerin30Days', this.scrapDealerin30Days);
      });
  }

  getBalingUnitByCreatedDate() {
    const collectionRef = this.firestore.collection('balingUnit');
    const collectionName = 'balingUnit';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.balingUnitin30Days = documents;
        // Process the retrieved documents here
        console.log('balingUnitin30Days', this.balingUnitin30Days);
      });
  }

  getinboundLogisticsByCreatedDate() {
    const collectionRef = this.firestore.collection('inboundLogistics');
    const collectionName = 'inboundLogistics';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.inboundLogisticsin30Days = documents;
        // Process the retrieved documents here
        console.log('inboundLogisticsin30Days', this.inboundLogisticsin30Days);
      });
  }

  getoutboundLogisticsByCreatedDate() {
    const collectionRef = this.firestore.collection('outboundLogistics');
    const collectionName = 'outboundLogistics';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.outboundLogisticsin30Days = documents;
        // Process the retrieved documents here
        console.log('outboundLogistics0Days', this.outboundLogisticsin30Days);
      });
  }

  getUsersByCreatedDate() {
    const collectionRef = this.firestore.collection('users');
    const collectionName = 'users';

    const queryFn: QueryFn = (ref) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Calculate the date for 30 days ago
      const daysinString = new Date(thirtyDaysAgo).toISOString();
      console.log('daysinString', daysinString);

      return ref.where('createdTime', '>=', daysinString); // Replace 'createdAt' with your actual created date field
    };

    this.firestore
      .collection(collectionName, queryFn)
      .valueChanges()
      .subscribe((documents) => {
        this.usersin30Days = documents;
        // Process the retrieved documents here
        console.log('users', this.usersin30Days);
      });
  }
}
