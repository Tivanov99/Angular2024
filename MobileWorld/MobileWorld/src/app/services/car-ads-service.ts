import { Injectable } from "@angular/core";
import { getFirestore, collection, getDocs, Firestore, DocumentData } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../environments/environment";
import { CarBrand } from "../models/car-brands";
import { CarModels } from "../models/car-model";
import { DropDownModel } from "../models/drop-down-model";
import { FuelTypeModel } from "../models/fuel-type-model";
import { GearTypeModel } from "../models/gear-type-model";
import { RegionModel } from "../models/region-model";
import { EuroStandardModel } from "../models/euro-standard-model";
import { CurrencyModel } from "../models/currency-model";

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

  private async getRecords<RecodType>(collectionName : string) : Promise<RecodType[]>{
    try{

      let db : Firestore = getFirestore();
      const myCollection  = collection(db, collectionName);
  
      const querySnapshot = await getDocs(myCollection );
      const data: RecodType[] = querySnapshot.docs.map(doc => ({
        id: doc.id, // ID на документа в Firestore.
        ...doc.data() as RecodType // Преобразувайте данните към вашия интерфейс.
      }));
  
      return data;
    }
    catch (error){
        console.error("Грешка при добавяне на данните:", error);
        throw error;
    }
  }

  async loadFuelTypesAsDropDownModel() : Promise<DropDownModel[]>{

    let fuelTypesAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<FuelTypeModel>('fuel_types').then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        fuelTypesAsDropDownData.push(dropDownModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  async loadCarBrandAsDropDownModel() : Promise<DropDownModel[]>{

    let carBrandsAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<CarBrand>('cars_brands').then(data =>{

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
    
    let carBrandsAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<CarModels>('cars_models').then(data =>{
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

  async loadGearTypesAsDropDownModel() : Promise<DropDownModel[]>{

    let fuelTypesAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<GearTypeModel>('gear_types').then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        fuelTypesAsDropDownData.push(dropDownModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  async loadRegionsAsDropDownModel() : Promise<DropDownModel[]>{

    let fuelTypesAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<RegionModel>('region').then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        fuelTypesAsDropDownData.push(dropDownModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  async loadEuroStandardsAsDropDownModel() : Promise<DropDownModel[]>{

    let fuelTypesAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<EuroStandardModel>('euroStandard').then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        fuelTypesAsDropDownData.push(dropDownModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  async loadCurrencysAsDropDownModel() : Promise<DropDownModel[]>{

    let fuelTypesAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<CurrencyModel>('currency').then(data =>{

      data.forEach(item=>{
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = item.itemID;
        dropDownModel.name = item.name;

        fuelTypesAsDropDownData.push(dropDownModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

}