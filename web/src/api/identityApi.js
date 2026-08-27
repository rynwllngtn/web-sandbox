export async function fetchRegister(payload) {
    const response = await fetch("http://localhost:8080/identities/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json();
}

export async function fetchLogin(payload) {
    const response = await fetch("http://localhost:8080/identities/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json();
}

export async function fetchMe(tokenAwt) {
    const response = await fetch("http://localhost:8080/identities/me", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + tokenAwt
        }
    })
    return await response.json();
}