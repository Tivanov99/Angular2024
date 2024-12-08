import { Action } from "@ngrx/store";
import { SearchFilterModel } from "../models/search-filter-model";
import { DropDownModel } from "../models/drop-down-model";

export const SEARCH = '[Filter] Search';
export const CLEAT = '[Filter] Clear';

export const defaultFilterState = {
    carBrand : new DropDownModel(),
    carsModels : new Array<DropDownModel>()
};

export class Search implements Action{
    readonly type = SEARCH;
    constructor() {}
}

export class Clear implements Action{
    readonly type = CLEAT;
    constructor() {}
}

export type All = Search | Clear;

function newState(state : SearchFilterModel, newState:SearchFilterModel ){
    return {...state, newState}
}

export function filterReducer(state : SearchFilterModel, action : Action ) {
    switch (action.type) {
        case SEARCH:
            return newState(state, {
                carBrand : state.carBrand,
                carsModels : state.carsModels
            })
        case CLEAT:
            return defaultFilterState;

        default:
             return defaultFilterState;
    }
}