import {createAction} from "@ngrx/store"

export const INCREMENT = "[Counter] Increment";
export const DECREMENT = "[Counter] Decrement";
export const RESET = "[Counter] Reset";

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const reset = createAction(RESET);

//----------
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


