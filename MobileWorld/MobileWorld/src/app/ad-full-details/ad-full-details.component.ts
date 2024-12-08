import { Component, Input, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { CarAdsService } from '../services/car-ads-service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputContextData, InputFieldType } from '../context-data-objects/input-context-data';
import { Router } from '@angular/router';
import { RoutePaths } from '../app.routes';

@Component({
  selector: 'ad-full-details',
  imports: [DropDownComponent, InputFieldComponent],
  templateUrl: './ad-full-details.component.html',
  styleUrl: './ad-full-details.component.css',
  standalone : true
})
export class AdFullDetailsComponent implements OnInit{

  public pageModel! : PageModel;
  private _enableleAllControlls : boolean = false;
  private _isInEditMode : boolean = false;
  private _isInCreateMode : boolean = false;

  private _currentUrl: string = '';

  constructor(private carAdsService : CarAdsService
    ,private _router: Router) {

    this.pageModel = new PageModel(this.carAdsService);
    this.loadData();
    this.currentUserAreOwnerOfThisAd();
  }

  ngOnInit() {

    this._currentUrl = this._router.url;

    if (this._currentUrl.startsWith('/')) {
      this._currentUrl = this._currentUrl.slice(1);
    }

    if(this._currentUrl === RoutePaths.CreateAd){
      this._enableleAllControlls = true;
      this._isInCreateMode = true;
    }
      
  }

  initForm(){}

  loadData(){

    //ако имаме потребителска сесия и сме от контекст на редакция или добавяне - disableAllControlls = false;
    //ако имаме потребителска сесия но сме от контекст на преглед и обявата на пренадлежи на този потребител disableAllControlls = true;
    //ако нямаме потребилска сесия disableAllControlls = true;
    this.pageModel.loadData();
  }

  onCreateButtonClick(){
    console.log("da");
    console.log(this.pageModel.firstSectionFields.carBrandContextData.getSelectedData());
  }

  async onCarBrandSelectItem(itemID : string){
    await this.pageModel.firstSectionFields.carModelsContextData.setInputData (
       await this.carAdsService.loadCarModelsAsDropDownModel(itemID) );
  } 

  currentUserAreOwnerOfThisAd() : boolean{
    //ако имаме потребителска сесия и ТОЗИ ПОТРЕБИТЕЛ Е създал обявата
    return true;
  }

  showOwnerButtons() : boolean{
    return this.currentUserAreOwnerOfThisAd();
  }

  onEditButtonClick(){
    if(this.currentUserAreOwnerOfThisAd()){
      this._enableleAllControlls = true;
      this._isInEditMode = true;
    }
    else
      this._enableleAllControlls = false;

      console.log('edittttttttt');
  }
  
  onCancelClick(){
    this._isInEditMode = false;
  }

  isInEditMode(){
    return this._isInEditMode;
  }

  isInCreateMode(){
    return this._isInCreateMode;
  }

  enableControls(){
    return this._enableleAllControlls;
  }

  onSaveChangesButton(){

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

  public carDistanceContextData: InputContextData = new InputContextData();
  public carYearContextData: InputContextData = new InputContextData();
  public regionContextData: DropDownContextData = new DropDownContextData();
  public euroStandardContextData: DropDownContextData = new DropDownContextData();
  
  constructor() {
    
  }
}

class ThirdSectionFields{

  public carPrice: InputContextData = new InputContextData();
  public carPriceCurrency: DropDownContextData = new DropDownContextData();
  
  constructor() {
    
  }
}

class PageModel {
  
  public firstSectionFields : FirstSectionFields = new FirstSectionFields();
  public secondSectionFields : SecondSectionFields = new SecondSectionFields();
  public thirdSectionFields : ThirdSectionFields = new ThirdSectionFields();

  constructor(private carAdsService : CarAdsService) {
    this.loadData();
    
  }

  async loadFirstSectionData() : Promise<void> {
    this.firstSectionFields.carBrandContextData.setDropDownTitle('Марка');
    this.firstSectionFields.carBrandContextData.setInputData (await this.carAdsService.loadCarBrandAsDropDownModel());

    this.firstSectionFields.carModelsContextData.setDropDownTitle('Модел');

    this.firstSectionFields.carGearTypeContextData.setDropDownTitle('Тип скоростна кутия');
    this.firstSectionFields.carGearTypeContextData.setInputData (await this.carAdsService.loadGearTypesAsDropDownModel());

    this.firstSectionFields.carFuelTypeContextData.setDropDownTitle('Тип гориво');
    this.firstSectionFields.carFuelTypeContextData.setInputData (await this.carAdsService.loadFuelTypesAsDropDownModel());
  }

  async loadSecondSectionData() : Promise<void> {
    this.secondSectionFields.carDistanceContextData.setInputFielTitle('Пробег');
    this.secondSectionFields.carDistanceContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.carYearContextData.setInputFielTitle('Година');
    this.secondSectionFields.carYearContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.regionContextData.setDropDownTitle('Местоположение');
    this.secondSectionFields.regionContextData.setInputData (await this.carAdsService.loadRegionsAsDropDownModel());

    this.secondSectionFields.euroStandardContextData.setDropDownTitle('Евростандарт');
    this.secondSectionFields.euroStandardContextData.setInputData (await this.carAdsService.loadEuroStandardsAsDropDownModel());
  }
  
  async loadThirdSectionData() : Promise<void> {
    this.thirdSectionFields.carPrice.setInputFielTitle('Цена');
    this.thirdSectionFields.carPrice.setInputFieldType(InputFieldType.Number)

    this.thirdSectionFields.carPriceCurrency.setDropDownTitle('Валута');
    this.thirdSectionFields.carPriceCurrency.setInputData (await this.carAdsService.loadCurrencysAsDropDownModel());
  }

  async loadData(): Promise<void> {

    this.loadFirstSectionData();
    this.loadSecondSectionData();
    this.loadThirdSectionData();
  }

}