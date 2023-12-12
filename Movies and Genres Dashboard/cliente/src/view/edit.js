import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function EditComponent() {
    const [datafilmes, setdatafilmes] = useState("");
    const [campdescricao, setcampdescricao] = useState("");
    const [camptitulo, setcamptitulo] = useState("");
    const [campfoto, setcampfoto] = useState("");
    const [generos, setGeneros] = useState([]);
    const [selectgeneros, setselectgeneros] = useState("");

    const { filmesId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = baseUrl + "/filmes/" + filmesId;
                const response = await axios.get(url);

                if (response.data.success) {
                    const data = response.data.data[0];
                    setdatafilmes(data);
                    setcamptitulo(data.titulo);
                    setcampdescricao(data.descricao);
                    setcampfoto(data.foto);
                    setselectgeneros(data.generoId);
                } else {
                    alert("Error web service");
                }
            } catch (error) {
                alert("Error server: " + error);
            }
        };

        fetchData();
    }, [filmesId]);

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const url = baseUrl + "/generos";
                const response = await axios.get(url);

                if (response.data.success) {
                    setGeneros(response.data.data);
                } else {
                    alert("Error fetching genres");
                }
            } catch (error) {
                alert("Error server: " + error);
            }
        };

        fetchGeneros();
    }, []);

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-row justify-content-center">
                    <label htmlFor="inputPassword4">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título do filme"
                        value={camptitulo}
                        onChange={(value) => setcamptitulo(value.target.value)}
                    />
                </div>
                <div className="form-row justify-content-center">
                    <label htmlFor="inputEmail4">Descrição</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Digite a descrição do filme"
                        value={campdescricao}
                        onChange={(value) => setcampdescricao(value.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-row justify-content-center">
                    <label htmlFor="inputEmail4">Foto</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Insira o nome da foto"
                        value={campfoto}
                        onChange={(value) => setcampfoto(value.target.value)}
                    />
                </div>
                <div className="form-row justify-content-center">
                    <label htmlFor="inputState">Géneros</label>
                    <select
                        id="inputState"
                        className="form-control"
                        value={selectgeneros}
                        onChange={(value) => setselectgeneros(value.target.value)}
                    >
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>
                                {genero.descricao}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-info mt-3"
                onClick={() => sendUpdate()}
            >
                Atualizar
            </button>
            <style>
                {`
                body {
                    background-color: #9A9D9F;
                }
                `}
            </style>
        </div>
    );

    function sendUpdate() {
        const url = baseUrl + "/filmes/update/" + filmesId;
        const datapost = {
            titulo: camptitulo,
            descricao: campdescricao,
            foto: campfoto,
            generoId: selectgeneros,
        };

        axios.put(url, datapost)
            .then((response) => {
                if (response.data.success === true) {
                    alert(response.data.message);
                } else {
                    alert("Error");
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            });
    }
}
