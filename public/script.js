//Function to open modal
document.querySelector(".more-ideas").addEventListener("click", () => {
    document.querySelector(".b-modal").classList.add("hide");
});

//Function to close modal
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".b-modal").classList.remove("hide");
});

//Function to check empty fields form
document.querySelector(".b-form").addEventListener("submit", (event) => {
    const valueToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ];

    const isEmpty = valueToCheck.find((value) => {
        const checkIfIsString = typeof event.target[value].value === "string";
        const checkIfIsEmpty = !event.target[value].value.trim();

        if(checkIfIsString && checkIfIsEmpty) {
            return true;
        }
    })

    if(isEmpty) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos");
    }

    for( let value of valueToCheck ) {
        console.log(event.target[value].value)
    }
});

