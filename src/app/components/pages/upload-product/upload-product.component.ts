import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/_services/appService/app-service.service';
// import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.css'],
})
export class UploadProductComponent implements OnInit {
  galleryImages: any;
  uploadProductForm: any;
  file: any;
  videoFile: any;
  id: any;
  // imageUrl: any;
  // videoUrl: any;
  pictureUrl: any;
  pictureSrc: any;
  numberOfFiles: any;
  savedDataImage: any = [];
  savedDataVideo: any = [];
  savedUpdateDataImage: any = [];
  savedUpdateDataVideo: any = [];
  videoUrls: any;
  videoSrc: any;
  isLoading: boolean = false;
  productId: any = 0;
  productDetails: any;
  isupdate: boolean = false;
  date: any;
  constructor(
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private appService: AppServiceService,
    private router: Router
  ) {
    this.uploadProductForm = this.formBuilder.group({
      scrapDealerName: ['', [Validators.required]],
      scrapDealerId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      msp: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      sp: ['', [Validators.required]],
      image: ['', [Validators.required]],
      video: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.fetchImages();
    this.getProductDetais();
    let d = new Date();
    this.date = d.toISOString();
    console.log(this.date);
  }

  fetchImages() {
    const filePath = `ProductImages/`;
    const fileRef = this.storage.ref(filePath);
    fileRef.listAll().subscribe((result) => {
      console.log('result', result);
      const promises = result.items.map((imgRef) => {
        console.log('getDownloadURL', imgRef.getDownloadURL());
        return imgRef.getDownloadURL();
      });
      Promise.all(promises).then((imgNameArray) => {
        console.log(imgNameArray);
        this.galleryImages = imgNameArray;
      });
    });
    fileRef.getDownloadURL().subscribe((url) => console.log(url));
  }
  onFileChange(picture: any) {
    // this.file = event.target.files[0];
    // console.log('this.file', this.file);
    console.log('picture', picture.target.files);

    if (picture.target.files && picture.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureUrl = e.target.result;
        // console.log('this.pictureUrl', this.pictureUrl);
      };
      reader.readAsDataURL(picture.target.files[0]);
      this.pictureSrc = picture.target.files;
      console.log('this.pictureSrc', this.pictureSrc);

      this.numberOfFiles = this.pictureSrc.length;
    }
  }

  onVideoChange(video: any) {
    // this.videoFile = event.target.files[0];
    // console.log('this.videoFile', this.videoFile);
    if (video.target.files && video.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoUrls = e.target.result;
        // console.log('this.videoUrls', this.videoUrls);
      };
      reader.readAsDataURL(video.target.files[0]);
      this.videoSrc = video.target.files;
      console.log('this.videoSrc', this.videoSrc);

      this.numberOfFiles = this.videoSrc.length;
    }
  }

  saveData() {
    const d = new Date();
    // let time = d.getTime();
    this.id = d.getTime();
    console.log('this.id ', this.id);

    let fd = {
      scrapDealerName: this.uploadProductForm.value['scrapDealerName'],
      scrapDealerId: this.uploadProductForm.value['scrapDealerId'],
      name: this.uploadProductForm.value['name'],
      code: this.uploadProductForm.value['code'],
      quantity: this.uploadProductForm.value['quantity'],
      msp: this.uploadProductForm.value['msp'],
      cp: this.uploadProductForm.value['cp'],
      sp: this.uploadProductForm.value['sp'],
      id: this.id.toString(),
      bidId: '',
      createdTime: this.date,
      updatedTime: this.date,
      images: this.savedDataImage,
      videos: this.savedDataVideo,
    };
    //   this.firestore
    //     .collection('products')
    //     .add(fd)
    //     .then(() => {
    //       console.log('Data saved successfully!');
    //     })
    //     .catch((error) => {
    //       console.error('Error saving data: ', error);
    //     });
    console.log('fd', fd);
    this.firestore
      .collection('products')
      .doc(this.id.toString())
      .set(fd)
      .then(() => {
        console.log('Data saved successfully!');
        this.toastr.success('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
      });
  }
  async onSumit() {
    this.isLoading = true;
    if (this.uploadProductForm.valid) {
      // this.isLoading = true;
      // console.log('file', this.file);
      // for (let i = 0; i < this.numberOfFiles; i++) {
      //   const path = `ProductImages/${this.pictureSrc.name}`;
      //   const uploadTask = await this.storage.upload(path, this.pictureSrc[i]);
      //   this.imageUrl = await uploadTask.ref.getDownloadURL();
      //   this.savedDataImage.push(this.imageUrl);
      //   console.log('imageUrl', this.imageUrl);
      // }
      for (const image of this.pictureSrc) {
        const filePath = `ProductImages/${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, image);

        // Wait for the upload task to complete
        await task;

        // Get the download URL of the uploaded image
        const downloadURL = await fileRef.getDownloadURL().toPromise();
        this.savedDataImage.push(downloadURL);
        // Save the download URL to Firestore
        // imageUrls.push(downloadURL);
      }
      // console.log('videoFile', this.videoFile);
      // const path2 = `ProductVideos/${this.videoFile.name}`;
      // const uploadTask2 = await this.storage.upload(path2, this.videoFile);
      // this.videoUrl = await uploadTask2.ref.getDownloadURL();
      // console.log('this.videoUrl', this.videoUrl);
      for (const video of this.videoSrc) {
        const filePath = `ProductVideos/${video.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, video);

        // Wait for the upload task to complete
        await task;

        // Get the download URL of the uploaded image
        const downloadURL = await fileRef.getDownloadURL().toPromise();
        this.savedDataVideo.push(downloadURL);
        // Save the download URL to Firestore
        // imageUrls.push(downloadURL);
      }

      this.saveData();
      // const url = await uploadTask.ref.getDownloadURL();
      // console.log("url", url);
      // this.msg = "Uploaded the file successfully: " + this.file.name;
      // this.isLoading = false;
      this.fetchImages();
      // this.addImage.nativeElement.click();
      // this.Img.nativeElement.value = "";
      this.uploadProductForm.reset();
      this.toastr.success('Product Uploaded Successfully');
    } else {
      // this.msg = "Something went wrong!,Please try again";
      this.toastr.error('Something went wrong!,Please try again later');
      // this.msg = "";
    }
    this.isLoading = false;
  }

  onFileSelected(event: Event): void {
    const files: any = (event.target as HTMLInputElement).files;
    const imageFiles: File[] = Array.from(files);
    this.uploadImages(imageFiles);
  }
  async uploadImages(imageFiles: File[]) {
    const savedDataImageUrls: string[] = [];

    for (const file of imageFiles) {
      const path = `ProductImages/${file.name}`;
      const storageRef = this.storage.ref(path);
      const uploadTask = this.storage.upload(path, file);
      const snapshot: any = await uploadTask.snapshotChanges().toPromise();

      if (snapshot.state === 'success') {
        const downloadURL = await storageRef.getDownloadURL().toPromise();
        savedDataImageUrls.push(downloadURL);
      }
    }

    console.log('Saved Data Image URLs:', savedDataImageUrls);
  }
  onCancel() {
    this.uploadProductForm.reset();
  }

  onUpdateCancel() {
    this.isupdate = false;
    this.uploadProductForm.reset();
    this.router.navigate(['/productList']);
  }

  getProductDetais() {
    this.route.paramMap.subscribe((params: any) => {
      this.productId = params.get('id') ? params.get('id') : 0;
      console.log('this.productId', this.productId);
    });
    if (this.productId != 0) {
      this.isupdate = true;
      this.appService
        .getProductDetailsDocumentById(this.productId.toString())
        .subscribe((snapshot) => {
          this.productDetails = snapshot.data();
          console.log('productDetails', this.productDetails);

          this.uploadProductForm.patchValue({
            scrapDealerName: this.productDetails.scrapDealerName,
            scrapDealerId: this.productDetails.scrapDealerId,
            name: this.productDetails.name,
            code: this.productDetails.code,
            quantity: this.productDetails.quantity,
            msp: this.productDetails.msp,
            cp: this.productDetails.cp,
            sp: this.productDetails.sp,
          });
        });
    }
  }
  async onUpdateProduct() {
    this.isLoading = true;
    if (this.productId != 0) {
      // this.isLoading = true;
      // console.log('file', this.file);
      // for (let i = 0; i < this.numberOfFiles; i++) {
      //   const path = `ProductImages/${this.pictureSrc.name}`;
      //   const uploadTask = await this.storage.upload(path, this.pictureSrc[i]);
      //   this.imageUrl = await uploadTask.ref.getDownloadURL();
      //   this.savedDataImage.push(this.imageUrl);
      //   console.log('imageUrl', this.imageUrl);
      // }
      if (this.pictureSrc) {
        for (const image of this.pictureSrc) {
          const filePath = `ProductImages/${image.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, image);

          // Wait for the upload task to complete
          await task;

          // Get the download URL of the uploaded image
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          this.savedUpdateDataImage.push(downloadURL);
          // Save the download URL to Firestore
          // imageUrls.push(downloadURL);
        }
      }
      // console.log('videoFile', this.videoFile);
      // const path2 = `ProductVideos/${this.videoFile.name}`;
      // const uploadTask2 = await this.storage.upload(path2, this.videoFile);
      // this.videoUrl = await uploadTask2.ref.getDownloadURL();
      // console.log('this.videoUrl', this.videoUrl);
      if (this.videoSrc) {
        for (const video of this.videoSrc) {
          const filePath = `ProductVideos/${video.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, video);

          // Wait for the upload task to complete
          await task;

          // Get the download URL of the uploaded image
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          this.savedUpdateDataVideo.push(downloadURL);
          // Save the download URL to Firestore
          // imageUrls.push(downloadURL);
        }
      }

      this.onUpdate();
      // const url = await uploadTask.ref.getDownloadURL();
      // console.log("url", url);
      // this.msg = "Uploaded the file successfully: " + this.file.name;
      // this.isLoading = false;
      this.fetchImages();
      // this.addImage.nativeElement.click();
      // this.Img.nativeElement.value = "";
      this.uploadProductForm.reset();
      this.toastr.success('Product Updated Successfully');
      this.isupdate = false;
      this.router.navigate(['/productList']);
    } else {
      // this.msg = "Something went wrong!,Please try again";
      this.toastr.error('Something went wrong!,Please try again later');
      // this.msg = "";
    }
    this.isLoading = false;
  }
  onUpdate() {
    if (this.productId != 0) {
      let fd = {
        scrapDealerName: this.uploadProductForm.value['scrapDealerName'],
        scrapDealerId: this.uploadProductForm.value['scrapDealerId'],
        name: this.uploadProductForm.value['name'],
        code: this.uploadProductForm.value['code'],
        quantity: this.uploadProductForm.value['quantity'],
        msp: this.uploadProductForm.value['msp'],
        cp: this.uploadProductForm.value['cp'],
        sp: this.uploadProductForm.value['sp'],
        updatedTime: this.date,
        images:
          this.savedUpdateDataImage.length > 0
            ? this.savedUpdateDataImage
            : this.productDetails.images,
        videos:
          this.savedUpdateDataVideo.length > 0
            ? this.savedUpdateDataVideo
            : this.productDetails.videos,
      };

      const docRef = this.firestore
        .collection('products')
        .doc(this.productId.toString());
      docRef
        .update(fd)
        .then(() => this.toastr.success('Data updated successfully'))

        .catch((error) => console.error(error));
    }
  }
}
