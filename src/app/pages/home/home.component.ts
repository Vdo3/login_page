import { Component } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';
import { QueryService } from '../../service/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  username!: string;
  password!: string;
  constructor(private userInfo: UserInfoService, private router: Router, private query:QueryService){}

  ngOnInit(): void{
    this.username = this.userInfo.getUsername();
    this.password = this.userInfo.getPassword();
  }

  // delete account then reroutes back to landing page
  deleteAccount(){
    this.query.deleteUser(this.username);
    this.router.navigate(["/"]);
  }
}
