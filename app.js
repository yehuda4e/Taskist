document.getElementById('add').addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const body = document.getElementById('body').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !body || !date) {
        alert('All fields are required');
        return;
    }

    if (new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
        alert('The past is gone..')
        return;
    }

    let note = { name, body, date, time};
    localStorage.setItem(name, JSON.stringify(note));
    addNote(note)
    document.forms[0].reset();
});

let notes = localStorage;
for (let i = 0; i < notes.length; i++) {
    let note = JSON.parse(localStorage.getItem(notes.key(i)));
    addNote(note);
}

const removeBtns = document.querySelectorAll('.note > .close');
removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        removeNote(btn);
    });
});

function removeNote(note) {
    localStorage.removeItem(note.dataset.task);
    note.parentElement.animate([
        { opacity: 1},
        { opacity: 0}
    ], {
        duration: 800,
        easing: "ease-out"
    });
    
    setTimeout(() => note.parentElement.remove(), 800);
}

function addNote(note) {
    const notesSection = document.getElementById('notes');
    const noteBox = document.createElement('div');
    noteBox.innerHTML = `
        <h3>${note.name}</h3>
        <p>${note.body}</p>
        <em>
            <span>${note.date}</span>
            <time>${note.time}</time>
        </em>
    `;

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('close');
    removeBtn.dataset.task = note.name;
    removeBtn.innerText = 'X';
    removeBtn.addEventListener('click', () => removeNote(removeBtn))

    noteBox.classList.add('note');
    notesSection.appendChild(noteBox);
    noteBox.appendChild(removeBtn)
}
