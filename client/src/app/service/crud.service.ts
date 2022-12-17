import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Survey } from './surveys';
import { User } from './users';
import { FormGroup } from '@angular/forms';
import { survey_responses } from "./survey_responses";

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  // Node/Express API
  // Get base url 
  


  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

  constructor(private httpClient: HttpClient) {}
    
  //REST_API: string = location.hostname + ":3000/api";
  
  REST_API: string = 'http://localhost:3000/api';

  // Get all the surveys
  GetSurveys() {
    return this.httpClient.get(`${this.REST_API}`);
  }


  // Create a new response
  saveSurvey(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/survey_responses/`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Get a survey by ID
  GetSurvey(id: any): Observable<any> {

    let API_URL = `${this.REST_API}/read-survey/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get my surveys
  GetMySurveys(author: any): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/read-my-surveys/${author}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getResponses(id: any): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/read-my-responses/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getStats(id: any): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/read-my-stats/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Create a new survey
  CreateSurvey(data: Survey): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/create-survey`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Logout
  Logout(): Observable<any> {
    let API_URL = `${this.REST_API}/logout`;
    return this.httpClient.get(API_URL, {})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Register a new user
  Register(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // Login
  Login(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update a survey by ID
  UpdateSurvey(id: any, data: any): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/update-survey/${id}`;
    return this.httpClient.post(API_URL, {id, data}, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete a survey by ID
  DeleteSurvey(id: any): Observable<any> {
    this.loadToken();
    let API_URL = `${this.REST_API}/delete-survey/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private loadToken(): void
  {
    var token = sessionStorage.getItem('id_token');
    if(token) this.httpHeaders = this.httpHeaders.set('Authorization',token);
  }
}
