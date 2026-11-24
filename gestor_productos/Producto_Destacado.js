class ProductoDestacado extends Producto{
    constructor(id, nombre, precio, vendido=false, nivel="ALTO"){
        super(id, nombre, precio);

        this.nivel = nivel;
        
        const valores = ["ALTO", "MEDIO", "BAJO"]

        if (!nivel.includes(valores)){
            throw new Error("Introduce un nivel válido")
        }
    }
}