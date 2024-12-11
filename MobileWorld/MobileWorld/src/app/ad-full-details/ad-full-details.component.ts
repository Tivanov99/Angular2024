import { Component, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { CarAdsService } from '../services/car-ads-service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputContextData, InputFieldType } from '../context-data-objects/input-context-data';
import { Router } from '@angular/router';
import { AdFullDetailsModel } from '../models/ad-full-details-model';
import { UserService } from '../services/user-service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RoutePaths } from '../app.routes';

@Component({
  selector: 'ad-full-details',
  imports: [DropDownComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './ad-full-details.component.html',
  styleUrl: './ad-full-details.component.css',
  standalone : true
})
export class AdFullDetailsComponent implements OnInit{

  public pageModel! : PageModel;
  private _enableleAllControlls : boolean = false;
  private _isInEditMode : boolean = false;
  private _isInCreateMode : boolean = false;
  private _adID! : string ;
  private _adData : AdFullDetailsModel = new AdFullDetailsModel();
  private _errorOccurs: boolean = false;
  private _invalidForm : boolean = false;

  createAdForm! : FormGroup;

  constructor(private _carAdsService : CarAdsService
    , private _router: Router
    , private _userService : UserService
    , private _formBuilder: FormBuilder) {
        this.pageModel = new PageModel(this._carAdsService);
        this.currentUserAreOwnerOfThisAd();

        this.createAdForm = this._formBuilder.group({
          carBrand: [null],
          carModels: [null],
          carGearType: [null],
          carFuelType: [null],
          carDistance: [null],
          carYear: [null],
          region: [null],
          euroStandard: [null],
          carPrice: [null],
          carPriceCurrency: [null],
          horsePower: [null],
          engineDisplacement: [null],
      });
  }

  async ngOnInit() {

    const snapshot = this._router.routerState.snapshot;
    const urlSegments = snapshot.url.split('/');
    const idIndex = urlSegments.findIndex(segment => segment === 'details');
    if (idIndex !== -1 && urlSegments[idIndex + 1]) {
      this._adID = urlSegments[idIndex + 1];
    }

    if(idIndex === -1){
      this._enableleAllControlls = true;
      this._isInCreateMode = true;
    }

    await this.loadData();
  }

  hasErrors() : boolean{
    return this._errorOccurs;
  }

  onDeleteButton(){
    
  }

  async loadData(){
    
    await this._carAdsService.loadAd(this._adID).then(fetchData=>{
      this._adData = fetchData
    });
    
    if( this._adData === undefined){
      this._errorOccurs = true;
      return;
    }
    
    this.initControls();
  }

  initControls() : void{

    if(this.isInCreateMode())
      return;
    
    this.pageModel.firstSectionFields.carBrandContextData.setSelectedDataByID(this._adData.carBrandID);
    this.onCarBrandSelectItem(this._adData.carBrandID);
    this.pageModel.firstSectionFields.carModelsContextData.setSelectedDataByID(this._adData.carModelID);
    
    this.pageModel.firstSectionFields.carGearTypeContextData.setSelectedDataByID(this._adData.carGearID);
    this.pageModel.firstSectionFields.carFuelTypeContextData.setSelectedDataByID(this._adData.carFuelTypeID);

    this.pageModel.secondSectionFields.carDistanceContextData.setInputFieldData(this._adData.carDistanceID);
    this.pageModel.secondSectionFields.carYearContextData.setInputFieldData(this._adData.carYear);

    this.pageModel.secondSectionFields.regionContextData.setSelectedDataByID(this._adData.regionID);
    this.pageModel.secondSectionFields.euroStandardContextData.setSelectedDataByID(this._adData.euroStandardID);
    
    this.pageModel.thirdSectionFields.carPriceContextData.setInputFieldData(this._adData.carPrice);
    this.pageModel.thirdSectionFields.carPriceCurrencyContextData.setSelectedDataByID(this._adData.carPriceCurrencyID);
    this.pageModel.thirdSectionFields.horsePowerContextData.setInputFieldData(this._adData.horsePower);
    this.pageModel.thirdSectionFields.engineDisplacementContextData.setInputFieldData(this._adData.engineDisplacement);
  
  }

  hasInvalidFormData() : boolean{
    return this._invalidForm;
  }

  private validateFormData() : boolean{
    
    Object.keys(this.createAdForm.controls).forEach((controlName) => {
      const control = this.createAdForm.get(controlName);
      control?.markAsTouched(); // Маркира контролата като "пипната"
      control?.updateValueAndValidity(); // Задейства валидацията
    });

    this._invalidForm = false;

    if(!this.createAdForm.valid){
      this._invalidForm = true;
      return false;
    }

    return true;
  }

  private transferContextDataToModel(destinationModel : AdFullDetailsModel){
    destinationModel.adID = this._adID;
    destinationModel.customerCreatorID = this._userService.getCustomerID();
    destinationModel.carModelID = this.pageModel.firstSectionFields.carModelsContextData.getSelectedData().itemID;
    destinationModel.carBrandID = this.pageModel.firstSectionFields.carBrandContextData.getSelectedData().itemID;
    destinationModel.carGearID = this.pageModel.firstSectionFields.carGearTypeContextData.getSelectedData().itemID;
    destinationModel.carFuelTypeID = this.pageModel.firstSectionFields.carFuelTypeContextData.getSelectedData().itemID;

    destinationModel.carDistanceID = this.pageModel.secondSectionFields.carDistanceContextData.getInputData();
    destinationModel.carYear = this.pageModel.secondSectionFields.carYearContextData.getInputData();
    destinationModel.regionID = this.pageModel.secondSectionFields.regionContextData.getSelectedData().itemID;

    destinationModel.euroStandardID = this.pageModel.secondSectionFields.euroStandardContextData.getSelectedData().itemID;

    destinationModel.carPrice = this.pageModel.thirdSectionFields.carPriceContextData.getInputData();
    destinationModel.carPriceCurrencyID = this.pageModel.thirdSectionFields.carPriceCurrencyContextData.getSelectedData().itemID;
    destinationModel.horsePower = this.pageModel.thirdSectionFields.horsePowerContextData.getInputData();
    destinationModel.engineDisplacement = this.pageModel.thirdSectionFields.engineDisplacementContextData.getInputData();
    
    destinationModel.registerDataTime = new Date().toLocaleString("bg-BG");
  }

  async handleCreate(){
    
    if(!this.validateFormData())
      return;

    let adFullDetailsModel : AdFullDetailsModel = new AdFullDetailsModel();

    this.transferContextDataToModel(adFullDetailsModel);

    const successCreate : boolean = await this._carAdsService.createAd(adFullDetailsModel).then();
    if(successCreate)
      this._router.navigate([RoutePaths.MyAds]);
    else
      this._errorOccurs = true;
    
  }

  async handleUpdate(){
    
    if(!this.validateFormData())
      return;

    console.log('handleUpdate');
    
    let adFullDetailsModel : AdFullDetailsModel = new AdFullDetailsModel();

    this.transferContextDataToModel(adFullDetailsModel);

    const successUpdate : boolean = await this._carAdsService.updateAd(adFullDetailsModel).then();
    if(successUpdate)
      this._router.navigate([RoutePaths.MyAds]);
    else
      this._errorOccurs = true;
    
  }

  async onCarBrandSelectItem(itemID : string){
    this._carAdsService.loadCarModelsAsDropDownModelByID(itemID).then(data =>{
      this.pageModel.firstSectionFields.carModelsContextData.setInputData(data)
    });
  } 

  currentUserAreOwnerOfThisAd() : boolean{

    if(!this.isInCreateMode() && this._userService.hasActiveSession()
      && this._userService.getCustomerID() === this._adData.customerCreatorID)
      return true;

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
  }
  
  onCancelClick(){
    this._isInEditMode = false;
    this._enableleAllControlls = false;
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

    this.carAdsService.loadCarBrandAsDropDownModel().then(data =>{
      this.firstSectionFields.carBrandContextData.setInputData ( data );
    });


    this.firstSectionFields.carModelsContextData.setDropDownTitle('Модел');

    this.carAdsService.loadCarModelsAsDropDownModel().then(data =>{
      this.firstSectionFields.carModelsContextData.setInputData ( data );
    });

    this.firstSectionFields.carGearTypeContextData.setDropDownTitle('Тип скоростна кутия');

    this.carAdsService.loadGearTypesAsDropDownModel().then(data =>{
      this.firstSectionFields.carGearTypeContextData.setInputData ( data );
    });

    this.firstSectionFields.carFuelTypeContextData.setDropDownTitle('Тип гориво');

    this.carAdsService.loadFuelTypesAsDropDownModel().then(data =>{
      this.firstSectionFields.carFuelTypeContextData.setInputData ( data );
    })
  }

  async loadSecondSectionData() : Promise<void> {
    this.secondSectionFields.carDistanceContextData.setInputFielTitle('Пробег');
    this.secondSectionFields.carDistanceContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.carYearContextData.setInputFielTitle('Година');
    this.secondSectionFields.carYearContextData.setInputFieldType(InputFieldType.Number)

    this.secondSectionFields.regionContextData.setDropDownTitle('Местоположение');
    this.carAdsService.loadRegionsAsDropDownModel().then(data =>{
      this.secondSectionFields.regionContextData.setInputData ( data );
    });

    this.secondSectionFields.euroStandardContextData.setDropDownTitle('Евростандарт');
    this.carAdsService.loadEuroStandardsAsDropDownModel().then(data =>{
      this.secondSectionFields.euroStandardContextData.setInputData ( data );
    });
  }
  
  async loadThirdSectionData() : Promise<void> {
    this.thirdSectionFields.carPriceContextData.setInputFielTitle('Цена');
    this.thirdSectionFields.carPriceContextData.setInputFieldType(InputFieldType.Number)

    this.thirdSectionFields.carPriceCurrencyContextData.setDropDownTitle('Валута');
    this.carAdsService.loadCurrencysAsDropDownModel().then(data =>{
      this.thirdSectionFields.carPriceCurrencyContextData.setInputData (data);
    });
  
    this.thirdSectionFields.horsePowerContextData.setInputFielTitle('Конски сили');
    this.thirdSectionFields.horsePowerContextData.setInputFieldType(InputFieldType.Number)

    this.thirdSectionFields.engineDisplacementContextData.setInputFielTitle('Кубатура на двигателя');
    this.thirdSectionFields.engineDisplacementContextData.setInputFieldType(InputFieldType.Number)
  }

  async loadData(): Promise<void> {
    await this.loadFirstSectionData();
    await this.loadSecondSectionData();
    await this.loadThirdSectionData();
  }

}