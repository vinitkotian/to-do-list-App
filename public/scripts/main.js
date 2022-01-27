//Creating global DOM references.

const dateTimeDOM = document.getElementById("date-time");
const modalBackDropDOM = document.getElementById("form-backdrop");

//Add task form input
const addTaskFormDOM = document.getElementById("add-task-form");
const taskNameInputDOM = document.querySelector("#task-name");
const statusInputDOM = document.querySelector("#status");
const descriptionInputDOM = document.querySelector("#task-description");

//Edit task form input
const editTaskFormDOM = document.getElementById("edit-task-form");
const taskNameEditInputDOM = document.querySelector("#task-name-edit");
const statusEditInputDOM = document.querySelector("#status-edit");
const descriptionEditInputDOM = document.querySelector(
  "#task-description-edit"
);

const taskListContainerDOM = document.querySelector("#tasks-container");

//Global variables.
var WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  TASK_LIST = [],
  editTaskRecordIndex;

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
  let taskListDOMArray = TASK_LIST.map((record, index) => {
    let progressIconDOM =
      record.status == "C"
        ? `<img src="./images/checked.png" class="task-record-icon" />`
        : `<img src="./images/in-progress.png" class="task-record-icon" />`;
    return `
  <div class="task-record">
    ${progressIconDOM}
    <div class="task-name">${record.name}</div>
    <div class="icon-ctn">
      <img src="./images/pencil.png" class="task-record-icon" id=edit-${index} onclick="openEditTaskView(this.id)"/>
    </div>
    <div class="icon-ctn">
      <img src="./images/delete.png" class="task-record-icon" id=delete-${index} onclick="deleteTask(this.id)"/>
    </div>
  </div>
  `;
  });

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
  //Setting values back to default.
  taskNameInputDOM.value = "";
  descriptionInputDOM.value = "";
  statusInputDOM.value = "P";

  modalBackDropDOM.style.display = "none";
  addTaskFormDOM.style.display = "none";
};

const openCreateTaskView = () => {
  addTaskFormDOM.style.display = "flex";
  modalBackDropDOM.style.display = "block";
};

const openEditTaskView = (id) => {
  editTaskRecordIndex = id.split("-")[1];
  let taskRecord = TASK_LIST[editTaskRecordIndex];

  editTaskFormDOM.style.display = "flex";
  modalBackDropDOM.style.display = "block";

  //Update current values.
  taskNameEditInputDOM.value = taskRecord.name;
  descriptionEditInputDOM.value = taskRecord.description;
  statusEditInputDOM.value = taskRecord.status;
};

const closeEditTask = () => {
  //Setting values back to default.
  taskNameEditInputDOM.value = "";
  descriptionEditInputDOM.value = "";
  statusEditInputDOM.value = "P";

  modalBackDropDOM.style.display = "none";
  editTaskFormDOM.style.display = "none";
};

const editTask = async () => {
  try {
    const updatedRecord = getEditChanges();
    let res = await fetch(`/api/V1-0-1/tasks/${updatedRecord._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedRecord.name,
        status: updatedRecord.status,
        description: updatedRecord.description,
      }),
    });
    if (res.status === 200) {
      raiseToast("edit-success");
    } else {
      raiseToast("edit-failure");
    }
    closeEditTask();
    fetchTasksList();
  } catch (e) {
    raiseToast("edit-failure");
    closeEditTask();
  }
};

const getEditChanges = () => {
  updatedRecord = TASK_LIST[editTaskRecordIndex];
  updatedRecord.name = taskNameEditInputDOM.value;
  updatedRecord.status = statusEditInputDOM.value;
  updatedRecord.description = descriptionEditInputDOM.value;
  return updatedRecord;
};

const createTask = async () => {
  try {
    res = await fetch("/api/V1-0-1/tasks/", {
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
    if (res.status === 200) {
      raiseToast("create-success");
      await fetchTasksList();
      closeCreateTask();
    } else {
      closeCreateTask();
      raiseToast("create-failure");
    }
  } catch (e) {
    closeCreateTask();
    raiseToast("create-failure");
  }
};

const deleteTask = async (idIndex) => {
  idIndex = idIndex.split("-")[1];
  let id = TASK_LIST[idIndex]._id;
  try {
    const res = await fetch(`/api/V1-0-1/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      raiseToast("delete-success");
      await fetchTasksList();
    } else {
      raiseToast("delete-failure");
    }
  } catch (e) {
    raiseToast("delete-failure");
  }
};

const raiseToast = (domID) => {
  let elementDOM = document.querySelector(`#${domID}`);
  elementDOM.style.display = "flex";
  setTimeout(() => {
    elementDOM.style = "none";
  }, 3000);
};

function main() {
  updateDateTime();
  fetchTasksList();
}

main();
