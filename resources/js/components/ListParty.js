import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { PDFObject } from 'react-pdfobject';
import FileViewer from 'react-file-viewer';
import Modal from './Modal';
import IconView from './IconView';

class ListParty extends Component {
    constructor(props) {
      super(props);
      this.state ={
        party: {}
      }
    }
    
    /*
    =============================================================================
    */
    
    componentDidMount(){
      let id = this.props.list ? this.props.list : ''
      if(id){
        let url = `http://127.0.0.1:8000/api/parties/${id}`
        axios.get(url)
        .then((response) => {
          this.setState({
            party: response.data
          })
        });
      }  

    }

    render() {
      const {name, lastname, cpf, mail, phone, contracts} = this.state.party
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title upper">{`${name} ${lastname}`}</h1>
              </div>
              <div className="listed-party">
                <div className="listed-party__label">
                  <h5>CPF</h5>
                </div>
                <div className="listed-party__cpf">
                  {cpf}
                </div>
                <div className="listed-party__label">
                  <h5>E-mail</h5>
                </div>
                <div className="listed-party__mail">
                  {mail}
                </div>
                <div className="listed-party__label">
                  <h5>Telefone</h5>
                </div>
                <div className="listed-party__phone">
                  {phone}
                </div>
              </div>
              <h5 className="primary-text">Contratos associados</h5>
              <div style={{margin: "0"}} className="list-contracts__associated">
              {
                typeof contracts === 'object' &&
                contracts.map((contract)=>{
                  const fileName = contract.pdf_file;
                  const extension = fileName.split('.')[1]
                  return(
                    <Fragment>
                      <div className="">
                        <p className="listener-modal-contract" data-toggle="modal" data-target={`#contractModal${contract.id}`}>
                          <IconView color="#000"/>&nbsp;&nbsp;{contract.title}
                        </p>
                      </div>
                      <Modal id={contract.id} documentTitle={contract.title}>
                        {
                          extension == "pdf" && 
                          <PDFObject height="700px" 
                                     url={`http://127.0.0.1:8000/storage/${contract.pdf_file}`} />
                        }
                        {
                          extension == "docx" && 
                          <FileViewer fileType={extension}
                                      filePath={`http://127.0.0.1:8000/storage/${contract.pdf_file}`}/>
                        }
                      </Modal>
                    </Fragment>
                  )  
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListParty;
