// input blog
const title = document.getElementById("title");
const picture = document.getElementById("picture");
const author =document.getElementById("author")
const text = document.getElementById("textArea")
const saveBtn = document.getElementById("savebtn")
const publishBtn = document.getElementById("publish")
const Time = new Date().getDate()+ '/' + (new Date().getMonth()+1)+'/' + new Date().getFullYear() +' : ' + new Date().getHours() +':'+ new Date().getMinutes()+':'+ new Date().getSeconds();

// let blog = JSON.parse(localStorage.getItem('blog')) ?? [];

let newUrl = new URL(location.href)
let image;

//let published_blog = JSON.parse(localStorage.getItem('published_blog'))?? [];





picture.addEventListener("change",() =>{
    const fr =new FileReader();
    fr.readAsDataURL(picture.files[0]);
    fr.addEventListener("load",() =>{
        const url = fr.result;
        image = url
        document.querySelector('#img1').src=image
       return url; 
    })
}
) 

publishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createBlog(title.value, author.value, image, text.value, Time);
    // clearBtn();
});

let createBlog = (title, author, image, text, Time) => {
    let blog = {
        title,
        author,
        image,
        text,
        Time
    }
    console.log(image)
    const token = localStorage.getItem('AdminToken');
    const createBlog = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blog)
    };
    console.log(createBlog)
    fetch('http://localhost:4000/createBlog', createBlog)
    .then(async (data) => {
   const res = await data.json()
        console.log(res);
        if(res.statusCode === 201){
            alert(res.message)
            clearBtn()
        }else if({Error:400}){
            alert("please all input are required")
            
        }
        if (!data.ok) {
            throw Error(data.status);
        }
        
    }).catch(err => {
        console.log(err);
    });
}
let clearBtn =()=>{
    title.value = '';
    author.value = '';
    text.value= '';
    if (picture.value) {
        picture.value = null;
        document.querySelector('#img1').src = '';
    }
    //location.href = "/dash%20Board/Admin%20Dash%20-%20Post/index.html"; 
}




const updateBlog = ()=>{

    const blogTitle = localStorage.getItem("blogTitle") ;
    const blogAuthor= localStorage.getItem("blogAuthor");
    const blogText = localStorage.getItem("blogText");
    console.log(blogAuthor)

    if(blogTitle !== null){
    title.value = blogTitle
    console.log(title)
    } else{
       return false
    }
    if(blogAuthor !== null){
        author.value = blogAuthor;
    
    } else{
        alert("nothing to update")
    }
    if(blogText !== null){
        text.value = blogText
    }
    else{
        alert("nothing to update")
    }
    }
    updateBlog()

    const blogId = localStorage.getItem("blogID")

    let patch = (post_id) => {
        // Get the updated data from the input fields
        let updatedTitle = title.value;
        let updatedAuthor = author.value;
        let updateText = text.value;
        const token = localStorage.getItem('AdminToken');
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: updatedTitle,
                author: updatedAuthor,
                text: updateText
            })
        };
        fetch(`http://localhost:4000/updateBlog/${post_id}`, options)
        .then((res) => {
            
            if (!res.ok) {
                alert("Nothing to update")
                throw Error(res.status);
            }
            return res.json();
        }).then((data) => {
            alert(data.message)
            // update the blog on the front-end
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    }
    saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        patch(blogId)
         localStorage.removeItem("blogTitle");
         localStorage.removeItem("blogAuthor");
         localStorage.removeItem("blogText");
         localStorage.removeItem("blogID");
         clearBtn();
       
    });






















// publishBtn.addEventListener("click", (e)=>{
//     e.preventDefault()
//     published();
//     clearBtn()
   
// })


// let findedOne;
// if(newUrl.hash.replace('#', '')){
//     findedOne = published_blog.find((blog)=>{
//         return blog.id ==newUrl.hash.replace('#', '')
       
//        })
//        console.log(findedOne)
//        title.value = findedOne.title
//        author.value = findedOne.author
//        text.value = findedOne.text
// }

// let published = ()=>{
//     if(title.value == '' || author.value == '' || text.value == ''){
//         return;
//     }else{
//         let usedEl = newUrl.hash.replace('#', '');
//         if(usedEl){
//             published_blog.map((blog)=>{
//                 if(blog.id == usedEl){
//                     findedOne.title = title.value
//                     findedOne.author= author.value
//                     findedOne.text =text.value 
//                     findedOne.image = image
//                     return findedOne;
                    
//                 }
//                 return blog;
//             })
//             localStorage.setItem('published_blog', JSON.stringify(published_blog))
//             return;
//         }
//         published_blog.push({
//             image,
//             title:title.value,
//             author:author.value,
//             time: Time,
//             text:text.value,
//             id: Date.now()
//         });
       
    
//     localStorage.setItem('published_blog', JSON.stringify(published_blog))
//     }
   
// }

































































// // we begin by getting references to the input fields from our html file
// const form = document.getElementById("form");
// const titleNew = document.getElementById("title");
// const picture = document.getElementById("picture");
// const text = document.getElementById("textArea");

// // declare an array to hold our blogs
// const blogs = [];

// // first check if there are no already existing blogs in local storage
// const oldData = JSON.parse(localStorage.getItem('blogs')) ?? [];
// if(oldData.length > 0){
//     console.log("This is old data:", oldData);
//     oldData.forEach(item => {
//         blogs.push(item);
//     })
// }
// // console.log("I'm here");

// // event handler to accept the data
// form.addEventListener('submit',e=> {
//     e.preventDefault();
//     // console.log('button clicked');

//     // base object for a blog
//     const article = {
//         id: Date.now(),
//         title: null,
//         picture: null,
//         text: null
//     }

//     // inserting the data from the input fields into our base object
//     article.title = titleNew.value;
//     article.text = text.value;

//     // pushing the article into our earlier blog
//     blogs.push(article);

//     // storing our array with the articles into local storage
//     localStorage.setItem('blogs', JSON.stringify(blogs));
//     console.log(localStorage.getItem('blogs'));
//     // console.log(blogs);
// })














































































// // For login-form page


// let login_btn = document.getElementById("login-btn");
// let email_Error = document.getElementById("errorEmail")
// let password_Error = document.getElementById("errorPassword")
// let login_Error = document.getElementById("errorLoginBtn")



// //for signUp-form page
// const user_firstName = document.getElementById("first-name");
// const user_secondName = document.getElementById("second-name");
// const user_phoneNumber = document.getElementById("phone-number");
// const user_emailAddress = document.getElementById("signUp-email-address");
// const user_password = document.getElementById("signUP-password");
// const user_confirmPassword = document.getElementById("confirm-password");
// let signUp_btn = document.getElementById("signUp")

// const user_firstName_error = document.getElementById("first-name-error")
// const user_secondName_error = document.getElementById("second-name-error")
// const user_phoneNumber_error = document.getElementById("phone-number-error")
// const user_emailAddress_error = document.getElementById("signUp-email-address-error")
// const user_password_error = document.getElementById("signUP-password-error")
// const user_confirmPassword_error = document.getElementById("confirm-password-error")
// const signUP_btn_error = document.getElementById("signUp-error")



// // ---------login input valitation --------------------------------------

// function loginValidatePassword() {
//     let login_password = document.getElementById("input-Password").value;
//     password_Validation(login_password, password_Error);
// }
// function validateEmail() {
//     var login_email = document.getElementById("input-email").value;
//     email_Validation(login_email, email_Error)

// }
// login_btn.addEventListener("click",()=> {
//     console.log("emile click me")

//     if (validateEmail() == false || loginValidatePassword() == false) {
//         login_Error.innerHTML = "Enter required info plz"
//         return false
//     }
//     else {
//         login_Error.innerHTML = "OK Go ON"
//         return true;
//     }
// })
// //---------------------------------   End   ------------------------------------------

// // ----------------------validation for  SignUp ----------------------

// user_firstName.addEventListener("input", ()=> {
//     let meme = user_firstName.value;
//     name_Validationin(meme, user_firstName_error)
// })
// user_secondName.addEventListener("input", () => {
//     let meme = user_secondName.value;
//     name_Validationin(meme, user_secondName_error)
// })
// user_phoneNumber.addEventListener("input", () => {
//     let meme = user_phoneNumber.value;
//     phone_Validationin(meme, user_phoneNumber_error)
// })
// user_emailAddress.addEventListener("input", () => {
//     let meme = user_emailAddress.value
//     email_Validation(meme, user_emailAddress_error)
// })
// user_password.addEventListener("input", () => {
//     let meme = user_password.value;
//     password_Validation(meme, user_password_error)
// })
// user_confirmPassword.addEventListener("input",()=>{
// let meme = user_confirmPassword.value
// let mumu = user_password.value
// console.log(meme + mumu)
// if(meme == mumu){
//     user_confirmPassword_error.innerHTML = "Confirmed"
//     return true
// }
// else{
//     user_confirmPassword_error.innerHTML = "Not yet match!!!"
//     return false
// }
// })
// signUp_btn.addEventListener("click", ()=>{
//     if(user_firstName == false ||
//         user_secondName == false ||
//         user_phoneNumber == false ||
//         user_emailAddress == false ||
//         user_password == false ||
//         user_confirmPassword == false
//     ){
//         signUP_btn_error.innerHTML == "fill all required"
//         return false;
//     }
//     else{
//         signUP_btn_error.innerHTML == "GO ON"
//         return true;
//     }
// })
// //---------------------------------   End   ------------------------------------------

// //--------------------------------------GENERAL VALIDATIONS

// function email_Validation(input, message) {
//     if (input.length == 0) {
//         message.innerHTML = "Enter email please"
//         return false
//     }
//     else if (!input.match(/^[a-z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//         message.innerHTML = "Enter valid email"
//         return false
//     }
//     else {
//         message.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
//         return true
//     }
// }
// function password_Validation(input, message) {

//     if (input.length == 0) {
//         message.innerHTML = " Enter password"
//         return false
//     }
//     else if (input.length < 6) {
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
//     if (input.length == 0) {
//         message.innerHTML = "Enter your nam()"
//         return false
//     }
//     else if (!input.match(/^[A-Za-z]+$/)) {
//         message.innerHTML = "should be only characters"
//         return false;
//     }
//     else {
//         message.innerHTML = "OK"
//         return true;
//     }

// }

// function phone_Validationin(input, message) {
//     if (input.length == 0) {
//         message.innerHTML = "Enter your phone number"
//         return false
//     }
//     else if (!input.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
//         message.innerHTML = "Enter valid phone number"
//         return false;
//     }
//     else {
//         message.innerHTML = "OK"
//         return true;
//     }

// }























// // function login(e) {
  
// //     e.preventDefault();
// //     var email = document.getElementById('email').value;
// //     var pass = document.getElementById('pwd').value;
    
// //     console.log(email, pass);
// //     const user = users.find(user => user.email === email && user.password === pass)
// //     localStorage.setItem("authenticatedUser", JSON.stringify(user))
// //     if(user.previllege === "admin") {
// //       location.href = "/dashboard.html"
// //     }
// //     else {
// //       location.href = "/"
// //     }

// //     // if (email === localStorage.getItem('userEmail') && pass === localStorage.getItem('userpwd')) {
// //     //   window.location.replace("./dashboard.html");
// //     // }
// //     // else {
// //     //   document.getElementById('error').textContent = 'Invalid credentials'
// //     // }
// //   }
