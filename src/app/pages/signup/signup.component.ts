import { Component } from '@angular/core';
import { QueryService } from '../../service/query.service';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private query:QueryService, private userInfo:UserInfoService, private router:Router){}
  submit(signup: any){
    const username = signup.form.value.username;
    const password = signup.form.value.password;

    // checking if inputs are empty
    if (username.length == 0 || password.length == 0){
      alert("Username and password cannot be empty");
      return;
    }

    // checking if username already exist
    this.query.getUser(username).then(
      result => {
        alert("Username already exist");
      }
    ).catch(
      // if error then username is not in db 
      error => {
        // adding user to db since username doesn't exist
        this.query.addUser(username, password);
        this.userInfo.setUsername(username);
        this.userInfo.setPassword(password);
        this.router.navigate(["/"]);
      }
    )

  }
}
