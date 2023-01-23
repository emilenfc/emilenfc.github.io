// for blog display
comments_El=JSON.parse(localStorage.getItem('comments_El'))?? [];

const blogId =localStorage.getItem('clicked_blog_id')
let data = null;
let comments_El = null;

const fetchBlogData = async () => {
    data = await (await fetch(`https://good-red-cougar-hem.cyclic.app/blog/${blogId}`)).json();
    comments_El = data.comments;
    console.log(data.title)
    const {title,author,time,text} = data;
    let textContant = `
    <div class="up-image-and-title">
                    <span>
                        <img src="/Assets/Blog/HR-GR8-technology.jpg" alt="image">
                    </span>
                    <div class="title-header">
                        <span class="heading">
                            <h1>
                               ${title}
                            </h1>
                        </span>
                        <span class="pa">
                            <p>
                                Written by: <span style="color: red;">${author}</span>
                            </p>
                        </span>
                        <span class="viewer">
                            <img src="/Assets/eye.png" alt="#">
                            <p>
                                1
                            </p>
                        </span>
                        <span class="date-hours">
                            <p>${time}</p>
                        </span>
                    </div>
                </div>

                <div class="text-content" id="#">
                    <p>
                   
                    ${text}
                    </p>
                </div>

                <div class="icon">
                    <span class="comm">
                        <img src="/Assets/comment.png" alt="#">
                        <p>3</p>
                    </span>
                    <span class="comm">
                        <img src="/Assets/like.png" alt="#">
                        <p>20</p>
                    </span>
                    <span class="comm">
                        <img src="/Assets/unlike.png" alt="#">
                        <p>1</p>
                    </span>
                    <span class="comm">
                        <img src="/Assets/share.png" alt="#">
                    </span>
                </div>

                <div class="for-comments">
                    <div class="comments">
                                   // here is place for comment
                    </div>
                    <div class="new-messages">
                        <h1>
                            Leave your comment
                        </h1>
                        <input id="comenterName" type="text" placeholder="Your name">
                        <input id="comenterEmail" type="email" placeholder="Your email">
                        <textarea id="comentTextArea" name="text-area" id="text-are" cols="10" rows="3" placeholder="Your message"></textarea>
                        <button id="button_coments">POST</button>
                    </div>
                </div>
    `
}
document.getElementById("textContant_container").innerHTML = textContant



//for getting comments

let cometerName = document.getElementById("comenterName")
let comenterEmail = document.getElementById("comenterEmail")
let comentFromTextArea = document.getElementById("comentTextArea")
let button_coments = document.getElementById("button_coments")
// let commets=JSON.parse(localStorage.getItem('comments'))?? [];

let displayComments = document.querySelector(".comments")

console.log(displayComments)
button_coments.addEventListener("click",(e)=>{
    e.preventDefault()
    let date_el = new Date().getDate()+ '/' + (new Date().getMonth()+1)+'/' + new Date().getFullYear();
    let Time_el =new Date().getHours() +' : '+ new Date().getMinutes()+' : '+ new Date().getSeconds();
    let commentName = cometerName.value
    let commenterEmail = comenterEmail.value
    let commenttext =comentFromTextArea.value
    let comentHashUrl = new URL(location.href)
    let hash_el =comentHashUrl.hash.replace('#','')
    comments_El.push({
        date_el,
        Time_el,
        commentName,
        commenterEmail,
        commenttext,
    })
    localStorage.setItem('comments_El',JSON.stringify(comments_El))
})
function reset(){
    cometerName.value =""
    comenterEmail.value=''
}

function displayAllcomments(comments){
    let comments_html ='';
for(let i = 0; i<comments.length;i++){
comments_html +=`
<h1 class="comment-title">
Comments
</h1>
<div class="comment-1">
<span>
    <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="#">
</span>
<span class="name-date-and-comments">
    <h1>
        ${comments[i].commentName}
    </h1>
    <span class="date">
        <p>${comments[i].date_el}</p>
        <p>04${comments[i].Time_el}</p>
    </span>
    <p>
        ${comments[i].commenttext}
    </p>
</span>
</div>
`
}
return comments_html;
}

displayComments.innerHTML = displayAllcomments(comments_El);
