const dvCardHolder = document.querySelector('.card-holder');
const dvEmpty = document.querySelector('.empty');
const dvLoader = document.querySelector('.loader');
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
    // toggleClear();
};
const removeTask = (e, id) => {
    // remove todo
    showLoader();
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            const index = tasks.findIndex(i => i.id === id);
            tasks.splice(index, 1);

            e.parentElement.remove();

            toggleStatus();
            hideLoader();
        })
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
const showLoader = () => {
    dvLoader.classList.remove('d-none');
};
const hideLoader = () => {
    dvLoader.classList.add('d-none');
};

// get all todo
showLoader();
fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then(response => response.json())
    .then(data => {

        // feed the data coming from UI to your array
        tasks = data;

        tasks.forEach(task => {
            dvCardHolder.innerHTML += `
                <div class="card">
                    <button class="btn-remove" onclick="removeTask(this, ${task.id})"><i class="fas fa-times"></i></button>
                    <p>${task.title}</p>
                </div>
            `;
        })

        toggleStatus();
        hideLoader();
    })

txtTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnAdd.click();
    }
});
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
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(task),
    };

    // add todo
    showLoader();
    fetch('https://jsonplaceholder.typicode.com/todos', options)
        .then(response => response.json())
        .then(data => {
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
            hideLoader();
        })
});
btnClear.addEventListener('click', () => {
    const result = confirm('Are you sure you want to remove all the tasks?');
    if (result === false) {
        return;
    }

    tasks = [];
    dvCardHolder.innerHTML = '';

    toggleStatus();
});