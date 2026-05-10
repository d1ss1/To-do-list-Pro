const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
const counter = document.getElementById('counter')

console.log('Loading')

function addTask() {
  const text = taskInput.value.trim();
  
  if (text === '') {
    alert('Enter a task');
    return;
}

const li = document.createElement('li');

  li.innerHTML = `
  <span>${text}</span>
  <button class="delete-btn">×</button>
  `;

 taskList.appendChild(li);
 taskInput.value = '';
 updateCounter();
 saveData();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }                        
});

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
    updateCounter();
    saveData();
  }
  else if (event.target.tagName === 'SPAN') {
    event.target.classList.toggle('completed')
    updateCounter();
    saveData();
  }
});

function updateCounter() {
  const allTasks = taskList.querySelectorAll('li')
  let activeCount = 0;

  allTasks.forEach(function(task) {
    const span = task.querySelector('span'); 

  if (!span.classList.contains('completed')) {
    activeCount++;
  }
});
  if (activeCount === 1) {
    counter.textContent = '1 task left';
  } else {
    counter.textContent = activeCount + ' tasks left';
  }
};

function saveData() {
  localStorage.setItem("data", taskList.innerHTML);
}

const savedData = localStorage.getItem("data")

if (savedData) {
  taskList.innerHTML = savedData;
}

updateCounter();
