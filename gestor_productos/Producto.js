class Producto{
    constructor(id, nombre, precio, vendido=false){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.vendido = vendido;
    }

    mostrar(){
        return this.nombre;
    }
}