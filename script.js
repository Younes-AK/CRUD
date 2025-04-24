
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody');
let search = document.getElementById('search');
let imagePath = document.getElementById('image');
let searchByTitle = document.getElementById('btnSearchByTitle');
let searchByCategory = document.getElementById('btnSearchByCategory');
let btnDeleteAll = document.getElementById('btnDeleteAll');

let products;
let mood = 'create';
let tmp;
let searchMood = 'searchByTitle';

function getTotal(){
    let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
    if (price.value != ''){
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }
}
function clearInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
 
if (localStorage.product != null){
    products = JSON.parse(localStorage.product);
}else{
    products = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        imagePath:imagePath.value
    };
    if (mood === 'create'){
        for(let i = 0; i <= count.value; i++){
            if (price.value != '' && title.value != ''){
                products.push(newPro);
                localStorage.setItem('product', JSON.stringify(products));
            }
        }
    }else{
        products[tmp] = newPro;
        mood = 'create';
        total.style.backgroundColor = 'red';
    }
    clearInput();
    displayData();
    count.style.display = 'block';
    submit.innerHTML = 'Create';
}

function displayData(){
    let table = '';
    let path = "images/ryan.jpg";
    for(let i = 0; i < products.length; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td> <img src="${products[i].imagePath}"/> </td>
                <td><button id="update" onclick = "updateItem(${i})">Update</button></td>
                <td><button onclick = "deleteItem(${i})" >Delete</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = table;
    if(products.length > 0){
        btnDeleteAll.style.display = 'block';
    }else{
        btnDeleteAll.style.display = 'none';
    }
}
function deleteItem(index){
    products.splice(index, 1);
    localStorage.product = JSON.stringify(products);
    displayData();
}

function clearData(){
   products.splice(0);
   localStorage.product = JSON.stringify(products);
    displayData();
}

function updateItem(index){
    tmp = index;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    products.value = products[index].products;
    total.innerHTML = products[index].total;
    category.value = products[index].category;
    imagePath.value = products[index].imagePath;
    total.style.backgroundColor = 'green';
    mood = 'update';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ft_search(value){
    let table = '';
    for(let i = 0; i < products.length; i++){
        if (searchMood === 'searchByTitle'){
            if (products[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick = "updateItem(${i})">Update</button></td>
                    <td><button onclick = "deleteItem(${i})" >Delete</button></td>
                </tr>
            `;
            }
        }else{
            if (products[i].category.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick = "updateItem(${i})">Update</button></td>
                    <td><button onclick = "deleteItem(${i})" >Delete</button></td>
                </tr>
            `;
            }
        }
    }
    tbody.innerHTML = table;
}

function checkSearchMood(id){
    if (id === 'btnSearchByTitle'){
        searchMood = 'searchByTitle';
        search.setAttribute('placeholder', "Search By Tile");
        search.focus();
    }else{
        searchMood = 'searchByCategory';
        search.setAttribute('placeholder', "Search By Category");
        search.focus();
    }
    let val = search.value;
    if (val != ''){
        ft_search(val);
    }else{
        displayData();
    }
}
submit.addEventListener("click", ()=>{
document.getElementById("image").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        console.log("File name:", file.name); // Prints only the file name
        console.log("File object:", file); // Prints the file object with details
    }
    });
});

submit.addEventListener

displayData();