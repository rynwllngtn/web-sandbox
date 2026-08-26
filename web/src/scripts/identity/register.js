const DOM = {
    steps: {
        step1: document.getElementById("step-1"),
        step2: document.getElementById("step-2"),
        step3: document.getElementById("step-3")
    },
    buttons: {
        next1: document.getElementById("btn-next-step-1"),
        next2: document.getElementById("btn-next-step-2"),
        back1: document.getElementById("btn-back-step-1"),
        back2: document.getElementById("btn-back-step-2")

    }
}

DOM.buttons.next1.addEventListener("click", () => handleInputAndNextStep(DOM.steps.step1, DOM.steps.step2));
DOM.buttons.next2.addEventListener("click", () => handleInputAndNextStep(DOM.steps.step2, DOM.steps.step3));

DOM.buttons.back1.addEventListener("click", () => goToStep(DOM.steps.step1));
DOM.buttons.back2.addEventListener("click", () => goToStep(DOM.steps.step2));

function goToStep(stepToShow) {
    let steps = document.querySelectorAll(".form-step");
    for (const step of steps) {
        step.style.display = "none";
    }
    stepToShow.style.display = "flex";
}

function validateInputs(currentStep) {
    const inputs = currentStep.querySelectorAll("input");
    for (const input of inputs) {
        if (input.validity.valid === false) {
            input.reportValidity();
            return false
        }
    }
    return true;
}

function handleInputAndNextStep(currentStep, nextStep) {
    if (validateInputs(currentStep)) {
        goToStep(nextStep);
    }
}