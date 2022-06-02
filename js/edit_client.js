export const actions = (render) => {
    // let modalDelete = document.querySelector(".modal_delete_accept");
    let modalEdit = document.querySelector(".edit_form");
    let saveEdit = modalEdit.querySelector(".modal_add_save");
    let addContactEdit = modalEdit.querySelector(".edit_contact");

    // function delBtnsEvents(){
    //     let delBtns = document.querySelectorAll(".remove_action");
    //     for (let btn of delBtns){
    //         btn.addEventListener("click", () => {
    //             modalDelete.classList.add("modal");
    //             let delIndex = btn.dataset.index;
    //             localStorage.setItem("deleteIndex", JSON.stringify(delIndex));
    //         });
    //     }
    // }
    // delBtnsEvents();

    // modalDelete.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     let isModal = e.target.closest(".modal_inner");
    //     let closeModal = e.target.closest(".close_modal");
    //     let delCancel = e.target.closest(".del_cancel");

    //     let isAccept = e.target.closest(".del_accept_btn");
    //     let delIndex = JSON.parse(localStorage.getItem("deleteIndex"));

    //     if (!isModal || closeModal || delCancel){
    //         modalDelete.classList.remove("modal");
    //     }
    //     else if(isAccept){
    //         deleteClient(delIndex);
    //         modalDelete.classList.remove("modal");
    //     }
    // });


    // function deleteClient(id){
    //     let array = JSON.parse(localStorage.getItem("clients"));
    //     let index;
    //     for (let elem of array){
    //         if (elem.id == id){
    //             index = array.indexOf(elem);
    //             array.splice(index, 1);
    //             localStorage.setItem("clients", JSON.stringify(array));
    //             localStorage.setItem("deleteIndex", JSON.stringify(null));
    //             renderClients();
    //             delBtnsEvents();
    //             editBtnsEvents();
    //             return
    //         }
    //     }
    // }

    function editBtnsEvents(){
        let editBtns = document.querySelectorAll(".edit_action");
        for (let btn of editBtns){
            btn.addEventListener("click", () => {
                modalEdit.classList.add("modal");
                let editIndex = btn.dataset.index;
                let arrayClients = JSON.parse(localStorage.getItem("clients"));
                let currentClient;
                let contactsDiv = modalEdit.querySelector(".contacts");

                localStorage.setItem("editIndex", JSON.stringify(editIndex));
                contactsDiv.innerHTML = "";

                for (let elem of arrayClients){
                    if (elem.id == editIndex){
                        currentClient = elem;
                    }
                }

                let fioArr = currentClient.fio.split(" ");
                let fioInputs = modalEdit.querySelectorAll(".modal_add_inp");
                fioInputs[0].value = fioArr[0];
                fioInputs[1].value = fioArr[1];
                fioInputs[2].value = fioArr[2];
                
                for (let elem of currentClient.contacts){
                    let contact = document.createElement("div");
                    contact.classList.add("contact");
                    contact.innerHTML = `
                    <select name="contact_type" class="contact_type_select">
                        ${selected(elem)}
                    </select>
                    <input type="text" class="contact_value" placeholder="Введите данные контакта" value="${elem.value}">
                    <button class="remove_contact">
                        <img src="./resourses/contact_cross_icon.svg" alt="" class="remove_contact_icon">
                    </button>`;

                    
                    contactsDiv.append(contact);
                    delBtns();
                }
            });
        }
    }
    // editBtnsEvents();

    
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
                render();
                // editBtnsEvents();
                // delBtnsEvents();
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

    function selected(element){
        let selectCode = "";
        switch (element.type){
            case ("phone"):
                selectCode += `<option value="phone" selected>Телефон</option>
                                <option value="mail">Email</option>
                                <option value="fb">Facebook</option>
                                <option value="vk">VK</option>
                                <option value="other">Другое</option>`;
                break
            case ("mail"):
                selectCode += `<option value="phone">Телефон</option>
                                <option value="mail" selected>Email</option>
                                <option value="fb">Facebook</option>
                                <option value="vk">VK</option>
                                <option value="other">Другое</option>`;
                break
            case ("fb"):
                selectCode += `<option value="phone">Телефон</option>
                                <option value="mail">Email</option>
                                <option value="fb" selected>Facebook</option>
                                <option value="vk">VK</option>
                                <option value="other">Другое</option>`;
                break
            case ("vk"):
                selectCode += `<option value="phone">Телефон</option>
                                <option value="mail">Email</option>
                                <option value="fb">Facebook</option>
                                <option value="vk" selected>VK</option>
                                <option value="other">Другое</option>`;
                break
            case ("other"):
                selectCode += `<option value="phone">Телефон</option>
                                <option value="mail">Email</option>
                                <option value="fb">Facebook</option>
                                <option value="vk">VK</option>
                                <option value="other" selected>Другое</option>`;
                break
        }
        return selectCode
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
}
