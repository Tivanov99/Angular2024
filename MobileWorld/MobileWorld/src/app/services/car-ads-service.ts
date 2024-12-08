import { Injectable } from "@angular/core";
import { getFirestore, collection, getDocs, Firestore, DocumentData } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../environments/environment";
import { CarBrand } from "../models/car-brands";
import { CarModels } from "../models/car-model";
import { DropDownModel } from "../models/drop-down-model";

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

  getLatestAds(){

  }

  private async getCarsBrands() : Promise<CarBrand[]>{
    try{

      let db : Firestore = getFirestore();
      const myCollection  = collection(db,'cars_brands');
  
      const querySnapshot = await getDocs(myCollection );
      const data: CarBrand[] = querySnapshot.docs.map(doc => ({
        id: doc.id, // ID на документа в Firestore.
        ...doc.data() as CarBrand // Преобразувайте данните към вашия интерфейс.
      }));
  
      return data;
    }
    catch (error){
        console.error("Грешка при добавяне на данните:", error);
        throw error;
    }
  }

  private async getCarsModels() : Promise<CarModels[]>{
    try{

      let db : Firestore = getFirestore();
      const myCollection  = collection(db,'cars_models');
  
      const querySnapshot = await getDocs(myCollection );
      const data: CarModels[] = querySnapshot.docs.map(doc => ({
        id: doc.id, // ID на документа в Firestore.
        ...doc.data() as CarModels // Преобразувайте данните към вашия интерфейс.
      }));
  
      return data;
    }
    catch (error){
        console.error("Грешка при добавяне на данните:", error);
        throw error;
    }
  }

  async loadCarBrandAsDropDownModel() : Promise<DropDownModel[]>{

    let carBrandsAsDropDownData : DropDownModel[] = new Array();

    await this.getCarsBrands().then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        carBrandsAsDropDownData.push(dropDownModel);
      })
    });

    return carBrandsAsDropDownData;
  }

  async loadCarModelsAsDropDownModel(carBrandID : string) :Promise<DropDownModel[]> {
    
    console.log('loadCarModelsAsDropDownModel');
    console.log(carBrandID);
    
    let carBrandsAsDropDownData : DropDownModel[] = new Array();

    await this.getCarsModels().then(data =>{
      data.forEach(item=>{
        
        let documentData = item as DocumentData;
        
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = documentData['id'];
        dropDownModel.name = item.modelName;

        if(item.carBrandID === carBrandID)
          carBrandsAsDropDownData.push(dropDownModel);
      })
    });

    return carBrandsAsDropDownData;
  }
  
}