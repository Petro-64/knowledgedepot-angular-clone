import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class getSubjectsService {

  private Url = 'http://127.0.0.1:8000/react/subjects';
  constructor(private http: HttpClient) {}

  get() {
    console.log('second get service');
    return this.http.get<any>(this.Url);
  }
}