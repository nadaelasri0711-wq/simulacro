class Tarea {
    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    mostrar() {
        return this.titulo;
    }

    render() {
        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = this.mostrar();
        texto.dataset.id = this.id;
        texto.className = "texto-tarea";

        if (this.completada) {
            texto.style.textDecoration = "line-through";
        }

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";
        boton.type = "button";
        boton.className = "eliminar";
        boton.dataset.id = this.id;

        li.append(texto, boton);

        return li;
    }
}