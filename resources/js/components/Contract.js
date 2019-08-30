import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import Calendar from './Calendar';

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
      this.getStartDateCalendar = this.getStartDateCalendar.bind(this)
      this.getEndDateCalendar = this.getEndDateCalendar.bind(this)
    }
    
    /*
    =============================================================================
    */
    
    componentDidMount(){

      this.props.toogleLoading()
      let urlParties = `http://127.0.0.1:8000/api/parties`
      axios.get(urlParties)
      .then((response) => {
        this.props.toogleLoading()
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
      this.props.toogleLoading()
      const {archive, contractStart, contractEnd, contractTitle, selectedParty} = this.state
      const data = new FormData()
      data.append('file', archive)
      data.append('pdf_file', archive)
      data.append('title', contractTitle)
      data.append('start_at', contractStart)
      data.append('end_at', contractEnd)
      data.append('pivot', JSON.stringify(selectedParty))
      const url = "http://127.0.0.1:8000/api/contracts"

      axios.post(url, data)
      .then((response) => {
        if(response.status == 201){
          this.props.toogleLoading()
          alert("cadastrado com sucesso")
          window.location.href="/contract";
        }else{
          this.props.toogleLoading()
          alert("ocorreu um erro ao cadastrar")
        }
      })
    }

    /*
    =============================================================================
    */

    getStartDateCalendar(e){
      this.setState({
        contractStart:  moment(e).format('YYYY-MM-DD')
      })
    }

    /*
    =============================================================================
    */

    getEndDateCalendar(e){
      this.setState({
        contractEnd:  moment(e).format('YYYY-MM-DD')
      })
    }

    /*
    =============================================================================
    */
    
    render() {
      const {contractTitle, parties} = this.state
      const options = parties.map(function(option){
        return {value: option.id, label: option.name}
      })

      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title">Cadastrar <strong>contrato</strong></h1>
              </div>
              <form>
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
                  <Calendar getDate={this.getStartDateCalendar}/>
                </div> 
                <div className = "form-group files">
                  <label> Termina em </label> 
                  <Calendar getDate={this.getEndDateCalendar}/>
                </div> 
                <div className = "form-group files">
                  <label>Selecione o contrato</label> 
                  <input type = "file" name = "file" className = "form-control" onChange = {this.onChangeHandler}/> 
                </div> 
                <div className = "col-md-12 pull-right">
                  <button width = "100%" type = "button" className = "btn btn-info" onClick = {this.fileUploadHandler} >Cadastrar</button>
                </div> 
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Contract;


 

  

