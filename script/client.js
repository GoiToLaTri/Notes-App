const Notes = document.getElementById('listNotes');
const currentTitle = document.getElementById('currentTitle');
const currentContent = document.getElementById('currentContent');
const timeCreate = document.getElementById('timeCreate');
const noteTitle = document.getElementById('noteTitle');
const chooseBox = document.getElementById('chooseBox');
const currentTime = document.getElementById('currentTime');
const editNoteTitle = document.getElementById('editNoteTitle');
const editContent = document.getElementById('editContent');

const createNoteCard = () => {
    // Xóa nội dung cũ
    Notes.innerHTML = '';

    // Tạo và thêm mỗi note card mới vào DOM
    if (listNotes.size !== 0) {
        listNotes.forEach((value, key) => {
            const noteCard = document.createElement('div');
            noteCard.className = "note card w-100 h-100 overflow-hidden";
            noteCard.style.maxWidth = "12rem";
            noteCard.style.maxHeight = "12rem";
            noteCard.id = delSpace(key);
            noteCard.onclick = () => showPopup(key);

            const cardBody = document.createElement('div');
            cardBody.className = "card-body d-flex flex-column gap-2";

            const title = document.createElement('h5');
            title.className = "card-title";
            title.textContent = key;

            const noteDate = document.createElement('h6');
            noteDate.className = "card-subtitle text-muted";
            noteDate.innerHTML = `${value.dateNote.stringDate} - ${value.dateNote.time}`;

            const content = document.createElement('div');
            content.id = 'content';
            content.innerHTML = value.contentNote;

            // Chỉ để lấy Id notes không hiển thị.
            const cardId = document.createElement('div');
            cardId.id = 'cardId';
            cardId.className = 'd-none';
            cardId.textContent = value.element;

            cardBody.appendChild(title);
            cardBody.appendChild(noteDate);
            cardBody.appendChild(content);
            cardBody.appendChild(cardId);
            noteCard.appendChild(cardBody);
            Notes.appendChild(noteCard);

        });
    }
    else
        // Xử lý trường hợp không có dữ liệu
        Notes.textContent = 'No notes found.';
}

const getNote = (element) => {
    const noteTitle = document.querySelector(`#${delSpace(element)} .card-title`).textContent;
    const noteDate = document.querySelector(`#${delSpace(element)} .card-subtitle`).innerHTML;
    const noteContent = document.querySelector(`#${delSpace(element)} #content`).innerHTML;
    const noteId = document.querySelector(`#${delSpace(element)} #cardId`).textContent;
    if (btnRemove())
        choiceBox();
    else
        popupNote.style.display = 'block';

    return { noteTitle, noteDate, noteContent, noteId };
}


// Tạo title
let lastTitle = '';
addNote.addEventListener('click', (event) => {
    const curTitle = noteTitle.innerText;
    if (curTitle !== lastTitle && noteTitle.innerText !== 'Enter Title') {
        if (noteTitle.innerText !== '') {
            event.preventDefault();
            lastTitle = curTitle;
            getNoteTitle();
        }
    }
});

noteTitle.addEventListener('click', (event) => {
    if (noteTitle.innerText === 'Enter Title') {
        event.preventDefault();
        noteTitle.innerHTML = '';
    }
});

noteTitle.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        getNoteTitle();
        console.log(getNoteTitle());
    }
});

const getNoteTitle = () => {
    return noteTitle.innerText;
}

const choiceBox = () => {
    overlay.style.display = 'block';
    popupNote.style.display = 'none';
    chooseBox.style.display = 'block';
}

const formatEditData = (data) => {
    var tempText = data.replace(/<br\s*\/?>/gi, '\n');
    var cleanedText = tempText.replace(/<br\s*\/?>/gi, '');
    return cleanedText;
}

const timeEditCreate = document.getElementById('timeEditCreate');

const getContentEdit = () => {
    const dataId = localStorage.getItem('currentNote');
    const data = getData(dataId);
    editNoteTitle.innerHTML = data.noteTitle;
    timeEditCreate.innerHTML = `${getDate().stringDate} &emsp; &emsp; ${getDate().time}`;
    editContent.value = formatEditData(data.contents);
}

// Tính năng search
window.onload = () => {
    // listItem.forEach((item) => console.log(item.textContent))
    document.querySelector('#search').addEventListener('input', () => {
        const searchInput = document.querySelector('#search');
        const filter = searchInput.value.toLowerCase();
        const listItem = document.querySelectorAll('.note');
        listItem.forEach((item) => {
            let text = item.textContent;
            if (text.toLowerCase().includes(filter.toLowerCase())) {
                item.style.display = '';
            }
            else
                item.style.display = 'none';
        });

    });
}

// document.querySelector('#search').addEventListener('input', () => {
//     const searchInput = document.querySelector('#search');
//     const filter = searchInput.value.toLowerCase();

//     listItem.forEach((item) => {
//         let text = item.innerText;
//         if (text.toLowerCase.includes(filter.toLowerCase())) {
//             item.style.display = '';
//         }
//         else
//             item.style.display = 'none';
//     });

// });

createNoteCard();
