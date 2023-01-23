const table = document.getElementById("table")
const deleteAll = document.getElementById("deleteall")


function messages() {
    let checkUrl = 'http://localhost:4000/getSubscriber';
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
                console.log(x.email)
                 return (
                    table.innerHTML += `
                    <tr>
                        <td>${y}.</td>
                        <td ><a href="#">${x.email}</a></td>
                        <td>${x.date}</td>
                        <td>${x.Time}</td>
                        <td><h4><button id="deleteBtn" ondblclick="deleteBtn(event,'${x._id}')">delete</button></h4></td>

                    </tr>

`
               )
            })


        })

        
} messages()



let deleteBtn = (e,post_id) => {
    e.target.parentElement.parentElement.parentElement.remove(); 
   
    let deleteUrl = 'http://localhost:4000/deleteOneSubscriber/' + post_id;
    const token = localStorage.getItem('AdminToken');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    fetch(deleteUrl, options)
        .then((res) => {
            console.log(res)
            if (!res.ok) {
                throw Error(res.status);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data)
            if(data.statusCode === 200){
                alert(data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

 



    deleteAll.addEventListener("click",(e)=>{
        // e.preventDefault();
        console.log("cliked by emile")
      
        let deleteUrl = 'http://localhost:4000/dltAllsubscribers';
        const token = localStorage.getItem('AdminToken');
        if(confirm("Are you sure you want to delete all subscribers?")) {
            
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            fetch(deleteUrl, options)
                .then((res) => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error(res.status);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data)
                    if(data.statusCode === 200){
                        alert(data.message)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    
        }
       
    
    })
    