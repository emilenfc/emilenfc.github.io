
// this is for blog contror post
const saved = document.getElementById("savebtn")
const blog_Title = document.getElementById("title");
const blog_status = document.getElementById("status");
const placeForContent = document.getElementById("placeForContent")
// const editBtn = document.getElementById("editBtn")
// const deleteBtn = document.getElementById("deleteBtn")


let post = JSON.parse(localStorage.getItem('blog')) || []
toUseBlog()
function toUseBlog(){
            // use of map to give all mu data number
            placeForContent.innerHTML = '';
        post.map((x,y)=>{
            return (
                placeForContent.innerHTML += `
        <div class="post" id=${y}>
                    <div class="post-info">
                        <img src="/Assets/Admin dashboard/Group 4.png" alt="post img">
                        <span class="post-description">
                            <h1>${x.title}</h1>
                            <p>Published:${x.time}</p>
                        </span>
                    </div>
                    <div class="post-reaction">
                        <img src="/Assets/unpublish.png"  class="post-icon" id ="editBtn" onClick="editBtn(this)">
                        <img src="/Assets/delete.png"  class="post-icon" id ="deleteBtn" onClick="deleteBtn(this)">
                        <div>
                            <span class="left-reaction-btn">
                                <img src="/Assets/comments for admin.png" class="post-icon" alt="">
                                <p>7</p>
                            </span>
                            <span class="left-reaction-btn">
                                <img src="/Assets/like.png" class="post-icon" alt="">
                                <p>10</p>
                            </span>
                            <span class="left-reaction-btn">
                                <img src="/Assets/unlike.png" class="post-icon" alt="">
                                <p>0</p>
                            </span>   
                        </div>
                    </div>
                </div>`
            )
        })
    }

let deleteBtn =(e)=>{
    e.parentElement.parentElement.remove();
    post.splice(e.parentElement.parentElement.id, 1)

}   
let editBtn =((e)=>{
    
     let seletedBlog = e.parentElement.parentElement;
    location.href ="/dash%20Board/New%20POST/index.html"
    deleteBtn(e)
})