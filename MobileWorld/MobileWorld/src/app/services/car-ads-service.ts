import { Injectable } from "@angular/core";
import { getFirestore,addDoc, collection, doc, getDocs, Firestore, DocumentData, setDoc, deleteDoc} from 'firebase/firestore';
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
import { AdFullDetailsModel } from "../models/ad-full-details-model";
import { AdShortDetailsModel } from "../models/ad-short-details-model";

export enum CarsRequiredDataExpansion{
  FullData,
  LatestData 
}

@Injectable({providedIn: 'root'})
export class CarAdsService {
  
  private db : Firestore;
  
  constructor() {
    initializeApp(firebaseConfig)
    this.db = getFirestore();
  }

  async deleteAd(adID : string) : Promise<Boolean>{

    const documentPath : string = `cars_ads/${adID}`;
    let result : boolean = true;
    console.log(documentPath);
    
    try{
      let db : Firestore = getFirestore();
      await deleteDoc( doc(db,documentPath));
    }
    catch{
      result = false;
    }

    return result;
  }

  async updateAd(updatedAdModel : AdFullDetailsModel) : Promise<Boolean>{

    let successUpdate : boolean = true;
    const documentPath : string = `cars_ads/${updatedAdModel.adID}`;
    
    try{
      let db : Firestore = getFirestore();
      const docRef = await setDoc(doc(db, documentPath),{
        adID : updatedAdModel.adID,
        carModelID : updatedAdModel.carModelID,
        carBrandID : updatedAdModel.carBrandID,
        carGearID : updatedAdModel.carGearID,
        carFuelTypeID : updatedAdModel.carFuelTypeID,
        carDistanceID : updatedAdModel.carDistanceID,
        carYear : updatedAdModel.carYear,
        regionID : updatedAdModel.regionID,
        euroStandardID : updatedAdModel.euroStandardID,
        horsePower : updatedAdModel.horsePower,
        engineDisplacement : updatedAdModel.engineDisplacement,
        carPrice : updatedAdModel.carPrice,
        carPriceCurrencyID : updatedAdModel.carPriceCurrencyID,
        registerDataTime : updatedAdModel.registerDataTime,
        customerCreatorID : updatedAdModel.customerCreatorID
      })
    }
    catch (error){
      successUpdate = false;
    }

    return successUpdate;
  }

  async createAd(newCarAd : AdFullDetailsModel) : Promise<Boolean>{

    let successCreate : boolean = true;

    try{
      let db : Firestore = getFirestore();

      const docRef = await addDoc(collection(db, 'cars_ads'), {
        customerCreatorID : newCarAd.customerCreatorID,
        carModelID : newCarAd.carModelID,
        carBrandID : newCarAd.carBrandID,
        carGearID : newCarAd.carGearID,
        carFuelTypeID : newCarAd.carFuelTypeID,
        carDistanceID : newCarAd.carDistanceID,
        carYear : newCarAd.carYear,
        regionID : newCarAd.regionID,
        horsePower: newCarAd.horsePower,
        engineDisplacement: newCarAd.engineDisplacement,
        euroStandardID : newCarAd.euroStandardID,
        carPrice : newCarAd.carPrice,
        carPriceCurrencyID : newCarAd.carPriceCurrencyID,
        registerDataTime : newCarAd.registerDataTime,
      });
    }
    catch (error){
      successCreate = false;
    }

    return successCreate;
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

  async loadAd(adID : string) : Promise<AdFullDetailsModel> {

    let adModel : AdFullDetailsModel = new AdFullDetailsModel();

    await this.getRecords<AdFullDetailsModel>('cars_ads').then(data =>{
      for (let index = 0; index < data.length; index++) {

        const element = data[index];
        const documentData = element as DocumentData;
        adModel.adID = documentData['id'];

        if(adID === documentData['id'] as string ){
          adModel.adID = documentData['id'];
          adModel= element;
          break;
        }
      }
    });

    return adModel;
  }

  private async loadAds(){

    const fuelTypes : FuelTypeModel[] = await this.loadFuelTypes().then();
    const gearTypes : GearTypeModel[] = await this.loadGearTypes().then();
    const regions : RegionModel[] = await this.loadRegions().then();
    const carModels : CarModels[] = await this.loadCarModels().then();
    const carBrands : CarBrand[] = await this.loadCarBrands().then();
    const currencyes : CurrencyModel[] = await this.loadCurrency().then();
    
    let ads : AdShortDetailsModel[] = new Array();

    await this.getRecords<AdFullDetailsModel>('cars_ads').then(data =>{

      data.forEach(adFullDetails=>{
        let adShortDetails : AdShortDetailsModel = new AdShortDetailsModel();

        const carBrand : string = carBrands.find(i=>i.itemID === adFullDetails.carBrandID)!.name;
        const carModel : string = carModels.find(i=>i.modelID === adFullDetails.carModelID)!.modelName;

        const documentData = adFullDetails as DocumentData;
        
        adShortDetails.customerCreatorID = adFullDetails.customerCreatorID;
        adShortDetails.adID = documentData['id'];
        adShortDetails.header = `${carBrand} ${carModel}`;
        adShortDetails.carPrice = adFullDetails.carPrice;
        adShortDetails.engineDisplacement = adFullDetails.engineDisplacement;
        adShortDetails.carDistanceID = adFullDetails.carDistanceID;
        adShortDetails.carYear = adFullDetails.carYear;
        adShortDetails.registerDataTime = adFullDetails.registerDataTime;
        adShortDetails.carFuelName = fuelTypes.find(i=>i.itemID === adFullDetails.carFuelTypeID)!.name;
        adShortDetails.carGearTypeName = gearTypes.find(i=>i.itemID === adFullDetails.carGearID)!.name;
        adShortDetails.regionName = regions.find(i=>i.itemID === adFullDetails.regionID)!.name;
        adShortDetails.currencyType = currencyes.find(i=>i.itemID === adFullDetails.carPriceCurrencyID)!.name;
        
        ads.push(adShortDetails);
      })
    });

    return ads;
  }
  
  async loadCustomerAds(customerID : string) : Promise<AdShortDetailsModel[]>{

    let userAds : AdShortDetailsModel [] = new Array();

    await this.loadAds().then((data) => {
        userAds.push(...data.filter(ad => ad.customerCreatorID === customerID))
      });

    return userAds;
  }

  async loadLatetAds() : Promise<AdShortDetailsModel[]> {

    let latestAds : AdShortDetailsModel [] = new Array();

    await this.loadAds().then((data) => {
        latestAds = data.sort((a, b) => {
        const dateA = this.parseDateString(a.registerDataTime);
        const dateB = this.parseDateString(b.registerDataTime);
        return dateB.getTime() - dateA.getTime(); // Низходящ ред
      });

    });
    
    // Вземане на първите 4 записа
    const top4Records = latestAds.slice(0, 3);

    return top4Records
  }

  parseDateString(dateString: string): Date {

    // Премахване на "г." и "ч."
    const cleanedString = dateString.replace('г.', '').replace('ч.', '').trim();
    
    // Разделяне на датата и часа
    const [datePart, timePart] = cleanedString.split(', ');
    
    // Преобразуване на датата в формат ISO (YYYY-MM-DD)
    const [day, month, year] = datePart.split('.').map(Number);

    // console.log(`${day} ${month} ${year}`);
    
    const isoString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${timePart}`;
    
    return new Date(isoString);
  }

  private async loadCurrency() : Promise<CurrencyModel[]>{

    let currencyes : CurrencyModel[] = new Array();

    await this.getRecords<CurrencyModel>('currency').then(data =>{

      data.forEach(item=>{
        let carBrandModel : CurrencyModel = new CurrencyModel();
        carBrandModel.itemID = item.itemID;
        carBrandModel.name = item.name;

        currencyes.push(carBrandModel);
      })
    });

    return currencyes;
  }

  private async loadCarBrands() : Promise<CarBrand[]>{

    let carBrandsData : CarBrand[] = new Array();

    await this.getRecords<CarBrand>('cars_brands').then(data =>{

      data.forEach(item=>{
        let carBrandModel : CarBrand = new CarBrand();
        carBrandModel.itemID = item.itemID;
        carBrandModel.name = item.name;

        carBrandsData.push(carBrandModel);
      })
    });

    return carBrandsData;
  }

  private async loadCarModels() : Promise<CarModels[]>{

    let carModels : CarModels[] = new Array();

    await this.getRecords<CarModels>('cars_models').then(data =>{

      data.forEach(item=>{
        let documentData = item as DocumentData;

        let carModel : CarModels = new CarModels();

        carModel.modelID = documentData['id'];
        carModel.carBrandID = item.carBrandID;
        carModel.modelName = item.modelName;

        carModels.push(carModel);
      })
    });

    return carModels;
  }

  private async loadRegions() : Promise<RegionModel[]>{

    let fuelTypesAsDropDownData : RegionModel[] = new Array();

    await this.getRecords<RegionModel>('region').then(data =>{

      data.forEach(item=>{
        let regionModel : RegionModel = new RegionModel();
        regionModel.itemID = item.itemID;
        regionModel.name = item.name;

        fuelTypesAsDropDownData.push(regionModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  private async loadGearTypes() : Promise<GearTypeModel[]>{

    let fuelTypesAsDropDownData : GearTypeModel[] = new Array();

    await this.getRecords<GearTypeModel>('gear_types').then(data =>{

      data.forEach(item=>{
        let gearTypeModel : GearTypeModel = new GearTypeModel();
        gearTypeModel.itemID = item.itemID;
        gearTypeModel.name = item.name;

        fuelTypesAsDropDownData.push(gearTypeModel);
      })
    });

    return fuelTypesAsDropDownData;
  }

  private async loadFuelTypes() : Promise<FuelTypeModel[]>{

    let fuelTypesAsDropDownData : FuelTypeModel[] = new Array();

    await this.getRecords<FuelTypeModel>('fuel_types').then(data =>{

      data.forEach(item=>{
        let fuelTypeModel : FuelTypeModel = new FuelTypeModel();
        fuelTypeModel.itemID = item.itemID;
        fuelTypeModel.name = item.name;

        fuelTypesAsDropDownData.push(fuelTypeModel);
      })
    });

    return fuelTypesAsDropDownData;
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

  async loadCarModelsAsDropDownModel() :Promise<DropDownModel[]> {
    
    let carBrandsAsDropDownData : DropDownModel[] = new Array();

    await this.getRecords<CarModels>('cars_models').then(data =>{
      data.forEach(item=>{
        
        let documentData = item as DocumentData;
        
        let dropDownModel : DropDownModel = new DropDownModel();
        dropDownModel.itemID = documentData['id'];
        dropDownModel.name = item.modelName;

        carBrandsAsDropDownData.push(dropDownModel);
      })
    });

    return carBrandsAsDropDownData;
  }

  async loadCarModelsAsDropDownModelByID(carBrandID : string) :Promise<DropDownModel[]> {
    
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