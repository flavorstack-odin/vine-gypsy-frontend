import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
import { doc, getDoc } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-bid-info',
  templateUrl: './bid-info.component.html',
  styleUrls: ['./bid-info.component.css'],
})
export class BidInfoComponent implements OnInit {
  bidInfoForm: any;
  product_list: any;
  id: any;
  product: any;
  productId: any;
  productQty: any;
  savedData: any = [];
  selectedItems = [];
  isLoading: boolean = false;
  bidId: any = 0;
  bidDetails: any;
  update: boolean = false;
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  selectButton: boolean = false;
  constructor(
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private appService: AppServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bidInfoForm = this.formBuilder.group({
      baseBidPrice: ['', [Validators.required]],
      bidAmount: ['', [Validators.required]],
      bidEndTime: ['', [Validators.required]],
      bidStartTime: ['', [Validators.required]],
      bidStart: ['', [Validators.required]],
      bidEnd: ['', [Validators.required]],
    });
    // this.bidInfoForm.controls['products'].setValue(0);
  }
  ngOnInit(): void {
    this.getFireStoreItems();
    this.getBidDetais();
  }

  onItemSelect(item: any) {
    console.log('item', item);

    this.savedData.push(item.id);
    console.log('saved', this.savedData);
  }

  onItemDeSelect(item: any) {
    console.log('deselctitem', item);

    let filteredData = this.savedData.filter((data: any) => item.id != data.id);
    this.savedData = filteredData;
    console.log('deselct', this.savedData);
  }
  getFireStoreItems() {
    this.appService.getFirestoreData().subscribe((res: any) => {
      this.product_list = res;
      console.log('this.fireStoreData', this.product_list);
    });
  }

  // onSelectProduct() {
  // this.product = this.bidInfoForm.value['products'];
  // console.log('this.product', this.product);
  // this.productId = this.product.id;
  // this.productQty = this.product.quantity;
  // console.log('values', this.productId, this.productQty);
  // const documentId = this.bidInfoForm.value['products'].toString();
  // const docRef: any = this.firestore.collection('products').doc(documentId);
  // docRef
  //   .get()
  //   .then((doc: { exists: any; data: () => any }) => {
  //     if (doc.exists) {
  //       const data = doc.data();
  //       console.log('Document data:', data);
  //     } else {
  //       console.log('No such document!');
  //     }
  //   })
  //   .catch((error: any) => {
  //     console.log('Error getting document:', error);
  //   });
  // }
  onSubmit() {
    this.isLoading = true;
    const d = new Date();
    // let time = d.getTime();
    this.id = d.getTime();
    console.log('this.id ', this.id);
    let fd = {
      baseBidPrice: this.bidInfoForm.value['baseBidPrice'],
      bidAmount: this.bidInfoForm.value['bidAmount'],
      bidStartTime:
        this.bidInfoForm.value['bidStartTime'] +
        'T' +
        this.bidInfoForm.value['bidStart'],
      bidEndTime:
        this.bidInfoForm.value['bidEndTime'] +
        'T' +
        this.bidInfoForm.value['bidEnd'],
      bidInfoId: this.id.toString(),
      currentBidPrice: this.bidInfoForm.value['baseBidPrice'],
    };
    console.log('fd', fd);
    this.firestore
      .collection('bidInfo')
      .doc(this.id.toString())
      .set(fd)
      .then(() => {
        console.log('Data saved successfully!');
        this.toastr.success('Data saved successfully!');
        this.updateData();
        this.bidInfoForm.reset();
        this.selectedItems = [];
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
        this.toastr.error('Something Went Wrong! Try Again');
      });
    // this.firestore.collection(collection).doc(id).set(data);
    // this.appService
    //   .addData('scrapDealer', fd)
    //   .then(() => {
    //     console.log('Data added successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error adding data:', error);
    //   });
    this.isLoading = false;
  }

  updateData() {
    // this.isLoading = true;
    // console.log('this.mediaUrlId', this.mediaUrlId);
    Object.keys(this.savedData).forEach((key) => {
      // save_inputs.append("file", this.pictureSrc[key]);
      const docRef = this.firestore
        .collection('products')
        .doc(this.savedData[key]);
      let newData: any = {
        bidId: this.id.toString(),
      };
      docRef
        .update(newData)
        .then(() => console.log('Data updated successfully'))
        .catch((error) => console.error(error));
      // this.isLoading = false;
      // this.toastr.success('URL Updated Successfully');
    });
  }

  onCancel() {
    this.bidInfoForm.reset();
    this.selectedItems = [];
  }

  getBidDetais() {
    this.route.paramMap.subscribe((params: any) => {
      this.bidId = params.get('id') || 0;
      console.log('this.bidId', this.bidId);
    });
    if (this.bidId != 0) {
      this.selectButton = true;
      this.update = true;
      this.appService
        .getBidDetailsDocumentById(this.bidId.toString())
        .subscribe((snapshot) => {
          this.bidDetails = snapshot.data();
          console.log('bidDetails', this.bidDetails);
          let startDate = this.bidDetails.bidStartTime.split('T')[0];
          let startTime = this.bidDetails.bidStartTime.split('T')[1];
          let endDate = this.bidDetails.bidEndTime.split('T')[0];
          let endTime = this.bidDetails.bidEndTime.split('T')[1];
          console.log('startDate', startDate, startTime, endDate, endTime);

          this.bidInfoForm.patchValue({
            baseBidPrice: this.bidDetails.baseBidPrice,
            bidAmount: this.bidDetails.bidAmount,
            bidStartTime: startDate,
            bidStart: startTime,
            bidEndTime: endDate,
            bidEnd: endTime,

            //   'T' +
            //   this.bidInfoForm.value['bidStart'],
            // bidEndTime:
            //   this.bidInfoForm.value['bidEndTime'] +
            //   'T' +
            //   this.bidInfoForm.value['bidEnd'],
            // bidInfoId: this.id.toString(),
          });
        });
    }
  }

  onUpdateBidInfo() {
    if (this.bidId != 0) {
      this.isLoading = true;
      let fd = {
        baseBidPrice: this.bidInfoForm.value['baseBidPrice'],
        bidAmount: this.bidInfoForm.value['bidAmount'],
        bidStartTime:
          this.bidInfoForm.value['bidStartTime'] +
          'T' +
          this.bidInfoForm.value['bidStart'],
        bidEndTime:
          this.bidInfoForm.value['bidEndTime'] +
          'T' +
          this.bidInfoForm.value['bidEnd'],
      };
      const docRef = this.firestore
        .collection('bidInfo')
        .doc(this.bidId.toString());
      docRef
        .update(fd)
        .then(() => this.toastr.success('Data updated successfully'))
        .catch((error) => console.error(error));
    }
    this.update = false;
    this.selectButton = false;
    this.isLoading = false;
    this.bidInfoForm.reset();
    this.router.navigate(['/bidItems']);
  }

  onUpdateCancel() {
    this.selectButton = false;
    this.update = false;
    this.bidInfoForm.reset();
    this.router.navigate(['/bidItems']);
  }
}
