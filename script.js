const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');
const filterSpans = document.querySelectorAll('.filters span');
const clearBtn = document.querySelector('.clear')

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
  let completedCount = 0;
  const totalCount = allTasks.length;

  allTasks.forEach(function(task) {
    const span = task.querySelector('span'); 
    if (!span.classList.contains('completed')) {
      activeCount++;
  } else {
    completedCount++;
  }
});

  const currentFilter = document.querySelector('.filters .active').textContent
  
  if (currentFilter === 'Completed') {
    if (completedCount === 1) {
      counter.textContent = '1 task done';
    } else {
      counter.textContent = completedCount + ' tasks done';
    }
  } else if (currentFilter === 'Active') {
    if (activeCount === 1) {
      counter.textContent = '1 task left';
    } else {
      counter.textContent = activeCount + ' tasks left';
    }
  } else {
    if (totalCount === 1) {
      counter.textContent = '1 task';
    } else {
      counter.textContent = totalCount + ' tasks';
    }
  }
}

function saveData() {
  localStorage.setItem("data", taskList.innerHTML);
}

const savedData = localStorage.getItem("data")

if (savedData) {
  taskList.innerHTML = savedData;
}

updateCounter();

filterSpans.forEach(function(span){
  span.addEventListener('click', function() {
    
    filterSpans.forEach(function(s) {
      s.classList.remove('active');
    });
    span.classList.add('active')
    
    updateCounter();
    
    const filterType = span.textContent.trim();
    const allTasks = taskList.querySelectorAll('li');
    
    allTasks.forEach(function(task) {
      const taskSpan = task.querySelector('span');
      const isCompleted = taskSpan.classList.contains('completed');
      
      
      if (filterType === 'All') {
        task.classList.remove('hidden');
      } else if (filterType === 'Active') {
        if (isCompleted) {
          task.classList.add('hidden');
        } else {
          task.classList.remove('hidden');
        }
      } else if (filterType === 'Completed') {
        if (isCompleted) {
          task.classList.remove('hidden');
        } else {
          task.classList.add('hidden');
        }
      }
    });
  });
});

clearBtn.addEventListener('click', function(){
  const completedSpans = taskList.querySelectorAll('.completed')
  completedSpans.forEach(function(span) {
    span.parentElement.remove();
  });
  updateCounter();
  saveData();
});
