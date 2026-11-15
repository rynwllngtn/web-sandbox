export function maskCpf(cpf) {
    const digits = String(cpf ?? "").replace(/\D/g, "").slice(0, 11);
    return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function unmaskCpf(cpf) {
    return String(cpf ?? "").replace(/\D/g, "");
}

export function attachCpfMask(input) {
    input.addEventListener("input", () => {
        input.value = maskCpf(input.value);
    });
}