class Route {
    constructor(loadHtml, loadScript) {
        this.loadHtml = loadHtml;
        this.loadScript = loadScript;
    }

    async load() {
        const htmlPromise = this.loadHtml();
        const scriptPromise = this.loadScript ? this.loadScript() : null;

        const [htmlModule, script] = await Promise.all([htmlPromise, scriptPromise]);
        return {
            html: htmlModule.default,
            script: script,
        }
    }
}

const routes = {
    "/login": new Route(
        () => import("../pages/identity/login.html?raw"),
        () => import("./identity/login.js")
    ),
    "/register": new Route(
        () => import("../pages/identity/register.html?raw"),
        () => import("./identity/register.js")
    ),
    "/dashboard": new Route(
        () => import("../pages/identity/dashboard.html?raw"),
        () => import("./identity/dashboard.js")
    )
}

export function initRoute() {
    if (!routes[window.location.pathname]) {
        routeTo("/login", false);
        window.history.replaceState({}, "", "/login");
    }
    else {
        routeTo(window.location.pathname, false);
    }
}

export async function routeTo(screen, history = true) {
    const route = routes[screen];
    if (!route) {
        console.error(`Route not found: ${screen}`);
        return;
    }
    try {
        const { html, script } = await route.load();

        const appIndex = document.getElementById("index");
        appIndex.innerHTML = html;

        if (history) {
            window.history.pushState({}, "", screen);
        }

        script?.init?.();
    }
    catch (error) {
        console.error("Error routing to screen:", screen, error);
    }
}

export function attachRouterClick(input, path, history) {
    input.addEventListener("click", () => {
        routeTo(path, history);
    })
}

addEventListener("popstate", () => {
    routeTo(window.location.pathname, false);
})