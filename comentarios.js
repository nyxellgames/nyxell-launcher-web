const SUPABASE_URL = 'https://advrzisyjtnwmpargrhr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdnJ6aXN5anRud21wYXJncmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDYyMzUsImV4cCI6MjEwMTc4MjIzNX0.QYV0Up32osIEqeOl_oIcQcUeaA3nc7zLw8tQupVGSJA';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarComentarios() {
    const container = document.getElementById('comentarios-container');
    const { data: comentarios, error } = await _supabase
        .from('comentarios')
        .select('nombre, estrellas, opinion')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error Supabase:", error);
        container.innerHTML = '<p>Error al cargar los comentarios.</p>';
        return;
    }

    if (!comentarios || comentarios.length === 0) {
        container.innerHTML = '<p>No hay comentarios aún. ¡Sé el primero!</p>';
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

document.addEventListener('DOMContentLoaded', () => {
    cargarComentarios();

    const form = document.getElementById('comment-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const estrellaInput = document.querySelector('input[name="estrellas"]:checked');
            const estrellas = estrellaInput ? parseInt(estrellaInput.value) : 5;
            const opinion = document.getElementById('opinion').value;

            const { error } = await _supabase
                .from('comentarios')
                .insert([{ nombre, estrellas, opinion }]);

            if (error) {
                console.error("Error al enviar comentario:", error);
                alert("Hubo un error al enviar tu comentario.");
            } else {
                form.reset();
                cargarComentarios();
            }
        });
    }
});
