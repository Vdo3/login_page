import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../service/user-info.service';
import { QueryService } from '../../service/query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router, private userInfo: UserInfoService, private query: QueryService) {}
  submit(login: any){

    const username = login.form.value.username;
    const password = login.form.value.password;

    // checking for blank inputs
    if (username.length == 0 || password.length == 0){
      alert("Username or password cannot be empty");
      return;
    }
    this.userInfo.setUsername(username);
    this.userInfo.setPassword(password);

    this.query.getUser(username).then(
      result => {
        if (password === result.password){
          this.router.navigate(["/home"]);
        }
      }
    ).catch(error => {
      alert("Wrong username or password");
    })
  }

}
