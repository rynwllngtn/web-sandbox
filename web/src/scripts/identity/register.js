import "../../styles/shared.css";
import "../../styles/identity/register.css";

import { fetchRegister } from "../../api/identityApi.js";
import { routeTo, attachRouterClick } from "../router.js";

import { attachCpfMask, unmaskCpf } from "../utils/cpf.js";

export function init() {
    const DOM = {
        form: document.getElementById("form-register"),
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
            pass_confirm: document.getElementById("password-confirm")
        },
        buttons: {
            next1: document.getElementById("btn-next-section-1"),
            next2: document.getElementById("btn-next-section-2"),
            back1: document.getElementById("btn-back-section-1"),
            back2: document.getElementById("btn-back-section-2")
        },
        linkLogin: document.getElementById("link-login")
    }

    attachCpfMask(DOM.inputs.cpf);

    attachHandleInput(DOM.buttons.next1, DOM.section.section1, DOM.section.section2);
    attachHandleInput(DOM.buttons.next2, DOM.section.section2, DOM.section.section3);
    attachGoToSection(DOM.buttons.back1, DOM.section.section1);
    attachGoToSection(DOM.buttons.back2, DOM.section.section2);

    DOM.form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const payload = {
            cpf: unmaskCpf(DOM.inputs.cpf.value),
            email: DOM.inputs.email.value,
            username: DOM.inputs.name.value,
            password: DOM.inputs.pass.value
        }
        if (DOM.inputs.pass.value !== DOM.inputs.pass_confirm.value) {
            return;
        }
        const response = await fetchRegister(payload);
        if (response.ok) {
            routeTo("/login");
        }
    });

    attachRouterClick(DOM.linkLogin, "/login");
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

function attachHandleInput(target, currentSection, nextSection) {
    target.addEventListener("click", () => handleInputAndNextSection(currentSection, nextSection));
}

function attachGoToSection(target, sectionToShow) {
    target.addEventListener("click", () => goToSection(sectionToShow));
}