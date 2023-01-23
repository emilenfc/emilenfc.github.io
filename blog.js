//for blog
const content = document.getElementById("content")
console.log(content)






    let publishing = () => {
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
            // console.log(res.json())
            return res.json();
        }).then((blogs) => {
        console.log(blogs.data)
        // console.log("hello")
        let id = blogs.data
        console.log(id)

        blogs.data.map((x)=>{
                        console.log(x._id)
                        thisBlogId = x.id
                        
                return (
                    content.innerHTML +=`
                    <div class="contents">
                        <div class="titles">
                            <h1>${x.title}  <i class="fa-sharp fa-solid fa-share-nodes"></i></h1>
                            <p><span> By ${x.author},</span><span> ${x.Time}<span></p>
                        </div>
                        <div class="text-contants">
                            <p>${x.text} ...</p>
                            <img src="${x.image}" alt="">
                        </div>
                        <div class="likecomments-readmore">
                            <div class="likecomments">
                                <span class="comments">
                                    <i class="fa-solid fa-message"></i>
                                    <p>${x.blog_comments.length} comments</p>
                                </span>
                                <span class="likes">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                    <p class="N_likes">${x.likes.length}</p>
                                </span>
                                <span class="unlikes">
                                    <i class="fa-solid fa-thumbs-down"></i>
                                    <p>0</p>
                                </span>
                            </div>
                            <span class="readmore">
                                <h3 id="${x._id}" class="read">READ MORE...</h3>
                            </span>
                        </div>
                    </div>
                    `
                    
                )
            })        
           
            const readmore = document.getElementsByClassName("read")
            console.log(readmore.innerHTML)
            for(let i=0; i<readmore.length; i++){
                readmore[i].addEventListener("click",(e)=>{
                   // setTimeout(() => {
                        localStorage.setItem('clicked_blog_id', e.currentTarget.id);
                        location.href = "/Blog-Display/index.html?id=" + e.currentTarget.id;
                        //console.log(clicked_blog_id)
                 //   }, 0);
                }) 
            }
   
        })
        };
        //console.log(localStorage.getItem('clicked_blog_id'))
        publishing()





        let emails = document.getElementById("emails")
   let btn = document.getElementById("sub")
   btn.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log("clicked by Emile")
            const token = localStorage.getItem('AdminToken');

            let date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            let Time = new Date().getHours() + ' : ' + new Date().getMinutes() + ' : ' + new Date().getSeconds();
        
             let email= emails.value
               
            let user_message = {
                date,
                Time,
                email,
            }
        
            const createMessage = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user_message)
            };
            console.log(createMessage.body)
            fetch('http://localhost:4000/subscribe', createMessage)
                .then(async (data) => {
                    //console.log(data)
                    const res = await data.json()
                
                    emails.value =''
                    alert(res.message);
                    
        
                    if (!data.ok) {
                      
                        throw Error(data.status);
                    }
        
                }).catch(err => {
                    console.log(err);
                });
        
        })