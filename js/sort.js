import { actions } from "./edit_client.js";
import { renderClients } from "./render_clients.js";

let fioSortCheck = 0;
let idSortCheck = 0;
let creationDateSort = 0;
let changeDateSort = 0;

let fioBtn = document.querySelector(".column_fio");
let idBtn = document.querySelector(".column_id");
let createBtn = document.querySelector(".column_creation_date");
let lastChangeBtn = document.querySelector(".column_last_change");

fioBtn.addEventListener("click", () => {
    sortByFio();
});

idBtn.addEventListener("click", () => {
    sortById();
});

createBtn.addEventListener("click", () => {
    sortByCreationDate();
});

lastChangeBtn.addEventListener("click", () => {
    sortByChangeDate()
});

function sortByFio(){
    let array = JSON.parse(localStorage.getItem("clients"));
    let img = document.querySelector(".fio");
    if (fioSortCheck == 0){
        img.src = "./resourses/sort_up.svg";
        fioSortCheck += 1;
        array.sort((a,b) => {  
            if (a.fio > b.fio){
            return 1
            }
            if(a.fio < b.fio){
            return -1
            }
            return 0
        });
        }
    else{
        img.src = "./resourses/sort_down.svg";
        fioSortCheck = 0;
        array.sort((a,b) => {
            if (a.fio < b.fio){
            return 1
            }
            if(a.fio > b.fio){
            return -1
            }
            return 0
      });
    }
    localStorage.setItem("clients", JSON.stringify(array))
    renderClients();
    actions();
}

function sortById(){
    let array = JSON.parse(localStorage.getItem("clients"));
    let img = document.querySelector(".id");
    if (idSortCheck == 0){
        img.src = "./resourses/sort_up.svg";
        idSortCheck += 1;
        array.sort((a,b) => {
            return a.id - b.id
        });
    }
    else{
        img.src = "./resourses/sort_down.svg";
        idSortCheck = 0;
        array.sort((a,b) => {
            return b.id - a.id
        });
    }
    localStorage.setItem("clients", JSON.stringify(array))
    renderClients();
    actions();
}
sortById();

function sortByCreationDate(){
    let array = JSON.parse(localStorage.getItem("clients"));
    let img = document.querySelector(".creation_date");
    if (creationDateSort == 0){
        img.src = "./resourses/sort_up.svg";
        creationDateSort += 1;
        array.sort((a,b) => {  
            if (a.createTime > b.createTime){
            return 1
            }
            if(a.createTime < b.createTime){
            return -1
            }
            return 0
        });
    }
    else{
        img.src = "./resourses/sort_down.svg";
        creationDateSort = 0;
        array.sort((a,b) => {  
            if (a.createTime > b.createTime){
            return -1
            }
            if(a.createTime < b.createTime){
            return 1
            }
            return 0
        });
    }
    localStorage.setItem("clients", JSON.stringify(array))
    renderClients();
    actions();
}

function sortByChangeDate(){
    let array = JSON.parse(localStorage.getItem("clients"));
    let img = document.querySelector(".last_change");
    if (changeDateSort == 0){
        img.src = "./resourses/sort_up.svg";
        changeDateSort += 1;
        array.sort((a,b) => {  
            if (a.lastChange > b.lastChange){
            return 1
            }
            if(a.lastChange < b.lastChange){
            return -1
            }
            return 0
        });
    }
    else{
        img.src = "./resourses/sort_down.svg";
        changeDateSort = 0;
        array.sort((a,b) => {  
            if (a.lastChange > b.lastChange){
            return -1
            }
            if(a.lastChange < b.lastChange){
            return 1
            }
            return 0
        });
    }
    localStorage.setItem("clients", JSON.stringify(array))
    renderClients();
    actions();
}