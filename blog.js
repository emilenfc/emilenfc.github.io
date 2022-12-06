//for blog
const content = document.getElementById("content")
const localStoragePublishedData = JSON.parse(localStorage.getItem('published_blog'))

// console.log(localStoragePublishedData)
publishing()

function publishing(){ 
    for(let i = 0; i < localStoragePublishedData.length; i++ ){
        // console.log(localStoragePublishedData[i])
        content.innerHTML +=`<a href ="#" id="${localStoragePublishedData[i].id}" class="linking">
        <div class="contents"><div class="titles">
        <h1>${localStoragePublishedData[i].title}  <i class="fa-sharp fa-solid fa-share-nodes"></i></h1>
         <p><span> By ${localStoragePublishedData[i].author},</span><span> ${localStoragePublishedData[i].time}<span></p>
     </div>
     <div class="text-contants">
             <p>${localStoragePublishedData[i].text} ...</p>
             <img src="/Assets/Blog/pic 3.png" alt="">
  
     </div>
     <div class="likecomments-readmore">
         <div class="likecomments">
             <span class="comments">
                 <i class="fa-solid fa-message"></i>
                 <p>3 comments</p>
             </span>
             <span class="likes">
                 <i class="fa-solid fa-thumbs-up"></i>
                 <p>3</p>
             </span>
             <span class="unlikes">
                 <i class="fa-solid fa-thumbs-down"></i>
                 <p>0</p>
             </span>
         </div>
         <span class="readmore">
             <a href="/Blog-Display/index.html"><h1 class="read">READ MORE...</h1></a>
         </span>
     </div></div>
     </a>`


    }
}


const linking = document.getElementsByClassName("linking")
// console.log(linking)

for(let i=0; i<linking.length; i++){
    linking[i].addEventListener("click",(e)=>{
       location.href = "/Blog-Display/index.html#" + e.currentTarget.id
    })
}

























// function getId(obj){
//     let currentLinkId = obj.id;
//     console.log(currentLinkId);
//     const blogLinktittle = document.getElementById(currentLinkId);
//     let currentTittleId = "blogTittle" + String.fromCharCode(currentLinkId.charCodeAt(currentLinkId.length - 1));
//     console.log(currentTittleId);

//     const linkTittle = document.getElementById(currentTittleId).innerHTML;
//     console.log(linkTittle)

//     let linkRAM = [];
//     let flag = false;

//     console.log(blogLinktittle);
    
//     blogLinktittle.addEventListener("click", function(){
//         flag = true;
//         console.log("clicked");
//         // localStoragePublishedData.splice(0, 1);

//         // localStoragePublishedData.unshift(flag);

//         linkRAM.push(flag);

//         linkRAM.push(linkTittle);

//         //localStorage.setItem("localStoragePublishedData", JSON.stringify(localStoragePublishedData));
        
//         localStorage.setItem("linkData", JSON.stringify(linkRAM));
        
//     }
//     )
    
// }



