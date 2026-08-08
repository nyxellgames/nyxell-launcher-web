const SUPABASE_URL = 'TU_SUPABASE_URL';
const SUPABASE_KEY = 'TU_SUPABASE_ANON_KEY';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarComentarios() {
    const container = document.getElementById('comentarios-container');
    const { data: comentarios, error } = await _supabase
        .from('comentarios')
        .select('nombre, estrellas, opinion')
        .order('id', { ascending: false });

    if (error) {
        container.innerHTML = '<p>Error al cargar los comentarios.</p>';
        return;
    }

    container.innerHTML = '';
    comentarios.forEach(item => {
        const div = document.createElement('div');
        div.className = 'comment-card';
        div.innerHTML = `
            <div class="comment-header">
                <span class="comment-name">${item.nombre}</span>
                <span class="comment-stars">${'★'.repeat(item.estrellas)}${'☆'.repeat(5 - item.estrellas)}</span>
            </div>
            <p>${item.opinion}</p>
        `;
        container.appendChild(div);
    });
}

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const estrellas = parseInt(document.querySelector('input[name="estrellas"]:checked').value);
    const opinion = document.getElementById('opinion').value;

    const { error } = await _supabase
        .from('comentarios')
        .insert([{ nombre, estrellas, opinion }]);

    if (!error) {
        document.getElementById('comment-form').reset();
        cargarComentarios();
    }
});

document.addEventListener('DOMContentLoaded', cargarComentarios);
