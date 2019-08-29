import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';

class Contract extends Component {

    constructor(props) {
      super(props);
      this.state ={
        contractTitle: '',
        contractStart: '',
        contractEnd: '',
        pdf_file: '',
        parties: [],
        selectedParty: null
      }
      this.fileUploadHandler = this.fileUploadHandler.bind(this)
      this.onChangeHandler = this.onChangeHandler.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.onChangeSelect = this.onChangeSelect.bind(this)
    }
    
    /*
    =============================================================================
    */
    
    componentDidMount(){
      let id = this.props.id ? this.props.id : ''
      console.log(id)
      if(this.props.id){
        let url = `http://127.0.0.1:8000/api/contracts/${id}`
        axios.get(url)
        .then((response) => {
          this.setState({
            contractTitle: response.data.title,
            contractStart: moment(response.data.start_at).format('YYYY-MM-DD'),
            contractEnd: moment(response.data.start_end).format('YYYY-MM-DD'),
            file: response.data.pdf_file
          })
        });
      }  

      console.log(this.state)

      let urlParties = `http://127.0.0.1:8000/api/parties`
      axios.get(urlParties)
      .then((response) => {
        this.setState({
          parties: response.data
        })
      });
    }

    /*
    =============================================================================
    */

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({[name]: value});
    }

    /*
    =============================================================================
    */

    onChangeSelect(selectedParty){
      this.setState({ selectedParty });
      console.log(`Option selected:`, selectedParty);
    };

    /*
    =============================================================================
    */
  
    onChangeHandler(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
      return;
      console.log("files",files)
      this.setState({
        archive: files[0]
      })
    }

    /*
    =============================================================================
    */
    
    fileUploadHandler(e){
      e.preventDefault() 
      this.fileUpload(this.state.file);
    }  

    /*
    =============================================================================
    */

    fileUpload(file){
      
      let id = this.props.id ? this.props.id : ''
      const {archive, contractStart, contractEnd, contractTitle, selectedParty} = this.state
      const data = new FormData()
      data.append('file', archive)
      data.append('pdf_file', archive)
      data.append('title', contractTitle)
      data.append('start_at', contractStart)
      data.append('end_at', contractEnd)
      data.append('pivot', JSON.stringify(selectedParty))
      const url = "http://127.0.0.1:8000/api/contracts"

      if(id){
        let url  = `http://127.0.0.1:8000/api/contracts/${id}`
        data.append('_method', 'PUT');
        axios.post(url, data)
        .then(function(response){
          console.log(response)
        })
      }else{
        axios.post(url, data)
        .then(function(response){
          if(response.status == 201){
            // jQuery("input").val('')
            alert("cadastrado com sucesso")
            window.location.href="/contract";
          }else{
            alert("ocorreu um erro ao cadastrar")
          }
        })
      }
    }

    /*
    =============================================================================
    */
    
    render() {
      const props = this.props
      const {contractTitle, contractStart, contractEnd, parties} = this.state
      const options = parties.map(function(option){
        return {value: option.id, label: option.name}
      })

      return (
        <div className="container">
      <div className="row">
        <div className="col-md-12">
        <h1>Contratos</h1>
        <form method = "post">
                  <div className = "form-group files">
                    <label> Título </label> 
                    <input type = "text" name = "contractTitle" className = "form-control" value={contractTitle} onChange = {this.handleInputChange}/> 
                  </div> 
                  <div className = "form-group files">
                    <label> Partes </label> 
                    {
                      <Select
                        name="parties_in_contract"
                        isMulti
                        isSearchable
                        options={options}
                        onChange={this.onChangeSelect}
                      />
                    }
                  </div> 
                  <div className = "form-group files">
                    <label> Começa em </label> 
                    <input type = "date" name = "contractStart" className = "form-control" value={contractStart} onChange = {this.handleInputChange}/>
                  </div> 
                  <div className = "form-group files">
                    <label> Termina em </label> 
                    <input type = "date" name = "contractEnd" className = "form-control" value={contractEnd} onChange = {this.handleInputChange}/> 
                  </div> 
                  <div className = "form-group files">
                    <label>Selecione o contrato</label> 
                    <input type = "file" name = "file" className = "form-control" onChange = {this.onChangeHandler}/> 
                  </div> 
                  <div className = "col-md-6 pull-right">
                    <button width = "100%" type = "button" className = "btn btn-info" onClick = {this.fileUploadHandler} >Salvar</button>
                  </div> 
                </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Contract;
