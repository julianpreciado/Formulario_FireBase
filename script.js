const firebaseConfig = { // sale de </> firebase
    apiKey: "AIzaSyA7R8jiDIBVr_yYy5B8bGhojczUTtMNdSw",
    authDomain: "datos-formulario-424f1.firebaseapp.com",
    projectId: "datos-formulario-424f1",
    storageBucket: "datos-formulario-424f1.appspot.com",
    messagingSenderId: "741417012563",
    appId: "1:741417012563:web:2a27cc17072d95de2525a6",
    measurementId: "G-555EKPLCKM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


// preventDefault lo que hace es que previene la actualizacion de la pagina que hace HTML, todo se hace desde JS

document.getElementById('formulario').addEventListener('submit', (event) => { // haremos escucha pero no de 'click' en html sino del submit
    event.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById('name') // obtenemos los elementos del html, tanto de nombre como de error
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {  // trim es un metodo que elimina los espacios de los costados del valor ingresado
        errorNombre.textContent = 'Por favor, introduce tu nombre' // ese error es el que mostramos con el textContent
        errorNombre.classList.add('error-message') // llamamos la clase CSS para mostrar el error en rojo
    } else {
        errorNombre.textContent = '' // si ese error es vacio, remueve la clase css que pone el aviso en rojo
        errorNombre.classList.remove('error-message')
    }

    // Validar campo correo electronico
    let emailEntrada = document.getElementById('email') // obtenemos los elementos del html, tanto de nombre como de error
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patron de validacion de email basico, sacado de internet. Hay varios
    if (!emailPattern.test(emailEntrada.value)) { // si el patron de emanil es diferente del email ingresado
        errorEmail.textContent = 'Por favor, introduce un correo valido '
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = '' // si ese error es vacio, remueve la clase css que pone el aviso en rojo
        errorEmail.classList.remove('error-message')
    }

    // Validar la contraseña
    let entradaContrasena = document.getElementById('password')
    let errorContrasena = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; // Patron de validacion de contrasena, no va en comillas {8,15} quiere decir de 8 a 15 caracters

    if (!contrasenaPattern.test(entradaContrasena.value)) {
        errorContrasena.textContent = 'La contraseña debe tener entre 8 y 15 caracteres, letras (mayusculas y minusculas), numeros y caracteres especiales'
        errorContrasena.classList.add('error-message')
    } else {
        errorContrasena.textContent = ''
        errorContrasena.classList.remove('error-message')
    }

    // Si todos los campos son validos, enviar el formulario
    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) { // si los 3 son distintos a null o vacio

        // BACKEND QUE RECIBE LA INFORMACION

        db.collection("users").add({
            nombre: entradaNombre.value, // aca se adecua a lo codificado
            email: emailEntrada.value,
            password: entradaContrasena.value
        })
            .then((docRef) => {
                alert('El formulario ha sido enviado con exito', docRef.id); // alert es un cartel con un mensaje
                document.getElementById('formulario').reset(); // se limpia el formualrio una vez se ha enviado todo
            })
            .catch((error) => {
                alert(error);
            }); // sacado de firebase > documentacion > agregar datos



    }
});

// firebase es un backend de google, en el puedes crear un proyecto: https://firebase.google.com/?hl=es
// ir a la consola > Nuevo proyecto > Continuar > Seleccion de pais > crear proyecto > cloud firestone > crear base de datos >
// comenzar en modo prueba > habilitar:
// https://console.firebase.google.com/u/0/project/datos-formulario-424f1/firestore/data/~2F?hl=es
// revisar documentacion para ver que scripts debes agregar a tu html, son 2: https://firebase.google.com/docs/firestore/quickstart?hl=es&authuser=0
// descripccion general > </> > Mi app web > veremos el codigo necesario para implementar en JS lineas 1 a 13, copiar > sigue los pasos



