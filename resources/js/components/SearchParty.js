import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Info from './Info';
import IconSearch from './IconSearch';

class SearchParty extends Component {
  constructor(props) {
    super(props);
    this.state ={
      cpf: '',
      name: '',
      mail: '',
      phone: '', 
      parties: [],
      searchInputValue: '',
      searchResult: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }  

  handleSearchChange(event) {
    const target = event.target;
    const value = target.value
    this.setState({searchInputValue: value}, ()=> console.log(this.state));
  }

  handleSubmitSearch(e){
    e.preventDefault()
    this.props.toogleLoading()
    //console.log("submeteu")
    const {searchInputValue} = this.state 
    //console.log(searchInputValue)
    let url  = `http://127.0.0.1:8000/api/search/party?q=${searchInputValue}`
    axios.get(url)
      .then((response) => {
        this.props.toogleLoading()
        this.setState({searchResult: response.data}, ()=> console.log(this.state));
      })
  }

    render() {
    return ( 
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title">Pesquise as <strong>partes</strong> cadastradas</h1>
              </div>
              <div id="searchform--one" className="form-group has-search">
                {/* <span className="fa fa-search form-control-feedback"></span> */}
                <button onClick={this.handleSubmitSearch} className="searchform-one__hidden-button">
                  <IconSearch id="search-contract__icon--search"/>
                </button>
                <input type="search" className="form-control" placeholder="Digite aqui sua pesquisa" onChange ={this.handleSearchChange}/>
              </div>
            </div>
            <Info text="A pesquisa deve ser efetuada pelo nome exato da parte."/>
            {
              (this.state.searchResult).length != 0 && <Table data={this.state.searchResult}/>
            }
          </div>
        </div>    
    );
  }
}

const Table = (props)=>{
  //console.log(props)
  const parties = props.data
  return(
    <table id="table-result-search" className="table table-striped table-bordered" cellSpacing="0" width="100%">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telephone</th>
                <th>Visualizar</th>
            </tr>
        </thead>
        <tbody>
          {
            parties.map((data)=>{
              return(
                <React.Fragment>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.lastname}</td>
                  <td>{data.cpf}</td>
                  <td>{data.mail}</td>
                  <td>{data.phone}</td>
                  <td><Link to={`/party/list/${data.id}`}>X</Link></td>
                </tr>
                </React.Fragment>
              )
            })
          }
        </tbody>
    </table>
  )
}

export default SearchParty;