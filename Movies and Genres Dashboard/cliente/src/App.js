import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from './view/form';
import List from './view/list';
import Edit from './view/edit';
import Form_g from './view/formgeneros';
import List_g from './view/listgeneros';
import Edit_g from './view/editgeneros';
import Logo from './view/logo1.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
            Filme e Géneros
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Lista de Filmes</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-info ml-2" to="/criar">Adicionar Filme</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generos/">Lista de Géneros</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-info ml-2" to="/generos/criar">Adicionar Género</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/criar" element={<Form />} />
              <Route path="/edit/:filmesId" element={<Edit />} />
              <Route path="generos/" element={<List_g />} />
              <Route path="generos/criar" element={<Form_g />} />
              <Route path="generos/edit/:generosId" element={<Edit_g />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

