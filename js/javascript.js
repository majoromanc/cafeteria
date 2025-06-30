
document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar el archivo de noticias
    function loadNews(url) {
        const xhr = new XMLHttpRequest(); // Crea una nueva instancia de XMLHttpRequest
        xhr.open('GET', url, true); // Configura la solicitud para obtener datos de la URL especificada
        xhr.onreadystatechange = function() {
            // Verifica si la solicitud se ha completado y fue exitosa
            if (xhr.readyState === 4 && xhr.status === 200) {
                const newsData = JSON.parse(xhr.responseText); // Convierte la respuesta de texto en un objeto JSON
                displayNews(newsData); // Llama a la función displayNews para mostrar las noticias
            }
        };
        xhr.send(); // Envía la solicitud
    }

    // Función para mostrar las noticias
    function displayNews(data) {
        const noticiasContainer = document.getElementById('noticiasnews'); // Selecciona el elemento donde se mostrarán las noticias
        data.noticias.forEach(noticia => {
            const newsItem = document.createElement('div'); // Crea un nuevo elemento <div> para la noticia
            newsItem.className = 'news-item'; // Asigna la clase 'news-item' al <div>
            newsItem.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
                <p><strong>Categoría:</strong> ${noticia.categoria}</p>
                <p><strong>Fuente:</strong> ${noticia.fuente}</p>
            `; // Establece el contenido HTML del <div> con el título, descripción, categoría y fuente
            noticiasContainer.appendChild(newsItem); // Añade el <div> al elemento noticiasContainer en el DOM
        });
    }

    // Cargar el archivo de noticias al cargar la página
    loadNews('/data/news.json'); // Reemplaza '/data/news.json' con la ruta a tu archivo de noticias
});

