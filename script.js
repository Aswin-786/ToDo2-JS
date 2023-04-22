
let addbtn = document.getElementById('addbtn')
let savebtn = document.getElementById('savebtn')
let input = document.getElementById('input')
let show = document.getElementById('show')
let dltallbtn = document.getElementById('dltallbtn')
const form = document.getElementById('form')

// updating to DOM
const showData = () => {
  let webtask = localStorage.getItem("localdesk")
  if (webtask == null) {
    todObj = []
  } else {
    todObj = JSON.parse(webtask)
  }
  let html = ''
  todObj.forEach((obj, index) => {
    html += `
            <div class='list'>
              <li>
              <div>
                <span>
                  ${index + 1})
                </span>
                <p>${obj}</p>  
              </div>   
              <nav>       
                <button onclick = "editTask(${index})">Edit</button>
                <button onclick = "dltTask(${index})">Delete</button>
              </nav>
              </li>
            </div>
          `
  })
  show.innerHTML = html
}

// call for accessing saved data in localstorage when screen loads
showData()

// updating when values typed on input field
const addInput = () => {
  let webtask = localStorage.getItem("localdesk")
  let addinputvalue = input.value
  // console.log(addinputvalue)
  if (addinputvalue.trim() != 0) {
    if (webtask == null) {
      todObj = []
    } else {
      todObj = JSON.parse(webtask)
    }
    todObj.push(addinputvalue)
    addinputvalue = ''
    localStorage.setItem("localdesk", JSON.stringify(todObj))
    showData()
  }
}


// add button click event
addbtn.onclick = () => {
  addInput()
}

// edit task
const editTask = (index) => {
  addbtn.style.display = "none"
  savebtn.style.display = "block"
  let webtask = localStorage.getItem("localdesk")
  let todObj = JSON.parse(webtask)
  input.value = todObj[index]
  savebtn.onclick = () => {
    addbtn.style.display = "block"
    savebtn.style.display = "none"
    let webtask = localStorage.getItem("localdesk")
    let todObj = JSON.parse(webtask)
    todObj[index] = input.value
    localStorage.setItem("localdesk", JSON.stringify(todObj))
    showData()
  }
  showData()
}

// delete each item
const dltTask = (index) => {
  let webtask = localStorage.getItem("localdesk")
  let todObj = JSON.parse(webtask)
  todObj.splice(index, 1)
  localStorage.setItem("localdesk", JSON.stringify(todObj))
  showData()
}

// delete all the todo list
dltallbtn.addEventListener('click', () => {
  todObj = []
  localStorage.setItem("localdesk", JSON.stringify(todObj))
  showData()
})

// searching
let searchInput = document.getElementById('search')
let rows = document.querySelectorAll('ul li')
searchInput.addEventListener('input', (event) => {
  const ele = event.target.value.toLowerCase()
  rows.forEach((row) => {
    row.querySelector('p').textContent.toLowerCase().startsWith(ele) ?
      (row.style.display = "")
      : (row.style.display = "none")
  })
})
