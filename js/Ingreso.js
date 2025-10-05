class Ingreso extends Dato {
    static contadorIngreso = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this.id = ++Ingreso.contadorIngreso;
    }

    getId() {
        return this.id;
    }
}