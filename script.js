const input = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("shoppingList");

addBtn.addEventListener("click", addProduct);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addProduct();
    }
});

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