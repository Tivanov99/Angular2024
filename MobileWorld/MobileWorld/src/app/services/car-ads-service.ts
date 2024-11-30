import { Injectable } from "@angular/core";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class CarAdsService {
<<<<<<< HEAD
  
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
=======

  constructor(private http: HttpClient) {
  }

  getCarAds() : void{
    this.http.get('https://mobileworld-18285-default-rtdb.firebaseio.com/car_ads.json')
      .subscribe((res) => {console.log(res)});
  }
}
>>>>>>> e889f4b3b617400d1a5ba39b20a0dcdb06baaf20
