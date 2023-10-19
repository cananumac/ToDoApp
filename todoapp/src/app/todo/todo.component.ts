import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { TodoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {


  displayAll: boolean = false;
  inputText: string = "";

  constructor() {
    this.model.items = this.getItemsFromLS();
  }

  model = new Model();

  getName() {
    return this.model.name;
  }

  getItems() {
    if (this.displayAll) {
      return this.model.items;
    }
    return this.model.items.filter(item => item.status == false);
  }

  addItem() {
    if (this.inputText != "") {
      let data = { description: this.inputText, status: false };
      this.model.items.push(data);

      let items = this.getItemsFromLS();
      items.push(data);
      localStorage.setItem("items", JSON.stringify(items));
      this.inputText = "";

    } else {
      alert("Bilgi giriniz!");
    }
  }

  getItemsFromLS(){
    let items : TodoItem[] =[];
    let value =localStorage.getItem("items");
    if (value != null) {
      items = JSON.parse(value);
    }
    return items;
  }

  onActionChanged(item : TodoItem){
    let items = this.getItemsFromLS();
    localStorage.clear();
    items.forEach(
      i=>{
        if (i.description == item.description) {
          i.status = item.status;
        }
      }
    );
    localStorage.setItem("items", JSON.stringify(items));
  }

  displayCount() {
    return this.model.items.filter(i => i.status).length;
  }

  getBtnClasses() {
    return {
      'disabled': this.inputText.length == 0,
      'btn-secondary': this.inputText.length == 0,
      'btn-warning': this.inputText.length > 0
    }
  }
}
