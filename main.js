// Programa de registro y compra en tienda online de página de videojuegos teniendo en cuenta si la persona es mayor de edad, validando a día 5/11/2024.

// Parte de ingreso con usuarios ya registrados.

// Reemplazo de alerts, promts y console.log.

// Utilización de DOM, JSON y Storage para crear una tabla con la función de que el usuario pueda publicar su equipo de hasta 3 miembros.

class User {
    constructor(usuario, password) {
        this.usuario = usuario;
        this.password = password;
    }
}

const user1 = new User("Tinita", "12345678");
const user2 = new User("Osito", "87654321");

const anioActual = 2024;

function mostrarMensaje(mensaje, tipo = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = mensaje;
    messageBox.className = `message ${tipo}`;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

document.getElementById('submitUser').addEventListener('click', () => {
    const usuario = document.getElementById('username').value;
    if (usuario === user1.usuario || usuario === user2.usuario) {
        document.getElementById('usuarioFormulario').classList.add('hidden');
        document.getElementById('contraseniaFormulario').classList.remove('hidden');
    } else {
        mostrarMensaje('No ha ingresado un usuario válido.');
    }
});

document.getElementById('submitPassword').addEventListener('click', () => {
    const usuario = document.getElementById('username').value;
    const contrasenia = document.getElementById('password').value;
    if (
        (usuario === user1.usuario && contrasenia === user1.password) ||
        (usuario === user2.usuario && contrasenia === user2.password)
    ) {
        document.getElementById('contraseniaFormulario').classList.add('hidden');
        document.getElementById('anioFormulario').classList.remove('hidden');
    } else {
        mostrarMensaje('No ha ingresado una contraseña válida.');
    }
});

document.getElementById('submitYear').addEventListener('click', () => {
    const anioNacimiento = document.getElementById('birthYear').value;
    if (anioNacimiento.toString().length !== 4 || isNaN(anioNacimiento) || anioNacimiento > anioActual) {
        mostrarMensaje('Debe ingresar un año válido.');
    } else {
        if (anioNacimiento < 2006 && anioNacimiento > 1924) {
            mostrarMensaje('Usted cumple con el requisito de la edad, bienvenido a nuestro sitio web!');
        } else if (anioNacimiento == 2006) {
            document.getElementById('anioFormulario').classList.add('hidden');
            document.getElementById('mesFormulario').classList.remove('hidden');
        } else {
            mostrarMensaje('No cumple con el requisito de la edad.');
        }
    }
});

document.getElementById('submitMonth').addEventListener('click', () => {
    const mesNacimiento = document.getElementById('birthMonth').value;
    if (mesNacimiento < 1 || mesNacimiento > 12 || isNaN(mesNacimiento)) {
        mostrarMensaje('Debe ingresar un mes válido.');
    } else if (mesNacimiento >= 12) {
        mostrarMensaje('Aún eres menor de edad. No puedes acceder al sitio.');
    } else if (mesNacimiento >= 1 && mesNacimiento <= 10) {
        mostrarMensaje('Usted cumple con el requisito de la edad, bienvenido a nuestro sitio web!');
    } else if (mesNacimiento == 11) {
        document.getElementById('mesFormulario').classList.add('hidden');
        document.getElementById('diaFormulario').classList.remove('hidden');
    }
});

document.getElementById('submitDay').addEventListener('click', () => {
    const diaNacimiento = document.getElementById('birthDay').value;
    if (diaNacimiento >= 1 && diaNacimiento <= 5) {
        mostrarMensaje('Usted cumple con el requisito de la edad, bienvenido a nuestro sitio web!');
    } else if (diaNacimiento > 5) {
        mostrarMensaje('Aún eres menor de edad. No puedes acceder al sitio.');
    } else {
        mostrarMensaje('Debe ingresar un día válido.');
    }
});

// Parte de búsqueda y verificación de disponibilidad de producto

class Videojuego {
    constructor(nombre, precio, genero) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.genero = genero;
    }

    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}

const videojuegos = [];
videojuegos.push(new Videojuego("Counter-Strike 2", "0.00", "Disparos en primera persona"));
videojuegos.push(new Videojuego("PUBG", "0.00", "Battle Royale / Disparos (FPP y TPP)"));
videojuegos.push(new Videojuego("Call Of Duty: Warzone 2", "0.00", "Battle Royale / Disparos (FPP)"));
videojuegos.push(new Videojuego("Subsistence", "7.79", "Mundo abierto / Fabricación y supervivencia"));
videojuegos.push(new Videojuego("Rust", "18.99", "Mundo abierto / Fabricación y supervivencia / Disparos"));
videojuegos.push(new Videojuego("Stranded Deep", "19.99", "Mundo abierto / Fabricación y supervivencia"));
videojuegos.push(new Videojuego("Once Human", "0.00", "Fabricación y supervivencia / Terror"));
videojuegos.push(new Videojuego("The Evil Within", "11.99", "Supervivencia terrorífica / Aventura"));

// const videojuegos = []; 

// async function cargarVideojuegos() { 
//     try { 
//         const response = await fetch('datos.json'); 
//         const data = await response.json(); 
//         data.forEach(item => { 
//             const videojuego = new Videojuego(item.nombre, item.precio); 
//             videojuegos.push(videojuego); 
//         }); 
//         mostrarVideojuegos(); 
//     } catch (error) { 
//         console.error('Error al cargar los datos:', error); 
//     } 
// }

function mostrarVideojuegos() {
    const tableBody = document.querySelector('#gameTable tbody');
    tableBody.innerHTML = '';
    videojuegos.forEach(v => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${v.nombre}</td><td>${v.precio.toFixed(2)}</td><td>${v.genero}</td>`;
        tableBody.appendChild(row);
    });
}

function mostrarMensaje(mensaje, tipo = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = mensaje;
    messageBox.style.display = 'block';
    messageBox.className = tipo === 'error' ? 'message error' : 'message';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const busqueda = document.getElementById('searchInput').value.toUpperCase();
    const encontrado = videojuegos.some(videojuego => videojuego.nombre === busqueda);
    const resultadoEncontrado = videojuegos.find(videojuego => videojuego.nombre === busqueda);

    if (encontrado) {
        mostrarMensaje(`Videojuego encontrado: ${resultadoEncontrado.nombre} - Precio: ${resultadoEncontrado.precio.toFixed(2)}`);
    } else {
        mostrarMensaje('No encontrado.');
    }
});

document.addEventListener('DOMContentLoaded', mostrarVideojuegos);
// document.addEventListener('DOMContentLoaded', cargarVideojuegos);

// Parte donde el usuario podrá crear una tabla para publicar su equipo de hasta tres miembros

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const gameInput = document.getElementById('game');
    const gamer1Input = document.getElementById('gamer1');
    const gamer2Input = document.getElementById('gamer2');
    const gamer3Input = document.getElementById('gamer3');
    const tableBody = document.querySelector('#data-table tbody');

    cargarTabla();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Añadir',
            text: '¿Está seguro de que desea añadir este nuevo equipo?',
            icon: 'question',
            confirmButtonText: 'Sí',
            showCancelButton: true,
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                const game = gameInput.value;
                const gamer1 = gamer1Input.value;
                const gamer2 = gamer2Input.value;
                const gamer3 = gamer3Input.value;

                if (game && gamer1 && gamer2 && gamer3) {
                    const nuevaEntrada = {
                        game: game,
                        gamer1: gamer1,
                        gamer2: gamer2,
                        gamer3: gamer3,
                    };

                    const currentData = JSON.parse(localStorage.getItem('tableData')) || [];

                    currentData.push(nuevaEntrada);

                    localStorage.setItem('tableData', JSON.stringify(currentData));

                    gameInput.value = '';
                    gamer1Input.value = '';
                    gamer2Input.value = '';
                    gamer3Input.value = '';

                    cargarTabla();

                } else {
                    Swal.fire('Debe completar todo el formulario. En caso de que no posea el equipo completo, coloque un guión.'
                    );
                }
            }
        });
    });

    function cargarTabla() {
        tableBody.innerHTML = '';

        const data = JSON.parse(localStorage.getItem('tableData')) || [];

        data.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.game}</td>
                <td>${entry.gamer1}</td>
                <td>${entry.gamer2}</td>
                <td>${entry.gamer3}</td>
                <td><button class="delete" data-index="${index}">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });

        const borrarBoton = document.querySelectorAll('.delete');
        borrarBoton.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                borrarEntrada(index);
            });
        });
    }

    function borrarEntrada(index) {
        const currentData = JSON.parse(localStorage.getItem('tableData')) || [];

        currentData.splice(index, 1);

        localStorage.setItem('tableData', JSON.stringify(currentData));

        cargarTabla();
    }
});