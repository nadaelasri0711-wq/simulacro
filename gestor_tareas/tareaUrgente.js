class TareaUrgente extends Tarea {
    constructor(id, titulo, prioridad = "ALTA") {
        super(id, titulo);

        const prioridades = ["ALTA", "MEDIA", "BAJA"];

        if (!prioridades.includes(prioridad)) {
            throw new Error("Prioridad no válida");
        }

        this.prioridad = prioridad;
    }

    render() {
        const li = super.render();
        li.classList.add(this.prioridad);

        return li;
    }
}