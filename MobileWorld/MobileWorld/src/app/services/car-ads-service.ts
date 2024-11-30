import { Injectable } from "@angular/core";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class CarAdsService {
  
  constructor() {
    initializeApp(firebaseConfig)
  }

  getCarAds(){
    const db = getFirestore();
    const colRef = collection(db,'cars_ads');

    getDocs(colRef)
    .then( (snapshot) => {
      snapshot.docs.forEach((doc) =>
        console.log(doc.data())
      )
    });
  }
}