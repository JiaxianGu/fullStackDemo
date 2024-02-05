import React, { Fragment, useState } from "react";
// require("dotenv").config({ path: "../../../../.env" });

const backendURL = process.env.backendURL;
const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    // edit description function
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`https://fullstack-demo-app.onrender.com/todos/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>

            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.id}`}
                onClick={() => setDescription(todo.description)}
            >
                Edit
            </button>

            <div className="modal" id={`id${todo.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" 
                                onClick={() => setDescription(todo.description)}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="from-control" value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >Save</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;