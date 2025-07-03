document.addEventListener('DOMContentLoaded', function() {
    function loadNews(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("No se encontró el archivo de noticias: " + response.statusText);
                return response.json();
            })
            .then(newsData => {
                displayNews(newsData);
            })
            .catch(error => {
                const container = document.getElementById('noticiasnews');
                if (container) {
                    container.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
                }
                console.error("Error cargando noticias:", error);
            });
    }

    function displayNews(data) {
        const noticiasContainer = document.getElementById('noticiasnews');
        if (!noticiasContainer) return;
        noticiasContainer.innerHTML = "";
        if (data.noticias && Array.isArray(data.noticias) && data.noticias.length > 0) {
            data.noticias.forEach(noticia => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <h4>${noticia.titulo}</h4>
                    <p>${noticia.descripcion}</p>
                    <p><strong>Categoría:</strong> ${noticia.categoria}</p>
                    <p><strong>Fuente:</strong> ${noticia.fuente}</p>
                `;
                noticiasContainer.appendChild(newsItem);
            });
        } else {
            noticiasContainer.innerHTML = "<p>No hay noticias disponibles.</p>";
        }
    }

    // Cargar noticias desde el archivo JSON
    loadNews('data/new.json');
});