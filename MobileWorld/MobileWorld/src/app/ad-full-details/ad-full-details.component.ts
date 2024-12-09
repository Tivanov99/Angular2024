import { Component, Input, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { CarAdsService } from '../services/car-ads-service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputContextData, InputFieldType } from '../context-data-objects/input-context-data';
import { Router } from '@angular/router';
import { RoutePaths } from '../app.routes';
import { AdFullDetailsModel } from '../models/ad-full-details-model';
import { UserService } from '../services/user-service';

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

  constructor(private _carAdsService : CarAdsService
    , private _router: Router
    , private _userService : UserService) {

    this.pageModel = new PageModel(this._carAdsService);
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

  async onCreateButtonClick(){

    let adFullDetailsModel : AdFullDetailsModel = new AdFullDetailsModel();

    adFullDetailsModel.customerCreatorID = "1";
    adFullDetailsModel.carModelID = this.pageModel.firstSectionFields.carModelsContextData.getSelectedData().itemID;
    adFullDetailsModel.carBrandID = this.pageModel.firstSectionFields.carBrandContextData.getSelectedData().itemID;
    adFullDetailsModel.carGearID = this.pageModel.firstSectionFields.carGearTypeContextData.getSelectedData().itemID;
    adFullDetailsModel.carFuelTypeID = this.pageModel.firstSectionFields.carFuelTypeContextData.getSelectedData().itemID;

    adFullDetailsModel.carDistanceID = this.pageModel.secondSectionFields.carDistanceContextData.getInputData();
    adFullDetailsModel.carYear = this.pageModel.secondSectionFields.carYearContextData.getInputData();
    adFullDetailsModel.regionID = this.pageModel.secondSectionFields.regionContextData.getSelectedData().itemID;
    adFullDetailsModel.euroStandardID = this.pageModel.secondSectionFields.euroStandardContextData.getSelectedData().itemID;

    adFullDetailsModel.carPrice = this.pageModel.thirdSectionFields.carPriceContextData.getInputData();
    adFullDetailsModel.carPriceCurrencyID = this.pageModel.thirdSectionFields.carPriceCurrencyContextData.getSelectedData().itemID;
    adFullDetailsModel.horsePower = this.pageModel.thirdSectionFields.horsePowerContextData.getInputData();
    adFullDetailsModel.engineDisplacement = this.pageModel.thirdSectionFields.engineDisplacementContextData.getInputData();
    
    adFullDetailsModel.registerDataTime = new Date().toLocaleString("bg-BG");

    await this._carAdsService.createAd(adFullDetailsModel);
  }

  async onCarBrandSelectItem(itemID : string){
    await this.pageModel.firstSectionFields.carModelsContextData.setInputData (
       await this._carAdsService.loadCarModelsAsDropDownModel(itemID) );
  } 

  currentUserAreOwnerOfThisAd() : boolean{

    if(this._userService.hasActiveSession())
      return true;

    //ако имаме потребителска сесия и ТОЗИ ПОТРЕБИТЕЛ Е създал обявата- 
    //сравняваме creatorID с customerID от сесията
    return false;
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

  public carPriceContextData: InputContextData = new InputContextData();
  public carPriceCurrencyContextData: DropDownContextData = new DropDownContextData();
  public horsePowerContextData: InputContextData = new InputContextData();
  public engineDisplacementContextData: InputContextData = new InputContextData();
  
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
    this.firstSectionFields.carBrandContextData.setInputData (await this.carAdsService.loadCarBrandAsDropDownModel().then());

    this.firstSectionFields.carModelsContextData.setDropDownTitle('Модел');

    this.firstSectionFields.carGearTypeContextData.setDropDownTitle('Тип скоростна кутия');
    this.firstSectionFields.carGearTypeContextData.setInputData (await this.carAdsService.loadGearTypesAsDropDownModel().then());

    this.firstSectionFields.carFuelTypeContextData.setDropDownTitle('Тип гориво');
    this.firstSectionFields.carFuelTypeContextData.setInputData (await this.carAdsService.loadFuelTypesAsDropDownModel().then());
  }

  async loadSecondSectionData() : Promise<void> {
    this.secondSectionFields.carDistanceContextData.setInputFielTitle('Пробег');
    this.secondSectionFields.carDistanceContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.carYearContextData.setInputFielTitle('Година');
    this.secondSectionFields.carYearContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.regionContextData.setDropDownTitle('Местоположение');
    this.secondSectionFields.regionContextData.setInputData (await this.carAdsService.loadRegionsAsDropDownModel().then());

    this.secondSectionFields.euroStandardContextData.setDropDownTitle('Евростандарт');
    this.secondSectionFields.euroStandardContextData.setInputData (await this.carAdsService.loadEuroStandardsAsDropDownModel().then());
  }
  
  async loadThirdSectionData() : Promise<void> {
    this.thirdSectionFields.carPriceContextData.setInputFielTitle('Цена');
    this.thirdSectionFields.carPriceContextData.setInputFieldType(InputFieldType.Number)

    this.thirdSectionFields.carPriceCurrencyContextData.setDropDownTitle('Валута');
    this.thirdSectionFields.carPriceCurrencyContextData.setInputData (await this.carAdsService.loadCurrencysAsDropDownModel().then());
  
    this.thirdSectionFields.horsePowerContextData.setInputFielTitle('Конски сили');
    this.thirdSectionFields.horsePowerContextData.setInputFieldType(InputFieldType.Number)

    this.thirdSectionFields.engineDisplacementContextData.setInputFielTitle('Кубатура на двигателя');
    this.thirdSectionFields.engineDisplacementContextData.setInputFieldType(InputFieldType.Number)
  }

  async loadData(): Promise<void> {

    this.loadFirstSectionData();
    this.loadSecondSectionData();
    this.loadThirdSectionData();
  }

}