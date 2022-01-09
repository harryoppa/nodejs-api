import React, { useState, useEffect, useRef } from "react";
import Http from '@harry/js/services/Http';

export default () => {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({});
    const [editPassword, setEditPassword] = useState('');
    const [newFormId, setNewFormId] = useState('');
    const modal = useRef();
    const myModal = useRef()

    const [formError, setFormError] = useState(null);

    const getUsers = async () => {
        const response = await Http.get('users');
        console.log(response);
        setUsers(response.data);
    }

    const onEditUser = (user) => {
        setEditUser(user);
        setFormError(null)
        myModal.current = new bootstrap.Modal(modal.current, {
            keyboard: false
        });
        setNewFormId(new Date().getTime());

        myModal.current.show();
    }

    const onSaveUser = async (e) => {
        e.preventDefault();
        
        try {
            const response = await Http.put('users', new URLSearchParams(new FormData(modal.current.querySelector('form'))).toString());
            console.log(response);
            myModal.current.hide();
            getUsers();
        } catch(e) {
            if (e.response) {
                setFormError(e.response.data.message);
            }
        }
    }

    const onDeleteUser = async (id) => {
        // confirm before delete
        if (confirm('Are you sure?')) {
        
            try {
                const response = await Http.delete('users/' + id);
                console.log(response);
                getUsers();
            } catch(e) {
                if (e.response) {
                    alert(e.response.data.message);
                }
            }
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="user-manage-page">
            <div className="section-banner"></div>

            <div className="user-manage-content h-100">
                <div className="container h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="title">User Management</h3>
                    <button className="btn btn-primary" onClick={() => onEditUser({})}>Add new user</button>
                </div>

                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="table-primary">
                            <th>Full Name</th>
                            <th>Email</th>
                            <th style={{width: '200px'}}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button type="button" onClick={() => onEditUser(user)} className="btn btn-primary">
                                                Edit
                                            </button>
                                            <button type="button" onClick={() => onDeleteUser(user.id)} className="btn ms-2 btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>

            <div className="modal fade" ref={modal} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form key={newFormId} onSubmit={onSaveUser}>
                            <div className="modal-header">
                                <h5 className="modal-title">{editUser.fullname ? `Edit user ${editUser.fullname}` : 'Create a user'}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Full name</label>
                                    <input type="text" className="form-control" name="fullname" defaultValue={editUser.fullname} />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" defaultValue={editUser.email} />
                                </div>

                                {
                                    editUser.id && (
                                        <div className="mb-3">
                                            {/* checkbox edit password */}
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" checked={editPassword} onChange={e => setEditPassword(e.target.checked)} id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Edit Password
                                                </label>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    (editPassword || !editUser.id) && (
                                        <div className="mb-3">
                                            <label>Password</label>
                                            <input autoFocus type="password" className="form-control" name="password" />
                                        </div>
                                    )
                                }

                                {
                                    formError && (

                                        <div className="alert alert-danger" role="alert">
                                            {formError}
                                        </div>
                                    )
                                }

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>


                            { editUser.id && <input type="hidden" name="id" value={editUser.id} /> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}