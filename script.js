function getDeviceId(){
  let id = localStorage.getItem("deviceId");
  if(!id){
    id = "dev-" + Math.random().toString(36).substr(2,9);
    localStorage.setItem("deviceId", id);
  }
  return id;
}

function showLoading(state){
  document.getElementById("loading").style.display = state ? "flex" : "none";
}

function checkKey(){
  let key = document.getElementById("keyInput").value;
  let msg = document.getElementById("msg");

  let data = JSON.parse(localStorage.getItem("keys") || "[]");
  let k = data.find(x => x.key === key);

  if(!k){
    msg.innerText = "❌ Key không tồn tại";
    return;
  }

  if(Date.now() > k.expire){
    msg.innerText = "⛔ Key hết hạn";
    return;
  }

  let device = getDeviceId();

  if(!k.devices.includes(device)){
    if(k.devices.length >= k.maxDevices){
      msg.innerText = "🚫 Đã vượt thiết bị";
      return;
    }
    k.devices.push(device);
  }

  localStorage.setItem("keys", JSON.stringify(data));

  showLoading(true);

  setTimeout(()=>{
    showLoading(false);
    document.getElementById("loginBox").style.display="none";
    document.getElementById("mainMenu").style.display="block";
  },1500);
}

function run(btn){
  showLoading(true);

  setTimeout(()=>{
    showLoading(false);
    btn.classList.toggle("active");
  },1000);
}
