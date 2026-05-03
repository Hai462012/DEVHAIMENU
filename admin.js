const ADMIN_USER = "admin";
const ADMIN_PASS = "123";

function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u === ADMIN_USER && p === ADMIN_PASS){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("adminBox").style.display="block";
  } else {
    alert("Sai tài khoản!");
  }
}

function createKey(){
  let key = document.getElementById("keyName").value;
  let days = document.getElementById("days").value;

  let expire = new Date();
  expire.setDate(expire.getDate() + parseInt(days));

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  data.push({
    key: key,
    expire: expire.toLocaleDateString()
  });

  localStorage.setItem("keys", JSON.stringify(data));

  render();
}

function render(){
  let list = document.getElementById("list");
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  data.forEach(k=>{
    let li = document.createElement("li");
    li.innerText = k.key + " | hết hạn: " + k.expire;
    list.appendChild(li);
  });
}

function createKey(){
  let key = document.getElementById("keyName").value;
  let days = document.getElementById("days").value;
  let maxDevices = document.getElementById("maxDevices").value;

  let expire = new Date();
  expire.setDate(expire.getDate() + parseInt(days));

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  data.push({
    key: key,
    expire: expire,
    maxDevices: parseInt(maxDevices),
    devices: []
  });

  localStorage.setItem("keys", JSON.stringify(data));

  render();
}

render();
