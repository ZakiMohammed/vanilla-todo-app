const dvCardHolder = document.querySelector('.card-holder');
const dvEmpty = document.querySelector('.empty');
const txtTitle = document.querySelector('#txtTitle');
const btnAdd = document.querySelector('#btnAdd');

const tasks = [];

const toggleEmpty = () => {
    if (tasks.length === 0) {
        dvEmpty.removeAttribute('hidden');
    } else {
        dvEmpty.setAttribute('hidden', '');
    }
};
const removeTask = (e, id) => {
    const index = tasks.findIndex(i => i.id === id);
    tasks.splice(index, 1);

    e.parentElement.remove();
};
const getUniqueId = () => {
    const uniqueId = +(Math.random() * 100).toFixed(0);
    const found = tasks.find(i => i.id === uniqueId);
    if (found === undefined) {
        return uniqueId;
    } else {
        return getUniqueId();
    }
}
// level 1: found -> 27         = return getUniqueId(); 77
// level 2: found -> 27         = return getUniqueId(); 77
// level 3: found -> 27         = return getUniqueId(); 77
// level 4: undefined -> 25     = return uniqueId;      77

tasks.forEach(task => {
    dvCardHolder.innerHTML += `
        <div class="card">
            <button class="btn-remove" onclick="removeTask(this, ${task.id})"><i class="fas fa-times"></i></button>
            <p>${task.title}</p>
        </div>
    `;
})

toggleEmpty();

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
    tasks.push(task);

    dvCardHolder.innerHTML += `
        <div class="card">
            <button class="btn-remove" onclick="removeTask(this, ${task.id})"><i class="fas fa-times"></i></button>
            <p>${task.title}</p>
        </div>
    `;

    txtTitle.value = '';

    toggleEmpty();
});