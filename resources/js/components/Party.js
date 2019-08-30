import React, { Component, Fragment } from 'react';
import axios from 'axios';
 
class Party extends Component {

    constructor(props) {
      super(props);
      this.state ={
        cpf: '',
        name: '',
        lastname: '',
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
            lastname: response.data.lastname,
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
      this.props.toogleLoading()
      let id = this.props.id ? this.props.id : ""
      let url  = "http://127.0.0.1:8000/api/parties"
      const {cpf, name, lastname, mail, phone} = this.state
      let data = {}
      data.cpf     = cpf 
      data.name   = name
      data.mail   = mail
      data.phone   = phone
      data.lastname   = lastname

      axios.post(url, data)
      .then((response) => {
        if(response.status == 201){
          this.props.toogleLoading()
          jQuery("input").val('')
          alert("cadastrado com sucesso")
        }else{
          this.props.toogleLoading()
          alert("ocorreu um erro ao cadastrar")
        }
      })
    }
    
    render() {
      const {cpf, name, lastname, mail, phone, parties} = this.state
      const optionsParties = parties.map((party)=>{
        return <option value={party.name}/>
      })
      console.log(optionsParties)
      return (
        <Fragment>
        <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero">
              <h1 className="hero__title">Cadastrar uma <strong>parte</strong></h1>
            </div>
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
                <label>Sobrenome</label>
                <input type="text" name="lastname" className="form-control" value={lastname} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group files">
                <label>E-mail</label>
                <input type="text" name="mail" className="form-control" value={mail} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group files">
                <label>Telefone</label>
                <input type="text" name="phone" className="form-control" value={phone} onChange={this.handleInputChange}/>
              </div>
              <div className="col-md-12 pull-right">
              <button width="100%" type="button" className="btn btn-info" onClick={this.handleSubmit}>
                Cadastrar
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
    );
  }
}
 
export default Party;