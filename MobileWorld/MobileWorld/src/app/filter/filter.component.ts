import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownContextData } from '../context-data-objects/drop-down-context-data';
import { CarAdsService } from '../services/car-ads-service';
import { SearchFilterModel } from '../models/search-filter-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filter',
  imports: [ DropDownComponent, RouterModule, ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone : true
})
export class FilterComponent{

  @Output() onSearch = new EventEmitter<SearchFilterModel>();

  public pageModel! : PageModel;

  constructor(private carAdsService : CarAdsService ) {
      this.pageModel = new PageModel(this.carAdsService)
  }

  loadFuelTypes(){
    
  }

  loadTransmissionTypes(){
    
  }

  onClearButtonClick(){
    
  }

  onSearchButtonClick(){

    let searchFilterModel : SearchFilterModel = new SearchFilterModel();
    searchFilterModel.carBrand = this.pageModel.carBrandContextData.getSelectedData();
    searchFilterModel.carsModels = this.pageModel.carModelsContextData.getSelectedDataItems();
    
    // console.log('onSearchButtonClick');
    // console.log(searchFilterModel);

    
    this.onSearch.emit(searchFilterModel);
  }

  async onSelectItem(itemID : string){
    await this.pageModel.carModelsContextData.setInputData (
       await this.carAdsService.loadCarModelsAsDropDownModelByID(itemID).then() );
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
    this.carBrandContextData.setInputData (await this.carAdsService.loadCarBrandAsDropDownModel().then());

    this.carModelsContextData.setDropDownTitle('Модел');
    this.carModelsContextData.setUseCheckBoxesFlag(true);
  }
}