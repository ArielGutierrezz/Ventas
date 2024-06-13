import { getData, remove, save } from "./firestore.js"

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const vehiculo = {
                nom: document.getElementById('patente').value.trim(),
                img: document.getElementById('imagen').value,
                mar: document.getElementById('marca').value.trim(),
                mod: document.getElementById('modelo').value,
                pre: document.getElementById('precio').value,
                fec: document.getElementById('fecha').value,
                kil: document.getElementById('kilometros').value,
                est: document.querySelector('input[name="state"]:checked') ? document.querySelector('input[name="state"]:checked').value : ''
            }
            save(vehiculo)
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = '';
        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.pat}</td>
                <td>${item.img}</td>
                <td>${item.mar}</td>
                <td>${item.mod}</td>
                <td>${item.pre}</td>
                <td>${item.fec}</td>
                <td>${item.kil}</td>
                <td>${item.est}</td>
                <td nowrap>
                    <button class="btn btn-warning" data-id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" data-id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.dataset.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                }).catch((error) => {
                    const errorMessage = "Ocurrió un error al eliminar los datos. Por favor, inténtalo de nuevo.";
                    console.error(errorMessage, error);
                    Swal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await obtener(btn.dataset.id);
                const d = doc.data();
                document.getElementById('patente').value = d.pat || '';
                document.getElementById('imagen').value = d.img || '';
                document.getElementById('marca').value = d.mar || '';
                document.getElementById('modelo').value = d.mod || '';
                document.getElementById('fecha').value = d.fec || '';
                document.getElementsByName('kilometro')[0].value = d.kil || '';
                document.getElementById('estado').value = d.est || '';
                document.getElementById('pat').readOnly = true;
                document.getElementById('btnGuardar').value = 'Modificar';
                id = btn.dataset.id;
            });
        });
    });
});