function login(){
  if(document.getElementById("u").value==="admin" &&
     document.getElementById("p").value==="123"){
    document.querySelectorAll(".menu")[0].style.display="none";
    document.getElementById("panel").style.display="block";
  }
}

function createKey(){
  let key = document.getElementById("key").value;
  let days = parseInt(document.getElementById("days").value);
  let max = parseInt(document.getElementById("max").value);

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  if(data.find(k=>k.key===key)){
    alert("Key đã tồn tại!");
    return;
  }

  let expire = Date.now() + days*86400000;

  data.push({
    key,
    expire,
    maxDevices:max,
    devices:[]
  });

  localStorage.setItem("keys", JSON.stringify(data));
  render();
}

function render(){
  let list = document.getElementById("list");
  list.innerHTML="";

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  data.forEach((k,i)=>{
    let li = document.createElement("li");
    li.innerHTML = `
    ${k.key} | ${k.devices.length}/${k.maxDevices} thiết bị |
    hết hạn: ${new Date(k.expire).toLocaleDateString()}
    <button onclick="del(${i})">Xóa</button>
    <button onclick="lock(${i})">Khóa</button>
    `;
    list.appendChild(li);
  });
}

function del(i){
  let data = JSON.parse(localStorage.getItem("keys"));
  data.splice(i,1);
  localStorage.setItem("keys", JSON.stringify(data));
  render();
}

function lock(i){
  let data = JSON.parse(localStorage.getItem("keys"));
  data[i].expire = 0;
  localStorage.setItem("keys", JSON.stringify(data));
  render();
}

render();
