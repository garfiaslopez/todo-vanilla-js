// Programacion orientada a objetos
// - Class
// - Properties
// - Constuctors
// - Methods
// - Extends

// MODEL = CLASSES + BUSINESS LOGIC.

// Singular (One single element)
class todoItem {
  let id;
  let title; // String
  let isCompleted; // Bool
  let priority; // Bool
  let deadlineDate; // Date
  let createdDate; // Date

  constructor() { // Class is initialized.
    self.id = "Tarea" + Date.now();
  }
}

// Plural
class todoList {
  //     Key           Value
  // todoItem.id.    todoItem
  let todos = new Map();

  // Agregar LocalStorage Polimorfico.
  //

  function add(newTodoItem) {
    todos.set(newTodoItem.id, newTodoItem);
  }

  function updateItemTitle(id, title) {
    let currentTodoItem = todos.get(id)
    currentTodoItem.title = title
    todos.set(id, currentTodoItem)
  }

  function remove(id) {
    todos.remove(id);
  }

  function remainingTodoItemsCount() {
    let uncompleted = 0;

    for ([key, value] in self.todos) {
      if (value.isCompleted == false) {
        uncompleted++;
      }
    }

    return uncompleted;
  }

  function completedTodoItemsCount() {
    let completed = 0;

    for ([key, value] in self.todos) {
      if (value.isCompleted == true) {
        completed++;
      }
    }

    return completed;
  }

  function persistStateInLocalStorage() {
    const data = JSON.stringify(self.todos)
    localStorage.setItem("todos", data)
  }

  function loadStateFromLocalStorage() {
    const dataString = localStorage.getItem("todos");
    self.todos = JSON.parse(dataString)
  }
}



