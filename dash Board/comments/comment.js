let comment_el = document.getElementById("comment_el")


function messages() {
    let checkUrl = 'https://good-red-cougar-hem.cyclic.app/getAllCommetsofAllBlogs';
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
            console.log(data)
            data.map((x,y) => {
                console.log(x)
                 return (
                    comment_el.innerHTML += `
                 
                    <div class="rectangle">
                    <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="image">
                    <div class="name-and-comments">
                        <span class="top-name-comments">
                            <p class="blue">${x.Names}</p>
                            <p>Commented on</p>
                            <p class="blue">${x.blogName}</p>
                        </span>
                        <span class="comment">
                            <p>
                            ${x.Comment}
                            </p>
                        </span>
                    </div>
                    <div class="date-and-delete">
                        <span class="date">
                            <p>
                                On ${x.date}
                            </p>
                            <p>
                                ${x.Time}
                            </p>
                        </span>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
`
               )
            })


        })

        
} messages()


