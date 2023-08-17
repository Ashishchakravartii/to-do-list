const checkbox = document.querySelector("#checkbox");
const taskLi = document.querySelectorAll(".taskLi");
const lineTxt = document.querySelectorAll(".lineTxt");

checkbox.addEventListener("click",(e)=>{
    taskLi.classList.toggle("lineTxt")
})



