import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { InputFieldComponent } from '../input-field/input-field.component';
import { InputContextData, InputFieldType } from '../context-data-objects/input-context-data';

@Component({
  selector: 'login',
  imports: [InputFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public errorMessage : string = "";
  public loginFailed = false;
  public pageModel : PageModel = new PageModel();

  constructor(private userService : UserService) {
  }

  login(event: Event){
    event.preventDefault();

    if(!this.userService.login(this.pageModel.emailInputContextData.getInputData()
      ,this.pageModel.passwordInputContextData.getInputData())){
      this.loginFailed = true;
      this.errorMessage = 'Неуспешен вход. Моля, проверете вашите данни!';
    }

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
