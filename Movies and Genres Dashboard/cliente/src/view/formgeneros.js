import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
export default function EditComponent() {

    const [datagenero, setdatagenero] = useState("");
    const [selectgeneros, setselectgeneros] = useState("");

    function SendSave() {
        if (selectgeneros === "") {
            alert("Insira um Género!")
        }
        else {
            const baseUrl = "http://localhost:3000/generos/create"
            const datapost = {
                descricao: selectgeneros,
            }
            axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }


    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-container">
                    <div className="form-row justify-content-center">
                        <label htmlFor="inputEmail4">Género</label>
                        <input type="text" className="form-control"
                            placeholder="Insira um género" value={selectgeneros}
                            onChange={value => setselectgeneros(value.target.value)} />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-info mt-3"
                onClick={() => SendSave()}>Adicionar</button>
            <style>
                {`
                body {
                    background-color: #9A9D9F;
                }
                `}
            </style>
        </div>
    );
}


