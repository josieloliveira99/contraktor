import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Contract from './Contract';
import Party from './Party';
import Home from './Home';


class Main extends Component {

  constructor(props) {
    super(props);
    // this.state ={
    //   search: null
    // }
    // this.handleSearchChange = this.handleSearchChange.bind(this)
    // this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  // handleSearchChange(event) {
  //   const target = event.target;
  //   const value = target.value
  //   this.setState({search: value}, ()=> console.log(this.state));
  // }

  // handleSubmitSearch(e){
  //   e.preventDefault()
  //   console.log("submeteu")
  //   const {search} = this.state 
  //   let url  = `http://127.0.0.1:8000/api/search?q=${search}`
  //   axios.get(url)
  //     .then(function(response){
  //       console.log(response)
  //     })
  // }

    render() {
      return ( 
        <BrowserRouter>
          <div className = "container">
            <div className = "row">
              <div className = "col-md-12">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/contratos">Contratos</Link></li>
                  <li><Link to="/contratos/create">Cadastrar Contratos</Link></li>
                  <li><Link to="/contratos/edit/1">Editar Contratos</Link></li>
                  <li><Link to="/partes">Partes</Link></li>
                  <li><Link to="/partes/create">Cadastrar Partes</Link></li>
                  <li><Link to="/partes/edit/1">Editar Partes</Link></li>
                </ul>
                {/* <div className="container">
                <div className="row">
                  <div className="col-md-12">
                  <form className="form-inline">
                    <div className="form-group files col-md-12">
                      <input type="text" placeholder="Digite sua busca ..." name="search" className="form-control col-md-10" onChange = {this.handleSearchChange} />
                      <button type="submit" className="btn btn-primary my-1 col-md-2" onClick={this.handleSubmitSearch}>Pesquisar</button>
                    </div>
                  </form>
                  </div>
                </div>
              </div> */}
                <Route exact path="/" component={Home}/>
                {/* <Route exact path="/contratos/" component={Contract}/> */}
                <Route exact path="/contratos/:action" component={OperationContract}/>
                <Route exact path="/contratos/:action/:id" component={OperationContract}/>
                {/* <Route exact path="/partes" component={Party}/> */}
                <Route exact path="/partes" component={OperationParty}/>
                <Route exact path="/partes/:action" component={OperationParty}/>
                <Route exact path="/partes/:action/:id" component={OperationParty}/>
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

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render( < Main / > , document.getElementById('root'));
}
