const addNote = document.getElementById('addNote');
const errBox = document.getElementById('errBox');
const overlay = document.getElementById('overlay');
const notesId = document.getElementById('noteId');
const remove = document.getElementById('remove');
let icoRemove = document.getElementById('icoRemove');
let currentNoteId = null;

const showPopup = (data) => {
    const dt = getNote(data);
    currentTitle.innerHTML = dt.noteTitle
    currentDateTime.innerHTML = dt.noteDate;
    currentContent.innerHTML = dt.noteContent;

    if (btnRemove())
        currentNoteId = dt.noteId;
}

const addNotePopup = () => {
    addNote.style.display = 'block';
    timeCreate.innerHTML = `${getDate().stringDate} &emsp; &emsp; ${getDate().time}`;
    remove.checked = false;
    console.log(btnRemove());
}

const btnClose = () => {
    popupNote.style.display = 'none';
    addNote.style.display = 'none';

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
    console.log(checkData(data));
    if (checkData(data)) {
        setData(data);
        location.reload();
    }
    clearData();
}

const clearData = () => {
    noteTitle.innerHTML = 'Enter Title';
    content.value = '';
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