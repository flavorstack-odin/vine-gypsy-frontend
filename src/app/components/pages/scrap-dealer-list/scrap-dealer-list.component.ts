import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
@Component({
  selector: 'app-scrap-dealer-list',
  templateUrl: './scrap-dealer-list.component.html',
  styleUrls: ['./scrap-dealer-list.component.css'],
})
export class ScrapDealerListComponent implements OnInit {
  dealerDetails: any;
  adminForm: any;
  isChecked: any;
  dealerId: any;
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private appService: AppServiceService,
    private formBuilder: FormBuilder
  ) {
    this.adminForm = this.formBuilder.group({
      adminName: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getFireStoreItems();
  }

  getFireStoreItems() {
    this.appService.getDealerDetails().subscribe((res: any) => {
      this.dealerDetails = res;
      console.log('this.fireStoreData', this.dealerDetails);
    });
  }

  onApprove(event: any, approveRef: any, id: any) {
    this.dealerId = id;
    if (event.target.checked) {
      approveRef.click();
      this.isChecked = 'Yes';
    }
    // if (event.target.checked) {
    //   console.log('event>>', event.target.checked);
    //   this.is_checked = 1;
    //   console.log('is', this.is_checked);
    // }
    else {
      this.isChecked = 'No';
      this.onSubmit();
      // console.log('ddd', this.is_checked);
    }
    console.log('id', this.dealerId);
  }
  onSubmit() {
    let fd = {
      verified: this.isChecked,
      verifiedBy: this.adminForm.value['adminName'] || '',
    };

    const docRef = this.firestore.collection('scrapDealer').doc(this.dealerId);
    docRef
      .update(fd)
      .then(() => console.log('Data updated successfully'))
      .catch((error) => console.error(error));
    this.getFireStoreItems();
    this.adminForm.reset();
  }

  onClose() {
    this.getFireStoreItems();
    this.adminForm.reset();
  }
}
