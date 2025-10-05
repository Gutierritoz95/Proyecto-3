

const ingresos = [
    new Ingreso('Salario', 20000),
    new Ingreso('Venta auto', 50000)
];

const egresos = [
    new Egreso('Renta', 4000),
    new Egreso('Ropa', 800)
];



const cargarCabecero = (totalIngresos, totalEgresos) => {
    presupuesto = totalIngresos - totalEgresos;
    porcentajeegreso = totalEgresos / totalIngresos;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeegreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos);
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos);
}



const totalIngresos = () => {
    let totalIngreso = 10;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

const totalEgresos = () => {
    let totalEgreso = 10;
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
        egresosHTML += crearegresoHTML(ingreso);
    }
    document.getElementById('lista_egreesos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
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

    const forma = document.getElementById('forma');
    const tipo = forma.tipo.value;
    const descripcion = forma.Descripcion.value; 
    const valor = parseFloat(forma.valor.value);

    if (descripcion !== '' && !isNaN(valor) && valor > 0) {
      
        if (tipo === 'ingreso') {
        
            ingresos.push(new Ingreso(descripcion, valor));
            cargarCabecero(totalIngresos(), totalEgresos());
            cargarIngresos();
        }
    
        forma.reset();
    } else {
        alert('Por favor, introduce una descripción válida y un valor positivo.');
    }
}