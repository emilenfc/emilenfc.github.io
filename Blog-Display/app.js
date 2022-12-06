const blogId = (new URL(location)).hash.replace("#","")

const localStoragePublishedData = JSON.parse(localStorage.getItem('published_blog'))
console.log(localStoragePublishedData.title)
const {title,author,id,time, picture, text} = localStoragePublishedData.find(blog => blog.id == blogId)
// console.log(author)
// console.log(id)
// console.log(time)
// console.log(text)
// console.log(picture)

textContant = `
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
                            12
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
                    <h1 class="comment-title">
                        Comments
                    </h1>
                    <div class="comment-1">
                        <span>
                            <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="#">
                        </span>
                        <span class="name-date-and-comments">
                            <h1>
                                KANEZA Eric
                            </h1>
                            <span class="date">
                                <p>12/9/2022</p>
                                <p>04:23</p>
                            </span>
                            <p>
                                quam consectetur non.dapibus ante. Nulla faucibus congue  consectetur non.dapibus ante. Nulla faucibus conguconsectetur.
                            </p>
                        </span>
                    </div>
                    <div class="comment-1">
                        <span>
                            <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="#">
                        </span>
                        <span class="name-date-and-comments">
                            <h1>
                                James William
                            </h1>
                            <span class="date">
                                <p>12/9/2022</p>
                                <p>04:23</p>
                            </span>
                            <p>
                                quam consectetur non.dapibus ante. Nulla faucibus congue consectetur.
                            </p>
                        </span>
                    </div>
                </div>
                <div class="new-messages">
                    <h1>
                        Leave your comment
                    </h1>
                    <input type="text" placeholder="Your name">
                    <input type="email" placeholder="Your email">
                    <textarea name="text-area" id="text-are" cols="10" rows="3" placeholder="Your message"></textarea>
                    <button>POST</button>
                </div>
            </div>
`
document.getElementById("textContant_container").innerHTML = textContant

