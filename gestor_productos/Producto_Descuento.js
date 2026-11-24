class ProductoDescuento extends Producto{
    constructor(id, nombre, precio, descuento){
        super(id, nombre, precio);
        this.descuento = descuento;
    }

    mostrar(){
        const precioFinal =
        this.precio * (1 - this.descuento / 100);

        return `${this.nombre} - ${precioFinal.toFixed(2)} euros`;
    }

    //propiedad calculada
    get ahorro(){
        return this.precio * this.descuento / 100;
    }
}