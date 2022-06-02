import { renderClients } from "./render_clients.js";

const modalAdd = () => {
    let buttonAdd = document.querySelector(".body_add");
    let modalAdd = document.querySelector(".add_form");
    let modalAddClose = modalAdd.querySelector(".close_modal");
    let contactsDiv = modalAdd.querySelector(".contacts");
    let addContact = modalAdd.querySelector(".add_contact");
    let saveContact = modalAdd.querySelector(".modal_add_save");
    let cancelSave = modalAdd.querySelector(".modal_add_cancel");
    
    buttonAdd.addEventListener("click", () => {
        modalAdd.classList.add("modal");
        contactsDiv.innerHTML = '';
    });
    
    modalAdd.addEventListener("click", (e) => {
        e.preventDefault()
        let isModal = e.target.closest(".modal_inner");
        let exeption = e.target.closest(".contact");
        if (!isModal && !exeption){
            modalAdd.classList.remove("modal");
        }
    });
    
    modalAddClose.addEventListener("click", () => {
        modalAdd.classList.remove("modal");
    });
    
    addContact.addEventListener("click", () => {
        let buttons = document.querySelectorAll(".remove_contact");
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
    
    saveContact.addEventListener("click", () => {
        let arr = JSON.parse(localStorage.getItem("clients"));
        let currTime = new Date;
        let fioInputs = modalAdd.querySelectorAll(".modal_add_inp");
        let contacts = modalAdd.querySelectorAll(".contact");
        let id = JSON.parse(localStorage.getItem("lastId"))+1 || 1;
        let contact = {
            id,
            fio: joinFio(fioInputs),
            createTime: currTime,
            lastChange: currTime,
            contacts: creationGetContacts()
        }

        arr.push(contact);
        localStorage.setItem("clients", JSON.stringify(arr));
        localStorage.setItem("lastId", JSON.stringify(id));
        for (let inp of fioInputs){
            inp.value = "";
        }
        for (let contact of contacts){
            contact.remove();
        }
        renderClients("clients");
        // actions();
    });

    cancelSave.addEventListener("click", () => {
        let fioInputs = modalAdd.querySelectorAll(".modal_add_inp");
        let contacts = modalAdd.querySelectorAll(".contact");
        for (let inp of fioInputs){
            inp.value = "";
        }
        for (let contact of contacts){
            contact.remove();
        }
    });
    
    function creationGetContacts(){
        let contacts = modalAdd.querySelectorAll(".contact");
        let contactsArr = [];
        for (let block of contacts){
            let type = block.querySelector(".contact_type_select").value;
            let value = block.querySelector(".contact_value").value;
            let obj = {type, value};
            contactsArr.push(obj);
        }
        return contactsArr;
    }
    
    function joinFio(inputs){
        let arr = []
        for (let inp of inputs){
            arr.push(inp.value)
        }
        return arr.join(" ");
    }
    
    function delBtns(){
        let btns = modalAdd.querySelectorAll(".remove_contact");
        let contacts = modalAdd.querySelectorAll(".contact");
        for (let i = 0; i < btns.length; i++){
            btns[i].addEventListener("click", () => {
                contacts[i].remove();
            });
        }
    }
}

modalAdd()
