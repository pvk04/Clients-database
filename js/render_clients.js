const clients = [
    {
        id: "000001",
        fio: "Панчурин Евгений Сегреевич",
        createTime: new Date(),
        lastChange: new Date(),
        contacts: [
            {type: "vk", value: "youngmetrodonttrustme"},
            {type: "phone", value: "124457589"},
            {type: "mail", value: "klava.koka@mail.com"},
            {type: "fb", value: "lohloh321"},
            {type: "other", value: "Drake"}
        ]
    }
]
localStorage.setItem("clients", JSON.stringify(clients));


function renderClients(){
    let array = JSON.parse(localStorage.getItem("clients"));
    let div = document.querySelector(".clients");


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
            <button class="client_action_btn">
                <img src="./resourses/edit_icon.svg" alt="" class="action_img">
                Изменить
            </button>
            <button class="client_action_btn">
                <img src="./resourses/remove_icon.svg" alt="" class="action_img">
                Удалить
            </button>
        </div>`
        
        div.append(client);
    }
}
renderClients();

function convertDate(element){
    element = new Date(element);
    console.log(element)
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