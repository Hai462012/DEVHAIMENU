function getDeviceId(){
  let id = localStorage.getItem("deviceId");
  if(!id){
    id = "dev-" + Math.random().toString(36).substr(2,9);
    localStorage.setItem("deviceId", id);
  }
  return id;
}

function checkKey(){
  let input = document.getElementById("keyInput").value;
  let msg = document.getElementById("msg");

  let data = JSON.parse(localStorage.getItem("keys") || "[]");

  let keyObj = data.find(k => k.key === input);

  if(!keyObj){
    msg.innerText = "❌ Key không tồn tại";
    return;
  }

  let now = new Date();
  let expire = new Date(keyObj.expire);

let now = Date.now();

if(now > keyObj.expire){
  msg.innerText = "⛔ Key đã hết hạn";
  return;
}

  let deviceId = getDeviceId();

  keyObj.devices = keyObj.devices || [];

  if(!keyObj.devices.includes(deviceId)){
    if(keyObj.devices.length >= keyObj.maxDevices){
      msg.innerText = "🚫 Key đã đạt giới hạn thiết bị";
      return;
    }
    keyObj.devices.push(deviceId);
  }

  localStorage.setItem("keys", JSON.stringify(data));

  msg.innerText = "✅ Thành công!";
  
  setTimeout(()=>{
    document.getElementById("loginBox").style.display="none";
    document.getElementById("mainMenu").style.display="block";
  },1000);
}

function run(btn){
  btn.classList.toggle("active");
}
