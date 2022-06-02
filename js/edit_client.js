import {renderClients} from "./render_clients.js"

let modalEdit = document.querySelector(".edit_form");
let saveEdit = modalEdit.querySelector(".modal_add_save");
let addContactEdit = modalEdit.querySelector(".edit_contact");

// export function actions(){
//     let editBtns = document.querySelectorAll(".edit_action");
//     for (let btn of editBtns){
//         btn.addEventListener("click", () => {
//             modalEdit.classList.add("modal");
//             let editIndex = btn.dataset.index;
//             let arrayClients = JSON.parse(localStorage.getItem("clients"));
//             let currentClient;
//             let contactsDiv = modalEdit.querySelector(".contacts");

//             localStorage.setItem("editIndex", JSON.stringify(editIndex));
//             contactsDiv.innerHTML = "";

//             for (let elem of arrayClients){
//                 if (elem.id == editIndex){
//                     currentClient = elem;
//                 }
//             }

//             let fioArr = currentClient.fio.split(" ");
//             let fioInputs = modalEdit.querySelectorAll(".modal_add_inp");
//             fioInputs[0].value = fioArr[0];
//             fioInputs[1].value = fioArr[1];
//             fioInputs[2].value = fioArr[2];
                
//             for (let elem of currentClient.contacts){
//                 let contact = document.createElement("div");
//                 contact.classList.add("contact");
//                 contact.innerHTML = `
//                 <select name="contact_type" class="contact_type_select">
//                     ${selected(elem)}
//                 </select>
//                 <input type="text" class="contact_value" placeholder="Введите данные контакта" value="${elem.value}">
//                 <button class="remove_contact">
//                     <img src="./resourses/contact_cross_icon.svg" alt="" class="remove_contact_icon">
//                 </button>`;

                    
//                 contactsDiv.append(contact);
//                 delBtns();
//             }
//         });
//     }
// }
  

    
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
                renderClients();
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

