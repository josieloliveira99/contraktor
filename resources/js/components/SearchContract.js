import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Info from './Info';
import IconSearch from './IconSearch';

class SearchContract extends Component {
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
    this.getData = this.getData.bind(this)
    
    // this.toDelete = this.toDelete.bind(this)
  }  

  handleSearchChange(event) {
    const target = event.target;
    const value = target.value
    this.setState({searchInputValue: value}, ()=> console.log(this.state));
  }

  handleSubmitSearch(e){
    e.preventDefault()
    this.getData()
  }

  getData(){
    const {searchInputValue} = this.state 
    let url  = `http://127.0.0.1:8000/api/search/contract?q=${searchInputValue}`
    axios.get(url)
      .then((response) => {
        this.setState({searchResult: response.data}, ()=> console.log(response));
      })
  }

    render() {
    return ( 
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title">Pesquise os <strong>contratos</strong> cadastrados</h1>
              </div>
              <div id="searchform--one" className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <button onClick={this.handleSubmitSearch} className="searchform-one__hidden-button">
                  <IconSearch id="search-contract__icon--search"/>
                </button>
                <input type="search" className="form-control" placeholder="Digite aqui sua pesquisa" onChange ={this.handleSearchChange}/>
              </div>      
            </div>
            <Info text="A pesquisa deve ser efetuada pelo título exato do contrato."/>
            {
              (this.state.searchResult).length != 0 && <Table getData={this.getData} data={this.state.searchResult}/>
            }
          </div>
        </div>    
    );
  }
}



  class Table extends Component {
    constructor(props) {
      super(props);
      this.toDelete = this.toDelete.bind(this)
    }

    toDelete(e,f){
      let url  = `http://127.0.0.1:8000/api/contracts/${e}}`
      axios.delete(url)
        .then((response) => {
          console.log(response);
          this.props.getData()
        })
    }
  
  render(){
    console.log(this.props)
    const parties = this.props.data
    return(
      <table id="table-result-search" className="table table-striped table-bordered" cellSpacing="0" width="100%">
          <thead>
              <tr>
                  <th>Título</th>
                  <th>Data de início</th>
                  <th>Data de encerramento</th>
                  <th>Partes envolvidas</th>
                  {/* <th>Editar</th> */}
                  <th>Visualizar</th>
                  <th>Excluir</th>
              </tr>
          </thead>
          <tbody>
            {
              parties.map((data)=>{
                return(
                  <React.Fragment>
                  <tr key={data.id}>
                    <td>{data.title}</td>
                    <td>{data.start_at}</td>
                    <td>{data.end_at}</td>
                    <td>{console.log(data)}</td>
                    <td><Link to={`contract/list/${data.id}`}>0</Link></td>
                    {/* <td><Link to={`/contract/edit/${data.id}`}>X</Link></td> */}
                    <td><button onClick={this.toDelete.bind(this,data.id)} >X</button></td>
                  </tr>
                  </React.Fragment>
                )
              })
            }
          </tbody>
      </table>
    )
  }
  
  
}

export default SearchContract;