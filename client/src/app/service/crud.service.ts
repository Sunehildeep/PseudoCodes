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

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  // Node/Express API
  REST_API: string = 'http://localhost:3000/api';

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) {}

  // Get all the surveys
  GetSurveys() {
    return this.httpClient.get(`${this.REST_API}`);
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

  // Create a new survey
  CreateSurvey(data: Survey): Observable<any> {
    let API_URL = `${this.REST_API}/create-survey`;
    return this.httpClient.post(API_URL, data)
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
    let API_URL = `${this.REST_API}/update-survey/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete a survey by ID
  DeleteSurvey(id: any): Observable<any> {
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
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
