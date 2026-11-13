import "../../styles/shared.css";
import "../../styles/identity/login.css";

import { fetchLogin } from "../../api/identityApi.js";
import { navigateTo } from "../router.js";

export function init() {
    const DOM = {
        inputs: {
            cpf: document.getElementById("input-cpf"),
            password: document.getElementById("input-password"),
        },
        buttons: {
            login: document.getElementById("btn-login")
        },
        links: {
            register: document.querySelector(".panel-footer .links")
        }
    }

    DOM.buttons.login.addEventListener("click", async (event) => {
        event.preventDefault();
        const payload = {
            cpf: DOM.inputs.cpf.value.replaceAll(/[.-]/g, ''),
            password: DOM.inputs.password.value
        }
        const response = await fetchLogin(payload);
        if (response.ok) {
            sessionStorage.setItem("tokenAwt", (response.data.tokenAwt));
            await navigateTo("/dashboard");
        }
    });

    DOM.links.register.addEventListener("click", async (event) => {
        event.preventDefault();
        navigateTo("/register");
    })
}