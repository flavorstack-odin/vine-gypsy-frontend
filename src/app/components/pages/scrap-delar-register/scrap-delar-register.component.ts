import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/_services/locationService/location.service';
import { aadhaarValidator } from 'src/app/_helpers/aadhaar.validator';
@Component({
  selector: 'app-scrap-delar-register',
  templateUrl: './scrap-delar-register.component.html',
  styleUrls: ['./scrap-delar-register.component.css'],
})
export class ScrapDelarRegisterComponent implements OnInit {
  dealerRegisterForm: any;
  file: any;
  id: any;
  aadharfile: any;
  panfile: any;
  imageUrl: any;
  aadharUrl: any;
  panUrl: any;
  isLoading: boolean = false;
  dealerId: any = 0;
  dealerDetails: any;
  update: boolean = false;
  longitude: any;
  lattitude: any;
  isChecked: any;
  latt: any = '';
  long: any = '';
  date: any;
  constructor(
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private appService: AppServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.dealerRegisterForm = this.formBuilder.group({
      // aadhar: ['', [Validators.required, aadhaarValidator]],
      aadhar: ['', [Validators.required]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pan: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      primary: ['', [Validators.required]],
      secondary: ['', [Validators.required]],
      uName: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      aadharimage: ['', [Validators.required]],
      panimage: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getDealerDetails();
    this.getLocation();
    let d = new Date();
    this.date = d.toISOString();
    console.log(this.date);
  }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    console.log('this.file', this.file);
  }
  onFileAadharChange(event: any) {
    this.aadharfile = event.target.files[0];
    console.log('this.aadharfile', this.aadharfile);
  }
  onFilePanChange(event: any) {
    this.panfile = event.target.files[0];
    console.log('this.panfile', this.panfile);
  }

  async onSubmit() {
    this.isLoading = true;
    const d = new Date();
    // let time = d.getTime();
    this.id = d.getTime();
    console.log('this.id ', this.id);
    const path = `${this.id}/${this.file.name}`;
    const uploadTask = await this.storage.upload(path, this.file);
    this.imageUrl = await uploadTask.ref.getDownloadURL();
    const path2 = `${this.id}/${this.aadharfile.name}`;
    const uploadTask2 = await this.storage.upload(path2, this.aadharfile);
    this.aadharUrl = await uploadTask2.ref.getDownloadURL();
    const path3 = `${this.id}/${this.panfile.name}`;
    const uploadTask3 = await this.storage.upload(path3, this.panfile);
    this.panUrl = await uploadTask3.ref.getDownloadURL();
    let fd = {
      aadhar: this.dealerRegisterForm.value['aadhar'],
      address: this.dealerRegisterForm.value['address'],
      company: this.dealerRegisterForm.value['company'],
      district: this.dealerRegisterForm.value['district'],
      pan: this.dealerRegisterForm.value['pan'],
      phoneNumber: this.dealerRegisterForm.value['phoneNumber'],
      primary: this.dealerRegisterForm.value['primary'],
      secondary: this.dealerRegisterForm.value['secondary'],
      uName: this.dealerRegisterForm.value['uName'],
      userId: this.dealerRegisterForm.value['userId'],
      uid: this.id.toString(),
      aadharCardImage: this.aadharUrl,
      panCardImage: this.panUrl,
      uImage: this.imageUrl,
      verified: 'No',
      verifiedBy: '',
      lng: this.long,
      lat: this.latt,
      createdTime: this.date,
      updatedTime: this.date,
    };
    // this.firestore
    //   .collection('scrapDealer')
    //   .add(fd)
    //   .then(() => {
    //     console.log('Data saved successfully!');
    //     this.toastr.success('Data saved successfully!');
    //   })
    //   .catch((error) => {
    //     console.error('Error saving data: ', error);
    //   });
    console.log('file', this.file);
    this.firestore
      .collection('scrapDealer')
      .doc(this.id.toString())
      .set(fd)
      .then(() => {
        console.log('Data saved successfully!');
        this.toastr.success('Data saved successfully!');
        this.dealerRegisterForm.reset();
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
        this.toastr.error('Something Went Wrong! Try Again');
      });
    this.isLoading = false;
    // this.firestore.collection(collection).doc(id).set(data);
    // this.appService
    //   .addData('scrapDealer', fd)
    //   .then(() => {
    //     console.log('Data added successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error adding data:', error);
    //   });
  }
  // storagePath = `images/${this.id}_${file.name}`;
  onCancel() {
    this.dealerRegisterForm.reset();
  }
  onUpdateCancel() {
    this.update = false;
    this.dealerRegisterForm.reset();
    this.router.navigate(['/dealerList']);
  }

  getDealerDetails() {
    this.route.paramMap.subscribe((params: any) => {
      this.dealerId = params.get('id') || 0;
      console.log('this.dealerId', this.dealerId);
    });
    if (this.dealerId != 0) {
      this.update = true;
      this.appService
        .getDealerDetailsDocumentById(this.dealerId.toString())
        .subscribe((snapshot) => {
          this.dealerDetails = snapshot.data();
          console.log('dealerDetails', this.dealerDetails);

          this.dealerRegisterForm.patchValue({
            aadhar: this.dealerDetails.aadhar,
            address: this.dealerDetails.address,
            company: this.dealerDetails.company,
            district: this.dealerDetails.district,
            pan: this.dealerDetails.pan,
            phoneNumber: this.dealerDetails.phoneNumber,
            primary: this.dealerDetails.primary,
            secondary: this.dealerDetails.secondary,
            uName: this.dealerDetails.uName,
            userId: this.dealerDetails.userId,
          });
        });
    }
  }

  async onUpdate() {
    if (this.dealerId != 0) {
      this.isLoading = true;
      if (this.file) {
        const path = `${this.id}/${this.file.name}`;
        const uploadTask = await this.storage.upload(path, this.file);
        this.imageUrl = await uploadTask.ref.getDownloadURL();
      }
      if (this.aadharfile) {
        const path2 = `${this.id}/${this.aadharfile.name}`;
        const uploadTask2 = await this.storage.upload(path2, this.aadharfile);
        this.aadharUrl = await uploadTask2.ref.getDownloadURL();
      }
      if (this.panfile) {
        const path3 = `${this.id}/${this.panfile.name}`;
        const uploadTask3 = await this.storage.upload(path3, this.panfile);
        this.panUrl = await uploadTask3.ref.getDownloadURL();
      }

      let fd = {
        aadhar: this.dealerRegisterForm.value['aadhar'],
        address: this.dealerRegisterForm.value['address'],
        company: this.dealerRegisterForm.value['company'],
        district: this.dealerRegisterForm.value['district'],
        pan: this.dealerRegisterForm.value['pan'],
        phoneNumber: this.dealerRegisterForm.value['phoneNumber'],
        primary: this.dealerRegisterForm.value['primary'],
        secondary: this.dealerRegisterForm.value['secondary'],
        uName: this.dealerRegisterForm.value['uName'],
        userId: this.dealerRegisterForm.value['userId'],
        updatedTime: this.date,
        aadharCardImage: this.aadharUrl
          ? this.aadharUrl
          : this.dealerDetails.aadharCardImage,
        panCardImage: this.panUrl
          ? this.panUrl
          : this.dealerDetails.panCardImage,
        uImage: this.imageUrl ? this.imageUrl : this.dealerDetails.uImage,
      };
      const docRef = this.firestore
        .collection('scrapDealer')
        .doc(this.dealerId.toString());
      docRef
        .update(fd)
        .then(() => this.toastr.success('Data updated successfully'))
        .catch((error) => console.error(error));
    }
    this.update = false;
    this.isLoading = false;
    this.dealerRegisterForm.reset();
    this.router.navigate(['/dealerList']);
  }
  onClick(event: any) {
    console.log('checked', event.target.checked);
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      this.latt = this.lattitude;
      this.long = this.longitude;
    } else {
      this.latt = '';
      this.long = '';
    }
  }
  getLocation() {
    this.locationService.getPosition().then((pos) => {
      console.log(`Positon: long-${pos.lng},lat- ${pos.lat}`);
      this.longitude = pos.lng;
      this.lattitude = pos.lat;
      console.log('long', this.longitude);
    });
  }

  get aadhar() {
    return this.dealerRegisterForm.get('aadhar');
  }
}
