import { Injectable } from '@angular/core';

let todos = [
  { id: 1, title: 'Install Ember CLI', isDone: true },
  { id: 2, title: 'Style Application', isDone: false },
  { id: 3, title: 'Finish setting Service up', isDone: false },
  { id: 4, title: 'Setup API', isDone: false }
];
@Injectable()
export class TodoService {

  constructor() { }

  getItems(query = '') {
    return new Promise(resolve => {
      let data;

      if(query === 'completed' || query === 'active') {
        //let isCompleted = query === 'completed';
        data = todos.filter(todo => !todo.isDone);
      } else {
        data = todos;
      }
      resolve(data);
    });
  }

  addItem (data) {
    return new Promise(resolve => {
      todos.push(data);
      resolve(data);
    });
  }

  putTodo(data) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo.id === data.id);
      todos[index].title = data.title;
      resolve(data);
    });
  }

  completeItem(id) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo.id === id);
      todos[index].isDone = !todos[index].isDone;
    });
  }

  deleteItem (id) {
    return new Promise(resolve => {
      let index = todos.findIndex(todo => todo.id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted () {
    return new Promise(resolve => {
      todos = todos.filter(todo => !todo.isDone);
      resolve(todos);
    });
  }
}
