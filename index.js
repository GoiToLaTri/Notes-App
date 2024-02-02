const contents = document.getElementById('content');

const listId = [];

const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dayOfWeek = date.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let stringDate = `${daysOfWeek[dayOfWeek]}, ${monthsOfYear[month]} ${day}, ${year}`
    let time = date.toLocaleTimeString();
    return { stringDate, time };
}

const createId = () => {
    const ranNumber = Math.round(Math.random() * 10000000).toString();
    const zero = '0'.repeat(8 - ranNumber.length);
    const id = zero + ranNumber;
    return id;
}

const setNote = () => {
    // Kiểm tra có tiêu đề bị trùng không
    const noteTitleText = noteTitle.innerText;
    if (listNotes.has(noteTitleText)) {
        // Trả về null hoặc thông báo lỗi
        overlay.style.display = 'block';
        errBox.style.display = 'block';
        console.log(listNotes);
        return null;
    }

    const note = {
        noteTitle: noteTitle.innerText,
        contents: contents.value.replace(/\n/g, "<br>"),
        id: createId(),
        date: getDate(),
    }
    return note;
}

const setData = (data) => {
    if (!data) return;

    const serializedData = JSON.stringify(data);
    localStorage.setItem(data.id, serializedData);

    // Lấy danh sách ID từ localStorage
    const storedIds = localStorage.getItem('id');
    const listId = storedIds ? JSON.parse(storedIds) : [];
    listId.push(data.id);

    // Lưu danh sách ID mới vào localStorage
    localStorage.setItem('id', JSON.stringify(listId));
}

const getData = (data) => {
    const dt = localStorage.getItem(data);
    if (dt === null)
        return null;
    const convetData = JSON.parse(dt);
    return convetData;
}

// Map này để lưu title của node để node không bị trùng.
const listNotes = new Map();

const newNote = () => {
    const listId = getData('id');
    if (listId) {
        listId.reverse();// Để ghi chú mới nhất lên đầu.
        listId.forEach(element => {
            const data = getData(element);
            if (data && !listNotes.has(data.noteTitle)) {
                let contentNote = data.contents;
                let dateNote = data.date;
                listNotes.set(data.noteTitle, { contentNote, dateNote, element });
            }
        });
    }
    return listNotes;
}

newNote();

const delSpace = (title) => title.replace(/\s+/g, '');

const removeData = (data) => {
    localStorage.removeItem(data);
    const listId = getData('id') || [];
    const newListId = listId.filter(element => element !== data);
    localStorage.setItem('id', JSON.stringify(newListId));
}