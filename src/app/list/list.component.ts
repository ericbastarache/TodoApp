import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  newItem = 'test';
  constructor() { }

  ngOnInit() {
  }

  addItem () {

  }

}
