const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const content = document.getElementById('content');
const imagesBtn = document.getElementById('imagesBtn');
const imagePreview = document.getElementById('imagePreview');





// Mostrar/ocultar el sidebar
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-hidden');
});

// Función para insertar imágenes en la pantalla
function insertImage(src) {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('draggable');
    imgContainer.style.width = '150px';
    imgContainer.style.height = '150px';
    imgContainer.style.position = 'absolute';
    imgContainer.style.top = '50px';
    imgContainer.style.left = '50px';

    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.height = '100%';

    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = 'x';
    closeBtn.addEventListener('click', function() {
        imgContainer.remove();
    });

    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');

    imgContainer.appendChild(img);
    imgContainer.appendChild(closeBtn);
    imgContainer.appendChild(resizeHandle);
    content.appendChild(imgContainer);

    // Habilitar arrastrar y soltar
    makeDraggable(imgContainer);
    makeResizable(imgContainer, resizeHandle);
}

// Función para mostrar/ocultar imágenes al hacer clic en el botón "Images"
imagesBtn.addEventListener('click', function() {
    if (imagePreview.style.display === 'none' || imagePreview.style.display === '') {
        imagePreview.style.display = 'grid'; // Mostrar imágenes
    } else {
        imagePreview.style.display = 'none'; // Ocultar imágenes
    }
});

function makeDraggable(element) {
    let offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        offsetX = e.clientX - parseFloat(element.style.left);
        offsetY = e.clientY - parseFloat(element.style.top);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function makeResizable(container, handle) {
    handle.addEventListener('mousedown', function(e) {
        e.stopPropagation(); // Evitar que el evento se propague y cierre la imagen
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        const newWidth = e.clientX - parseFloat(container.style.left);
        const newHeight = e.clientY - parseFloat(container.style.top);
        if (newWidth > 50 && newHeight > 50) { // Limitar el tamaño mínimo
            container.style.width = `${newWidth}px`;
            container.style.height = `${newHeight}px`;
            handle.style.bottom = `0`;
            handle.style.right = `0`;
        }
    }

    function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}






///////////////////////////////////////////////////////////////////////
//////////////Eventos de Tools
///////////////////////////////////////////////////////////////////////

// Mostrar/ocultar subbotones al hacer clic en Tools
toolsBtn.addEventListener('click', function() {
    toolsButtons.style.display = toolsButtons.style.display === 'none' ? 'flex' : 'none';
});


// Evento para el botón Cuadrícula
gridBtn.addEventListener('click', function() {
    console.log('Botón Cuadrícula presionado');
    resetContent();
    content.classList.add('grid');  // Añadir clase de cuadriculado
});

// Evento para el botón Renglón
linesBtn.addEventListener('click', function() {
    console.log('Botón Renglón presionado');
    resetContent();
    content.classList.add('horizontal-lines');  // Añadir clase de líneas horizontales
});

// Evento para el botón Blanco
blankBtn.addEventListener('click', function() {
    console.log('Botón Blanco presionado');
    resetContent();
    content.style.backgroundColor = 'white';  // Fondo blanco
});

// Evento para el botón Colores
colorsBtn.addEventListener('click', function() {
    console.log('Botón Colores presionado');
    // Mostrar el selector de color
    colorPicker.click();
});

// Evento cuando el usuario selecciona un color
colorPicker.addEventListener('input', function() {
    const selectedColor = colorPicker.value;
    console.log('Color seleccionado:', selectedColor);
    resetContent();
    content.style.backgroundColor = selectedColor;  // Aplicar el color seleccionado
});

// Función para resetear las clases del contenido
function resetContent() {
    console.log('Reseteando el contenido');
    content.classList.remove('grid', 'horizontal-lines');
    content.style.backgroundColor = 'white';  // Restablecer el fondo a blanco
}