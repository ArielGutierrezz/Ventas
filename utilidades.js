const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //volver a la normalidad run y btnGuardar
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}


const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const verificar = (id) => {
    //captura el input de cual estamos enviando el id
    const input = document.getElementById(id)
    //captura el div error de cada input 
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    //verifica si el campo esta vacío 
    if (input.value.trim() == '') {
        //classList tiene la propiedad add y remove. add permite añadir un estilo, remove quitarlo
        input.classList.add('is-invalid')
        //innerHTML permite agregar nuevos elementos html desde js
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'precio') {
            if (input.value < 1000000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Tampoco regales el Auto</span>'
            }
        }
        if (id == 'fecha') {
            const fecha = new Date(input.value)
            const hoy = new Date()
            if (fecha > hoy) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha ingresa es mayor a la de hoy</span>'
            }
        }
        if (id == 'email') {
            if (!valdiaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
}

const valida = () =>{

    document.querySelectorAll('.form-control,.form-select').forEach(item => {

        verificar(item.id)
    })
    validaRadio('Estado del Vehiculo')
}

const validaRadio = (name) => {
    const radio = document.querySelector(`input[name=${name}]:checked`);
    const div = document.getElementById(`e-${name}`);
    const all = document.querySelectorAll(`input[name=${name}]`);
    
    if (!div) {
        console.error(`El div con id "e-${name}" no existe.`);
        return;
    }
    if (all.length === 0) {
        console.error(`No se encontraron inputs con el nombre "${name}".`);
        return;
    }

    if (!radio) {
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
        all.forEach(item => {
            item.classList.add('is-invalid');
            item.classList.remove('is-valid');
        });
    } else {
        div.innerHTML = '';
        all.forEach(item => {
            item.classList.remove('is-invalid');
            item.classList.add('is-valid');
        });
    }
};