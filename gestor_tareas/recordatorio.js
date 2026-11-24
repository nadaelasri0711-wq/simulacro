class Recordatorio extends Tarea {
    constructor(id, titulo, descripcion) {
        super(id, titulo);
        this.descripcion = descripcion;
    }

    mostrar() {
        return this.titulo + ": " + this.descripcion;
    }

    get longitud() {
        return this.descripcion.length;
    }
}
