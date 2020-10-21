import React from 'react';
import ReactDOM from 'react-dom';

class Users extends React.Component {
    //En el constructor asignamos los métodos para saber si hay error, si hemos cargado los datos y el array de usuarios
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        };
    }

    //Cada vez que cambiamos el valor  de un usuario, actualizamos el array de usuarios
    handleChange(e) {
        let target_id = e.target.getAttribute('data-id');

        let objIndex = this.state.users.findIndex((obj => obj.id == target_id));

        this.state.users[objIndex][e.target.name] = e.target.value;
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Eliminar un usuario a través de una petición al servidor
    DeleteData(id) {
        fetch("http://127.0.0.1:8000/api/users/" + id, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then(() => {
                this.componentDidMount();
            })
    }

    //Editar los datos introducidos a través de la llamada a la API
    EditData(item) {
        fetch("http://127.0.0.1:8000/api/users/" + item.id, {
            body: JSON.stringify(item),
            headers: {'Content-Type': 'application/json'},
            method: 'PUT'
        })
            .then(
                (result) => {
                    console.log(item);
                    if(result.ok) {
                        this.componentDidMount();
                    } else {
                        alert('Error al modificar el usuario');
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    //Guardar los datos de un nuevo usuario mediante una llamada a la API
    SaveData() {
        let name = document.getElementById('new_name').value;
        let email = document.getElementById('new_email').value;
        let password = document.getElementById('new_password').value;

        let data = {
            name: name,
            email: email,
            password: password
        }

        fetch("http://127.0.0.1:8000/api/users", {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        })
            .then(
                (result) => {
                    if(result.ok) {
                        this.componentDidMount();
                        this.clearInputs();
                    } else {
                        alert('Error al crear el usuario');
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    //Limpiamos los valores de introducir un nuevo usuario
    clearInputs() {
        document.getElementById('new_name').value = '';
        document.getElementById('new_email').value = '';
        document.getElementById('new_password').value = '';
    }

    //Renderizamos los datos en la página
    render() {
        const { error, isLoaded, users } = this.state;

        //Mostrar mensaje de error en caso de tenerlo, sino, un mensaje de espera. Cuando cargue, se mostrarán todos los usuarios
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Cargando...</div>;
        } else {
            return (
                <div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" id="new_name" aria-describedby="nameHelp" placeholder="Nombre" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" className="form-control" id="new_email" aria-describedby="emailHelp" placeholder="Correo electrónico" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="new_password" placeholder="Contraseña" />
                        <small id="passHelp" className="form-text text-muted">La contraseña debe de tener entre 5 y 10 caracteres</small>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={(e) => {this.SaveData()}}>Nuevo usuario</button>

                    <br /> <br /> <hr /> <br />

                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Verificado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    {item.id}
                                </td>

                                <td>
                                    <input type="text" className="form-control" data-id={item.id} defaultValue={item.name} name="name" onChange={ this.handleChange.bind(this) } />
                                </td>

                                <td>
                                    <input type="text" className="form-control" data-id={item.id} defaultValue={item.email} name="email" onChange={ this.handleChange.bind(this) } />
                                </td>

                                <td>
                                    {!!(item.email_verified_at) ? 'Sí' : 'No' }
                                </td>

                                <td>
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <button type="button" className="btn btn-primary" onClick={(e) => {this.EditData(item)}}>Editar</button>
                                        <button type="button" className="btn btn-danger" onClick={(e) => {this.DeleteData(item.id)}}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Users;

// Actualizar el elemento DOM
if (document.getElementById('user')) {
    ReactDOM.render(<Users />, document.getElementById('user'));
}

