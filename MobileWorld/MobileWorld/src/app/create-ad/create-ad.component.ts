import { Component } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { DropDownModel } from '../models/drop-down-model';
import { CarAdsService } from '../services/car-ads-service';

@Component({
  selector: 'app-create-ad',
  imports: [DropDownComponent],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
  standalone : true
})
export class CreateAdComponent {

  public pageModel! : PageModel;

  constructor(private carAdsService : CarAdsService) {
    this.pageModel = new PageModel(this.carAdsService);
    this.loadData();
  }

  loadData(){
    this.pageModel.loadData();
  }

  onCreateButtonClick(){
    console.log("da");
  }

  async onCarBrandSelectItem(itemID : string){
    await this.pageModel.firstSectionFields.carModelsContextData.setInputData (
       await this.carAdsService.loadCarModelsAsDropDownModel(itemID) );
  } 
  
}

class FirstSectionFields{

  public carModelsContextData: DropDownContextData = new DropDownContextData();
  public carBrandContextData: DropDownContextData = new DropDownContextData();
  public carGearTypeContextData: DropDownContextData = new DropDownContextData();
  public carFuelTypeContextData: DropDownContextData = new DropDownContextData();
  
  constructor() {
    
  }
}

class SecondSectionFields{

  public carModelsContextData: DropDownContextData = new DropDownContextData();
  public carBrandContextData: DropDownContextData = new DropDownContextData();
  public carGearTypeContextData: DropDownContextData = new DropDownContextData();
  public carFuelTypeContextData: DropDownContextData = new DropDownContextData();
  
  constructor() {
    
  }
}

class PageModel {
  
  public firstSectionFields : FirstSectionFields = new FirstSectionFields();
  public secondSectionFields : SecondSectionFields = new SecondSectionFields();

  // public carModelsContextData: DropDownContextData = new DropDownContextData();
  // public carBrandContextData: DropDownContextData = new DropDownContextData();
  // public carGearTypeContextData: DropDownContextData = new DropDownContextData();
  // public carFuelTypeContextData: DropDownContextData = new DropDownContextData();

  constructor(private carAdsService : CarAdsService) {
    this.loadData();
    
  }

  async loadFirstSectionData() : Promise<void> {
    this.firstSectionFields.carBrandContextData.setDropDownTitle('Марка');
    this.firstSectionFields.carBrandContextData.setInputData (await this.carAdsService.loadCarBrandAsDropDownModel());

    this.firstSectionFields.carModelsContextData.setDropDownTitle('Модел');
    this.firstSectionFields.carModelsContextData.setUseCheckBoxesFlag(true);

    this.firstSectionFields.carGearTypeContextData.setDropDownTitle('Тип скоростна кутия');
    this.firstSectionFields.carGearTypeContextData.setInputData (await this.carAdsService.loadGearTypesAsDropDownModel());

    this.firstSectionFields.carFuelTypeContextData.setDropDownTitle('Тип гориво');
    this.firstSectionFields.carFuelTypeContextData.setInputData (await this.carAdsService.loadFuelTypesAsDropDownModel());
  }

  async loadData(): Promise<void> {
    
    this.loadFirstSectionData();
    
  }
  
}