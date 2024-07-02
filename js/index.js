var codeinput = document.getElementById("code");
var ageinput = document.getElementById("age");
var adreesinput = document.getElementById("adrees");
var imgeinput = document.getElementById("job");
var addproduct = document.getElementById("addproduct");
var updateproduct = document.getElementById("updateproduct");
var indexupdateproduct = -1;
var saerchinput = document.getElementById("searchinput");
var jobcard;

if (localStorage.getItem('new') == null) {
  jobcard = [];
} else {
  jobcard = JSON.parse(localStorage.getItem('new'));
  addform();
}

function jobs() {
  if (!isvaled()) {
    alert('name is not valid');
    return;
  }

  var card = creatproduct();
  jobcard.push(card);
  localStorage.setItem('new', JSON.stringify(jobcard));
  addform();
  clearform();
}

function creatproduct() {
  return {
    code: codeinput.value,
    age: ageinput.value,
    adrees: adreesinput.value,
    job: URL.createObjectURL(imgeinput.files[0])
  };
}

function clearform() {
  codeinput.value = '';
  ageinput.value = '';
  adreesinput.value = '';
  imgeinput.value = '';
}

function addform() {
  var cartona = '';
  for (var i = 0; i < jobcard.length; i++) {
    cartona += `<div class="col-md-3 col-sm-6">
    <div class="pro">
        <img src="${jobcard[i].job}" class="w-100" alt="mobile img"> 
        <h2 class="h4">name : ${jobcard[i].code}</h2>
        <p>address : ${jobcard[i].adrees}</p>
        <h3 class="h5">category : ${jobcard[i].age}</h3>
        <button class="btn btn-outline-danger px-2 my-2 w-100" onclick="del(${i})">delete <i class="fas fa-trash-alt"></i></button>
        <button onclick="setform(${i})" class="btn btn-outline-warning my-2 w-100 px-2">update <i class="fas fa-pen"></i></button>
        </div>
    </div>`;
  }
  document.getElementById("rowdata").innerHTML = cartona;
}

function del(index) {
  jobcard.splice(index, 1);
  localStorage.setItem('new', JSON.stringify(jobcard));
  addform();
}

function setform(index) {
  indexupdateproduct = index;
  codeinput.value = jobcard[index].code;
  ageinput.value = jobcard[index].age;
  adreesinput.value = jobcard[index].adrees;
  // Note: imgeinput value cannot be set directly for security reasons
  addproduct.classList.replace('d-block', 'd-none');
  updateproduct.classList.replace('d-none', 'd-block');
}

function update() {
  if (indexupdateproduct === -1) {
    return;
  }
  var card = creatproduct();
  jobcard.splice(indexupdateproduct, 1, card);
  localStorage.setItem('new', JSON.stringify(jobcard));
  updateproduct.classList.replace('d-block', 'd-none');
  addproduct.classList.replace('d-none', 'd-block');
  addform();
  clearform();
}

function search() {
  var term = saerchinput.value;
  var cartona = '';
  for (let i = 0; i < jobcard.length; i++) {
    if (jobcard[i].code.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<div class="col-md-3 col-sm-6">
      <div class="pro"><img src="${jobcard[i].job}" class="w-100" alt="mobile img">
      <h2 class="h4">name : ${jobcard[i].code}</h2>
      <p>address : ${jobcard[i].adrees}</p>
      <h3 class="h5">category : ${jobcard[i].age}</h3>
      <button class="btn btn-outline-danger px-2 my-2 w-100" onclick="del(${i})">delete <i class="fas fa-trash-alt"></i></button>
      <button onclick="setform(${i})" class="btn btn-outline-warning my-2 w-100 px-2">update <i class="fas fa-pen"></i></button></div>
      </div>`;
    }
  }
  document.getElementById('rowdata').innerHTML = cartona;
}

function isvaled() {
  var pattern = /^[A-Z][a-z]{3,8}$/;
  return pattern.test(codeinput.value);
}
