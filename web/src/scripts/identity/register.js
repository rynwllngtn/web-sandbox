import "../../styles/shared.css";
import "../../styles/identity/register.css";

import { fetchRegister } from "../../api/identityApi.js"
import { navigateTo } from "../router.js";

export function init() {
    const DOM = {
        section: {
            section1: document.getElementById("section-1"),
            section2: document.getElementById("section-2"),
            section3: document.getElementById("section-3")
        },
        inputs: {
            cpf: document.getElementById("cpf"),
            email: document.getElementById("email"),
            name: document.getElementById("username"),
            pass: document.getElementById("password"),
            pass_confirm: document.getElementById("password-confirm"),
        },
        buttons: {
            next1: document.getElementById("btn-next-section-1"),
            next2: document.getElementById("btn-next-section-2"),
            back1: document.getElementById("btn-back-section-1"),
            back2: document.getElementById("btn-back-section-2"),
            submit: document.getElementById("btn-register")
        },
        links: {
            login: document.querySelector(".panel-footer .links")
        }
    }

    DOM.buttons.next1.addEventListener("click", () => handleInputAndNextSection(DOM.section.section1, DOM.section.section2));
    DOM.buttons.next2.addEventListener("click", () => handleInputAndNextSection(DOM.section.section2, DOM.section.section3));

    DOM.buttons.back1.addEventListener("click", () => goToSection(DOM.section.section1));
    DOM.buttons.back2.addEventListener("click", () => goToSection(DOM.section.section2));

    DOM.buttons.submit.addEventListener("click", async (event) => {
        event.preventDefault();
        const payload = {
            cpf: DOM.inputs.cpf.value.replaceAll(/[.-]/g, ''),
            password: DOM.inputs.pass.value,
            username: DOM.inputs.name.value,
            email: DOM.inputs.email.value
        }
        const response = await fetchRegister(payload);
        if (response.ok) {
            navigateTo("/login");
        }
    });

    DOM.links.login.addEventListener("click", async (event) => {
        event.preventDefault();
        navigateTo("/login");
    })
}


function goToSection(sectionToShow) {
    let sections = document.querySelectorAll(".section-step");
    for (const section of sections) {
        section.style.display = "none";
    }
    sectionToShow.style.display = "flex";

    let dots = document.querySelectorAll(".dot");
    for (const dot of dots) {
        dot.classList.remove("active");
    }
    const sectionNumber = Number(sectionToShow.dataset.section);
    for (let i = 1; i <= sectionNumber; i++) {
        document.getElementById("dot-" + i).classList.add("active");
    }
}

function validateInputs(currentSection) {
    const inputs = currentSection.querySelectorAll("input");
    for (const input of inputs) {
        if (input.validity.valid === false) {
            input.reportValidity();
            return false;
        }
    }
    return true;
}

function handleInputAndNextSection(currentSection, nextSection) {
    if (validateInputs(currentSection)) {
        goToSection(nextSection);
    }
}