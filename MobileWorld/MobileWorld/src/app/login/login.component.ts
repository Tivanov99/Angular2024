import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputContextData, InputFieldType } from '../context-data-objects/input-context-data';
import { Router } from '@angular/router';
import { RoutePaths } from '../app.routes';

@Component({
  selector: 'login',
  imports: [InputFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private _errorMessage : string = "";
  private _loginFailed = false;
  public pageModel : PageModel = new PageModel();

  constructor(private _userService : UserService
    , private router: Router) {
  }

  async login(event: Event){
    event.preventDefault();

    const successLogin = await this._userService.login(
      this.pageModel.emailInputContextData.getInputData()
      ,this.pageModel.passwordInputContextData.getInputData()
    ).then();

    if(!successLogin){
      this._loginFailed = true;
      this._errorMessage = 'Неуспешен вход. Моля, проверете вашите данни!';
      return;
    }

    this.router.navigate([RoutePaths.Home]);

  }

  loginIsFailed() : boolean{
    return this._loginFailed;
  }

  getMessage() : string{
    return this._errorMessage;
  }
}

class PageModel {

  public emailInputContextData : InputContextData = new InputContextData();
  public passwordInputContextData : InputContextData = new InputContextData();

  constructor() {
    this.initData();
  }

  initData(): void {
    this.emailInputContextData.setInputFielTitle('Имейл');
    this.emailInputContextData.setInputFieldType(InputFieldType.Email);

    this.passwordInputContextData.setInputFielTitle('Парола');
    this.passwordInputContextData.setInputFieldType(InputFieldType.password);
  }

}
