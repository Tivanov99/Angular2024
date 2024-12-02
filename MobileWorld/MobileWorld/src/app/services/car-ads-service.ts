import { Injectable } from "@angular/core";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class CarAdsService {
  
  private db : Firestore;
  
  constructor() {
    initializeApp(firebaseConfig)
    this.db = getFirestore();
  }

  getCarsAds(){
    const colRef = collection(this.db,'cars_ads');

    getDocs(colRef).then( (snapshot) => {
      snapshot.docs.forEach((doc) =>
        console.log(doc.data())
      )
    });
  }
  
}