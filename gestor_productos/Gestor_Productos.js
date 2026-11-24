class GestorProductos {

    #contenedor;
    #productos;

    constructor(idContenedor) {

        this.#contenedor = document.getElementById(idContenedor);

        if (!this.#contenedor) {
            throw new Error("No existe el contenedor");
        }

        this.#productos = this.#cargar();

    }


    // MÉTODO PRIVADO PARA CARGAR
    #cargar() {

        const datos = localStorage.getItem("productos");

        if (!datos) {
            return [];
        }

        try {

            const productos = JSON.parse(datos);

            return productos.map(datos => crearProducto(datos));

        } catch (error) {

            console.error("Error al recuperar productos", error);

            return [];

        }

    }


    // MÉTODO PRIVADO PARA GUARDAR
    #guardar() {

        const datos = this.#productos.map(producto => {

            let tipo = "normal";

            if (producto instanceof ProductoDestacado) {
                tipo = "destacado";
            }

            if (producto instanceof ProductoDescuento) {
                tipo = "descuento";
            }

            return {
                ...producto,
                tipo: tipo
            };

        });

        localStorage.setItem(
            "productos",
            JSON.stringify(datos)
        );

    }


    // AÑADIR
    add(producto) {

        this.#productos.push(producto);

        this.#guardar();

        this.render();

    }


    // OBTENER TODOS
    getAll() {

        return this.#productos;

    // Recuperar las clases desde LocalStorage
        function crearProducto(datos) {

    switch (datos.tipo) {

        case "destacado":

            return new ProductoDestacado(
                datos.id,
                datos.nombre,
                datos.precio,
                datos.vendido,
                datos.nivel
            );

        case "descuento":

            return new ProductoDescuento(
                datos.id,
                datos.nombre,
                datos.precio,
                datos.vendido,
                datos.descuento
            );

        default:

            return new Producto(
                datos.id,
                datos.nombre,
                datos.precio,
                datos.vendido
            );

    }

}
    }


    // OBTENER UNO POR ID
    get(id) {

        return this.#productos.find(
            producto => String(producto.id) === String(id)
        );

    }


    // ELIMINAR
    delete(id) {

        this.#productos = this.#productos.filter(
            producto => String(producto.id) !== String(id)
        );

        this.#guardar();

        this.render();

    }


    // CAMBIAR ESTADO
    toggleVendido(id) {

        const producto = this.get(id);

        if (!producto) return;

        producto.vendido = !producto.vendido;

        this.#guardar();

        this.render();

    }


    // MOSTRAR TODOS
    render() {

        this.#contenedor.innerHTML = "";

        this.getAll().forEach(producto => {

            const elemento = producto.render();

            this.#contenedor.appendChild(elemento);

        });

    }

}