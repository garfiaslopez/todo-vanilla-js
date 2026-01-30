// 1. Saber cuando el usuario dio click agregar.
// 2. Recuperar el valor del input.
// 3. Se guarda el valor en el arreglo.
// 4. Actualizar la lista de Tasks en el DOM. 

// Array donde guardar los tasks que se deberia cargar del Local Storagee
// Usamos JSON.parse para convertir el string guardado de vuelta a un Array, este proceso entiendo
//que es necesaria porque el navegador web no leeria el objeto como tal sino que solo una cadena o String...
//z no estoy seguro pero creo que funcionaria un concepto parecedo cuando se trata de guardar en local storage

const todos = JSON.parse(localStorage.getItem("mis_tareas")) || [];

const addButtonElement = document.getElementById("addTaskButton")
const inputElement = document.getElementById("taskInput")
const taskListElement = document.getElementById("mainList")

// FUNCIÓN DE AYUDA: Encapsula tu lógica original para reutilizarla
function renderizarTarea(taskDescription) {
  const taskNode = document.createElement("li") 

  const checkMarkNode = document.createElement("input")
  checkMarkNode.type = "checkbox"
  taskNode.appendChild(checkMarkNode)
  
  const textNode = document.createElement("span")
  textNode.textContent = taskDescription
  taskNode.appendChild(textNode)

  const editButtonNode = document.createElement("button")
  editButtonNode.textContent = "Edit"
  taskNode.appendChild(editButtonNode)

  const removalButtonNode = document.createElement("button")
  removalButtonNode.textContent = "Delete"
  taskNode.appendChild(removalButtonNode)

  taskListElement.appendChild(taskNode)
}

// RECUPERAR: Al cargar la página, dibujamos lo que ya estaba en localStorage
// forEach recorre esa información guardada en todos de forma local para dibujar las tareas automáticamente.
todos.forEach(tarea => renderizarTarea(tarea));

addButtonElement.addEventListener("click", () => {
  const taskDescription = inputElement.value;
  if(!taskDescription) return; // Evitariamos una tarea vacia

  todos.push(taskDescription)
  
  // PERSISTIR seria literalmente Guardar el array actualizado convirtiéndolo a String
  localStorage.setItem("mis_tareas", JSON.stringify(todos));

  // aquí actulizamos el dom 
  renderizarTarea(taskDescription);
  inputElement.value = "";
});

//me faltaria integrar la funcion de la fecha y hora y si la funcion esta marcada como cumplida o no




