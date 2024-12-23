import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { ChatHistory } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API: string = "http://localhost:8000"

  constructor(private _http: HttpClient) { }

  getChatHistory(accountId: string):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    } 
    return this._http.get<any>(this.API+"/chat/?accountId="+accountId,requestOptions).pipe(
      map((res) => {
        const parsedData = JSON.parse(res);
        return ChatHistory.fromJSONArray(parsedData); 
      }),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
