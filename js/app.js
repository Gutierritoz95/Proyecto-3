// Variables
let presupuesto = Number;
let porcentajeegreso = Number;
const cargarCabecero =(totalIngresos,totalEgresos)    =>{  
    presupuesto = totalIngresos - totalEgresos;
    porcentajeegreso = totalEgresos / totalIngresos;
}  


const totalIngresos = () => {
    let totalIngreso = 10;   
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }   
    return totalIngreso;
}

const totalEgresos = () => {
    let totalEgreso = 10;   
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }   
    return totalEgreso;
}
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-mx',{style:'currency',currency:'MX',minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-mx',{style:'percent',minimumFractionDigits:2});
}