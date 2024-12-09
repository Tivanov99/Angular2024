import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentData, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../environments/environment";
import { UserModel } from "../models/user-model";

@Injectable({providedIn: 'root'})
export class UserService{

    USER_KEY = '[user]';
    private db : Firestore;

    constructor() {
        initializeApp(firebaseConfig)
        this.db = getFirestore();
    }

    private async checkForExistingEmail(email : string) : Promise<boolean>{

        let emailFound : boolean = false;
        
        await this.getData<UserModel>('users').then(data=>{
            for (let index = 0; index < data.length; index++) {
                const element:UserModel = data[index];
                if(element.email === email ){    
                    emailFound = true;
                    break;
                }
            }
        }).then()

        return emailFound;
    }

    async createUser(userModel : UserModel) : Promise<string>{

        let message : string = '';
        let emailFoud = false;
        
        try{
            await this.checkForExistingEmail(userModel.email).then(data=>{
                if(data === true){
                    emailFoud = true;
                }
            });
        }catch (error){
            message = 'Възникна грешка';
            return message;
        }
        
        if(emailFoud){
            message = 'Има вече съществуващ потребител с този имейл адрес';
            return message;
        }

        try{
            let db : Firestore = getFirestore();
            await addDoc(collection(db, 'users'), {
                userName : userModel.userName,
                email : userModel.email,
                password : userModel.password
            });
        }
        catch (error){
            message = 'Грешка при добавяне на данните';
            return message;
        }

        return message;
    }

    async login(email : string, password : string) : Promise<boolean>{

        let userFound : boolean = false;
        let userModel : UserModel = new UserModel();

        await this.getData<UserModel>('users').then(data=>{
            for (let index = 0; index < data.length; index++) {
                const element:UserModel = data[index];
                if(element.email === email && element.password === password){    
                    let documentData = element as DocumentData;
                    userModel.userName = element.userName,  
                    userModel.customerID = documentData['id'];
                    userModel.email = element.email;
                    userModel.password = element.password;
                    userFound = true;
                    break;
                }
            }
        }).then()

        if(userFound)
            localStorage.setItem(this.USER_KEY, JSON.stringify(userModel))

        return userFound;
    }

    logOut(){
        localStorage.removeItem(this.USER_KEY);
    }

    getCustomerID() : string{
        let userModel : UserModel = JSON.parse(localStorage.getItem(this.USER_KEY)!);

        return userModel.customerID
    }

    hasActiveSession() : boolean{
        const userSession = localStorage.getItem(this.USER_KEY);;
        if(userSession == null || userSession.trim().length === 0)
            return false;
        
        return true;
    }


    private async getData<UserForAuth>(collectionName : string) : Promise<UserForAuth[]>{
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