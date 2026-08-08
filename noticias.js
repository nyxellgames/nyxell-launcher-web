const SUPABASE_URL = 'https://advrzisyjtnwmpargrhr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdnJ6aXN5anRud21wYXJncmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDYyMzUsImV4cCI6MjEwMTc4MjIzNX0.QYV0Up32osIEqeOl_oIcQcUeaA3nc7zLw8tQupVGSJA';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarNoticias() {
    const container = document.getElementById('noticias-container');
    const { data: noticias, error } = await _supabase
        .from('noticias')
        .select('titulo, contenido, fecha')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error Supabase:", error);
        container.innerHTML = '<p>Error al cargar las noticias.</p>';
        return;
    }

    if (!noticias || noticias.length === 0) {
        container.innerHTML = '<p>No hay noticias publicadas por el momento.</p>';
        return;
    }

    container.innerHTML = '';
    noticias.forEach(item => {
        const div = document.createElement('div');
        div.className = 'news-card';
        div.innerHTML = `
            <h2>${item.titulo}</h2>
            <p>${item.contenido}</p>
            <span class="news-date">${item.fecha}</span>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', cargarNoticias);
