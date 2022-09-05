let title=document.getElementById('title'),
    connect=document.getElementById('connect_title'),
    price=document.getElementById('price'),
    ads=document.getElementById('ads'),
    taxes=document.getElementById('taxes'),
    discount=document.getElementById('discount'),
    count=document.getElementById('count'),
    category=document.getElementById('categories'),
    total=document.getElementById('total'),
    search=document.getElementById('search'),
    btnSubmit=document.getElementById('submit');
let mode='create';
let tem;

window.onload=function(){
    if (window.navigator.onLine) {
        online();   
    }  else {
        offline();
    }  
    }
window.addEventListener("online",()=>{console.log("onLine");})
window.addEventListener("offline",()=>{console.log("offLine");})

function online() {
    connect.innerHTML="OnLine Now";
}
function offline() {
    connect.innerHTML="OFFLine Now";
}
    // func total
function getTotal() {
    if(price.value !='' ){
        let result=( +price.value + +ads.value + +taxes.value )- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.style.background='red';
        total.innerHTML=0;
    }
}

// Creat data product 
let dataProducts;
if (localStorage.Products !=null ) {
    dataProducts=JSON.parse(localStorage.Products)
}else{
    dataProducts=[];
}
btnSubmit.onclick=function() {
    let newProduct={
        title:title.value,
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        categorie:category.value,
        count:count.value,
        total:total.innerHTML,

    }
if (title.value != '') {
    

    if (mode==='create') {  
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {           
                dataProducts.push(newProduct);
                showData();
            }
        }else{
            dataProducts.push(newProduct);
            
        }
    }else{
        dataProducts[tem]=newProduct;
        count.style.display='block'
        btnSubmit.innerHTML='Create';
        mode='create';
    }
}

        localStorage.setItem("Products",JSON.stringify(dataProducts));
    clearInput();
    showData();
}

// func Clear data 
function clearInput() {
        title.value="";
        price.value="";
        ads.value="";
        taxes.value="";
        discount.value="";
        total.innerHTML="";
}

// function Show Data 
function showData() {
    let tabel='';
    for (let index = 0; index < dataProducts.length; index++) {
        tabel +=`
        <tr>
            <td>${index+1}</td>
            <td>${dataProducts[index].title}</td>
            <td>${dataProducts[index].price}</td>
            <td>${dataProducts[index].taxes}</td>
            <td>${dataProducts[index].ads}</td>
            <td>${dataProducts[index].discount}</td>
            <td>${dataProducts[index].categorie}</td>
            <td>${dataProducts[index].total}</td>
            <td><button id="delete" onclick="deleteItem(${index})">Delete</button></td>
            <td><button id="update"onclick="updateItems(${index})">Update</button></td>
        </tr>
        `
    }
       
    document.getElementById('tbody').innerHTML=tabel;
    let deleteAllitems=document.getElementById('deleteAll');
    if (dataProducts.length > 0) {
        deleteAllitems.innerHTML=`<button onClick="deleteAllItem()">Delete All</button>`;
    }else{
        deleteAllitems.innerHTML='';
    }
}
// Delete item 
function deleteItem(id) {
    dataProducts.splice(id,1);
    localStorage.setItem("Products",JSON.stringify(dataProducts));
    showData(); 
}
showData(); 

// Delete All 

function deleteAllItem() {
    localStorage.clear();
    dataProducts.splice(0)
    showData(); 
}

// Update Data 
function updateItems(id) {
    title.value = dataProducts[id].title;
    price.value = dataProducts[id].price;
    taxes.value = dataProducts[id].taxes;
    ads.value = dataProducts[id].ads;
    discount.value = dataProducts[id].discount;
    count.style.display='none';
    btnSubmit.innerHTML='Update';
    mode='update';
    tem=id;
    getTotal()
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// Search 
let searchMode='title'
function getSearcMode(id) {
    if (id==='searchByTitle') {
        searchMode='title'    
    } else {
        searchMode='category'
    }
    console.log(searchMode);
    search.placeholder='Search By '+searchMode;
    search.focus();
    search.value='';
    showData();
}
function searchData(value) {
    let tabel;
    if (searchMode ==='title'){

        for (let i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].title.includes(value)) {
                tabel +=`
                <tr>
                    <td>${index+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].categorie}</td>
                    <td>${dataProducts[i].total}</td>
                    <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                    <td><button id="update"onclick="updateItems(${i})">Update</button></td>
                </tr>
                `
            }
            
        }
    }else{
        for (let i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].categorie.includes(value)) {
                tabel +=`
                <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].categorie}</td>
                <td>${dataProducts[i].total}</td>
                <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                <td><button id="update"onclick="updateItems(${i})">Update</button></td>
            </tr>
            `
            }
            
        }
        // console.log(searchMode);
    }
    
    document.getElementById('tbody').innerHTML=tabel;
    
    console.log(dataProducts);



}






// Mode
if (localStorage.length > 0){
    document.body.style.background=localStorage.getItem("color");
}else{
    document.body.style.background="#CCCC"
}
function color(id) {
    localStorage.setItem("color",id);
    document.body.style.background=localStorage.getItem("color");
}

if (window.navigator.geolocation) {
    navigator.geolocation.watchPosition(postion=>{
        console.log(postion);
    },error=>{console.log(error);})
}else{
    console.log("Error");
}