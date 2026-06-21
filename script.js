const addTask = document.querySelector("#addTask")
const formDiv = document.querySelector(".form")
const btns = document.querySelector("#btns")
const form = document.querySelector("form")
const card = document.querySelector(".card")
const completedCard = document.querySelector(".completedCard")
const ongoingCard = document.querySelector(".ongoingCard")
const cancel = document.querySelector("#formcancel")
const main = document.querySelector("main")
const changeTheme =document.querySelector("#theme")

addTask.addEventListener("click",()=>{
    formDiv.style.display = "flex"
})



cancel.addEventListener("click",()=>{
    formDiv.style.display = "none"
})


changeTheme.addEventListener("click", () => {
    main.classList.toggle("dark");

    if(main.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }
});
if(localStorage.getItem("theme") === "dark"){
    main.classList.add("dark");
}



// const taskArr = []
// const completedArr = []
// const ongoingArr =[]
const taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
const completedArr = JSON.parse(localStorage.getItem("completed")) || [];
const ongoingArr = JSON.parse(localStorage.getItem("ongoing")) || [];

const saveData = ()=>{
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    localStorage.setItem("completed", JSON.stringify(completedArr));
    localStorage.setItem("ongoing", JSON.stringify(ongoingArr));
}



let updateIndex = null

let ui = () => {
    card.innerHTML = ""
    taskArr.forEach((elem,index) => {
        card.innerHTML += ` <div  class="taskCrad">

                <div class="text">
                   <div><h1>${elem.taskName}</h1></div> 
                   <div><p>${elem.description}</p></div> 
                </div>

                <div class="cardBtns">
                    <button onclick = "doneTask('${index}')" id="done">Done</button>
                    <button onclick = "updateTask('${index}')" id="update">Update</button>
                    <button onclick = "deleteTask('${index}')"id="delete">Delete</button>
                    <button onclick = "ongoingTask('${index}')"id="ongoing">OnGOING</Button>
                </div>
            </div> `
    })
}





form.addEventListener("submit",(event) => {
    event.preventDefault()

    let taskName = event.target[0].value
    let description = event.target[1].value

    
    if(taskName.trim() === "" || description.trim() === "" ){
        alert("please fill all the fileds")
        return
    }

    let obj ={
        taskName,
        description,
    }

    if(updateIndex !==null){
        taskArr[updateIndex] = obj
        updateIndex = null
    }else{
          taskArr.push(obj)
    }

    ui()
    saveData()
    form.reset()
    formDiv.style.display = "none";


})


const updateTask = (index)=>{
     formDiv.style.display = "flex"
    // let task = taskArr.find((elem)=> elem.taskName === name) this is another type which could be also used
    //  updateIndex = taskArr.findIndex((elem) => elem.taskName === name);
     updateIndex = index
    form[0].value = taskArr[index].taskName
    form[1].value = taskArr[index].description
    saveData()
}

const deleteTask = (index)=>{
    taskArr.splice(index,1)
    ui()
    saveData()
}

const doneTask = (index)=>{
    completedArr.push(taskArr[index])
    taskArr.splice(index,1)
    ui()
    completedUI()
    saveData()
}

const completedUI = ()=>{
    completedCard.innerHTML =""
    completedArr.forEach((task,index)=>{

        completedCard.innerHTML += `<div  class="smallCard">

                <div class="text">
                   <div><h1>${task.taskName}</h1></div> 
                   <div><p>${task.description}</p></div> 
                </div>

                    <button onclick = "deleteCompleted('${index}')"id="deletecompi">Delete</button>
                
            </div> `
    })
}


const ongoingTask = (index)=>{
    ongoingArr.push(taskArr[index])
    taskArr.splice(index,1)
    ui()
    ongoingUI()
    saveData()
}

const ongoingUI =()=>{
    ongoingCard.innerHTML = ""
    ongoingArr.forEach((yes,index)=>{

        ongoingCard.innerHTML += `<div class="littleCard">

                <div class="text">
                   <div><h1>${yes.taskName}</h1></div> 
                   <div><p>${yes.description}</p></div> 
                </div>
                
                    <button onclick = "deleteOngoing('${index}')"id="deletecompi">Delete</button>
    
            </div> `
    })

}

const deleteCompleted = (index)=>{
    completedArr.splice(index,1);
    completedUI();
    saveData();
}

const deleteOngoing = (index)=>{
    ongoingArr.splice(index,1);
    ongoingUI();
    saveData();
}

ui();
completedUI();
ongoingUI();