import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { PDFObject } from 'react-pdfobject';
import Modal from './Modal';
import IconUser from './IconUser';


class ListContract extends Component {

    constructor(props) {
      super(props);
      this.state ={
        contractTitle: '',
        contractStart: '',
        contractEnd: '',
        pdf_file: '',
        parties: [],
        // selectedParty: null
      }
      // this.fileUploadHandler = this.fileUploadHandler.bind(this)
      // this.onChangeHandler = this.onChangeHandler.bind(this)
      // this.fileUpload = this.fileUpload.bind(this)
      // this.handleInputChange = this.handleInputChange.bind(this)
      // this.onChangeSelect = this.onChangeSelect.bind(this)
    }
    
    /*
    =============================================================================
    */
    
    componentDidMount(){
      let id = this.props.list ? this.props.list : ''
      console.log(id)
      if(id){
        let url = `http://127.0.0.1:8000/api/contracts/${id}`
        axios.get(url)
        .then((response) => {
          this.setState({
            contractTitle: response.data.title,
            contractStart: moment(response.data.start_at).format('YYYY-MM-DD'),
            contractEnd: moment(response.data.start_end).format('YYYY-MM-DD'),
            pdf_file: response.data.pdf_file,
            parties: response.data.parties
          })

          console.log(response.data)
        });
      }  

    }

    /*
    =============================================================================
    */

    // handleInputChange(event) {
    //   const target = event.target;
    //   const value = target.type === 'checkbox' ? target.checked : target.value;
    //   const name = target.name;
    //   this.setState({[name]: value});
    // }

    /*
    =============================================================================
    */

    // onChangeSelect(selectedParty){
    //   this.setState({ selectedParty });
    //   console.log(`Option selected:`, selectedParty);
    // };

    /*
    =============================================================================
    */
  
    // onChangeHandler(e) {
    //   let files = e.target.files || e.dataTransfer.files;
    //   if (!files.length)
    //   return;
    //   console.log("files",files)
    //   this.setState({
    //     archive: files[0]
    //   })
    // }

    /*
    =============================================================================
    */
    
    // fileUploadHandler(e){
    //   e.preventDefault() 
    //   this.fileUpload(this.state.file);
    // }  

    /*
    =============================================================================
    */

    // fileUpload(file){
      
    //   let id = this.props.id ? this.props.id : ''
    //   const {archive, contractStart, contractEnd, contractTitle, selectedParty} = this.state
    //   const data = new FormData()
    //   data.append('file', archive)
    //   data.append('pdf_file', archive)
    //   data.append('title', contractTitle)
    //   data.append('start_at', contractStart)
    //   data.append('end_at', contractEnd)
    //   data.append('pivot', JSON.stringify(selectedParty))
    //   const url = "http://127.0.0.1:8000/api/contracts"

    //   if(id){
    //     let url  = `http://127.0.0.1:8000/api/contracts/${id}`
    //     data.append('_method', 'PUT');
    //     axios.post(url, data)
    //     .then(function(response){
    //       console.log(response)
    //     })
    //   }else{
    //     axios.post(url, data)
    //     .then(function(response){
    //       if(response.status == 201){
    //         // jQuery("input").val('')
    //         alert("cadastrado com sucesso")
    //         window.location.href="/contract";
    //       }else{
    //         alert("ocorreu um erro ao cadastrar")
    //       }
    //     })
    //   }
    // }

    /*
    =============================================================================
    */
    
    render() {
      const props = this.props
      const {pdf_file, contractTitle, contractStart, contractEnd, parties} = this.state
      const options = parties.map(function(option){
        return {value: option.id, label: option.name}
      })
      console.log("props",props)
      console.log("state",this.state)
      return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>{contractTitle}</h1>
          <h5>Partes Envolvidas</h5>
          <div className="list-contract__party">
          {
            parties.map((party)=>{
              return <div className=""><IconUser/>&nbsp;&nbsp;{party.name}</div>
            })
          }
          </div>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExemplo">
            Abrir modal de demonstração
          </button>
          {/* <div className="list-contract">
            <h3>{contractTitle}</h3>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExemplo">
              Abrir modal de demonstração
            </button>
            <div className="data">
              <div className="data__start">
                <h5>Data de Início</h5>
                <p>{contractStart}</p>
              </div>
              <div className="data__end">
                <h5>Data de Encerramento</h5>
                <p>{contractEnd}</p>
              </div> 
            </div>
            <br/>
            <h3>Partes envolvidas</h3>
            <div className="list-contract__parties">
              {
                parties.map((party)=>{
                  return <div className="list-contract__party">{party.name}</div>
                })
              }
            </div>
            <h3>Contrato</h3>
            <br/>
          </div>  */}
        </div>
        {console.log("teste",`http://127.0.0.1:8000/storage/${pdf_file}`)}
      </div>
      <Modal documentTitle={contractTitle}><PDFObject height="700px" url={`http://127.0.0.1:8000/storage/${pdf_file}`} /></Modal>
      {console.log(`http://127.0.0.1:8000/storage/${pdf_file.pdf}`)}
    </div>
    );
  }
}

export default ListContract;
