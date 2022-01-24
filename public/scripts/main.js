var WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  TASK_LIST = [];

const getTasksList = () => {
  fetch("/api/V1-0-1/tasks/")
    .then((res) => {
      return res.json();
    })
    .then((taskListRes) => {
      TASK_LIST = taskListRes.taskList;
      console.log(taskListRes.taskList);
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateDateTime = () => {
  setInterval(() => {
    let day = new Date().getDay();
    let time = new Date().toLocaleTimeString();
    document.getElementById("date-time").innerHTML = `${
      WEEK[day - 1]
    }  ${time}`;
  }, 1000);
};

const closeCreateTask = () => {
  document.getElementById("form-backdrop").style.display = "none";
  document.getElementById("add-task-form").style.display = "none";
};

const openCreateTaskView = () => {
  document.getElementById("form-backdrop").style.display = "block";
  document.getElementById("add-task-form").style.display = "flex";
};

function main() {
  updateDateTime();
  getTasksList();
}

main();
