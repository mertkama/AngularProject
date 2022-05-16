import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'eCommerce-app';


  constructor(
    private httpClient:HttpClient
  ){}

  ngOnInit(): void {

  }

  getToken(){
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', 'CAMLICA');
    body.set('password', '123456**');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let api = "http://185.124.86.45:8899/token"
    this.httpClient.post(api, body.toString(), options).subscribe((res:any)=>{
      console.log(res)
      localStorage.clear();
      localStorage.setItem("token", res.access_token);
    })
  }

  getList(){
    let api = "http://185.124.86.45:8899//api/Integration/BankaKrediKartlari"
    let token = localStorage.getItem('token');

    return this.httpClient.get(api,{
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
    }).subscribe((res)=>{
      console.log(res)
    })
  }
}
