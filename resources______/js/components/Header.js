import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Header = (props)=>{
  return(
        <div>
            <nav className="navbar navbar-light navbar-expand-md navigation-clean">
                <div className="container"><Link to="/" className="navbar-brand" >Contraktor</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/contract">
                              Contratos
                            </Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/contract/edit/1">
                              editar
                            </Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/party">Partes</Link>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
  )
}

export default Header;