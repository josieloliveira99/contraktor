import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Contract from './Contract';
import Party from './Party';
import SearchParty from './SearchParty';
import ListParty from './ListParty';
import SearchContract from './SearchContract';
import ListContract from './ListContract';
import Loading from './Loading';

class MainC extends Component {
  constructor(props){
    super(props)
    this.state={
      loading: false
    }
    this.setLoading = this.setLoading.bind(this)
  }

  setLoading(status){
    this.setState({
      loading: !this.state.loading
    })
  }

  render() {
    return ( 
      <BrowserRouter>
        {this.state.loading && <Loading/>}  
        <div>
            <nav className="navbar navbar-light navbar-expand-md navigation-clean">
                <div className="container"><Link to="/" className="navbar-brand" >Contraktor</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/party">Cadastrar Partes</Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/search-party">
                              Pesquisar Partes
                            </Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/contract">
                              Cadastrar Contratos
                            </Link>
                          </li>
                          <li className="nav-item" role="presentation">
                            <Link className="nav-link" to="/search-contract">
                              Pesquisar Contratos
                            </Link>
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
                <Route exact path="/contract" render={(props) => <Contract {...props} toogleLoading={this.setLoading} />}/>
                
                <Route exact path="/search-party" render={(props) => <SearchParty {...props} toogleLoading={this.setLoading} />}/>
                
                <Route exact path="/search-contract" render={(props) => <SearchContract {...props} toogleLoading={this.setLoading} />}/>
                
                <Route exact path="/contract/:action" component={OperationContract}/>
                
                <Route exact path="/contract/:action/:id" component={OperationContract}/>
                
                <Route exact path="/party" render={(props) => <Party {...props} toogleLoading={this.setLoading} />}/>
                
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
  console.log(match)
  const path = match.params.path
  const action = match.params.action
  const id     = match.params.id
  return(
    <div>
      {action == "list" ? <ListContract list={id}/> : <Contract/>}
    </div>
  )
}

const OperationParty = ({match}) => {
  console.log(match)
  const path = match.params.path
  const action = match.params.action
  const id     = match.params.id
  return(
    <div>
      {action == "list" ? <ListParty list={id}/> : <Party/>}
    </div>
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
