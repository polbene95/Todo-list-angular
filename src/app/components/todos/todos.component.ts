import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo'
import {TodoService} from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private todoServices: TodoService) { }

  ngOnInit(): void {
   this.todoServices.getTodos().subscribe(todos => {
     console.log('haha')
     this.todos = todos;
   });
  }

  deleteTodo(todo: Todo) {
    //delete UI
    this.todos = this.todos.filter(t => t.id !== todo.id)
    //delet request
    this.todoServices.deleteTodo(todo).subscribe();
    }

    addTodo(todo:Todo) {
      this.todoServices.addTodo(todo).subscribe(todo => {
        this.todos.push(todo);
      });
    }
}
