import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';


import {Todo} from '../models/Todo';

const httpOptions = {
  // mode: 'cors',
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  proxyBypass: string = 'https://cors-anywhere.herokuapp.com/'
  todosUrl:string =  'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=5';

  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.proxyBypass}${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.proxyBypass}${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<any> {
    const url = `${this.proxyBypass}${this.todosUrl}`;
    return this.http.post(url,todo,httpOptions)
  }
}
