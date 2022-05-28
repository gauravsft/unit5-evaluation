




let container = document.getElementById("container");

async function createTasks() {
    try {
        let title = document.getElementById("queries").value;
        let status = document.getElementById("status").checked ;
    

        let body = {
            title,
            status,
        } 

        let res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-Type": "application/json"
            }
        })

        let data = await res.json();
        updateDom();
    } catch (error) {
        console.log(error);
    }
}

async function updateDom() {
    container.innerHTML = "";


    let res = await fetch("http://localhost:3000/tasks");
    let data = await res.json();

    data.forEach(task => {
        let box = document.createElement("div");

        let title = document.createElement("p");
        title.textContent = task.title;

        if(task.status == true){
            title.style.color = 'green';
        }
        else{
            title.style.color = 'red';
        }
        

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "DELETE";
        deleteButton.onclick = async function () {
            let res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
                method: "DELETE"
            })
            updateDom();
        }

        let updateButton = document.createElement("button");
        updateButton.innerText = "UPDATE";
        updateButton.onclick = async function () {
            localStorage.setItem("taskId", task.id);
            window.location.href = "update.html";
        }

        box.append(title,deleteButton,updateButton);
        container.append(box);
        
    });


}
updateDom();