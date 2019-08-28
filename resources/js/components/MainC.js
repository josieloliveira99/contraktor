import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Contract from './Contract';
import Party from './Party';
import SearchParty from './SearchParty';
import SearchContract from './SearchContract';

class MainC extends Component {

  render() {
    return ( 
      <BrowserRouter>
        <div>
            <nav className="navbar navbar-light navbar-expand-md navigation-clean">
                <div className="container"><Link to="/" className="navbar-brand" >Contraktor</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/search-party">
                              Search Party
                            </Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/search-contract">
                              Search Contract
                            </Link>
                          </li>
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <main>
                
                
                <Route exact path="/contract" component={OperationContract}/>
                <Route exact path="/search-party" component={SearchParty}/>
                <Route exact path="/search-contract" component={SearchContract}/>
                <Route exact path="/contract/:action" component={OperationContract}/>
                <Route exact path="/contract/:action/:id" component={OperationContract}/>
                <Route exact path="/party" component={OperationParty}/>
                <Route exact path="/party/:action" component={OperationParty}/>
                <Route exact path="/party/:action/:id" component={OperationParty}/>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const OperationContract = ({match}) => {
  const action = match.params.action
  const id     = match.params.id
  return(
    <div>
      {action == "create" ? <Contract/> : action == "edit" ? <Contract id={id}/> : <Contract list/>}
    </div>
  )
}

const OperationParty = ({match}) => {
  const action = match.params.action
  const id     = match.params.id
  return(
    <div>
      {action == "create" ? <Party/> : action == "edit" ? <Party id={id}/> : <Party list/>}
    </div>
  )
}

const Table = (props)=>{
  return(
    <table id="example" className="table table-striped table-bordered" cellSpacing="0" width="100%">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telephone</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
        </thead>
        <tbody>
          {
            [{name: "Tiger Nixon", lastname: "teste", cpf: "05387925907", mail:"josielqo@gmail.com", phone: "41 9948-2246"}].map((data)=>{
              return(
                <React.Fragment>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.lastname}</td>
                  <td>{data.cpf}</td>
                  <td>{data.mail}</td>
                  <td>{data.phone}</td>
                  <td>X</td>
                  <td>X</td>
                </tr>
                </React.Fragment>
              )
            })
          }
        </tbody>
    </table>
  )
}




// const Contract = ()=> {
//   return <h1>Contract</h1>
// }

// const Party = ()=> {
//   return <h1>Party</h1>
// }

export default MainC;

if (document.getElementById('root')) {
    ReactDOM.render( < MainC / > , document.getElementById('root'));
}
