const addNote = document.getElementById('addNote');
const errBox = document.getElementById('errBox');
const overlay = document.getElementById('overlay');
const notesId = document.getElementById('noteId');
const remove = document.getElementById('remove');
let icoRemove = document.getElementById('icoRemove');
let currentNoteId = null;

const darkMode = document.getElementsByClassName('card');
const checkDarkMode = document.getElementById('darkMode');
const lightMode = document.getElementById('lightMode');
const darkTitle = document.getElementsByTagName('h6');
const Copyright = document.querySelectorAll('.copyright');
const search = document.getElementById('search');
const hoverNote = document.getElementsByClassName('card-body');
let icoDarkLight = document.getElementById('icoDarkLight');

const errTitle = document.getElementById('errTitle');

const showPopup = (data) => {
    const dt = getNote(data);
    currentTitle.innerHTML = dt.noteTitle
    currentDateTime.innerHTML = dt.noteDate;
    currentContent.innerHTML = dt.noteContent;

    // Set id hiện tại cho popup edit
    localStorage.setItem('currentNote', dt.noteId);

    if (btnRemove())
        currentNoteId = dt.noteId;
}

const addNotePopup = () => {
    addNote.style.display = 'block';
    timeCreate.innerHTML = `${getDate().stringDate} &emsp; &emsp; ${getDate().time}`;
    remove.checked = false;
}

const btnClose = () => {
    popupNote.style.display = 'none';
    addNote.style.display = 'none';
    clearData();

}

const btnCloseErr = () => {
    overlay.style.display = 'none';
    errBox.style.display = 'none';
}

const btnYes = () => {
    if (currentNoteId != null)
        removeData(currentNoteId);
    chooseBox.style.display = 'none';
    overlay.style.display = 'none';
    currentNoteId = null;
    location.reload();
}

const btnNo = () => {
    chooseBox.style.display = 'none';
    overlay.style.display = 'none';
}

const btnSetNote = () => {
    const data = setNote();
    if (data) {
        if (data.noteTitle === '') {
            overlay.style.display = 'block';
            errTitle.style.display = 'block';
        }
        else {
            if (checkData(data)) {
                setData(data);
                location.reload();
            }
            clearData();
        }
    }
}

const clearData = () => {
    noteTitle.innerHTML = 'Enter Title';
    contents.value = '';
}

const checkData = (data) => {
    if (data)
        if (data.contents !== '' || data.noteTitle !== 'Enter Title')
            return true;
    return false;
}

const btnRemove = () => {
    if (!remove.checked)
        icoRemove.src = './icon/trash.svg';
    else
        icoRemove.src = './icon/trash-active.svg';
    return remove.checked;
}

const btnCloseErrTitle = () => {
    overlay.style.display = 'none';
    errTitle.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo trạng thái ban đầu của checkDarkMode từ localStorage
    const savedDarkMode = localStorage.getItem('darkLight');
    checkDarkMode.checked = savedDarkMode === 'true';

    // Áp dụng giao diện tương ứng dựa trên trạng thái đã lưu
    if (checkDarkMode.checked)
        icoDarkLight.src = './icon/brightness-high.svg';
    else
        icoDarkLight.src = './icon/moon.svg';
    applyDarkMode(checkDarkMode.checked);
});

const applyDarkMode = () => {
    lightMode.classList.toggle('bg-dark', checkDarkMode.checked);
    contents.classList.toggle('bg-dark', checkDarkMode.checked);
    contents.classList.toggle('text-light', checkDarkMode.checked);
    editContent.classList.toggle('bg-dark', checkDarkMode.checked);
    editContent.classList.toggle('text-light', checkDarkMode.checked);
    for (let i = 0; i < darkMode.length; i++) {
        darkMode[i].classList.toggle('bg-dark', checkDarkMode.checked);
        darkMode[i].classList.toggle('border', checkDarkMode.checked);
        darkMode[i].classList.toggle('border-secondary', checkDarkMode.checked);
        darkMode[i].classList.toggle('text-light', checkDarkMode.checked);
    }

    for (let i = 0; i < darkTitle.length; i++) {
        darkTitle[i].classList.remove('text-muted');
        darkTitle[i].classList.toggle('text-secondary', checkDarkMode.checked);
    }

    for (let i = 0; i < Copyright.length; i++) {
        Copyright[i].classList.remove('text-muted');
        Copyright[i].classList.toggle('text-secondary', checkDarkMode.checked);
    }

    search.classList.toggle('text-light', checkDarkMode.checked);
    search.classList.toggle('bg-dark', checkDarkMode.checked);

    for (let i = 0; i < hoverNote.length; i++) {
        hoverNote[i].addEventListener('mouseenter', () => {
            if (checkDarkMode.checked)
                hoverNote[i].style.background = '#2d3436';
        });
        hoverNote[i].addEventListener('mouseleave', () => {
            if (checkDarkMode.checked)
                hoverNote[i].style.background = 'none';
        });
    }
}

const btnDarkMode = () => {
    const isDarkMode = checkDarkMode.checked;
    applyDarkMode(isDarkMode);
    // Lưu trạng thái của checkDarkMode vào localStorage
    if (checkDarkMode.checked)
        icoDarkLight.src = './icon/brightness-high.svg';
    else
        icoDarkLight.src = './icon/moon.svg';
    localStorage.setItem('darkLight', isDarkMode);
}

const editNote = document.getElementById('editNote');

const btnEdit = () => {
    btnClose();
    // overlay.style.display = 'block';
    editNote.style.display = 'block';
    getContentEdit();
    // console.log('Hello');
}

const btnEditClose = () => {
    overlay.style.display = 'none';
    editNote.style.display = 'none';
}

const btnSave = () => {
    const dataId = localStorage.getItem('currentNote');
    const eContent = editNoteTitle.innerText;
    if (eContent === '') {
        overlay.style.display = 'block';
        errTitle.style.display = 'block';
        return null;
    }
    if (listNotes.has(eContent)) {
        overlay.style.display = 'block';
        errBox.style.display = 'block';
        return null;
    }
    const note = {
        noteTitle: editNoteTitle.innerText,
        contents: editContent.value.replace(/\n/g, "<br>"),
        id: createId(),
        date: getDate(),
    }

    const data = JSON.stringify(note);
    localStorage.setItem(dataId, data);
    location.reload();

}