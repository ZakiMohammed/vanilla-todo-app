const dvCardHolder = document.querySelector('.card-holder');
const dvEmpty = document.querySelector('.empty');
const txtTitle = document.querySelector('#txtTitle');
const btnAdd = document.querySelector('#btnAdd');
const btnClear = document.querySelector('#btnClear');

let tasks = [];

const toggleEmpty = () => {
    if (tasks.length === 0) {
        dvEmpty.removeAttribute('hidden');
    } else {
        dvEmpty.setAttribute('hidden', '');
    }
};
const toggleClear = () => {
    if (tasks.length === 0) {
        btnClear.style.display = 'none';
    } else {
        btnClear.style.display = 'block';
    }
};
const toggleStatus = () => {
    toggleEmpty();
    toggleClear();
};
const removeTask = (e, id) => {
    const index = tasks.findIndex(i => i.id === id);
    tasks.splice(index, 1);

    e.parentElement.remove();

    toggleStatus();
};
const getUniqueId = () => {
    const uniqueId = +(Math.random() * 100).toFixed(0);
    const found = tasks.find(i => i.id === uniqueId);
    if (found === undefined) {
        return uniqueId;
    } else {
        return getUniqueId();
    }
};

tasks.forEach(task => {
    dvCardHolder.innerHTML += `
        <div class="card">
            <button class="btn-remove" onclick="removeTask(this, ${task.id})"><i class="fas fa-times"></i></button>
            <p>${task.title}</p>
        </div>
    `;
})

toggleStatus();

txtTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnAdd.click();
    }
})
btnAdd.addEventListener('click', () => {

    const title = txtTitle.value;

    if (title === '') {
        alert('Please enter title of your task');
        return;
    }

    const task = {
        id: getUniqueId(),
        title: title
    };
    tasks.unshift(task);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <button class="btn-remove" onclick="removeTask(this, ${task.id})"><i class="fas fa-times"></i></button>
        <p>${task.title}</p>
    `;
    dvCardHolder.prepend(card);

    txtTitle.value = '';

    toggleStatus();
});
btnClear.addEventListener('click', () => {
    const result = confirm('Are you sure you want to remove all the tasks?');
    if (result) {
        tasks = [];
        dvCardHolder.innerHTML = '';

        toggleStatus();
    }
})