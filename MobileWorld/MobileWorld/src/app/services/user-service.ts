import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { collection, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../environments/environment";

class UserForAuth{

    email! : string;
    password! : string;
    customerID!: string;

    constructor() {
    }

}

@Injectable({providedIn: 'root'})
export class UserService{

    USER_KEY = '[user]';
    private _user : UserForAuth = new UserForAuth();
    private db : Firestore;

    constructor() {
        initializeApp(firebaseConfig)
        this.db = getFirestore();
    }

    async login(email : string, password : string) : Promise<boolean>{

        let userFound : boolean = false;
        
        await this.getUsers<UserForAuth>('users').then(data=>{
            for (let index = 0; index < data.length; index++) {
                const element:UserForAuth = data[index];

                if(element.email === email && element.password === password){                    
                    this._user.customerID = element.customerID;
                    this._user.email = element.email;
                    this._user.password = element.password;
                    userFound = true;
                    break;
                }
            }
        }).then()

        if(userFound)
            localStorage.setItem(this.USER_KEY, JSON.stringify(this._user))

        return userFound;
    }

    logOut(){
        this._user = new UserForAuth();
        localStorage.clear();
    }

    getCustomerID() : string{
        return this._user.customerID
    }

    hasActiveSession() : boolean{
        const userSession = localStorage.getItem(this.USER_KEY);;
        if(userSession == null || userSession.trim().length === 0)
            return false;

        return true;
    }


    private async getUsers<UserForAuth>(collectionName : string) : Promise<UserForAuth[]>{
        try{
    
          let db : Firestore = getFirestore();
          const myCollection  = collection(db, collectionName);
      
          const querySnapshot = await getDocs(myCollection );
          const data: UserForAuth[] = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID на документа в Firestore.
            ...doc.data() as UserForAuth // Преобразувайте данните към вашия интерфейс.
          }));
      
          return data;
        }
        catch (error){
            throw error;
        }
      }

}