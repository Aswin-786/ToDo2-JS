let addbtn = document.getElementById('addbtn')
let savebtn = document.getElementById('savebtn')
let input = document.getElementById('input')
let show = document.getElementById('show')
let dltallbtn = document.getElementById('dltallbtn')
const form = document.getElementById('form')

// updating to DOM
const showData = () => {
  let webtask = localStorage.getItem("localdesk")
  if(webtask == null) {
    todObj = []
  } else {
    todObj = JSON.parse(webtask)
  }
  // console.log(todObj)
  let html =''
  todObj.forEach((obj, index) => {
    // console.log(obj)
    html += `
            <li>
            <span>
              ${index + 1})
            </span>
            <p>${obj}</p>            
            <button onclick = "editTask(${index})">Edit</button>
            <button onclick = "dltTask(${index})">delete</button>
            </li>
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
  if(addinputvalue.trim()!=0) {
    if(webtask == null) {
      todObj = []
    } else {
      todObj = JSON.parse(webtask)
    }
    todObj.push(addinputvalue)
    addinputvalue = ''
    localStorage.setItem("localdesk",JSON.stringify(todObj))
    showData()
  }
}

