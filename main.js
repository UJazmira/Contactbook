// Создайте contactbook на json-server.

// У каждого контакта должны быть следующие поля:
// 1. Name
// 2. Surname
// 3. Photo
// 4. Number
// 5. Email

// Вам необходимо реализовать CRUD.

// Сдать необходимо ссылку на репозиторий гитхаб
// !--------------------------------ContactBook---------------------
const API = "http://localhost:8001/contactbook";

let inpName = document.querySelector(".add-name");
let inpSur = document.querySelector(".add-surname");
let inpPhoto = document.querySelector(".add-photo");
let inpCont = document.querySelector(".add-contact");
let inpEmail = document.querySelector(".add-email");
let btn = document.querySelector(".add-btn");
let list = document.querySelector(".list-group");
// console.log(inpName, inpSur, inpPh oto, inpCont, inpEmail, list, btn);
let newList = {};
function nodeList() {
  newList = {
    name: inpName.value,
    surname: inpSur.value,
    photo: inpPhoto.value,
    contact: inpCont.value,
    email: inpEmail.value,
  };
}
btn.addEventListener("click", addList);
async function addList() {
  nodeList();
  console.log(newList);
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newList),
    });
  } catch (error) {
    console.log(error);
  }
  inpName.value = "";
  inpSur.value = "";
  inpPhoto.value = "";
  inpCont.value = "";
  inpEmail.value = "";
  getList();
}
// ! READ-------------------------------
async function getList() {
  try {
    let res = await fetch(API);
    let data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
}
//TODO=================== RENDER
function render(data) {
  // console.log(data);
  list.innerHTML = "";
  data.forEach((item) => {
    // console.log(item.name);
    list.innerHTML += `<li class="list-group-item d-fex justify-content-center"><p>${item.name}</p>
    
    <p>${item.surname}</p>
    
    <img src=${item.photo} width='50' height='60'  alt=error/>
    
    <p>${item.contact}</p>
    
    <p>${item.email}</p>
    <div>
    <button onclick=deleteList(${item.id}) class="btn btn-danger">Delete</button>
    <button onclick=  editList(${item.id}) class='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    </div>
    </li>
    `;
  });
}
getList();
// ! delete----------------------------------
async function deleteList(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getList();
  } catch (error) {
    console.log(error);
  }
}
// ? edit-----------------------------
let inpNameEdit = document.querySelector(".inp-name");
let inpSurEdit = document.querySelector(".inp-surname");
let inpPhotoEdit = document.querySelector(".inp-photo");
let inpConEdit = document.querySelector(".inp-contact");
let inpEmailEdit = document.querySelector(".inp-email");
let saveBtn = document.querySelector(".save-btn");
let modalEdit = document.querySelector("#exampleModalLabel");
let editObj = {};
function inputs() {
  editObj = {
    name: inpName.value,
    surname: inpSur.value,
    photo: inpPhoto.value,
    contact: inpCont.value,
    email: inpEmail.value,
  };
}
async function editList(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objEdit = await res.json();
    inpNameEdit.value = objEdit.name;
    inpSurEdit.value = objEdit.surname;
    inpPhotoEdit.value = objEdit.photo;
    inpConEdit.value = objEdit.contact;
    inpEmailEdit.value = objEdit.email;
    console.log(objEdit.name);
    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}
saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  // console.log(id);
  inputs();
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Contact-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editObj),
    });
  } catch (error) {
    console.log(error);
  }
  getList();
  let modal = bootstrap.Modal.getInstance(modalEdit);
  modal.hide();
});
