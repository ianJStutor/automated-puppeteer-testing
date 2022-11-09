document.querySelector("form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const nameEl = document.querySelector("#name");
    const name = nameEl.value.trim();
    if (!name) {
        document.querySelector(".err").textContent = "Please fill out this field";
        nameEl.focus();
        return;
    }
    const select = document.querySelector("#reservation");
    const reservation = select[select.selectedIndex].textContent;
    const formData = { name, reservation };

    // Simulate server delay
    setTimeout(() => reservationConfirmed(formData), Math.random() * 1000);
}

function reservationConfirmed({ name, reservation }) {
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const main = document.querySelector("main");
    main.className = "reservation-confirmed";
    h2.textContent = "Reservation confirmed!";
    p.id = "confirmation";
    p.textContent = `${name}, thank you for your reservation for ${reservation}.`;
    main.append(h2, p);
}
