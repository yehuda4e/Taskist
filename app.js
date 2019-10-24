document.getElementById('add').addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const body = document.getElementById('body').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) {
        alert('The past is gone..')
        return;
    }
    let note = { name, body, date, time};
    localStorage.setItem(name, JSON.stringify(note));
    addNote(note)
    document.forms[0].reset();
});

const notesSection = document.getElementById('notes');
let notes = localStorage;
for (let i = 0; i < notes.length; i++) {
    let note = JSON.parse(localStorage.getItem(notes.key(i)));
    addNote(note);
}

const removeBtns = document.querySelectorAll('.note > .close');
removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.removeItem(btn.dataset.task);
        btn.parentElement.animate([
            { opacity: 1},
            { opacity: 0}
        ], {
            duration: 800,
            easing: "ease-out"
        });

        setTimeout(() => btn.parentElement.remove(), 800);
        
    })
});

function addNote(note) {
    let noteBox = document.createElement('div');
    noteBox.innerHTML = `
        <span class="close" data-task="${note.name}">X</span>
        <h3>${note.name}</h3>
        <p>${note.body}</p>
        <em>
            <span>${note.date}</span>
            <time>${note.time}</time>
        </em>
    `;
    noteBox.classList.add('note');
    notesSection.appendChild(noteBox);
}
