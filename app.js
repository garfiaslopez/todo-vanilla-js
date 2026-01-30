
// TAREA
/*
1. AGREGAR FECHAS
    - INVESTIGAR DATE() y FORMAT
2. PERSISTIR CHECKMARK
    - EDITAR EL ARRAY Y USAR LOCALSTORAGE
3. 4 BOTONES (FILTROS) = ALL, ACTIVE, COMPLETED, CLEAR COMPLETED.
    - 3 FILTROS, 1 ACCION DE BORRAR TODOS LOS COMPLETADOS.
4. STRING DE HASTA ABAJO, CONTABILIZAR LOS QUE FALTAN 
    - CONTAR CUANTOS TASKS NO TIENEN CHECKMARK.
*/



// 1. PERSISTENCIA: Intentamos recuperar datos previos de la memoria del navegador (localStorage).
// localStorage devuelve un String, por lo que usamos JSON.parse para convertir ese texto en un Objeto de JS.
// Si no hay datos (primera vez que se usa), inicializamos 'todos' como un objeto vacío {}.
const storageData = localStorage.getItem("misTareas");

// Ternary operator = CONDITION ? TRUE : FALSE
const todos = storageData ? JSON.parse(storageData) : {};
// const todos = JSON.parse(localStorage.getItem("mis_tareas")) || [];


// 2. REFERENCIAS AL DOM: Obtenemos los elementos del HTML para poder manipularlos.
const addButtonElement = document.getElementById("addTaskButton");
const inputElement = document.getElementById("taskInput");
const taskListElement = document.getElementById("mainList");

/**
 * Función encargada de crear físicamente los elementos en el HTML (Nodos).
 * @param {string} id - La llave de la tarea (ej: "Tarea1").
 * @param {object} taskObject - El objeto con los detalles de la tarea.
 */
function renderTask(id, taskObject) {

  console.log(taskObject);

  // Creamos el contenedor de la lista <li>
  const taskNode = document.createElement("li"); // VARIABLE DE CLASSE TIPO NODE
  // VARIABLE -> Direccion de memoria. 0x01000AB

  // Creamos el Checkbox y su estado guardado (Realizada: true/false)
  const checkMarkNode = document.createElement("input"); // VARIABLE DE TIPO NODO
  checkMarkNode.type = "checkbox";
  checkMarkNode.checked = taskObject.Realizada; 

  checkMarkNode.addEventListener("click", () => {
    console.log("CHECKMARK");
    // editar y persistir el todo. 
  });
  
  taskNode.appendChild(checkMarkNode); // INTRODUCIRLO AL ARBOL HTML (DOM)

  // Creamos el texto de la tarea combinando el Título y la Fecha
  const textNode = document.createElement("span");
  // Accedemos a "Fecha limite" con corchetes porque el nombre tiene un espacio
  textNode.textContent = taskObject.Titulo + " - " + taskObject["Fecha limite"];
  taskNode.appendChild(textNode);

  // Botones de acción (Edit/Delete) creados como nodos independientes
  const editButtonNode = document.createElement("button"); // VARABLE TIIPO NODO
  editButtonNode.textContent = "Edit";
  taskNode.appendChild(editButtonNode);
  editButtonNode.addEventListener("click", () => {
    console.log("EDITAR")
    textNode.textContent = inputElement.value
  });

  const removalButtonNode = document.createElement("button");
  removalButtonNode.textContent = "Delete";
  taskNode.appendChild(removalButtonNode);

  removalButtonNode.addEventListener("click", () => {
    console.log("BORRAR NODO - DESDE DELETE NODE.")
    console.log(taskNode);
    taskListElement.removeChild(taskNode);

    // Borrarlo del array y persistir el cambio
    delete todos[id]
    localStorage.setItem("misTareas", JSON.stringify(todos));
  });

  // Inyectamos el <li> completo dentro de nuestra lista <ul> en el HTML
  taskListElement.appendChild(taskNode);
}

// 3. CARGA INICIAL: Recorremos el objeto 'todos' para dibujar las tareas guardadas al recargar la página.
// Usamos for...each esto po que es la forma correcta de iterar sobre las llaves de un objeto.
for (const id in todos) {
  renderTask(id, todos[id]);
}

// 4. EVENTO CLICK: Se añadi un evento para detectar el "click" en el boton "add" 
// La Lógica para agregar nuevas tareas basicamente.
addButtonElement.addEventListener("click", () => {
  const taskDescription = inputElement.value;
  
  // Validación simple para no agregar tareas vacías
  if (!taskDescription) return;

  // Generamos un ID único basado en la cantidad de llaves que ya existen
  const nuevoId = "Tarea" + (Object.keys(todos).length + 1);
  
  // Creamos la estructura del objeto
  const nuevaTarea = {
    "Titulo": taskDescription,
    "Realizada": false,
    "Fecha limite": "12/12/2026"
  };



  // Guardamos la nueva tarea en nuestro objeto 'todos' usando la llave generada
  todos[nuevoId] = nuevaTarea;

  // Actualizamos localStorage convirtiendo el objeto a String (JSON.stringify)
  localStorage.setItem("misTareas", JSON.stringify(todos));

  // Dibujamos la tarea inmediatamente en la interfaz
  renderTask(nuevoId, nuevaTarea);

  // Limpiamos el campo de texto para la siguiente tarea
  inputElement.value = "";
});
