class GestorTareas {
    #contenedor;

    constructor(idContenedor) {
        this.#contenedor = document.getElementById(idContenedor);
        this.render();
    }

    #guardar(tareas) {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    getAll() {
        const datos = JSON.parse(localStorage.getItem("tareas")) || [];

        return datos.map(tarea => {
            if (tarea.tipo === "urgente") {
                return new TareaUrgente(
                    tarea.id,
                    tarea.titulo,
                    tarea.prioridad
                );
            }

            if (tarea.tipo === "recordatorio") {
                return new Recordatorio(
                    tarea.id,
                    tarea.titulo,
                    tarea.descripcion
                );
            }

            return new Tarea(
                tarea.id,
                tarea.titulo
            );
        }).map((tarea, i) => {
            tarea.completada = datos[i].completada;
            return tarea;
        });
    }

    get(id) {
        return this.getAll().find(tarea => tarea.id === id);
    }

    add(tarea) {
        const tareas = this.getAll();

        tareas.push(tarea);

        this.#guardar(tareas.map(t => ({
            ...t,
            tipo: t instanceof TareaUrgente
                ? "urgente"
                : t instanceof Recordatorio
                    ? "recordatorio"
                    : "normal"
        })));

        this.render();
    }

    delete(id) {
        const tareas = this.getAll()
            .filter(tarea => tarea.id !== id);

        this.#guardar(tareas.map(t => ({
            ...t,
            tipo: t instanceof TareaUrgente
                ? "urgente"
                : t instanceof Recordatorio
                    ? "recordatorio"
                    : "normal"
        })));

        this.render();
    }

    cambiarEstado(id) {
        const tareas = this.getAll();

        const tarea = tareas.find(t => t.id === id);

        if (tarea) {
            tarea.completada = !tarea.completada;
        }

        this.#guardar(tareas.map(t => ({
            ...t,
            tipo: t instanceof TareaUrgente
                ? "urgente"
                : t instanceof Recordatorio
                    ? "recordatorio"
                    : "normal"
        })));

        this.render();
    }

    render() {
        this.#contenedor.innerHTML = "";

        this.getAll().forEach(tarea => {
            this.#contenedor.append(tarea.render());
        });
    }
}
