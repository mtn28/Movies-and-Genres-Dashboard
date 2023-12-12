import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000";
export default function EditComponent() {

    const [datagenero, setdatagenero] = useState("");
    const [selectgeneros, setselectgeneros] = useState("");

    const { generosId } = useParams();
    useEffect(() => {
        const url = baseUrl + "/generos/" + generosId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdatagenero(data);
                    setselectgeneros(data.descricao);
                    console.log(JSON.stringify(data.descricao))
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }, []);

    function sendUpdate() {
        // url de backend
        const url = baseUrl + "/generos/update/" + generosId
        const datapost = {
            descricao: selectgeneros,
        }
        console.log(url)
        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-row justify-content-center">
                    <label htmlFor="inputPassword4">Género</label>
                    <input type="text" className="form-control" placeholder="Insira um género"
                        value={selectgeneros} onChange={(value) =>
                            setselectgeneros(value.target.value)} />
                </div>
            </div>
            <button type="submit" class="btn btn-info mt-3" onClick={() => sendUpdate()}>Atualizar</button>
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