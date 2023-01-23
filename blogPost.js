
// this is for blog contror post

const blog_Title = document.getElementById("title");
const blog_status = document.getElementById("status");
const placeForContent = document.getElementById("placeForContent")
// const editBtn = document.getElementById("editBtn")
// const deleteBtn = document.getElementById("deleteBtn")

fetch('http://localhost:4000/')
.then((res)=>{
    const jsonData =res.json();
    jsonData.then((data)=>{
        console.log(data.message)
    })
})
console.log("here")

let getBlogs = () => {
    const token = localStorage.getItem('AdminToken');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    fetch('http://localhost:4000/allBlogs', options)
    .then((res) => {
        if (!res.ok) {
            throw Error(res.status);
        }
        
        return res.json();
    }).then((blogs) => {
        console.log(blogs.data)
        placeForContent.innerHTML = '';
        blogs.data.map((x,y)=>{
            return (
                placeForContent.innerHTML += `
        <div class="post" id=${x._id}>
                    <div class="post-info">
                        <img src="${x.image}" alt="post img">
                        <span class="post-description">
                            <h1>${x.title}</h1>
                            <p>Author: ${x.author}</p>
                            <p>Published:${x.Time}</p>
                        </span>
                    </div>
                    <div class="post-reaction">
                        <img src="/Assets/unpublish.png"  class="post-icon" id ="editBtn" onClick="editBtn(this,'${x._id}')">
                        <img src="/Assets/delete.png"  class="post-icon" id ="deleteBtn" onClick="deleteBtn(this,'${x._id}')">
                        <div>
                            <span class="left-reaction-btn">
                                <img src="/Assets/comments for admin.png" class="post-icon" alt="">
                                <p>${x.blog_comments.length}</p>
                            </span>
                            <span class="left-reaction-btn">
                                <img src="/Assets/like.png" class="post-icon" alt="">
                                <p>${x.likes.length}</p>
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
    }).catch((err) => {
        console.log(err);
    });
}
getBlogs()
//to check if  blog ID is available
let checkId = (post_id) => {
    let checkUrl = 'http://localhost:4000/blog/' + post_id;
    const token = localStorage.getItem('AdminToken');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    fetch(checkUrl, options)
    .then((res) => {
        if (!res.ok) {
            throw Error(res.status);
        }
        return res.json();
    }).then((data) => {
        if(data.message === 'blog not found'){
            console.log('This _id not exists in the database')
        }else{
            console.log('This _id exists in the database')
        }
    }).catch((err) => {
        console.log(err);
    });
}

let deleteBtn =(e,post_id)=>{
    checkId(post_id)
    e.parentElement.parentElement.remove();
    let deleteUrl = 'http://localhost:4000/deleteOneBlog/' + post_id;
    const token = localStorage.getItem('AdminToken');
    const options = {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
    };
    fetch(deleteUrl, options)

    .then(async(res) => {
   const data = await res.json()
   console.log(data)
   if(data.statusCode === 200){
    alert(data.message)
   }
    if (!res.ok) {
    throw Error(res.status);
    }
    return res.json();
   
    }).catch((err) => {
    console.log(err);
    });
}

let checkid = async (post_id) => {
    let checkUrl = 'http://localhost:4000/blog/' + post_id;
    const token = localStorage.getItem('AdminToken');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const res = await fetch(checkUrl, options);
        if (!res.ok) {
            throw Error(res.status);
        }
        const data = await res.json();
        // console.log(data.data)
        return data.data;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

function editBtn(ele,post_id) {
    checkid(post_id)
    .then(async(data) => {
        console.log(data)
        console.log(data._id)
        // Store the current values of the title, author, and text in localStorage
        localStorage.setItem('blogTitle', data.title);
        localStorage.setItem('blogAuthor', data.author);
        localStorage.setItem('blogText', data.text);
        localStorage.setItem('blogID', data._id);

        // Redirect the user to the new page where they can edit the values
        location.href = "/dash%20Board/New%20POST/index.html#";    
    })
    .catch((err) => {
        console.log(err);
       
    });
}
