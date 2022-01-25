//Creating DOM references.
const taskNameInputDOM = document.querySelector("#task-name");
const statusInputDOM = document.querySelector("#status");
const descriptionInputDOM = document.querySelector("#task-description");
const dateTimeDOM = document.getElementById("date-time");
const modalBackDropDOM = document.getElementById("form-backdrop");
const taskListContainerDOM = document.querySelector("#tasks-container");
const addTaskFormDOM = document.getElementById("add-task-form");

var WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  TASK_LIST = [];

const fetchTasksList = () => {
  fetch("/api/V1-0-1/tasks/")
    .then((res) => {
      return res.json();
    })
    .then((taskListRes) => {
      TASK_LIST = taskListRes.taskList;
      appendDOMTaskList();
    })
    .catch((e) => {
      console.log(e);
    });
};

const appendDOMTaskList = () => {
  let taskListDOMArray = TASK_LIST.map(
    (record, index) => `
  <div class="task-record" id=${index}>
    <div class="task-name">${record.name}</div>
    <div class="icon-ctn">
      <img src="./images/pencil.png" class="task-record-icon" />
    </div>
    <div class="icon-ctn">
      <img src="./images/delete.png" class="task-record-icon" />
    </div>
  </div>
  `
  );

  taskListContainerDOM.innerHTML = "";
  taskListDOMArray.forEach((record) => {
    taskListContainerDOM.innerHTML = taskListContainerDOM.innerHTML + record;
  });
};

const updateDateTime = () => {
  setInterval(() => {
    let day = new Date().getDay();
    let time = new Date().toLocaleTimeString();
    dateTimeDOM.innerHTML = `${WEEK[day - 1]}  ${time}`;
  }, 1000);
};

const closeCreateTask = () => {
  modalBackDropDOM.style.display = "none";
  addTaskFormDOM.style.display = "none";
};

const openCreateTaskView = () => {
  modalBackDropDOM.style.display = "block";
  addTaskFormDOM.style.display = "flex";
};

const createTask = async () => {
  try {
    const response = await fetch("/api/V1-0-1/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskNameInputDOM.value,
        description: descriptionInputDOM.value,
        status: statusInputDOM.value,
      }),
    });
    await fetchTasksList();
    closeCreateTask();
  } catch (e) {
    alert(e);
  }
};

function main() {
  updateDateTime();
  fetchTasksList();
}

main();
