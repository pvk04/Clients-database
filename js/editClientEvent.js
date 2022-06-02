let modalEdit = document.querySelector(".edit_form");

export function actions(){
    
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

function delBtns(){
    let btns = modalEdit.querySelectorAll(".remove_contact");
    let contacts = modalEdit.querySelectorAll(".contact");
    for (let i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", () => {
            contacts[i].remove();
        });
    }
}