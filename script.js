const input = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("shoppingList");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const gradientSelect = document.getElementById("gradientSelect");
const container = document.querySelector(".container");
const quantityInput = document.getElementById("quantityInput");
const categorySelect = document.getElementById("categorySelect");

    addBtn.addEventListener("click", addProduct);
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addProduct();
        }
    });

const gradients = {
    blueGreen: {
        page: "linear-gradient(135deg, #2193b0, #6dd5a1)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08))",
        accent: "#ffffff",
        accentText: "#1d4f5e",
        text: "#ffffff"
    },
    blackWhite: {
        page: "linear-gradient(135deg, #0f0f0f, #f2f2f2)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.7))",
        accent: "#111111",
        accentText: "#f2f2f2",
        text: "#111111"
    },
    redOrange: {
        page: "linear-gradient(135deg, #ff512f, #f09819)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.06))",
        accent: "#ffffff",
        accentText: "#9b2a0f",
        text: "#ffffff"
    },
    purplePink: {
        page: "linear-gradient(135deg, #9b6bff, #ff8dd8)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.18))",
        accent: "#ffffff",
        accentText: "#6b3e8f",
        text: "#2b1f3a"
    },
    tealGold: {
        page: "linear-gradient(135deg, #0fb9b1, #f5c542)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.12))",
        accent: "#ffffff",
        accentText: "#0c6f6a",
        text: "#0f2a2a"
    },
    sunset: {
        page: "linear-gradient(135deg, #ff416c, #ff8a00)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))",
        accent: "#ffffff",
        accentText: "#7a1d2c",
        text: "#ffffff"
    }
};

function applyGradient(key) {
    const theme = gradients[key];
    if (!theme) return;

    document.documentElement.style.setProperty("--page-gradient", theme.page);
    document.documentElement.style.setProperty("--card-gradient", theme.card);
    document.documentElement.style.setProperty("--accent", theme.accent);
    document.documentElement.style.setProperty("--accent-text", theme.accentText);
    document.documentElement.style.setProperty("--card-text", theme.text);

    // Fallback for mobile browsers that don't update CSS variables reliably
    document.body.style.background = theme.page;
    if (container) {
        container.style.background = theme.card;
        container.style.color = theme.text;
    }
}

function getSavedGradient() {
    try {
        return localStorage.getItem("shoppingGradient");
    } catch (error) {
        return sessionStorage.getItem("shoppingGradient");
    }
}

function saveGradient(value) {
    try {
        localStorage.setItem("shoppingGradient", value);
    } catch (error) {
        sessionStorage.setItem("shoppingGradient", value);
    }
}

if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener("click", function() {
        settingsPanel.classList.toggle("is-open");
        const isOpen = settingsPanel.classList.contains("is-open");
        settingsPanel.setAttribute("aria-hidden", String(!isOpen));
    });
}

if (gradientSelect) {
    gradientSelect.addEventListener("change", function() {
        const nextValue = gradientSelect.value;
        applyGradient(nextValue);
        saveGradient(nextValue);
    });

    gradientSelect.addEventListener("input", function() {
        const nextValue = gradientSelect.value;
        applyGradient(nextValue);
        saveGradient(nextValue);
    });

    const savedGradient = getSavedGradient();
    if (savedGradient && gradients[savedGradient]) {
        gradientSelect.value = savedGradient;
    }
    applyGradient(gradientSelect.value);
}

    function addProduct() {
        const product = input.value.trim();
        const quantity = Math.max(1, parseInt(quantityInput ? quantityInput.value : "1", 10) || 1);
        const category = categorySelect ? categorySelect.value : "General";

        if (product === "") {
            alert("Introdu un produs!");
            return;
        }

        const li = document.createElement("li");

        const info = document.createElement("div");
        info.classList.add("item-info");

        const span = document.createElement("span");
        span.textContent = product;

        span.addEventListener("click", function() {
            span.classList.toggle("completed");
        });

        const meta = document.createElement("div");
        meta.classList.add("item-meta");

        const qtyBadge = document.createElement("span");
        qtyBadge.classList.add("badge");
        qtyBadge.textContent = `x${quantity}`;

        const catBadge = document.createElement("span");
        catBadge.classList.add("badge", "badge-category");
        catBadge.textContent = category;

        meta.appendChild(qtyBadge);
        meta.appendChild(catBadge);
        info.appendChild(span);
        info.appendChild(meta);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(info);
        li.appendChild(removeBtn);
        list.appendChild(li);

        input.value = "";
        if (quantityInput) quantityInput.value = "1";
    }
