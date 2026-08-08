const SUPABASE_URL = 'https://advrzisyjtnwmpargrhr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ZhAhnFeu0KaZnrUAg-kysw_9mH_WVtK';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarNoticias() {
    const container = document.getElementById('noticias-container');
    const { data: noticias, error } = await _supabase
        .from('noticias')
        .select('titulo, contenido, fecha')
        .order('id', { ascending: false });

    if (error) {
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
