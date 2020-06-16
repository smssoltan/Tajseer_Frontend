import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  currentUser = localStorage.getItem("currentUser");
  // y=this.x.split("\\\"");
  noQuotation=this.currentUser.toString().replace(/\\/g, ""); //remove any (") char

  strToArray=this.noQuotation.split(",");    //from a string to an Array.
  nationalID=this.strToArray[6].substr(9,this.strToArray[6].length-10);     //from index #9 untill total length -10 chars.
  fullName=this.strToArray[1].substr(12,this.strToArray[1].length-13);
  phoneNumber=this.strToArray[3].substr(8,this.strToArray[3].length-9);
  emailExtracting=this.strToArray[4].substr(9,this.strToArray[4].length-10); //from index #9 untill total length -10 chars.
  constructor() { }

  ngOnInit(): void { 
  }


}
