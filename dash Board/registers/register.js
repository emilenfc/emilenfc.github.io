const table_el = document.getElementById("table_el")

function messages() {
    let checkUrl = 'https://good-red-cougar-hem.cyclic.app/getAllUsers';
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
            data.data.users.map((x,y) => {
                console.log(x.email)
                 return (
                    table_el.innerHTML += `
                    <tr>
                    <td>${y}.</td>
                    <td>${x.firstName}</td>
                    <td>${x.secondName}</td>
                    <td>${x.phone}</td>
                    <td><a href="#">${x.email}</a></td>
                    <td><button class="active" id="deleteBtn" ondblclick="deleteBtn(event,'${x.secondName}', '${x._id}')">DELETE</button></td>
                </tr>  

`
               )
            })


        })

        
} messages()



let deleteBtn = (e,x,post_id) => {
    if(confirm(`Are you sure you want to delete ${x}?`)) {
    e.target.parentElement.parentElement.parentElement.remove(); 
   
    let deleteUrl = 'https://good-red-cougar-hem.cyclic.app/deleteOneUser/' + post_id;
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
    }
