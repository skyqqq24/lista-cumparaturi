    const input = document.getElementById("productInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("shoppingList");
    const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const gradientSelect = document.getElementById("gradientSelect");

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
        page: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.18))",
        accent: "#ffffff",
        accentText: "#6b3e8f",
        text: "#2b1f3a"
    },
    tealGold: {
        page: "linear-gradient(135deg, #1f4037, #99f2c8)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.12))",
        accent: "#ffffff",
        accentText: "#1f4037",
        text: "#0f2a23"
    },
    sunset: {
        page: "linear-gradient(135deg, #ee0979, #ff6a00)",
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
}

    settingsBtn.addEventListener("click", function() {
        settingsPanel.classList.toggle("is-open");
        const isOpen = settingsPanel.classList.contains("is-open");
        settingsPanel.setAttribute("aria-hidden", String(!isOpen));
    });

gradientSelect.addEventListener("change", function() {
    const nextValue = gradientSelect.value;
    applyGradient(nextValue);
    localStorage.setItem("shoppingGradient", nextValue);
});

const savedGradient = localStorage.getItem("shoppingGradient");
if (savedGradient && gradients[savedGradient]) {
    gradientSelect.value = savedGradient;
}
applyGradient(gradientSelect.value);

    function addProduct() {
        const product = input.value.trim();

        if (product === "") {
            alert("Introdu un produs!");
            return;
        }

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = product;

        span.addEventListener("click", function() {
            span.classList.toggle("completed");
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);

        input.value = "";
    }
