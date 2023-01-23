
// for user send message
let names = document.getElementById("na_me")
let emails = document.getElementById("email")
let messageS = document.getElementById("textmessage")
let messageBtn = document.getElementById("msgbtn")





let logout = document.getElementById("logout")

// For login-form page

let login_btn = document.getElementById("login-btn");
let email_Error = document.getElementById("errorEmail")
let password_Error = document.getElementById("errorPassword")
let login_Error = document.getElementById("errorLoginBtn")

const login_form = document.getElementById("loginForm")
const adminLogin_form = document.getElementById("adminloginForm")
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



fetch('https://good-red-cougar-hem.cyclic.app/')
.then((res)=>{
    const jsonData =res.json();
    jsonData.then((data)=>{
        console.log(data.message)
    })
})
//const Account = JSON.parse(localStorage.getItem('Account')) ?? [];

let createAccount =async  (firstName, secondName, phone, email, password) => {
    let mine = {
        firstName,secondName,phone,email,password
    }
    if (firstName.value == '' || secondName.value == '' || phone == '' || email == '' ||
        password == '') {
        alert("there is missing data");
        return false;
        //here I'm going to save all my data in localStorage
    } 


    const signUP = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',

        },
        body: JSON.stringify(mine),
        };
        console.log(signUP)
     fetch('https://good-red-cougar-hem.cyclic.app/signUp', signUP)
     .then(async (data) => {
        const res = await data.json()

        console.log(res)

        if(res.statusCode === 200){
            // element.innerHTML = res.message
            location.href = "/index.html"
        }
        if (!data.ok) {
            
          throw Error(data.status);
         }
        //console.log(data.json());
        }).then(signUP => {
        console.log(signUP);
        }).catch(e => {
        console.log(e);
        });
}

/////////------Create account button or Sign up 
signUp_Form ?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { firstName, secondName, phone, email, password } = signUp_Form

      createAccount(firstName.value, secondName.value, phone.value, email.value, password.value)
    
})

let login = (email, password) => {
    let mine = {
        email, password
    }

    const signIN = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',

        },
        body: JSON.stringify(mine),
        };
        console.log(signIN)
     fetch('https://good-red-cougar-hem.cyclic.app/login', signIN)
     .then(async (data) => {
        const res = await data.json()

        console.log(res)

        if(res.statusCode === 200){
            localStorage.setItem('AdminToken', res.userToken)
            localStorage.setItem("user",res.Id_user)
            // element.innerHTML = res.message
            location.href = "/index.html"
        }
        console.log(data.token)
        if (!data.ok) {
            
          throw Error(data.status);
         }
        //console.log(data.json());
        }).catch(err => {
        console.log(err);
        });

}
login_form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { emailLogin, passwordLogin } = login_form
    login(emailLogin.value, passwordLogin.value)
    
})


let adminlogin = (email, password) => {
    let mine = {
        email, password
    }
    const signIN = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',

        },
        body: JSON.stringify(mine),
        };
        console.log(signIN)
     fetch('https://good-red-cougar-hem.cyclic.app/adminLogin', signIN)
     .then(async (data) => {
        const res = await data.json()

        console.log(res)

        if(res.statusCode === 200){
            // element.innerHTML = res.message
            localStorage.setItem('AdminToken', res.adminToken)
            location.href = "/dash%20Board/Admin%20Dash%20-%20Post/index.html"
        }else if(
          res.errors
        ){
            alert("You are not any admin, Login as User")
        }
   
        if (!data.ok) {
            
          throw Error(data.status);
         }
        //console.log(data.json());
        }).catch(err => {
        console.log(err);
        });

}
adminLogin_form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { emailLogin, passwordLogin } = adminLogin_form
    adminlogin(emailLogin.value, passwordLogin.value)
})

// for logOUT

logout.addEventListener("dblclick", function(e){
    e.preventDefault()
    localStorage.removeItem("AdminToken")
    localStorage.removeItem("user")
    alert("loged Out successfull")
    location.href= "/login/index.html"
     })


     messageBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log("clicked by Emile")
        let date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
        let Time = new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds();
       let name= names.value
         let email= emails.value
           let message =messageS.value
           
        let user_message = {
            date,
            Time,
            name,
            email,
            message
        }
    
        const createMessage = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_message)
        };
        console.log(createMessage.body)
        fetch('https://good-red-cougar-hem.cyclic.app/sendMessage', createMessage)
            .then(async (data) => {
                //console.log(data)
                const res = await data.json()
                names.value =''
                emails.value =''
                messageS.value ='';
    
                alert(res.message);
                message
    
                if (!data.ok) {
                  
                    throw Error(data.status);
                }
    
            }).catch(err => {
                console.log(err);
            });
    
    })
    
    