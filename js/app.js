

const ingresos = [
   
];

const egresos = [
    
];



const cargarCabecero = (totalIngresos, totalEgresos) => {
    const presupuesto = totalIngresos - totalEgresos;
    const porcentajeegreso = totalIngresos > 0 ? totalEgresos / totalIngresos : 0;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeegreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos);
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos);
}


const totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

const totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-mx', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-mx', { style: 'percent', minimumFractionDigits: 2 });
}

function cargarApp() {
    cargarCabecero(totalIngresos(), totalEgresos());
    cargarIngresos();
    cargarEgresos();
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista_ingreesos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista_egresos').innerHTML = egresosHTML;
}

const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    if (indiceEliminar !== -1) {
        ingresos.splice(indiceEliminar, 1);
        cargarCabecero(totalIngresos(), totalEgresos());
        cargarIngresos();
        cargarEgresos();
    }
}

const crearEgresoHTML = (egreso) => {
    const porcentaje = totalIngresos() > 0 ? egreso.valor / totalIngresos() : 0;
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    if (indiceEliminar !== -1) {
        egresos.splice(indiceEliminar, 1);
        cargarCabecero(totalIngresos(), totalEgresos());
        cargarEgresos();
    }
}

const agregarDato = () => {
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('Descripcion').value;
    const valor = parseFloat(document.querySelector('.agregar_valor').value);

    if (descripcion !== '' && !isNaN(valor) && valor > 0) {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, valor));
            cargarCabecero(totalIngresos(), totalEgresos());
            cargarIngresos();
            cargarEgresos();
        } else if (tipo === 'egreso') {
            egresos.push(new Egreso(descripcion, valor));
            cargarCabecero(totalIngresos(), totalEgresos());
            cargarEgresos();
        }
        document.getElementById('forma').reset();
    } else {
        alert('Por favor, introduce una descripción válida y un valor positivo.');
    }
}