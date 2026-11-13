import "../../styles/shared.css";
import "../../styles/identity/dashboard.css";

import { fetchMe } from "../../api/identityApi.js";
import { navigateTo } from "../router.js";

export async function init() {
    const userFetch = await fetchMe(sessionStorage.getItem("tokenAwt"));
    const DOM = {
        fields: {
            cpf: document.getElementById("identity-cpf"),
            username: document.getElementById("identity-username"),
            username_top: document.querySelector(".header-user p"),
            email: document.getElementById("identity-email"),
            status: document.getElementById("identity-status")
        },
        buttons: {
            sign_out: document.querySelector(".sidebar-footer button"),
        }
    }

    console.log(userFetch.data);
    DOM.fields.cpf.innerText = userFetch.data.cpf;
    DOM.fields.username.innerText = userFetch.data.username;
    DOM.fields.username_top.innerText = userFetch.data.username;
    DOM.fields.email.innerText = userFetch.data.email;
    DOM.fields.status.innerText = userFetch.data.status;

    DOM.buttons.sign_out.addEventListener("click", async (event) => {
        event.preventDefault();
        navigateTo("/login");
    })
}