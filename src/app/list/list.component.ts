import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getItems();
    });
  }

  getItems (query = '') {
    return this.todoService.getItems(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }

  addTodo () {
    this.todoService.addItem({id: this.todos.id + 1, title: this.newTodo, isDone: false}).then(() => {
      return this.getItems();
    }).then(() => {
      this.newTodo = '';
    });
  }

  toggleComplete(todo) {
    this.todoService.completeItem(todo.id).then(()=> {
      todo.isDone = true;
      return this.getItems();
    });
  }

  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.putTodo(todo).then(() => {
      todo.editing = false;
      return this.getItems();
    });
  }

  deleteTodo(todo) {
    this.todoService.deleteItem(todo._id).then(() => {
      return this.getItems();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getItems();
    });
  }

}
