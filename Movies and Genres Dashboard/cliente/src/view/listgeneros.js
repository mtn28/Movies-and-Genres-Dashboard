import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function ListComponent() {
  const [datagenero, setdatagenero] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/generos/";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdatagenero(data);
        } else {
            alert("Error Web Service!");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }, []);

    function LoadFillData() {
      return datagenero.map((data, index) => {
        return (
          <tr key={index}>
            <td>▶</td>
            <td>{data.descricao}</td>
            <td>
              <Link className="btn btn-primary btn-sm" to={"/generos/edit/" + data.id}>Editar</Link>
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
        title: "Tem a certeza?",
        text: "Não será possível recuperar este género",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, apague-o!",
        cancelButtonText: "Não, mantenha-o",
      }).then((result) => {
        if (result.value) {
          SendDelete(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "O seu género está seguro :)", "error");
        }
      });
    }

    function SendDelete(userId) {
      const baseUrl = "http://localhost:3000/generos/delete";
      axios
        .post(baseUrl, {
          id: userId,
        })
        .then((response) => {
          if (response.data.success) {
            Swal.fire("Apagado!", "O seu género foi eliminado.", "sucesso");
            Loadgeneros();
          }
        })
        .catch((error) => {
          alert("Error 325");
        });
    }

    useEffect(() => {
      Loadgeneros();
    }, []);

    function Loadgeneros() {
      const url = "http://localhost:3000/generos/";
      axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const data = res.data.data;
            setdatagenero(data);
          } else {
            alert("Error Web Service!");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }

  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
        <th colSpan="1">●</th>
            <th colSpan="col">Género</th>
            <th scope="col">Execução</th>
            <th scope="col">Execução</th>
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
