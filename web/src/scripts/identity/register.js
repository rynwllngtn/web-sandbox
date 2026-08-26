const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

const btnNext1 = document.getElementById("btn-next-step-1");
const btnNext2 = document.getElementById("btn-next-step-2");

const btnBack1 = document.getElementById("btn-back-step-1");
const btnBack2 = document.getElementById("btn-back-step-2");

btnNext1.addEventListener("click", () => handleInputAndNextStep(step1, step2));
btnNext2.addEventListener("click", () => handleInputAndNextStep(step2, step3));

btnBack1.addEventListener("click", () => goToStep(step1));
btnBack2.addEventListener("click", () => goToStep(step2));

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