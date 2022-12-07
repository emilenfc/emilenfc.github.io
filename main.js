
// For login-form page

let login_btn = document.getElementById("login-btn");
let email_Error = document.getElementById("errorEmail")
let password_Error = document.getElementById("errorPassword")
let login_Error = document.getElementById("errorLoginBtn")

const login_form = document.getElementById("loginForm")

//for signUp-form page
const signUp_Form = document.getElementById("signUp_Form");

const user_firstName = document.getElementById("first-name");
const user_secondName = document.getElementById("second-name");
const user_phoneNumber = document.getElementById("phone-number");
const user_emailAddress = document.getElementById("signUp-email-address");
const user_password = document.getElementById("signUP-password");
const user_confirmPassword = document.getElementById("confirm-password");

const user_firstName_error = document.getElementById("first-name-error")
const user_secondName_error = document.getElementById("second-name-error")
const user_phoneNumber_error = document.getElementById("phone-number-error")
const user_emailAddress_error = document.getElementById("signUp-email-address-error")
const user_password_error = document.getElementById("signUP-password-error")
const user_confirmPassword_error = document.getElementById("confirm-password-error")
const signUP_btn_error = document.getElementById("signUp-error")



//--------------------------------------GENERAL VALIDATIONS

// function email_Validation(input, message) {
//     if (!input.match(/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//         message.innerHTML = "Enter valid email"
//         return false
//     }
//     else {
//         message.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
//         return true
//     }
// }
// function password_Validation(input, message) {

//     if (input.length < 6) {
//         message.innerHTML = "minimum 6 character"
//     }
//     else if (!input.match(/[A-Za-z][0-9]/)) {
//         message.innerHTML = "Include all number and string"
//         return false
//     }
//     else {
//         message.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
//         return true
//     }
// }
// function name_Validationin(input, message) {
//      if (!input.match(/^[A-Za-z]+$/)) {
//         message.innerHTML = "should be only characters"
//         return false;
//     }
//     else {
//         message.innerHTML = "OK"
//         return true;
//     }

// }

// function phone_Validationin(input, message) {
//      if (!input.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
//         message.innerHTML = "Enter valid phone number"
//         return false;
//     }
//     else {
//         message.innerHTML = "OK"
//         return true;
//     }
// }
//--------------------------------------------------------- work one
//signUp function
const Account = JSON.parse(localStorage.getItem('Account')) ?? [];

let createAccount = (firstName, secondName, phone, email, password, confirmPassword) => {
    
    if (firstName.value == '' || secondName.value == '' || phone == '' || email == '' ||
        password == '' || confirmPassword == '') {
        alert("there is missing data");
        return false;
        //here I'm going to save all my data in localStorage
    } 
   
   
    for (let person of Account) {
        // console.log(person.email, emailLogin, person.password, passwordLogin)
        if (person.email == email) {
            email.innerHTML ="email found"
            alert("user email alread exist")
            return;
        }}
    Account.push({
        firstName,
        secondName,
        phone,
        email,
        password,
        id: Date.now()
    });
    localStorage.setItem('Account', JSON.stringify(Account))
    window.location.href = "/index.html"
}
/////////------Create account button or Sign up 
signUp_Form ?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { firstName, secondName, phone, email, password, confirmPassword } = signUp_Form

    createAccount(firstName.value, secondName.value, phone.value, email.value, password.value)
    
})

let login = (emailLogin, passwordLogin) => {
    if (emailLogin == '' || passwordLogin == '') {
        alert("there is missing data");
        return false;
    }
    else {//all remaining user the system will check in the localstorage
        for (let person of Account) {
            if (person.email == emailLogin && person.password == passwordLogin) {
                person.admin && (location.href = '/dash%20Board/Admin%20Dash%20-%20Post/index.html')
                !person.admin && (window.location.href = '/index.html');
                break;
            } else {
                alert("user not found")
            }
        }
    }
}
login_form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { emailLogin, passwordLogin } = login_form
    login(emailLogin.value, passwordLogin.value)
})
