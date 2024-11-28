let subject = document.querySelector("#subject").value;
let body = document.querySelector("#body").value;
let fileInput = document.querySelector("#avatar");
let data = new FormData();
data.append('user', uname);
data.append('avatar', fileInput.files[0]);
let response = await fetch(API_URL, { method: "POST", body: data });