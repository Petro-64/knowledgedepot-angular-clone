import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../models/subject.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Subject[]>('http://127.0.0.1:8000/angular/getsubjectsuser');
  }
  
  // create(payload: Subject) {
  //   return this.http.post<Subject>('http://localhost:3000/books', payload);
  // }

  // update(payload: Subject) {
  //   return this.http.put<Subject>(
  //     `http://localhost:3000/books/${payload.id}`,
  //     payload
  //   );
  // }

  // delete(id: number) {
  //   return this.http.delete(`http://localhost:3000/books/${id}`);
  // }
}