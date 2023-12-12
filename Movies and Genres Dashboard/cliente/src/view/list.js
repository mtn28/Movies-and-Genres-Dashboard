import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ListComponent() {
  const [datafilmes, setdatafilmes] = useState([]);


  useEffect(() => {
    const url = "http://localhost:3000/filmes/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdatafilmes(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error)
      });
  }, []);

  function LoadFillData() {
    return datafilmes.map((data, index) => {
      return (
        <tr key={index}>
          <th scope="row">▶</th>
          <td>{data.titulo}</td>
          <td>{data.descricao}</td>
          <td>{data.foto}</td>
          <td>{data.genero.descricao}</td>
          <td>
            <Link className="btn btn-primary btn-sm" to={"/edit/" + data.id}>Editar</Link>
          </td>
          <td>
            <button className="btn btn-danger btn-sm" onClick={() => OnDelete(data.id)}>Apagar</button>
          </td>
        </tr>
      )
    });
  }

  function OnDelete(id) {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não será possível recuperar este filme!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apague-o!',
      cancelButtonText: 'Não, mantenha-o'
    }).then((result) => {
      if (result.value) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'O seu filme está seguro :)',
          'error'
        )
      }
    });
  }

  function SendDelete(userId) {
    const baseUrl = "http://localhost:3000/filmes/delete";
    axios.post(baseUrl, { id: userId })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Apagado!',
            'O seu filme foi eliminado.',
            'sucesso'
          );
          Loadfilmes();
        }
      })
      .catch(error => {
        alert("Error 325");
      });
  }

  useEffect(() => {
    Loadfilmes();
  }, []);

  function Loadfilmes() {
    const url = "http://localhost:3000/filmes/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdatafilmes(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">●</th>
          <th scope="col">Título</th>
          <th scope="col">Descrição</th>
          <th scope="col">Foto</th>
          <th scope="col">Género</th>
          <th scope="col" colSpan="3">Execução</th>
        </tr>
      </thead>
      <tbody>
        <LoadFillData />
      </tbody>
      <style>
        {`

        body {
          background-color: #9A9D9F;
        }
          .table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
          }
  
          .table thead {
            background-color: #343a40;
            color: white;
          }
  
          .table th,
          .table td {
            padding: 10px;
          }
  
          .table tbody tr:nth-child(odd) {
            background-color: #f8f9fa;
          }
  
          .table tbody tr:hover {
            background-color: #e9ecef;
          }
  
          .button {
            background-color: #007bff;
            border: none;
            color: white;
            padding: 8px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
          }
  
          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </table>
  );
  
}
