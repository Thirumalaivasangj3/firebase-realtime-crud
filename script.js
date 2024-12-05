
/// Import Firebase functions from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    # FIREBASE CONFIGURATION OF YOURS
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add Data (Create)
document.getElementById('data-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value;

    const newDataRef = push(ref(db, 'users'));
    set(newDataRef, { name, age, city })
        .then(() => {
            document.getElementById('data-form').reset();
        })
        .catch((error) => console.error('Error adding data: ', error));
});

// Read Data (Real-time)
const dataTable = document.getElementById('data-table');
onValue(ref(db, 'users'), (snapshot) => {
    dataTable.innerHTML = ''; // Clear table before updating
    let count = 0;
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const id = childSnapshot.key;
        count++;
        dataTable.innerHTML += `
            <tr id="${id}">
                <td>${count}</td>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.city}</td>
                <td class="actions">
                    <button class="edit" onclick="editData('${id}', '${data.name}', '${data.age}', '${data.city}')">Edit</button>
                    <button class="delete" onclick="deleteData('${id}')">Delete</button>
                </td>
            </tr>
        `;
    });
});

// Update Data
window.editData = (id, currentName, currentAge, currentCity) => {
    const newName = prompt('Enter new name:', currentName);
    const newAge = prompt('Enter new age:', currentAge);
    const newCity = prompt('Enter new city:', currentCity);
    if (newName && newAge && newCity) {
        update(ref(db, `users/${id}`), { name: newName, age: newAge, city: newCity })
            .catch((error) => console.error('Error updating data: ', error));
    }
};

// Delete Data
window.deleteData = (id) => {
    remove(ref(db, `users/${id}`))
        .catch((error) => console.error('Error deleting data: ', error));
};
