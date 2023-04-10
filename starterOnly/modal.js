const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close")
const modalSuccess = document.querySelector(".modal-success")
const successBtnClose = document.querySelector(".modal-close-btn")
const successClose = document.querySelector(".success-close")

//form value
let formValue = {
    name: "",
    surname: "",
    email: "",
    birthdate: "",
    quantity: undefined,
    country: "",
    cgu: true
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close success modal
successBtnClose.addEventListener("click", () => {
    document.querySelector("#content").style.display = "block"
    document.querySelector("footer").style.display = "block"
    modalSuccess.style.display = "none"
})

successClose.addEventListener("click", () => {
    document.querySelector("#content").style.display = "block"
    document.querySelector("footer").style.display = "block"
    modalSuccess.style.display = "none"
})


// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

//close the modal
modalClose.addEventListener("click", () => {
    modalbg.style.display = "none"
})


//handle email input
const emailIpt = document.querySelector("#email")
emailIpt.addEventListener("input", ({target: {value: email}}) => {
    const isValid = email.match(emailRegex)
    setInputError("email", isValid)
    formValue.email = isValid ? email : ""
})

//handle name input
const nameIpt = document.querySelector("#name")
nameIpt.addEventListener("input", ({target: {value: name}}) => {
    setInputError("name", name.length > 2)
    formValue.name = name
})

//handle surname input
const surnameIpt = document.querySelector("#surname")
surnameIpt.addEventListener("input", ({target: {value: surname}}) => {
    setInputError("surname", surname.length > 2)
    formValue.surname = surname
})

//handle birthdate
const birthdayIpt = document.querySelector("#birthdate")
birthdayIpt.addEventListener("input", ({target: {value: birthdate}}) => {
    const now = new Date()
    const date = new Date(birthdate)
    setInputError("birthdate", now >= date)
    formValue.birthdate = birthdate
})

//handle competition number input
const quantityIpt = document.querySelector("#quantity")
quantityIpt.addEventListener("input", ({target: {value: quantity}}) => {
    setInputError("quantity", Number.isSafeInteger(+quantity))
    formValue.quantity = +quantity
})

//handle country ratio
const compIpt = document.querySelectorAll("#location1,#location2,#location3,#location4,#location5,#location6")

compIpt.forEach((elt) => {
    elt.addEventListener("change", ({target: {value: location}}) => {
        formValue.country = location
        document.querySelector(`.country-error`).style.display = "none"
    })
})

//handle cgu checkbox
const cguIpt = document.querySelector("#checkbox1")

cguIpt.addEventListener("change", ({target: {checked}}) => {
    document.querySelector(`.cgu-error`).style.display = checked ? "none" : "block"
    formValue.cgu = checked
})

//handle submit
const submitBtn = document.querySelector(".button")

submitBtn.addEventListener("click", (e) => {
    let valid = true
    e.preventDefault()
    for (const prop in formValue) {
        switch (prop) {
            case "name":
                if (formValue[prop].length < 2) {
                    setInputError(prop, false)
                    valid = false
                }
                break
            case "surname":
                if (formValue[prop].length < 2) {
                    setInputError(prop, false)
                    valid = false
                }
                break
            case "email":
                if (!formValue[prop].match(emailRegex)) {
                    setInputError(prop, false)
                    valid = false
                }
                break
            case "birthdate":
                const now = new Date()
                const date = new Date(formValue[prop])
                if (date >= now || formValue[prop].length === 0) {
                    setInputError(prop, false)
                    valid = false
                }
                break
            case "quantity":
                if (formValue[prop] === undefined) {
                    setInputError(prop, false)
                    valid = false
                }
            case "country":
                if (formValue[prop] === "") {
                    document.querySelector(`.${prop}-error`).style.display = "block"
                    valid = false
                }
                break
            case "cgu":
                if (!formValue[prop]) {
                    document.querySelector(`.${prop}-error`).style.display = "block"
                    valid = false
                }
        }
    }

    if (valid) {
        if (valid) {
            //hidden main content to show the success pop up
            document.querySelector("#content").style.display = "none"
            document.querySelector("footer").style.display = "none"
            //display the success popup
            modalbg.style.display = "none"
            modalSuccess.style.display = "flex"
            //reset the form
            document.getElementById("inscriptionform").reset()
            //reset the object holding all for value
            formValue = {
                name: "",
                surname: "",
                email: "",
                birthdate: "",
                quantity: undefined,
                country: "",
                cgu: true
            }
        }
    }
})


function setInputError(inputName, isValid) {
    if (!isValid) {
        document.querySelector(`.${inputName}-error`).style.display = "block"
        document.querySelector(`#${inputName}`).classList.add("input-error")
        return
    }
    document.querySelector(`.${inputName}-error`).style.display = "none"
    document.querySelector(`#${inputName}`).classList.remove("input-error")
}
