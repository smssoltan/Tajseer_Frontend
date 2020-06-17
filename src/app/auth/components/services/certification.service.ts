import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../../certification'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationServiceCertification {

  private addCertificationURL = "http://localhost:8080/users/addUser"
  private getAllCertificationURL = "http://localhost:8080/certification";

  constructor(private httpClient: HttpClient, private Cert: Certification) { }

  addCertification(Cert: Certification): Observable<Certification>{
    return //this.httpClient.post<Certification>(this.addCertificationURL, Cert, httpOptions)
  };

}

