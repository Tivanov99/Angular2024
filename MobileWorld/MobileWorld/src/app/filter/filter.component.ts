import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownModel } from '../models/drop-down-model';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { CarAdsService } from '../services/car-ads-service';

@Component({
  selector: 'app-filter',
  imports: [ DropDownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone : true
})
export class FilterComponent{

  public pageModel! : PageModel;

  @Output() searchEvent = new EventEmitter<void>();

  constructor(private carAdsService : CarAdsService) {
    this.pageModel = new PageModel(this.carAdsService)
  }

  loadFuelTypes(){
    
  }

  loadTransmissionTypes(){
    
  }

  onClearButtonClick(){
    console.log('чистим');
    
  }

  onSearchButtonClick(){

    this.searchEvent.emit();

    console.log(this.pageModel.carBrandContextData.getSelectedData());
    console.log(this.pageModel.carModelsContextData.getSelectedDataItems());

    console.log('търсене');
  }

  async onSelectItem(itemID : string){
    await this.pageModel.carModelsContextData.setInputData (
       await this.carAdsService.loadCarModelsAsDropDownModel(itemID) );
  } 

}

class PageModel {

  public carModelsContextData: DropDownContextData = new DropDownContextData();
  public carBrandContextData: DropDownContextData = new DropDownContextData();

  constructor(private carAdsService : CarAdsService) {
    this.loadData();
  }

  async loadData(): Promise<void> {

    this.carBrandContextData.setDropDownTitle('Марка');
    this.carBrandContextData.setInputData (await this.carAdsService.loadCarBrand());

    this.carModelsContextData.setDropDownTitle('Модел');
    this.carModelsContextData.setUseCheckBoxesFlag(true);
  }
}