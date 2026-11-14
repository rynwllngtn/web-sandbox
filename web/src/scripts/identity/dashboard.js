import "../../styles/shared.css";
import "../../styles/identity/dashboard.css";

import { fetchMe } from "../../api/identityApi.js";
import { routeTo } from "../router.js";

import { maskCpf } from "../utils/cpf.js"

export async function init() {
    const token = sessionStorage.getItem("tokenAwt");
    if (!token) {
        routeTo("/login");
        return;
    }
    const userFetch = await fetchMe(sessionStorage.getItem("tokenAwt"));
    if (!userFetch) {
        sessionStorage.removeItem("tokenAwt");
        routeTo("/login");
        return;
    }
    const DOM = {
        fields: {
            cpf: document.getElementById("identity-cpf"),
            username: document.getElementById("identity-username"),
            usernameTop: document.getElementById("header-username"),
            email: document.getElementById("identity-email"),
            status: document.getElementById("identity-status")
        },
        signOut: document.getElementById("btn-sign-out")
    }

    DOM.fields.cpf.innerText = maskCpf(userFetch.data.cpf);
    DOM.fields.username.innerText = userFetch.data.username;
    DOM.fields.usernameTop.innerText = userFetch.data.username;
    DOM.fields.email.innerText = userFetch.data.email;
    DOM.fields.status.innerText = userFetch.data.status;

    DOM.signOut.addEventListener("click", async (event) => {
        event.preventDefault();
        sessionStorage.removeItem("tokenAwt");
        routeTo("/login");
    })
}