export enum InputFieldType{
    Text = "text",
    Number = "number"
}

export class InputContextData{

    private _inputFieldTitle: string = "";
    private _inputFieldValue: string = "";
    public _inputFieldType: string = InputFieldType.Text;

    constructor() {
    }

    getInputFielTitle() : string{
        return this._inputFieldTitle;
    }

    setInputFielTitle(value : string){
        this._inputFieldTitle = value;
    }

    getInputData() : string{
        return this._inputFieldValue;
    }

    setInputFieldData(value : string){
        this._inputFieldValue = value;
    }

    getInputFieldType() : string{
        return this._inputFieldType;
    }

    setInputFieldType(inputFieldType : InputFieldType){
        this._inputFieldType = inputFieldType;
    }
}