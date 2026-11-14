import "../../styles/shared.css";
import "../../styles/identity/login.css";

import { fetchLogin } from "../../api/identityApi.js";
import { routeTo, attachRouterClick } from "../router.js";

import { attachCpfMask, unmaskCpf } from "../utils/cpf.js"

export function init() {
    const DOM = {
        inputs: {
            cpf: document.getElementById("input-cpf"),
            password: document.getElementById("input-password"),
        },
        form: document.getElementById("form-login"),
        linkRegister: document.getElementById("link-register")
    }

    attachCpfMask(DOM.inputs.cpf);

    DOM.form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const payload = {
            cpf: unmaskCpf(DOM.inputs.cpf.value),
            password: DOM.inputs.password.value
        }
        const response = await fetchLogin(payload);
        if (response.ok) {
            sessionStorage.setItem("tokenAwt", (response.data.tokenAwt));
            routeTo("/dashboard");
        }
    });

    attachRouterClick(DOM.linkRegister, "/register")
}