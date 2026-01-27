// Array donde guardar los tasks.
const todos = [];

// 1. Saber cuando el usuario dio click agregar.
// 2. Recuperar el valor del input.
// 3. Se guarda el valor en el arreglo.
// 4. Actualizar la lista de Tasks en el DOM. 

const addButtonElement = document.getElementById("addTaskButton")
const inputElement = document.getElementById("taskInput")
const taskListElement = document.getElementById("mainList")

addButtonElement.addEventListener("click", () => {
  const taskDescription = inputElement.value;
  todos.push(taskDescription)

  // NODE
  const taskNode = document.createElement("li") 

  // li -> Input(checkbox)
  const checkMarkNode = document.createElement("input")
  checkMarkNode.type = "checkbox"
  taskNode.appendChild(checkMarkNode)
  
  // li -> span
  const textNode = document.createElement("span")
  textNode.textContent = taskDescription
  taskNode.appendChild(textNode)

  // li -> Button (Editar)
  const editButtonNode = document.createElement("button")
  editButtonNode.textContent = "Edit"
  taskNode.appendChild(editButtonNode)

  // li -> Button (Eliminar)
  const removalButtonNode = document.createElement("button")
  removalButtonNode.textContent = "Delete"
  taskNode.appendChild(removalButtonNode)

  // ul -> li
  taskListElement.appendChild(taskNode)
});

