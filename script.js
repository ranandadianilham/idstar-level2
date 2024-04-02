const taskList = document.getElementById("taskList");

const newTaskInput = document.getElementById("newTask");
const unfinishedCount = document.getElementById("unfinishedCount");

function updateUnfinishedCount() {
  const unfinishedItems = taskList.querySelectorAll("li:not(.completed)");
  unfinishedCount.innerText = unfinishedItems.length;
}

function areAllCheckboxesChecked() {
  const checkboxInputs = taskList.querySelectorAll("input[type=checkbox]");

  const checkboxInputsArray = Array.from(checkboxInputs);

  return checkboxInputsArray.every((checkbox) => checkbox.checked);
}

function addTask() {
  const newTaskValue = newTaskInput.value.trim();

  if (!newTaskValue) {
    return;
  }

  const newListItem = document.createElement("li");
  newListItem.textContent = newTaskValue;
  newListItem.id = "list-item";
  newListItem.classList.add(
    "d-flex",
    "justify-content-between",
    "px-2",
    "border",
    "rounded",
    "align-items-center",
    "m-2"
  );

  const completeCheck = document.createElement("input");
  completeCheck.type = "checkbox";
  completeCheck.addEventListener("change", function () {
    newListItem.classList.toggle("strikethrough", this.checked);
    updateUnfinishedCount();

    const allChecked = areAllCheckboxesChecked();
    if (allChecked) {
      alert("All tasks are completed!");
    }
  });

  // Container for checkbox and text
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("d-flex", "align-items-center");

  // Add "Selesai" text next to checkbox
  checkboxContainer.appendChild(completeCheck);
  const selesaiText = document.createElement("span");
  selesaiText.textContent = "Selesai";
  selesaiText.classList.add("ms-2");

  checkboxContainer.appendChild(selesaiText);

  const completeButton = document.createElement("button");
  // completeButton.textContent = "Complete";
  completeButton.classList.add("btn");
  completeButton.onclick = function () {
    newListItem.classList.toggle("completed");
    updateUnfinishedCount();
  };

  const removeButton = document.createElement("button");
  removeButton.classList.add("no-strikethrough", "btn", "btn-danger");
  removeButton.textContent = "Hapus";
  removeButton.onclick = function () {
    taskList.removeChild(newListItem);
    updateUnfinishedCount();
  };

  const removeAllButton = document.getElementById("removeAll");
  removeAllButton.onclick = function () {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    updateUnfinishedCount();
  };

  const completeAllButton = document.getElementById("completeAll");
  completeAllButton.onclick = function () {
    const checkboxInputs = taskList.querySelectorAll("input[type=checkbox]");
    checkboxInputs.forEach((checkbox) => {
      checkbox.checked = true;
      const listItem = checkbox.parentElement;
      if (listItem && listItem.tagName === "LI") {
        listItem.classList.add("strikethrough");
      }
    });
    updateUnfinishedCount();
    const allChecked = areAllCheckboxesChecked();
    if (allChecked && checkboxInputs.length > 0) {
      alert("All tasks are completed!");
    }
  };
  newListItem.append(checkboxContainer);
  newListItem.appendChild(completeButton);
  newListItem.appendChild(removeButton);
  taskList.appendChild(newListItem);
  newTaskInput.value = "";

  updateUnfinishedCount();
}
