const path = {
    "/login": {
        html: "/src/pages/identity/login.html",
        script: () => import("/src/scripts/identity/login.js"),
        run: (script) => script.init()
    },
    "/register": {
        html: "/src/pages/identity/register.html",
        script: () => import("/src/scripts/identity/register.js"),
        run: (script) => script.init()
    }
}

async function navigateTo(screen, addToHistory = true) {
    const appIndex = document.getElementById("index");
    const target = path[screen];
    try {
        const [response, script] = await Promise.all([
            fetch(target.html),
            target.script ? target.script() : Promise.resolve(null)
        ])

        if (!response.ok) throw new Error("Bruh");
        appIndex.innerHTML = await response.text();

        if (addToHistory) {
            window.history.pushState({}, "", screen);
        }

        if (script) {
            target.run(script);
        }
    }
    catch (error) {
        console.log(error);
    }
}

document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-route]");
    if (target) {
        event.preventDefault();
        const route = target.getAttribute("data-route");
        navigateTo(route);
    }
});

navigateTo("/login");