import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private service : AppServiceService){

  }
  ngOnInit(){
    this.getDataFromAPI();
  }
  getDataFromAPI(){
    this.service.getData().subscribe((response) => {
      console.log("response from API is", response)
    }, (error) => {
      console.log('Error is ', error)
    })
  }
}
