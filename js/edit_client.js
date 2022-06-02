import {renderClients} from "./render_clients.js"

let modalEdit = document.querySelector(".edit_form");
let modalDelete = document.querySelector(".modal_delete_accept");
let saveEdit = modalEdit.querySelector(".modal_add_save");
let addContactEdit = modalEdit.querySelector(".edit_contact");
let modalEditDel =modalEdit.querySelector(".modal_add_cancel");
  
    modalEdit.addEventListener("click", (e) => {
        e.preventDefault();
        let isModal = e.target.closest(".modal_inner");
        let closeModal = e.target.closest(".close_modal");
        let exeption = e.target.closest(".contact");

        if ((!isModal || closeModal) && !exeption){
            modalEdit.classList.remove("modal");
        }
    });

    saveEdit.addEventListener("click", () => {

        let arr = JSON.parse(localStorage.getItem("clients"));
        let changeTime = new Date;
        let fioInputs = modalEdit.querySelectorAll(".modal_add_inp");
        let id = JSON.parse(localStorage.getItem("editIndex"));
        for (let client of arr){
            if (client.id == id){
                let index = arr.indexOf(client);
                arr[index] = {
                id : arr[index].id,
                fio: joinFio(fioInputs),
                createTime: arr[index].createTime,
                lastChange: changeTime,
                contacts: creationGetContacts()};
                localStorage.setItem("clients", JSON.stringify(arr));
                modalEdit.classList.remove("modal");
                renderClients("clients");
            }
        }
    });

    addContactEdit.addEventListener("click", () => {
        let buttons = modalEdit.querySelectorAll(".remove_contact");
        let contactsDiv = modalEdit.querySelector(".contacts");
        if (buttons.length < 10) {
            let contact = document.createElement("div");
            contact.classList.add("contact");
            contact.innerHTML = `
            <select name="contact_type" class="contact_type_select">
                <option value="phone">Телефон</option>
                <option value="mail">Email</option>
                <option value="fb">Facebook</option>
                <option value="vk">VK</option>
                <option value="other">Другое</option>
            </select>
            <input type="text" class="contact_value" placeholder="Введите данные контакта">
            <button class="remove_contact">
                <img src="./resourses/contact_cross_icon.svg" alt="" class="remove_contact_icon">
            </button>`;
    
            contactsDiv.append(contact);
            delBtns();
        }
        else{
            return
        }
    });

    modalEditDel.addEventListener("click", () => {
        let editIndex = JSON.parse(localStorage.getItem("editIndex"));
        localStorage.setItem("deleteIndex", JSON.stringify(editIndex));

        modalDelete.classList.add("modal")
    });

    function delBtns(){
        let btns = modalEdit.querySelectorAll(".remove_contact");
        let contacts = modalEdit.querySelectorAll(".contact");
        for (let i = 0; i < btns.length; i++){
            btns[i].addEventListener("click", () => {
                contacts[i].remove();
            });
        }
    }


    function joinFio(inputs){
        let arr = []
        for (let inp of inputs){
            arr.push(inp.value)
        }
        return arr.join(" ");
    }

    function creationGetContacts(){
        let contacts = modalEdit.querySelectorAll(".contact");
        let contactsArr = [];
        for (let block of contacts){
            let type = block.querySelector(".contact_type_select").value;
            let value = block.querySelector(".contact_value").value;
            let obj = {type, value};
            contactsArr.push(obj);
        }
        return contactsArr;
    }

