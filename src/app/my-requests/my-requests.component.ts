import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Certification} from '../components/Models/certification';
import {AuthService} from '../services/auth.service'
import { CertificationServiceCertification } from '../services/certification.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  cert:Certification;
  myForm:FormGroup;
  requests$: Certification[];
  orgenizerid:number;
  TodayDate= new Date().getDate()+'-'+ new Date().getMonth()+'-'+ new Date().getFullYear();

  constructor(private formBuilder:FormBuilder, private certService:CertificationServiceCertification, private auth:AuthService) {}

  ngOnInit(): void {
    this.getAllSubmissionsByUser();

    this.myForm= this.formBuilder.group({
      
      Name:['',Validators.required],
      Type:['',Validators.required],
      Description:['',Validators.required],
      Date:[`$(TodayDate)`],
      Status:['Pending'],
      certificateDocument:['',Validators.required]
    });
  }

  onClickMe(){
    document.getElementById("loginPopup").style.display="block";    
  }

  closeForm(){
    document.getElementById("loginPopup").style.display= "none";
  }

  sendCert()
  { 
    this.certService.addCertification(this.myForm.value).subscribe(res=>{
      if (res!==null && res !==undefined){
      console.log(res);
    }
  }, (error)=>console.log(error),() => {});
}

  getAllSubmissionsByUser(){
    this.certService.getCertifications().subscribe(
      Data => {
        this.requests$ = Data;
      },
      err =>  console.log(err),
      () => console.log('Getting my Events complete...')
    );
  }

}
