export class UserData{
    customerID! : string;
    hasCustomerSesion! : boolean;
}

export class SearchFilterData{
    carBrandID! : string;
    carBrandModelsIDs! : string [];
}

interface AppState{
    userData : UserData;
    searchFilterData : SearchFilterData;
}

const initialState: AppState = {
    userData : new UserData(),
    searchFilterData : new SearchFilterData()
}

const EVENT_1 = "EVENT_1";
const EVENT_2 = "EVENT_2";
const EVENT_3 = "EVENT_3";

const reducer = (state : AppState, action: any) =>{
    switch (action) {
        case EVENT_1:
            break;

        case EVENT_2:
            break;

        case EVENT_3:
            break;
    
        default:
            break;
    }
}
