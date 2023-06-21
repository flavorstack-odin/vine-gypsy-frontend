import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
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

  getUserDetails(): Observable<any[]> {
    return this.firestore
      .collection('users')
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
  getInboundLogistics(): Observable<any[]> {
    return this.firestore
      .collection('inboundLogistics')
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

  getbalingUnits(): Observable<any[]> {
    return this.firestore
      .collection('balingUnit')
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

  getbidTxns(): Observable<any[]> {
    return this.firestore
      .collection('bidTxn')
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

  getOutboundLogistics(): Observable<any[]> {
    return this.firestore
      .collection('outboundLogistics')
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

  getDocumentsWithinLast30Days(
    collection: string,
    createdAtField: string
  ): Observable<any[]> {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const queryFn: QueryFn = (ref: any) =>
      ref
        .where(createdAtField, '>=', thirtyDaysAgo)
        .where(createdAtField, '<=', today);

    return this.firestore.collection(collection, queryFn).valueChanges();
  }
}
