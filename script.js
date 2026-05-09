const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

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
}

addBtn.addEventListener('click', addTask);

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove();
  }
});
