let InputAddInputEL = document.getElementById("InputAddInputEL")
let Alert = document.getElementById("Alert")
let AccordionBody = document.getElementById("AccordionBody")
let OptionCategoryEL = document.getElementById("OptionCategoryEL")
let InputAddTaskInputEL = document.getElementById("InputAddTaskInputEL")

let ListOfProjects = []

function AddProject() {
    console.log("Add Project button clicked")

    if (InputAddInputEL.value === "") {
        Alert.innerHTML = `<div class="alert alert-danger floating-alert" role="alert">
            Please insert value!
        </div>`;

        setTimeout(() => {
            Alert.innerHTML = "";
        }, 1000);
        return
    }

    else {
        let ProjectName = InputAddInputEL.value
        console.log(ProjectName)

        RenderProject(ProjectName)
    }
}

function RenderProject(ProjectName) {
    const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
    const TaskObject = { id: randomId, projectname: ProjectName, task: [] };
    ListOfProjects.push(TaskObject)
    console.log(ListOfProjects)


    console.log(AccordionBody)
    let x = ""
    ListOfProjects.forEach((Item) => {
        x += `<div id="projectheader-${Item.id}" class="accordion-item">
          <h2 class="accordion-header d-flex">
            <button id="AccordionButtonEL-${Item.id}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${Item.id}" aria-expanded="true" aria-controls="collapse-${Item.id}">
              ${Item.projectname}<span id=span-${Item.id} class="badge text-bg-info ms-3">0</span><Button onclick="RemoveHeader(${Item.id})" class="btn btn-danger">Remove</Button><Button class="btn btn-warning">Export</Button>
            </button>
          </h2>
          <div id="collapse-${Item.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
           <div class="d-flex justify-content-between">
                <div class="accordion-body">
                    Task1
                </div>
                <div>
                    <Button class="btn btn-success">Complete</Button>
                    <Button class="btn btn-danger">Remove</Button>
                </div>
            </div>
          </div>
        </div>`
    })
    AccordionBody.innerHTML = x

    let y = ""
    ListOfProjects.forEach((Item) => {
        y += `<option value="${Item.projectname}">${Item.projectname}</option>`
    })
    OptionCategoryEL.innerHTML = y
    
    Renderbadge()
    saveToLocalStorage()
}

function saveToLocalStorage() {
    localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
}

function loadFromLocalStorage() {
    ListOfProjects = JSON.parse(localStorage.getItem("ListOfProjects")) || []; // Fallback to empty array if null

    let x = "";
    ListOfProjects.forEach((Item) => {
        x += `<div id="projectheader-${Item.id}" class="accordion-item">
          <h2 class="accordion-header d-flex">
            <button id="AccordionButtonEL-${Item.id}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${Item.id}" aria-expanded="true" aria-controls="collapse-${Item.id}">
              ${Item.projectname}<span class="badge text-bg-info ms-3">0</span><Button onclick="RemoveHeader(${Item.id})" class="btn btn-danger">Remove</Button><Button class="btn btn-warning">Export</Button>
            </button>
          </h2>
          <div id="collapse-${Item.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
           <div class="d-flex justify-content-between">
                <div class="accordion-body">
                    Task1
                </div>
                <div>
                    <Button class="btn btn-success">Complete</Button>
                    <Button class="btn btn-danger">Remove</Button>
                </div>
            </div>
          </div>
        </div>`;
    });
    AccordionBody.innerHTML = x;

    let y = "";
    ListOfProjects.forEach((Item) => {
        y += `<option value=${Item.projectname}>${Item.projectname}</option>`;
    });
    OptionCategoryEL.innerHTML = y;

    ListOfProjects.forEach((Item) => {
        RenderTask(Item, Item.id)
    })

    Renderbadge()

}

function AddTask() {
    console.log("Add task button clicked")
    console.log(`Category: ${OptionCategoryEL.value}`)
    console.log(`Task: ${InputAddTaskInputEL.value}`)

    const projectObject = ListOfProjects.find(item => item.projectname === OptionCategoryEL.value);

    if (!projectObject) {
        console.error("Project not found");
        return;
    }

    const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
    const TaskObject = { id: randomId, task: InputAddTaskInputEL.value, completed: false };

    console.log(TaskObject)
    projectObject.task.push(TaskObject)
    console.log(projectObject)
    console.log(`ProjectID: ${projectObject.id}`)
    console.log(`TaskID: ${projectObject.task[0].id}`)
    console.log(`TaskName: ${projectObject.task[0].task}`)


    RenderTask(projectObject, projectObject.id)
    Renderbadge()
}

function RenderTask(ProjectObject, ProjectID) {
    let AccordionCollapseList = document.getElementById(`collapse-${ProjectID}`)
    console.log(AccordionCollapseList)
    console.log(ProjectObject.task)

    let x = ""
    ProjectObject.task.forEach((Item) => {
        x += `<div id="taskmain-${Item.id}" class="d-flex justify-content-between">
    <div id=task-${Item.id} class="accordion-body">${Item.task}</div>
    <div>
      <button id="complete-${Item.id}" onclick="Complete(${Item.id})" class="btn btn-success">Complete</button>
      <button id="remove-${Item.id}" onclick="Remove(${Item.id})" class="btn btn-danger">Remove</button>
    </div>
  </div>`
    })
    AccordionCollapseList.innerHTML = x
    saveToLocalStorage()
}

function Complete(id) {
    ListOfProjects.forEach((Item) => {
        Item.task.forEach((x) => {
            if (x.id === id) {
                let TaskEL = document.getElementById(`task-${id}`);

                // Toggle the completed status
                if (x.completed) {
                    console.log(`Unmarking complete for task id ${id}`);
                    x.completed = false;
                    TaskEL.classList.remove("text-decoration-line-through");
                } else {
                    console.log(`Marking complete for task id ${id}`);
                    x.completed = true;
                    TaskEL.classList.add("text-decoration-line-through");
                }

                console.log(x);
                console.log(TaskEL);
            }
        });
    });
    Renderbadge()
}

function Renderbadge() {
    ListOfProjects.forEach((Item) => {
        let AccordionButtonEL = document.getElementById(`AccordionButtonEL-${Item.id}`)
        console.log(Item.id)
        console.log(AccordionButtonEL)
        const IncompleteCount = Item.task.filter(item => item.completed === false).length;
        console.log(IncompleteCount)

        let x = ""
        x = `${Item.projectname}<span class="badge text-bg-info ms-3">${IncompleteCount}</span></button>`
        AccordionButtonEL.innerHTML = x
    })
}

function Remove(id) {
    ListOfProjects.forEach((Item) => {
        // Filter out the task with the matching id
        Item.task = Item.task.filter((x) => x.id !== id);
    });

    console.log(ListOfProjects)

    let TaskMainEL = document.getElementById(`taskmain-${id}`)
    TaskMainEL.remove()
    saveToLocalStorage()
    Renderbadge()
}

function RemoveHeader(id){
    ListOfProjects = ListOfProjects.filter((x) => x.id !== id)
    console.log(ListOfProjects)

    let ProjectHeaderEL = document.getElementById(`projectheader-${id}`)
    ProjectHeaderEL.remove()
    saveToLocalStorage()
}


// Call this function when the page loads
window.onload = loadFromLocalStorage;