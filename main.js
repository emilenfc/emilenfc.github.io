
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



// // ---------login input valitation --------------------------------------





function loginValidatePassword() {
    let login_password = document.getElementById("input-Password").value;
    password_Validation(login_password, password_Error);
}
function validateEmail() {
    var login_email = document.getElementById("input-email").value;
    email_Validation(login_email, email_Error)

}
login_btn.addEventListener("click",()=> {
    console.log("emile click me")

    if (validateEmail() == false || loginValidatePassword() == false) {
        login_Error.innerHTML = "Enter required info plz"
        return false
    }
    else {
        login_Error.innerHTML = "OK Go ON"
        return true;
    }
})
//---------------------------------   End   ------------------------------------------

// ----------------------validation for  SignUp ----------------------

user_firstName.addEventListener("input", ()=> {
    let meme = user_firstName.value;
    name_Validationin(meme, user_firstName_error)
})
user_secondName.addEventListener("input", () => {
    let meme = user_secondName.value;
    name_Validationin(meme, user_secondName_error)
})
user_phoneNumber.addEventListener("input", () => {
    let meme = user_phoneNumber.value;
    phone_Validationin(meme, user_phoneNumber_error)
})
user_emailAddress.addEventListener("input", () => {
    let meme = user_emailAddress.value
    email_Validation(meme, user_emailAddress_error)
})
user_password.addEventListener("input", () => {
    let meme = user_password.value;
    password_Validation(meme, user_password_error)
})
user_confirmPassword.addEventListener("input",()=>{
let meme = user_confirmPassword.value
let mumu = user_password.value
console.log(meme + mumu)
if(meme == mumu){
    user_confirmPassword_error.innerHTML = "Confirmed"
    return true
}
else{
    user_confirmPassword_error.innerHTML = "Not yet match!!!"
    return false
}
})
signUp_btn.addEventListener("click", ()=>{
    if(user_firstName == false ||
        user_secondName == false ||
        user_phoneNumber == false ||
        user_emailAddress == false ||
        user_password == false ||
        user_confirmPassword == false
    ){
        signUP_btn_error.innerHTML == "fill all required"
        return false;
    }
    else{
        signUP_btn_error.innerHTML == "GO ON"
        return true;
    }
})
//---------------------------------   End   ------------------------------------------

//--------------------------------------GENERAL VALIDATIONS

function email_Validation(input, message) {
    if (input.length == 0) {
        message.innerHTML = "Enter email please"
        return false
    }
    else if (!input.match(/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        message.innerHTML = "Enter valid email"
        return false
    }
    else {
        message.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
        return true
    }
}
function password_Validation(input, message) {

    if (input.length == 0) {
        message.innerHTML = " Enter password"
        return false
    }
    else if (input.length < 6) {
        message.innerHTML = "minimum 6 character"
    }
    else if (!input.match(/[A-Za-z][0-9]/)) {
        message.innerHTML = "Include all number and string"
        return false
    }
    else {
        message.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
        return true
    }
}

function name_Validationin(input, message) {
    if (input.length == 0) {
        message.innerHTML = "Enter your nam()"
        return false
    }
    else if (!input.match(/^[A-Za-z]+$/)) {
        message.innerHTML = "should be only characters"
        return false;
    }
    else {
        message.innerHTML = "OK"
        return true;
    }

}

function phone_Validationin(input, message) {
    if (input.length == 0) {
        message.innerHTML = "Enter your phone number"
        return false
    }
    else if (!input.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
        message.innerHTML = "Enter valid phone number"
        return false;
    }
    else {
        message.innerHTML = "OK"
        return true;
    }

}







//signUp function
let createAccount = (firstName, secondName, phone, email, password, confirmPassword) => {
    //here I'm going check for user input
    if (firstName.value == '' || secondName.value == '' || phone == '' || email == '' ||
        password == '' || confirmPassword == '') {

        alert("there is missing data");
        return false;
        //here I'm going to save all my data in localStorage
    } 

    for (let person of Account) {
        // console.log(person.email, emailLogin, person.password, passwordLogin)
        if (person.email == email) {
            alert("user alread exist")
            return;
        }}

    Account.push({
        firstName,
        secondName,
        phone,
        email,
        password,
        id: crypto.randomUUID()
    });
    console.log(Account);
    localStorage.setItem('Account', JSON.stringify(Account))
    window.location.href = "/index.html"

}

/////////------Create account button or Sign up 

signUp_Form?.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    const { firstName, secondName, phone, email, password, confirmPassword } = signUp_Form

    createAccount(firstName.value, secondName.value, phone.value, email.value, password.value)


})



const Account = JSON.parse(localStorage.getItem('Account')) ?? [];


// //add event on signup button

// signUp_btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     createAccount();
//     // localStorage.clear()
// })



/////////---for signing or login 

// Adding event on login button

// login_btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     login();
// });

//login function
let login = (emailLogin, passwordLogin) => {
    //mine
    if (validateEmail() == false || loginValidatePassword() == false) {
        login_Error.innerHTML = "Enter required info plz"
        return false
    }
    else {
        login_Error.innerHTML = "OK Go ON"
        return true;
    }//mine
    
    //here I'm going check for user input
    if (emailLogin == '' || passwordLogin == '') {
        alert("there is missing data");
        return false;
    }
    else {//all remaining user the system will check in the localstorage
        for (let person of Account) {
            console.log(person.email, emailLogin, person.password, passwordLogin)

            if (person.email == emailLogin && person.password == passwordLogin) {
                person.admin && (location.href = '/dash%20Board/Admin%20Dash%20-%20Post/index.html')
                !person.admin && (window.location.href = '/index.html');
                break;
            } else {
                console.log("user not found")
            }
        }
    }
}

login_form?.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    const { emailLogin, passwordLogin } = login_form

    login(emailLogin.value, passwordLogin.value)


})



































//I want to make admin login using this the following cresidantial and being direct to Admin dash board
    // if (user_emailAddress.value === "iyaemile4@gmail.com" && user_password === "emile123") {
    //     console.log("emile")
    //     window.location.href = '/dash Board/Admin Dash-Post/index.html';

    // }



///////At this time I want to Add and delete my profile on dash board

// let my_name = document.getElementById("my-Name");
// let logout_btn = document.getElementById("log-out")// ******^^^^^^THIS BUTTON IS NOY YET CREATED^^^^^^^***********
// let User = document.cookie; // cookie of logged in user
//  my_name.innerHTML = User.slice(6); // Displaying username

// // Logging out the user;
// logout_btn.addEventListener('click',()=>{
//     document.cookie = `Admin=IYADUKUNZE Emile; exprires=Dec 25 2010 00:00:00`;
//     window.location.href = 'index.html';
// })



