import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Contract from './Contract';
// import Party from './Party';
// import Home from './Home';


class MainC extends Component {

  constructor(props) {
    super(props);
  }  

  render() {
    return ( 
      <BrowserRouter>
        <div>
            <nav className="navbar navbar-light navbar-expand-md navigation-clean">
                <div className="container"><a className="navbar-brand" href="#">Contraktor</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/contract">
                              Contratos
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
              <div className="hero">
                <h1 className="hero__title">Gestão de Contratos e Assinatura Digital</h1>
              </div>
              <div id="searchform--one" className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="search" className="form-control" placeholder="Digite aqui sua pesquisa"/>
              </div>      
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <main>
                <Route exact path="/"/>
                <Route exact path="/contract" component={OperationContract}/>
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

// const Contract = ()=> {
//   return <h1>Contract</h1>
// }

const Party = ()=> {
  return <h1>Party</h1>
}

export default MainC;

if (document.getElementById('root')) {
    ReactDOM.render( < MainC / > , document.getElementById('root'));
}
