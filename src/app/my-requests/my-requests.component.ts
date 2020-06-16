import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
  }

  onClickMe(){
    document.getElementById("loginPopup").style.display="block";    
  }

  closeForm(){
    document.getElementById("loginPopup").style.display= "none";
  }

}
