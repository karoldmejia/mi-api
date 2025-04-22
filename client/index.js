const apiUrl = 'http://localhost:5000/users';

// Función para listar usuarios
async function listUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p>ID: ${user.id}</p>
            <p>Nombre: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <button onclick="editUser(${user.id})">Editar</button>
            <button onclick="deleteUser(${user.id})">Eliminar</button>
            <hr>
        `;
        usersList.appendChild(userDiv);
    });
}

// Función para crear o actualizar usuario
document.getElementById('user-form').onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userData = { name, email };

    if (id) {
        // Actualizar usuario
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    } else {
        // Crear nuevo usuario
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    }
    listUsers();
    resetForm();
};

// Función para eliminar usuario
async function deleteUser(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    listUsers();
}

// Función para editar usuario (carga los datos en el formulario)
async function editUser(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const user = await response.json();
    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
}

// Función para limpiar el formulario después de guardar
function resetForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

// Llamar a listUsers() cuando la página esté completamente cargada
window.onload = () => {
    listUsers();
};