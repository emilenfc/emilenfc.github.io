
const blogId = localStorage.getItem("clicked_blog_id")
console.log(blogId)
let checkId = (post_id) => {
    let checkUrl = 'https://good-red-cougar-hem.cyclic.app/blog/' + post_id;
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
            if (data.message === 'blog not found') {
                console.log('This _id not exists in the database')
            } else {
                console.log('This _id exists in the database')
                // console.log(data.data)
                let x = data.data
console.log(data)
                textContant = `
<div class="up-image-and-title">
                <span>
                    <img src=${x.image} alt="image">
                </span>
                <div class="title-header">
                    <span class="heading">
                        <h1>
                           ${x.title}
                        </h1>
                    </span>
                    <span class="pa">
                        <p>
                            Written by: <span style="color: red;">${x.author}</span>
                        </p>
                    </span>
                    <span class="viewer">
                        <img src="/Assets/eye.png" alt="#">
                        <p>
                            1
                        </p>
                    </span>
                    <span class="date-hours">
                        <p>${x.Time}</p>
                    </span>
                </div>
            </div>

            <div class="text-content" id="#">
                <p>
               
                ${x.text}
                </p>
            </div>

            <div class="icon">
                <span class="comm" id="N_comments">
                <img src="/Assets/comment.png" alt="#">
                             <p>${x.blog_comments.length}</p>
                </span>
                <span class="comm" >
                <img src="/Assets/like.png" alt="#" id="like">
                <p id ="N_likes">${x.likes.length}</p>
                </span>
                <span class="comm">
                    <img src="/Assets/unlike.png" alt="#" id="unlike">
                    <p>0</p>
                </span>
                <span class="comm">
                    <img src="/Assets/share.png" id="share" alt="#">
                </span>
            </div>

            <div class="for-comments">
                <div class="comments">
                <h1 class="comment-title">
                Comments
                </h1>
                </div>
                <div class="new-messages">
                    <h1>
                        Leave your comment
                    </h1>
                    <input id="comenterName" type="text" placeholder="Your name">
                    <textarea id="comentTextArea" name="text-area" id="text-are" cols="10" rows="3" placeholder="Your message"></textarea>
                    <button id="button_coments">POST</button>
                </div>
            </div>
`
                document.getElementById("textContant_container").innerHTML = textContant
                //for getting comments
               
                
                let like = document.getElementById("like")
                let cometerName = document.getElementById("comenterName")
                let comentFromTextArea = document.getElementById("comentTextArea")
                let button_coments = document.getElementById("button_coments")
                // let commets=JSON.parse(localStorage.getItem('comments'))?? [];
                let N_comments = document.getElementById("N_comments")
                let N_likes = document.getElementById("N_likes")

                let share = document.getElementById("share")
share.addEventListener("click", sharePage)
function sharePage() {
    if (navigator.share) {
        let share = document.getElementById("share")
        share.addEventListener("click", sharePage)
        function sharePage() {
            navigator.share({
                url: window.location.href
            })
                .then(() => console.log('Link was shared successfully'))
                .catch(error => console.log('Error sharing link: ', error));
        }
    } else {
        let share = document.getElementById("share")
        share.addEventListener("click", shareLinkedIn)
        function shareLinkedIn() {
            let linkedInShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`;
            window.open(linkedInShareLink, '_blank');
        }
    }
    
}


                function displayAllcomments(blogid) {
                    let checkUrl = 'https://good-red-cougar-hem.cyclic.app/blogComments/' + blogid;
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
                            let mess = res.json()
                            return mess;
                        }).then((data) => {
                            data.comments.map((x) => {
                                return (
                                    displayComments.innerHTML += `
           
<div class="comment-1">
<span>
    <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="#">
</span>
<span class="name-date-and-comments">
    <h1>
        ${x.Names}
    </h1>
    <span class="date">
        <p>${x.date}</p>
        <p>04${x.Time}</p>
    </span>
    <p>
        ${x.Comment}
    </p>
</span>
</div>
  `
                                )
                            })
                        })
                } displayAllcomments(blogId)


                function reset() {
                    cometerName.value = "";
                    comentFromTextArea.value = ""
                }
                let displayComments = document.querySelector(".comments")

                console.log(displayComments)

                button_coments.addEventListener("click", async () => {

                    let date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                    let Time = new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds();
                    let Names = cometerName.value
                    let Comment = comentFromTextArea.value
                    let comment = {
                        date,
                        Time,
                        Names,
                        Comment
                    }
                    console.log(comment)
                    const token = localStorage.getItem("AdminToken");
                    const createComment = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(comment)
                    };
                    console.log(createComment)
                    fetch('https://good-red-cougar-hem.cyclic.app/comments/' + blogId, createComment)
                        .then(async (data) => {
                            const res = await data.json()
                            alert(res.message ="login first");
                            reset()

                            if (!data.ok) {
                                throw Error(data.status);
                            }

                        }).catch(err => {
                            console.log(err);
                        });
                    await displayAllcomments(blogId)
                })



                like.addEventListener("click", (e) => {
                    console.log("emile click me")
                    e.preventDefault()
                    console.log("liked by emile")

                    const token = localStorage.getItem("AdminToken");
                    const createlike = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },

                    };
                    fetch('https://good-red-cougar-hem.cyclic.app/like/' + blogId, createlike)
                        .then(async (data) => {
                            const res = await data.json()
                            console.log(data)
                            alert(res.message);

console.log(res.message)
                            if (data.status === 200) {
                                console.log("Ilove you")
                                // throw Error(data.status);
                            }

                        }).catch(err => {
                            console.log(err);
                        });
                })
            }
        }).catch((err) => {
            console.log(err);
        })
}

checkId(blogId)


