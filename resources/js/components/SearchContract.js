import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Info from './Info';
import IconSearch from './IconSearch';
import IconView from './IconView';
import IconDelete from './IconDelete';
import moment from 'moment';

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
  }  

  handleSearchChange(event) {
    const target = event.target;
    const value = target.value
    this.setState({searchInputValue: value}, ()=> console.log(this.state));
  }

  handleSubmitSearch(e){
    e.preventDefault()
    this.props.toogleLoading()
    this.getData()
  }

  getData(){
    const {searchInputValue} = this.state 
    let url  = `http://127.0.0.1:8000/api/search/contract?q=${searchInputValue}`
    axios.get(url)
      .then((response) => {
        this.setState({searchResult: response.data}, ()=> console.log(response));
        this.props.toogleLoading()
      })
  }

    render() {
    return ( 
      <Fragment>
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title">Pesquise os <strong>contratos</strong> cadastrados</h1>
              </div>
              <div id="searchform--one" className="form-group has-search">
                <button onClick={this.handleSubmitSearch} className="searchform-one__hidden-button">
                  <IconSearch id="search-contract__icon--search"/>
                </button>
                <input type="search" className="form-control" placeholder="Digite aqui sua pesquisa" onChange ={this.handleSearchChange}/>
              </div>      
            </div>
            <Info text="A pesquisa deve ser efetuada pelo título exato do contrato."/>
            {
              (this.state.searchResult).length != 0 && <Table toogleLoading={this.props.toogleLoading} getData={this.getData} data={this.state.searchResult}/>
            }
          </div>
        </div>
      </Fragment>    
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
          this.props.toogleLoading()
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
                  <th className="center">Excluir</th>
                  <th className="center">Visualizar</th>
              </tr>
          </thead>
          <tbody>
            {
              parties.map((data)=>{
                return(
                  <React.Fragment>
                  <tr key={data.id}>
                    <td>{data.title}</td>
                    <td>{moment(data.start_at).format('DD/MM/YYYY')}</td>
                    <td>{moment(data.end_at).format('DD/MM/YYYY')}</td>
                    <td className="center"><span className="pointer" onClick={this.toDelete.bind(this,data.id)} ><IconDelete/></span></td>
                    <td className="center"><Link to={`contract/list/${data.id}`}><IconView/></Link></td>
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