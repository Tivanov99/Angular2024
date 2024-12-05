import { DropDownModel } from "../models/drop-down-model";

export class DropDownContextData{

    private _contextDataItem : DropDownModel = new DropDownModel();
    private _contextDataItems : DropDownModel[] = new Array();
    private _dropDownItems : DropDownModel[] = [];
    private _useCheckBoxes: boolean = false;
    private _dropDownTitle: string = "";

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
        this._dropDownItems = dropDownItems;
    }

    getInputData() : DropDownModel[]{
        return this._dropDownItems;
    }

    setSelectedData(selectedData : DropDownModel){
        this._contextDataItem = selectedData;

        console.log(`selected data IS ${selectedData.name} ${selectedData.itemID}`)
    }

    getSelectedData() : DropDownModel{
        return this._contextDataItem;
    }

    hasSelectedDataItem() : boolean{
        return this._contextDataItem.itemID !== "0" || this._contextDataItem.name !== "";
    }

    addSelectedDataItem(selectedData : DropDownModel){
        this._contextDataItems.push(selectedData);

        console.log(selectedData);
    }

    getSelectedDataItems() : DropDownModel[]{
        return this._contextDataItems;
    }

    hasSelectedDataItems() : boolean{
        return this._contextDataItems.length > 0;
    }

    deleteSelectedDataItem(itemID : string) : void{
        const currentItem : DropDownModel = this._contextDataItems.find(i=>i.itemID === itemID)!;
        const itemIndex = this._contextDataItems.indexOf(currentItem);
        this._contextDataItems.slice(itemIndex, 1);
    }
}