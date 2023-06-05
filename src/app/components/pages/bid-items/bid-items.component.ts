import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';

@Component({
  selector: 'app-bid-items',
  templateUrl: './bid-items.component.html',
  styleUrls: ['./bid-items.component.css'],
})
export class BidItemsComponent implements OnInit {
  bidItem_list: any;
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private appService: AppServiceService
  ) {}
  ngOnInit(): void {
    this.getBidItems();
  }

  getBidItems() {
    this.appService.getBidItems().subscribe((res: any) => {
      this.bidItem_list = res;
      console.log('this.bidItem_list', this.bidItem_list);
    });
  }
}
