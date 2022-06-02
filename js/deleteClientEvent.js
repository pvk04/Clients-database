// import { renderClients } from "./render_clients";

export function deleteClientEvent(render) {
    let modalDelete = document.querySelector(".modal_delete_accept");
    let modalEdit = document.querySelector(".edit_form");

    let delBtns = document.querySelectorAll(".remove_action");
    for (let btn of delBtns) {
        btn.addEventListener("click", () => {
            modalDelete.classList.add("modal");
            let delIndex = btn.dataset.index;
            localStorage.setItem("deleteIndex", JSON.stringify(delIndex));
        });
    }

    modalDelete.addEventListener("click", (e) => {
        e.preventDefault();
        let isModal = e.target.closest(".modal_inner");
        let closeModal = e.target.closest(".close_modal");
        let delCancel = e.target.closest(".del_cancel");

        let isAccept = e.target.closest(".del_accept_btn");
        let delIndex = JSON.parse(localStorage.getItem("deleteIndex"));

        if (!isModal || closeModal || delCancel) {
            modalDelete.classList.remove("modal");
        }
        else if (isAccept) {
            deleteClient(delIndex);
            modalDelete.classList.remove("modal");
            modalEdit.classList.remove("modal");
        }
    });

    function deleteClient(id) {
        let array = JSON.parse(localStorage.getItem("clients"));
        let index;
        for (let elem of array) {
            if (elem.id == id) {
                index = array.indexOf(elem);
                array.splice(index, 1);
                localStorage.setItem("clients", JSON.stringify(array));
                localStorage.setItem("deleteIndex", JSON.stringify(null));

                return render();
            }
        }
    }

}