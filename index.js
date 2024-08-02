import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getDatabase,
    ref,
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const firebaseConfig = {
   
    databaseURL: "https://trackerapp-9ab62-default-rtdb.asia-southeast1.firebasedatabase.app",
   
  };


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "books")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(books) {
    let listItems = ""
    for (let i = 0; i < books.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${books[i]}'>
                    ${books[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const books = Object.values(snapshotValues)
        render(books)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})