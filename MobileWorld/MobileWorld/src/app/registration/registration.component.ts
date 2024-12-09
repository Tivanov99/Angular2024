import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../services/user-service';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { RoutePaths } from '../app.routes';

@Component({
  selector: 'registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone : true
})
export class RegistrationComponent {

  private _message: string = '';
  private _hasErrors : boolean = false;
  private _registrationIsSuccess = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private _userService : UserService
    , private _router: Router) {
    
  }

  async handleSubmit(){

    this._registrationIsSuccess = false;

    if (this.registerForm.invalid) {
      this._hasErrors = true;
      this._message = 'Некоректни данни във формата'
      return;
    }

    if(this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value){
      this._message = 'Паролите не съвпадат.'
      this._hasErrors = true;
      return;
    }
    
    this._hasErrors = false;

    let userModel : UserModel = new UserModel();
    userModel.password = this.registerForm.controls.password.value!;
    userModel.userName = this.registerForm.controls.username.value!;
    userModel.email = this.registerForm.controls.email.value!;
    this._message = '';

    this._message = await this._userService.createUser(userModel).then();

    if(this._message.length > 0)
    {
      this._hasErrors = true;
      return;
    }

    this._registrationIsSuccess = true;
    this._message = 'Успешна регистрация'
    this.registerForm.reset();
  }

  getMessage() : string{
    return this._message;
  }

  hasErrors() : boolean{
    return this._hasErrors;
  }
  
  registrationIsSuccess() : boolean{
    return this._registrationIsSuccess;
  }

  login(){
    this._router.navigate([RoutePaths.Login]);
  }

}