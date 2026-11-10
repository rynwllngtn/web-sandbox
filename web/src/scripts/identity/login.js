import "../../styles/shared.css";
import "../../styles/identity/login.css";

/*
Para ser removido
Único import, pois os links são persistentes entre páginas
 */
import "../../styles/identity/temp.css";

import {fetchLogin} from "../../api/identityApi.js";

export function init() {
    const DOM = {
        inputs: {
            cpf: document.getElementById("input-cpf"),
            password: document.getElementById("input-password"),
        },
        buttons: {
            login: document.getElementById("btn-login")
        }
    }

    DOM.buttons.login.addEventListener("click", async (event) => {
        event.preventDefault();
        const payload = {
            cpf: DOM.inputs.cpf.value.replaceAll(/[.-]/g, ''),
            password: DOM.inputs.password.value
        }
        const response = await fetchLogin(payload);
        console.log(response);
    });
}