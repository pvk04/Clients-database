import { deleteClientEvent } from "./deleteClientEvent.js";
import { actions } from "./editClientEvent.js";

export function renderClients(key){
    checkLocalStorage();
    let array = JSON.parse(localStorage.getItem(key)) || [];
    let div = document.querySelector(".clients");
    div.innerHTML = "";


    for (let element of array){
        let client = document.createElement("div");

        client.classList.add("client");
        client.innerHTML = `
        <p class="client_id">${element.id}</p>
        <p class="client_fio">${element.fio}</p>
        <p class="client_creation_date">${convertDate(element.createTime)}</p>
        <p class="client_creation_time">${convertTime(element.createTime)}</p>
        <p class="client_last_change_date">${convertDate(element.lastChange)}</p>
        <p class="client_last_change_time">${convertTime(element.lastChange)}</p>
        <div class="client_contacts">
            ${getContacts(element)}
        </div>
        <div class="client_actions">
            <button class="client_action_btn edit_action" data-index="${element.id}">
                <img src="./resourses/edit_icon.svg" alt="" class="action_img">
                Изменить
            </button>
            <button class="client_action_btn remove_action" data-index="${element.id}">
                <img src="./resourses/remove_icon.svg" alt="" class="action_img">
                Удалить
            </button>
        </div>`
        
        div.append(client);
        deleteClientEvent(renderClients);
    }
    actions();
    
}
renderClients("clients");

function convertDate(element){
    element = new Date(element);
    let day = element.getDate();
    day = addZero(day);

    let month = element.getMonth() + 1;
    month = addZero(month);

    let year = element.getFullYear();
    year = addZero(year);

    return day + "." + month + "." + year
}

function convertTime(element){
    element = new Date(element);
    let hours = element.getHours();
    hours = addZero(hours);

    let minutes = element.getMinutes();
    minutes = addZero(minutes);

    return hours + ":" + minutes
}

function addZero(element){
    if (element < 10) {
        element = "0" + element;
    }
    return element
}

function getContacts(element){
    let contactsCode = "";
    for (let contact of element.contacts){
        contactsCode += `<img src="./resourses/${contact.type}_contact_icon.svg" alt="" class="client_contact_icon" title="${contact.value}">\n`
    }
    return(contactsCode)
}

function checkLocalStorage(){
    let arr = JSON.parse(localStorage.getItem("clients"));

    if (arr == null){
        localStorage.setItem("clients", JSON.stringify([]));
    }
}