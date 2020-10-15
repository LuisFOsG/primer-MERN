import React, { Component } from "react";

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            description: "",
            tareas: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarTarea = this.agregarTarea.bind(this);
    }

    agregarTarea(e) {
        if(this.state.id){
            fetch("/api/tareas/"+this.state.id, {
                method: "PUT",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: "Tarea Actualizada"});
                this.setState({title: "", description: "", id: ""});
                this.obtenerTareas();
            });
        } else{
            fetch("/api/tareas", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: "Tarea Guardada"});
                    this.setState({title: "", description: ""});
                    this.obtenerTareas();
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.obtenerTareas();
    }

    obtenerTareas() {
        fetch("/api/tareas")
            .then(res => res.json())
            .then(data => {
                this.setState({tareas: data});
                console.log(this.state.tareas);
            });
    }

    eliminarTarea(id) {
        if(confirm("Esta seguro de querer eliminar esta Tarea?")){
            fetch("/api/tareas/"+id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: "Tarea Eliminada"});
                this.obtenerTareas();
            });
        }
    }

    editarTarea(id) {
        fetch("/api/tareas/"+id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                id: data._id
            })
        });
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <div>
                {/* Navegación */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>
                {/* Formulario xd */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.agregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Titulo" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" value={this.state.description} onChange={this.handleChange}className="materialize-textarea" placeholder="Descripcion"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            {/* Tabla */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(tarea => {
                                            return (
                                                <tr key={tarea._id}>
                                                    <td>{tarea.title}</td>
                                                    <td>{tarea.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4"><i className="material-icons" onClick={() => this.editarTarea(tarea._id)}>edit</i></button>
                                                        <button className="btn light-blue darken-4"><i className="material-icons" onClick={() => this.eliminarTarea(tarea._id)}>delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;