import React, { Component } from "react";

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: "",
            description: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarTarea = this.agregarTarea.bind(this);
    }

    agregarTarea(e) {
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
            })
            .catch(err => console.log(err));
        e.preventDefault();
    }

    componentDidMount() {
        this.obtenerTareas();
    }

    obtenerTareas() {
        fetch("/api/tareas")
            .then(res => res.json())
            .then(data => console.log(data));
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

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;