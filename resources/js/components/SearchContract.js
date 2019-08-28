import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

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
    // this.toDelete = this.toDelete.bind(this)
  }  

  handleSearchChange(event) {
    const target = event.target;
    const value = target.value
    this.setState({searchInputValue: value}, ()=> console.log(this.state));
  }

  handleSubmitSearch(e){
    e.preventDefault()
    console.log("submeteu")
    const {searchInputValue} = this.state 
    console.log(searchInputValue)
    let url  = `http://127.0.0.1:8000/api/search/contract?q=${searchInputValue}`
    axios.get(url)
      .then((response) => {
        this.setState({searchResult: response.data}, ()=> console.log(this.state));
      })
  }

    render() {
    return ( 
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title">Pesquise os contratos cadastrados</h1>
              </div>
              <div id="searchform--one" className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <button onClick={this.handleSubmitSearch} className="searchform-one__hidden-button">
                  fake
                </button>
                <input type="search" className="form-control" placeholder="Digite aqui sua pesquisa" onChange ={this.handleSearchChange}/>
              </div>      
            </div>
            {
              (this.state.searchResult).length != 0 && <Table data={this.state.searchResult}/>
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
          //if(response.status == 204){
            // this.setState({
            //   searchResult: this.state.searchResult.filter(el => el !== e)
            // })
          //}
        })
    }
  
  render(){
    console.log(this.props)
    const parties = this.props.data
    return(
      <table id="example" className="table table-striped table-bordered" cellSpacing="0" width="100%">
          <thead>
              <tr>
                  <th>Título</th>
                  <th>Data de início</th>
                  <th>Data de encerramento</th>
                  <th>Contrato</th>
                  {/* <th>Editar</th> */}
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
                    <td>{data.id}</td>
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