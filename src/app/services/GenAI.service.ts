import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { ChatMessage } from '../models/message';
import { Prompt } from '../models/prompt';

@Injectable({
  providedIn: 'root'
})
export class GenAIService {

  API: string = "http://localhost:8000"

  constructor(private _http: HttpClient) { }

  /** MESSAGE */
  prompt(query: Prompt):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    } 
    return this._http.post<any>(this.API+"/genai/chat/", query,requestOptions).pipe(
      map((res) => {
        return JSON.parse(res); 
      }),
      retry(3),
      catchError(this.handleError)
    )
  }
  //** */

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
