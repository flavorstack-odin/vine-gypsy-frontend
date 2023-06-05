import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';

@Component({
  selector: 'app-dealer-details-page',
  templateUrl: './dealer-details-page.component.html',
  styleUrls: ['./dealer-details-page.component.css'],
})
export class DealerDetailsPageComponent implements OnInit {
  dealerDetails: any;
  dealerId: any;
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private appService: AppServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.dealerId = params.get('id');
      console.log('this.dealerId', this.dealerId);
    });
    // this.getFireStoreItems();
    this.retrieveDocument();
  }

  // getFireStoreItems() {
  //   this.appService.getDealerDetails().subscribe((res: any) => {
  //     this.dealerDetails = res;
  //     console.log('this.fireStoreData', this.dealerDetails);
  //   });
  // }

  retrieveDocument() {
    this.appService
      .getDealerDetailsDocumentById(this.dealerId)
      .subscribe((snapshot) => {
        this.dealerDetails = snapshot.data();
        console.log('data', this.dealerDetails);
      });
  }
}
