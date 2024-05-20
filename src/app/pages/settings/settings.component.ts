import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../service/user-info.service';
import { QueryService } from '../../service/query.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private userInfo: UserInfoService, private query: QueryService, private router: Router){}

  submit(change: any){
    const oldUser = this.userInfo.getUsername();
    const username = change.form.value.username;
    const password = change.form.value.password;

    // checking if inputs are empty
    if (username.length == 0 && password.length == 0){
      alert("Username and password cannot be empty");
      return;
    }

    // only changing the information for textbox with user input
    if (username.length != 0){
      this.userInfo.setUsername(username);
    }
    if (password.length != 0){
      this.userInfo.setPassword(password);
    }

    this.query.updateUser(oldUser, this.userInfo.getUsername(), this.userInfo.getPassword());
    this.router.navigate(["/home"]);
  }
}
