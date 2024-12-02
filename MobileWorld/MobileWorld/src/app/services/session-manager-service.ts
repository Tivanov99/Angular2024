import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SessionManagerService {

    constructor() {
        
    }

    startSession() : void{
        
    }

    endSession() : void{
        
    }

    hasActiveSession() : boolean{
        const userSession = localStorage.getItem("customerSession");;
        if(userSession == null || userSession.trim().length === 0)
            return false;

        return true;
    }
}
