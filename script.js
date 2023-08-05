const addbtn = document.getElementById('addbtn');
const savebtn = document.getElementById('savebtn');
const input = document.getElementById('input');
const show = document.getElementById('show');
const dltallbtn = document.getElementById('dltallbtn');
const form = document.getElementById('form');

let todObj = [];

// Update the UI with the tasks from localStorage
const showData = () => {
  let webtask = localStorage.getItem('localdesk');
  todObj = webtask ? JSON.parse(webtask) : [];
  const html = todObj
    .map((task, index) => `
      <div class='list'>
        <li>
          <div>
            <span>${index + 1})</span>
            <p>${task}</p>
          </div>
          <nav>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="dltTask(${index})">Delete</button>
          </nav>
        </li>
      </div>
    `)
    .join('');
  show.innerHTML = html;
};

// Call to display saved data from localStorage when the page loads
showData();

// Update the localStorage with the latest tasks and update the UI
const addInput = () => {
  const addinputvalue = input.value.trim();
  if (addinputvalue.length !== 0) {
    todObj.push(addinputvalue);
    input.value = '';
    localStorage.setItem('localdesk', JSON.stringify(todObj));
    showData();
  }
};

// Handle "Add" button click event
addbtn.onclick = () => {
  addInput();
};

// Edit a task
const editTask = (index) => {
  addbtn.style.display = 'none';
  savebtn.style.display = 'block';
  input.value = todObj[index];

  savebtn.onclick = () => {
    addbtn.style.display = 'block';
    savebtn.style.display = 'none';
    todObj[index] = input.value;
    localStorage.setItem('localdesk', JSON.stringify(todObj));
    showData();
  };
};

// Delete an individual task
const dltTask = (index) => {
  todObj.splice(index, 1);
  localStorage.setItem('localdesk', JSON.stringify(todObj));
  showData();
};

// Delete all the todo list
dltallbtn.addEventListener('click', () => {
  todObj = [];
  localStorage.removeItem('localdesk');
  showData();
});

// Searching tasks
const searchInput = document.getElementById('search');
const rows = document.querySelectorAll('ul li');

searchInput.addEventListener('input', (event) => {
  const ele = event.target.value.toLowerCase();
  rows.forEach((row) => {
    row.querySelector('p').textContent.toLowerCase().startsWith(ele)
      ? (row.style.display = '')
      : (row.style.display = 'none');
  });
});
