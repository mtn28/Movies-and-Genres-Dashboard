import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
export default function EditComponent() {

    const [datafilmes, setdatafilmes] = useState("");
    const [campdescricao, setcampdescricao] = useState("");
    const [camptitulo, setcamptitulo] = useState("");
    const [campfoto, setcampfoto] = useState("");
    const [stringgeneros, setstringgeneros] = useState("");
    const [selectgeneros, setselectgeneros] = useState("");

    const [generos, setGeneros] = useState([]); // Estado para armazenar a lista de gêneros


    function fetchGeneros() {
        const baseUrl = "http://localhost:3000/generos"; // Endpoint para buscar os gêneros
        axios.get(baseUrl)
            .then(response => {
                setGeneros(response.data.data); // Define a lista de gêneros no estado
            })
            .catch(error => {
                alert("Error fetching genres: " + error);
            });
    }

    useEffect(() => {
        // Função para carregar os gêneros da base de dados
        fetchGeneros();
    }, []);


    function SendSave() {

        if (camptitulo === "") {
            alert("Insira um Título!")
        }
        else if (campdescricao === "") {
            alert("Insira uma Descrição!")
        }
        else if (campfoto === "") {
            alert("Insira uma foto!")
        }
        else if (selectgeneros === "") {
            alert("Escolha um Género!")
        }
        else {

            const baseUrl = "http://localhost:3000/filmes/create"
            const datapost = {
                titulo: camptitulo,
                descricao: campdescricao,
                foto: campfoto,
                generoId: selectgeneros
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
                        <label htmlFor="inputEmail4">Título</label>
                        <input type="text" className="form-control"
                            placeholder="Título do filme" value={camptitulo}
                            onChange={value => setcamptitulo(value.target.value)} />
                    </div>
                    <div className="form-row justify-content-center">
                        <label htmlFor="inputEmail4">Descrição</label>
                        <input type="email" className="form-control"
                            placeholder="Digite a descrição do filme"
                            value={campdescricao} onChange={value =>
                                setcampdescricao(value.target.value)} />
                    </div>
                    <div className="form-row justify-content-center">
                        <label htmlFor="inputAddress">Foto</label>
                        <input type="text" className="form-control"
                            id="inputAddress" placeholder="Insira o nome da foto"
                            value={campfoto} onChange={(value) =>
                                setcampfoto(value.target.value)} />
                    </div>
                    <div className="form-row justify-content-center">
                        <label htmlFor="inputAddress">Género</label>
                        <select
                            className="form-control"
                            value={selectgeneros}
                            onChange={event => setselectgeneros(event.target.value)}
                        >
                            <option value="">Selecione um género</option>
                            {generos.map(genero => (
                                <option key={genero.id} value={genero.id}>{genero.descricao}</option>
                            ))}
                        </select>
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
