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

//form value
const formValue = {
  name: "",
  surname: "",
  email: "",
  birthday: "",
  quantity: undefined,
  country: "",
  cgu: true
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

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
  if(!email.match(emailRegex)) {
    document.querySelector(".email-error").style.display = "block"
    return
  }
  document.querySelector(".email-error").style.display = "none"
  formValue.email = email
})

//handle name input
const nameIpt = document.querySelector("#first")
nameIpt.addEventListener("input", ({target: {value: name}}) => {
  if(name.length < 2) {
    document.querySelector(".name-error").style.display = "block"
    return;
  }
  document.querySelector(".name-error").style.display = "none"
  formValue.name = name
})

//handle surname input
const surnameIpt = document.querySelector("#last")
surnameIpt.addEventListener("input", ({target: {value: surname}}) => {
  if(surname.length < 2) {
    document.querySelector(".surname-error").style.display = "block"
    return;
  }
  document.querySelector(".surname-error").style.display = "none"
  formValue.surname = surname
})

//handle birthday
const birthdayIpt = document.querySelector("#birthdate")
birthdayIpt.addEventListener("input", ({target: {value: birthday}}) => {
  const now = new Date()
  const date = new Date(birthday)
  if(date >= now) {
    document.querySelector(".birthday-error").style.display = "block"
    return;
  }
  document.querySelector(".birthday-error").style.display = "none"
  formValue.birthday = birthday
})

//handle competition number input
const quantityIpt = document.querySelector("#quantity")
quantityIpt.addEventListener("input", ({target: {value: quantity}}) => {
  formValue.quantity = quantity
})

//handle country ratio
const compIpt = document.querySelectorAll("#location1,#location2,#location3,#location4,#location5,#location6")

compIpt.forEach((elt) => {
  elt.addEventListener("change", ({target: {value: location}}) => {
    formValue.country = location
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
  for(const prop in formValue) {
    switch (prop) {
      case "name":
        if(formValue[prop].length < 2) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
        break
      case "surname":
        if(formValue[prop].length < 2) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
        break
      case "email":
        if(!formValue[prop].match(emailRegex)) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
        break
      case "birthday":
        const now = new Date()
        const date = new Date(formValue[prop])
        if(date >= now || formValue[prop].length === 0) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
        break
      case "quantity":
        if(formValue[prop] === undefined) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
      case "country":
        if(formValue[prop] === "") {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
        break
      case "cgu":
        if(!formValue[prop]) {
          document.querySelector(`.${prop}-error`).style.display = "block"
          valid = false
        }
    }
  }

  if(valid) {
    modalSuccess.style.display = "block"
    setTimeout(() => {
      modalSuccess.style.display = "none"
    }, 3000)
    modalbg.style.display = "none"
  }
})
