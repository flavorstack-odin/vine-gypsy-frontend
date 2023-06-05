import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private firestore: AngularFirestore) {}

  addData(collection: any, data: any): Promise<void> {
    // const id = this.firestore.createId();
    const d = new Date();
    // let time = d.getTime();
    let id: any = d.getTime();
    console.log('this.id ', id);
    return this.firestore.collection(collection).doc(id).set(data);
  }

  getFirestoreData(): Observable<any[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getBidItems(): Observable<any[]> {
    return this.firestore
      .collection('bidInfo')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getDealerDetails(): Observable<any[]> {
    return this.firestore
      .collection('scrapDealer')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getDealerDetailsDocumentById(documentId: string) {
    return this.firestore.collection('scrapDealer').doc(documentId).get();
  }
  getProductDetailsDocumentById(documentId: string) {
    return this.firestore.collection('products').doc(documentId).get();
  }
  getBidDetailsDocumentById(documentId: string) {
    return this.firestore.collection('bidInfo').doc(documentId).get();
  }
}
