import { DropDownModel } from "../models/drop-down-model";

export class DropDownContextData{
    
    private _dropDownSelectedItem : DropDownModel = new DropDownModel();
    private _dropDownSelectedItems : DropDownModel[] = new Array();
    private _dropDownItemsInputData : DropDownModel[] = [];
    private _useCheckBoxes: boolean = false;
    private _dropDownTitle: string = "";
    private _enableControl : boolean = true;

    constructor(){

    }

    setUseCheckBoxesFlag(value : boolean){
        this._useCheckBoxes = value;
    }

    getUseCheckBoxesFlag() : boolean{
        return this._useCheckBoxes;
    }

    setDropDownTitle(value : string){
        this._dropDownTitle = value;
    }

    getDropDownTitle() : string{
        return this._dropDownTitle;
    }

    setInputData(dropDownItems : DropDownModel[]){
        this._dropDownItemsInputData = dropDownItems;
    }

    getInputData() : DropDownModel[]{
        return this._dropDownItemsInputData;
    }

    setSelectedData(selectedData : DropDownModel){
        this._dropDownSelectedItem = selectedData;
    }

    setSelectedDataByID(itemID : string){
        this._dropDownSelectedItem = this._dropDownItemsInputData.find(item => item.itemID === itemID)!;
        console.log(this._dropDownItemsInputData);
    }

    getSelectedData() : DropDownModel{
        return this._dropDownSelectedItem;
    }

    hasSelectedDataItem() : boolean{
        return this._dropDownSelectedItem.itemID !== "0" || this._dropDownSelectedItem.name !== "";
    }

    addSelectedDataItem(selectedData : DropDownModel){
        this._dropDownSelectedItems.push(selectedData);
    }

    getSelectedDataItems() : DropDownModel[]{
        return this._dropDownSelectedItems;
    }

    hasSelectedDataItems() : boolean{
        return this._dropDownSelectedItems.length > 0;
    }

    deleteSelectedDataItem(itemID : string) : void{
        const currentItem : DropDownModel = this._dropDownSelectedItems.find(i=>i.itemID === itemID)!;
       
        const itemIndex = this._dropDownSelectedItems.indexOf(currentItem);
        this._dropDownSelectedItems.splice(itemIndex, 1);
    }

    setEnableControl(enable : boolean){
        this._enableControl = enable;
    }

    getEnableControl() : boolean{
        return  this._enableControl;
    }
}