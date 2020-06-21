import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certification } from '../components/Models/certification'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let headers: HttpHeaders = new HttpHeaders();
headers= headers.append('Content-Type', 'application/json');
headers= headers.append('Authorization', 'Basic bW8xMUBnbWFpbC5jb206MTIzNDU2TXM=')
const API_ARGS = {headers: headers};

@Injectable({
  providedIn: 'root'
})
export class CertificationServiceCertification {

  private addCertificationURL = "http://localhost:8080/certifications/addCert"
  private getAllCertificationURL = "http://localhost:8080/certifications/";

  constructor(private http: HttpClient) { }

  // addCertification(Cert: Certification): Observable<Certification>{
  //   return //this.httpClient.post<Certification>(this.addCertificationURL, Cert, httpOptions)
  // };

  getCertifications(): Observable<Certification[]> {
    let Data = this.http.get<Certification[]>(this.getAllCertificationURL,{headers:headers});
    return Data;
  }

  getCertification(certification_id: number): Observable<Certification> {
    return this.http.get<Certification>(this.getAllCertificationURL+certification_id);
  }

  addCertification(cert: Certification): Observable<Certification> {
    return this.http.post<Certification>(this.addCertificationURL, cert, API_ARGS);
  }

  updateCertification(cert_id: number, Cert: Certification): Observable<Certification> {
    return this.http.put<Certification>(this.getAllCertificationURL+cert_id, JSON.stringify(Cert), API_ARGS);
  }
}

