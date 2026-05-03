function run(btn){
  const status = document.getElementById("status");

  btn.classList.toggle("active");

  status.innerText = "Đang xử lý...";
  
  setTimeout(()=>{
    status.innerText = "Đã bật (DEMO)";
  },1000);
}
