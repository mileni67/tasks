{
    let tasks = [];

    let hideTasksDone = false;

    const toggleHideTasksDone = () => {
        hideTasksDone = !hideTasksDone;

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-buttonRemove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-buttonDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        const tasksToHtml = task => `   
            <li class="list__items">${task.done && hideTasksDone ? " list__item--hidden" : ""}">
            <button class="list__button list__button--done js-buttonDone">
            ${task.done ? "&#10004" : ""}
            </button>
            <span class="list__itemContent${task.done ? " list__itemContent--done" : ""}">
                ${task.content}
            </span>
            <button class="
                list__button--remove js-buttonRemove">🗑</button>
            </li>
            `;

        document.querySelector(".js-list").innerHTML = tasks.map(tasksToHtml).join("");
    };

    const renderButtons = () => {
        const containerButtons = document.querySelector(".js-containerButtons");

        if (!tasks.length) {
            containerButtons.innerHTML = "";
            return;
        }

        containerButtons.innerHTML = `
            <button class="containerButtons__button js-toggleHideDoneTasks">
            ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="containerButtons__button js-markAllAsDone"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}>Ukończ wszystkie
            </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDone");

        if (markAllAsDoneButton) {
            markAllAsDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideTasksDone);
        }
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvents();

    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        const clearValue = document.querySelector(".js-newTask");
        clearValue.value = "";
        clearValue.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}
