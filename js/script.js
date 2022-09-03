// Get Categories
const getData = async() => {
    const caturl = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(caturl);
        const categories_data = await res.json();
        categories(categories_data.data.news_category)
        // console.log(categories_data.data.news_category[0].category_name)
    }
    catch(err){
        console.log(err)
    }
}


const categories = (categories_data) =>{
    const category_list = document.getElementById('category-list');
    for(const category of categories_data){
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <button onclick="post(${category.category_id})" class="liButton" >${category.category_name}</button>
        `;
        category_list.appendChild(newLi); 
            // console.log(category.category_name)
    }
}

// Spinner
const spinner = document.querySelector('.spinner');
// Sort 
const sortID = document.getElementById('shortID');

// All POSTS

const post = async (id)=>{
    sortID.innerHTML = `
    <option selected>Short</option>
    <option value="1">View</option>
                        `;
    // Spinner for 0 posts categories
     if(id === 6){
     }else{
        spinner.style.display = 'block';
     }
    // Seleceted Category Start
    const categorylist = document.querySelectorAll('#category-list li button');
    for(const singelList of categorylist){
        if(singelList.classList.contains('active')){
            singelList.classList.remove('active');
        }
    }

    categorylist[id -1].classList.add('active');

    // Seleceted Category End

    try{

        const postUrl = `https://openapi.programming-hero.com/api/news/category/0${id}`;
        const res = await fetch(postUrl);
        const post_data = await res.json();
        showPost(post_data.data);
    }
    catch(err){
        console.log(err)
    }
}




const showPost = (posts)=>{
   
    const documentposts = document.getElementById('posts');
    documentposts.textContent = '';
    const totalPost = posts.length;
    if(totalPost === 0){
        document.getElementById('totalPostMain').innerText = 'No Post founded';
    }else{
        document.getElementById('totalPostMain').innerHTML = `====> <span id="totalPosts">${totalPost}</span> post founded`;
    }

    // sorting posts
    sortID.addEventListener('change',function(){
        if(parseInt(sortID.value) === 1){
            posts.sort(function(a,b){
                return a.total_view - b.total_view;
            });
        documentposts.textContent = '';

        for(const post of posts){
            const newDiv = document.createElement('div');
            const newDivClass = newDiv.classList.add('singelPost');
            newDiv.innerHTML = `
                <div class="card mb-3 mr-2" >
                <div class="row g-0 post" >
                <div class="col-md-4">
                    <img src="${post.thumbnail_url
                    }" class="img-fluid rounded-start posts-thambnail" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title"><b>${post.title}</b></h5>
                    <p class="card-text">${post.details.slice(1,1000)} ...</p>
                    <div class="postsOwner d-flex justify-content-between">
                        <div class="userProfile d-flex">
                            <img src="${post.author.img}" alt="">
                            <div class="nameDate">
                                <h6>${post.author.name ? post.author.name : 'No Data Found' }</h6>
                                <p>${post.author.published_date}</p>
                            </div>
                        </div>
                        <div class="view">
                            <i class="fa-solid fa-eye"></i><span class="totalView">${post.total_view ? post.total_view : 'No data Found' }</span>
                        </div>
                        <div class="rate">
                            ${post.rating.number}
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="readMore">
                        <button type="button" onclick="openModal('${post._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                           Read More <i class="fa-solid fa-arrow-right"></i>                    
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `;
    
             
            documentposts.appendChild(newDiv);
            spinner.style.display = 'none';
            // console.log(post.title)
        }
        
        } 
    })
// Defult
    for(const post of posts){
        const newDiv = document.createElement('div');
        const newDivClass = newDiv.classList.add('singelPost');
        newDiv.innerHTML = `
            <div class="card mb-3 mr-2" >
            <div class="row g-0 post" >
            <div class="col-md-4">
                <img src="${post.thumbnail_url
                }" class="img-fluid rounded-start posts-thambnail" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title"><b>${post.title}</b></h5>
                <p class="card-text">${post.details.slice(1,1000)} ...</p>
                <div class="postsOwner d-flex justify-content-between">
                    <div class="userProfile d-flex">
                        <img src="${post.author.img}" alt="">
                        <div class="nameDate">
                            <h6>${post.author.name ? post.author.name : 'No Data Found' }</h6>
                            <p>${post.author.published_date}</p>
                        </div>
                    </div>
                    <div class="view">
                        <i class="fa-solid fa-eye"></i><span class="totalView">${post.total_view ? post.total_view : 'No data Found' }</span>
                    </div>
                    <div class="rate">
                        ${post.rating.number}
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="readMore">
                    <button type="button" onclick="openModal('${post._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       Read More <i class="fa-solid fa-arrow-right"></i>                    
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;

         
        documentposts.appendChild(newDiv);
        spinner.style.display = 'none';
        // console.log(post.title)
    }
}

// Modal Data 
const openModal = async (id) => {
    try{
        const detailUrl = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(detailUrl);
        const detail_data = await res.json();
        showModal(detail_data);
    }
    catch(err){
        console.log(err)
    }
}

const showModal = (data) => {
    const title = document.querySelector('.title');
    const modalImg = document.getElementById('modalImg');
    const modalDetails = document.getElementById('modalDetails');
    const postedBy = document.getElementById('postedBy');
    const modaldate = document.getElementById('modaldate');
    const modalviews = document.getElementById('modalviews');
    title.innerText = data.data[0].title;
    postedBy.innerText = data.data[0].author.name ? data.data[0].author.name : 'Not Found'; 
    modalviews.innerText = data.data[0].total_view ? data.data[0].total_view : 'Not Found'; 
    modaldate.innerText = data.data[0].author.published_date;
    modalImg.src=`${data.data[0].image_url}`;
    modalDetails.innerText =  data.data[0].details; 
    // console.log(data.data[0].title)
}

getData()



