import '../css/style.css'


/*...........................................................................................*/
/*.................................reuseable code.............................................*/
/*..............................................................................................*/
const ul = document.getElementById("userList");
const Pagination = document.getElementById("pagination-btn")

function createNode(element){
  return document.createElement(element);
}

function append(parent,el){
  return parent.appendChild(el);
}

function exportToHtml(i){
  var userId = allData;
  let li = createNode('li'),
        a = createNode('a'),
        img = createNode('img'),
        span = createNode('span'),
        h1 = createNode('h1');

        li.setAttribute('id',`${userId[i].login.uuid}`);
        li.onclick = function() {showProfile(this.id)};
        a.setAttribute('id',`name-id`);
        li.classList.add("li_class");
        span.classList.add("span_class");
        img.src = userId[i].picture.medium;
        span.innerHTML = `Location - </br>
                          street: ${userId[i].location.street} </br>
                          city: ${userId[i].location.city} </br>
                          state: ${userId[i].location.state}`;
        h1.innerHTML = `Name : ${userId[i].name.first} ${userId[i].name.last}`;

        append(li,img);
        append(a,h1);
        append(a,span);
        append(li,a);
        append(ul,li);
}

/*..............................................................................................*/
/*................................fetching data from Api.........................................*/
/*...................................................................................................*/


const url = 'https://randomuser.me/api/?results=100';

let allData = [];


fetch(url)
  .then(resp => resp.json())
  .then(data => {
  allData = data.results;
})
.catch( error => {
  console.log(JSON.stringify(error));
})

/*....................................................................................*/
/*.................................Pagination.........................................*/
/*....................................................................................*/
var current_page = 1;
var records_per_page ;


document.getElementById("btn_prev").onclick = function() {prevPage()};
document.getElementById("btn_next").onclick = function() {nextPage()};

function prevPage()
{
  if(current_page > 1){
    current_page--;
    changePage(current_page);
  }
}

function nextPage()
{
  if(current_page < numPages()){
    current_page++;
    changePage(current_page);
  }
}

function changePage(page)
{
  var userId = allData;
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var pagination_btn = document.getElementById("pagination-btn");
  var page_span = document.getElementById("page");

  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  document.getElementById("userList").innerHTML = "";  
  
  
  
  for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < userId.length; i++) 
    {
      exportToHtml(i);
    } 
 
    for (var i = (page-2); i < (page + 3) ; i++)
    {
        let a = createNode('a');
        
        if(i >= 1 && i <= (userId.length / records_per_page) && i< (page+3)){
          a.setAttribute('id',`my-btn-${i}`);
          a.setAttribute('class','pagination-btn-class');
          a.innerHTML = `${i}`;
          a.onclick = function() { callPage(this.id) };
          append(Pagination,a);
        }else{
          a.style.visibility = "hidden";
        }

       
    }

  page_span.innerHTML = page;

  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }


  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }

  document.getElementById("pagination-btn").innerHTML = "";
}


function callPage(number){
 current_page = document.getElementById(number).innerText;
  changePage(current_page);
}


function numPages()
  {
    var userId = allData;
      return Math.ceil(userId.length / records_per_page);
  }

  /*.................................................................................................*/
  document.getElementById("att-per-page-1").onclick = function() {setPageSize(1)};
  document.getElementById("att-per-page-2").onclick = function() {setPageSize(2)};
  document.getElementById("att-per-page-3").onclick = function() {setPageSize(3)};
  document.getElementById("att-per-page-4").onclick = function() {setPageSize(4)};
  document.getElementById("att-per-page-5").onclick = function() {setPageSize(5)};


  function setPageSize(pageSize){
    records_per_page = pageSize;
    changePage(1);
  }

  /*..............................................................................................*/
  /*...................................search suggesion............................................*/
  /*...............................................................................................*/

  document.getElementById("search-profile-input").onkeyup = function() {searchProfile()};

  function searchProfile(){
    var userId = allData;

    document.getElementById("userList").innerHTML = ""
    
    var search_box_txt = document.getElementById('search-profile-input').value;

    for (var i = 0; i < userId.length; i++){
      var allIDName  = `${userId[i].name.first} ${userId[i].name.last} ${userId[i].name.first}}`;
      var searchId  = allIDName.includes(search_box_txt);
      
      if ( searchId == true ){
        exportToHtml(i);
      }else{
        
      }
      
    }
    
  }

  /*......................................................................................................*/
  /*....................................Ascending/Desending Order..............................*/
  /*...................................................................................................*/

  document.getElementById("order-name-ase").onclick = function() {asendingOrder()};
  document.getElementById("order-name-des").onclick = function() {desndingOrder()};
  document.getElementById("order-address-ase").onclick = function() {asendingOrderAddress()};
  document.getElementById("order-address-des").onclick = function() {desndingOrderAddress()};

  function asendingOrder(){
    var userId = allData;
    document.getElementById("drop-down-btn").innerHTML = ""
    document.getElementById("drop-down-btn").innerHTML = "Ascending order of Name"
    document.getElementById("userList").innerHTML = ""

    let fullname = [];

    let allfirstname = userId.map( firstName => {
      return firstName.name.first;
    });

    let alllastname = userId.map( lastName => {
      return lastName.name.last;
    });

    for(var i = 0; i <userId.length; i++){
      fullname[i] = `${allfirstname[i]} ${alllastname[i]}`;
    } 

    var allAsendingName = fullname.sort();
    var newArrrayList = []
    
    for(var i = 0; i <userId.length; i++){
      var newArray = userId.find( userName => allAsendingName[i] === `${userName.name.first} ${userName.name.last}` )
      
      newArrrayList[i] = newArray;
    }

    allData = newArrrayList;

    changePage(1);
  }

  function desndingOrder(){
    var userId = allData;
    document.getElementById("drop-down-btn").innerHTML = ""
    document.getElementById("drop-down-btn").innerHTML = "Descending order of Name"
    document.getElementById("userList").innerHTML = ""

    let fullname = [];

    let allfirstname = userId.map( firstName => {
      return firstName.name.first;
    });

    let alllastname = userId.map( lastName => {
      return lastName.name.last;
    });

    for(var i = 0; i <userId.length; i++){
      fullname[i] = `${allfirstname[i]} ${alllastname[i]}`;
    }

    var allAsendingName = fullname.sort();
    var reverseName = allAsendingName.reverse()
    
    var newArrrayList = []
    for(var i = 0; i <userId.length; i++){
      var newArray = userId.find( userName => reverseName[i] ===  `${userName.name.first} ${userName.name.last}`)
      
      newArrrayList[i] = newArray;
    }
    allData = newArrrayList;

    changePage(1);
  }

  function asendingOrderAddress(){
    var userId = allData;
    document.getElementById("drop-down-btn").innerHTML = ""
    document.getElementById("drop-down-btn").innerHTML = "Ascending order of Address"
    document.getElementById("userList").innerHTML = ""


    let customerAddress = userId.map( address => {
      return address.location.state;
    });

    
    var allAsendingAddress = customerAddress.sort();

    var newArrrayList = []
    for(var i = 0; i <userId.length; i++){
      var newArray = userId.find( userAddress => allAsendingAddress[i] === userAddress.location.state )
      newArrrayList[i] = newArray;
    }
    allData = newArrrayList;

    changePage(1);
  }

  function desndingOrderAddress(){
    var userId = allData;
    document.getElementById("drop-down-btn").innerHTML = ""
    document.getElementById("drop-down-btn").innerHTML = "descending order of Address"
    document.getElementById("userList").innerHTML = ""


    let customerAddress = userId.map( address => {
      return address.location.state;
    });

    
    var AsendingAddress = customerAddress.sort();
    var allAsendingAddress = customerAddress.reverse();

    var newArrrayList = []
    for(var i = 0; i <userId.length; i++){
      var newArray = userId.find( userAddress => allAsendingAddress[i] === userAddress.location.state )
      
      newArrrayList[i] = newArray;
    }
    allData = newArrrayList;

    changePage(1);
  }


  /*..............................................................................................
  ................................onclick writer profile.............................................
  ..................................................................................................*/

  function showProfile(userUID){
    var userId = allData;
    var thisProfile = userId.find( thisId => userUID === thisId.login.uuid )

    document.getElementById("dropdown-page").style.display = "none"
    document.getElementById("dropdown-sort").style.display = "none"
    document.getElementById("btn_prev").style.display = "none"
    document.getElementById("btn_next").style.display = "none"
    document.getElementById("page").style.display = "none"
    document.getElementById("userList").innerHTML = ""

    let li = createNode('li'),
        img = createNode('img'),
        span = createNode('span'),
        h2 = createNode('h2'),
        h1 = createNode('h1');

        img.setAttribute("class","profile_img");
        li.setAttribute("class","profile_list");
        span.classList.add("span_class");

      
        img.src = thisProfile.picture.large;
        span.innerHTML = `Location - </br>
                          street: ${thisProfile.location.street} </br>
                          city: ${thisProfile.location.city} </br>
                          state: ${thisProfile.location.state}`;
        h1.innerHTML = `Name : ${thisProfile.name.first} ${thisProfile.name.last}`;
        h2.innerHTML = `Gender : ${thisProfile.gender} </br>
                         Email : ${thisProfile.email} </br>
                         Age : ${thisProfile.dob.age} </br>
                         BOD : ${thisProfile.dob.date}`;


        append(li,img);
        append(li,h1);
        append(li,h2);
        append(li,span);
        append(ul,li);
  }

  /*.............................................................................................*/
  /*.......................................windows onload......................................*/
  /*..............................................................................................*/

  window.onload = function() 
  {
    var delayInMilliseconds = 1000;
    records_per_page = 2;
    setTimeout(function() {
      changePage(1);
    }, delayInMilliseconds);
  };