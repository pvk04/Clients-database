export const actions = () => {
    let buttonsEdit = document.querySelectorAll(".edit_action");
    let clients = document.querySelectorAll(".client");
    let modalDelete = document.querySelector(".modal_delete_accept");

    for (let i = 0; i < clients.length; i++){
        let delBtn = clients[i].querySelector(".remove_action");
        delBtn.addEventListener("click", () => {
            modalDelete.classList.add("modal");
            let accept = modalDelete.querySelector(".del_accept_btn");
            accept.addEventListener("click", () => {
                clients[i].remove();
                modalDelete.classList.remove("modal");
                let array = JSON.parse(localStorage.getItem("clients"));
                array.splice(i, 1);
                localStorage.setItem("clients", JSON.stringify(array));
                renderClients();
            });
        });    
    }

    modalDelete.addEventListener("click", (e) => {
        e.preventDefault();
        let isModal = e.target.closest(".modal_inner");
        let closeModal = e.target.closest(".close_modal");
        let delCancel = e.target.closest(".del_cancel");

        if (!isModal || closeModal || delCancel){
            modalDelete.classList.remove("modal");
        }
    });
}
