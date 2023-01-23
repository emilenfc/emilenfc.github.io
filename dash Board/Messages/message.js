const allmessage = document.getElementById("allmessage")


function messages() {
    let checkUrl = 'http://localhost:4000/userMessage';
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
            data.map((x) => {
                return (
                    allmessage.innerHTML += `
 <div class="rectangle">
 <img src="/Assets/Blog/blank-head-profile-pic-for-a-man.jpg" alt="image">
<div class="name-and-comments">
    <span class="top-name-comments">
        <p class="blue">${x.name}</p>
        <p>${x.email}</p>
        
    </span>
    <span class="comment">
        <p>
            ${x.message}
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
    <i class="fa-solid fa-trash" onClick="deleteBtn(this,'${x._id}')"></i>
</div>
</div> `

                )
            })
        })

        
} messages()

let deleteBtn =(e,post_id)=>{

    e.parentElement.parentElement.remove();
    let deleteUrl = 'http://localhost:4000/deletemessage/' + post_id;
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