import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search';
 
class Party extends Component {

      constructor(props) {
        super(props);
        this.state ={
          cpf: '',
          name: '',
          mail: '',
          phone: '', 
          parties: [],
          searchInput: '',
          search: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
      }

      componentDidMount(){
        let id = this.props.id ? this.props.id : ''
        if(this.props.id){
          let url = `http://127.0.0.1:8000/api/parties/${id}`
          axios.get(url)
          .then((response) => {
            this.setState({
              cpf: response.data.cpf,
              name: response.data.name,
              mail: response.data.mail,
              phone: response.data.phone
            })
          });
        }

        let urlParties  = "http://127.0.0.1:8000/api/parties"
        axios.get(urlParties)
        .then((response) => {
          this.setState({
            parties: response.data
          })
        })

      }

      handleSearchChange(event) {
        const target = event.target;
        const value = target.value
        this.setState({searchInput: value}, ()=> console.log(this.state));
      }
    
      handleSubmitSearch(e){
        e.preventDefault()
        console.log("submeteu")
        const {search} = this.state 
        let url  = `http://127.0.0.1:8000/api/search/party?q=${search}`
        axios.get(url)
          .then((response) => {
            this.setState({search: response.data}, ()=> console.log(this.state));
          })
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        }, ()=> console.log(this.state)
        
        );

      }
    
      
    handleSubmit(e){
      e.preventDefault() 
      let id = this.props.id ? this.props.id : ""
      let url  = "http://127.0.0.1:8000/api/parties"
      const {cpf, name, mail, phone} = this.state
      console.log("state",this.state)
      let data = {}
      data.cpf     = cpf 
      data.name   = name
      data.mail   = mail
      data.phone   = phone

      if(id){
        let url  = `http://127.0.0.1:8000/api/parties/${id}`
        axios.put(url, data)
        .then(function(response){
          console.log(response)
        })

      }else{
        axios.post(url, data)
        .then(function(response){
          console.log(response)
        })

      }

    }
      
    render() {
      const {list} = this.props
      const {cpf, name, mail, phone, searchInput, search, parties} = this.state
      const optionsParties = parties.map((party)=>{
        return <option value={party.name}/>
      })
      console.log(optionsParties)
      return (
        <Fragment>
        <div className="container">
      <div className="row">
        <div className="col-md-12">
        <h1>Party</h1>
        <form className="form-inline">
            <div className="form-group files col-md-12">
              <input type="text" placeholder="Digite sua busca ..." name="search" className="form-control col-md-10" list="parties" onChange = {this.handleSearchChange} />
              <datalist id="parties">
                {optionsParties}
              </datalist>
              <button type="submit" className="btn btn-primary my-1 col-md-2" onClick={this.handleSubmitSearch}>Pesquisar</button>
            </div>
          </form>
            {search &&
              <table style={{width: "100%"}}> 
                <thead>
                  <tr>
                    <td>Parte</td>
                    <td>action</td>
                    <td>action</td>
                  </tr>
                </thead>
                <tbody>
                {search &&
                search.map((party)=> {
                  return(
                    <tr>
                    <td>{party.name}</td>
                    <td>excluir</td>
                    <td>ver</td>
                    </tr>
                  )
                })
              }
                </tbody>
              </table>
            }
            {!list &&
            <form method="post">
                  <div className="form-group files">
                    <label>CPF</label>
                    <input type="text" name="cpf" className="form-control" value={cpf} onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group files">
                    <label>Nome</label>
                    <input type="text" name="name" className="form-control" value={name} onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group files">
                    <label>E-mail</label>
                    <input type="text" name="mail" className="form-control" value={mail} onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group files">
                    <label>Telefone</label>
                    <input type="text" name="phone" className="form-control" value={phone} onChange={this.handleInputChange}/>
                  </div>
                  <div className="col-md-6 pull-right">
                  <button width="100%" type="button" className="btn btn-info" onClick={this.handleSubmit}>Submit</button>
                  </div>
              </form>
            }
        </div>
      </div>
    </div>
    </Fragment>
      );
    }
}
 
export default Party;