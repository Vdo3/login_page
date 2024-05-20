import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() { }

  async getUser(username: string): Promise<any> {
    const query = `query{ user(username:"${username}"){ username, password }}`;
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query: query
        })
      });
  
      const data = await response.json();
      
      const username = data.data.user.username;
      const password = data.data.user.password;
  
      return { username, password };
    } catch (error) {
      throw error;
    }
  }

  deleteUser(username: string): void{
    const query = `mutation{ deleteUser(username:"${username}"){username}}`;
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: query
      })
    }).catch(error => {
      console.log(error);
    })
  }

  addUser(username: string, password: string): void {
    const query = `mutation{ addUser(username:"${username}", password: "${password}"){username}}`;
  
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: query
      })
    }).catch(error => {
      console.log(error);
    })

  }


  updateUser(oldUser: string, newUsername: string, newPassword: string): void{
    const query = `mutation{ updateUser(oldUser:"${oldUser}", newUser:"${newUsername}", newPassword: "${newPassword}"){username}}`;
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: query
      })
    }).catch(error => {
      console.log(error);
    })
  }
}
