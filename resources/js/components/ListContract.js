import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PDFObject } from 'react-pdfobject';
import FileViewer from 'react-file-viewer';
import Modal from './Modal';
import IconUser from './IconUser';
import IconCalendar from './IconCalendar';



class ListContract extends Component {

    constructor(props) {
      super(props);
      this.state ={
        contractTitle: '',
        contractStart: '',
        contractEnd: '',
        pdf_file: '',
        parties: []
      }
    }
    
    /*
    =============================================================================
    */
    
    componentDidMount(){
      let id = this.props.list ? this.props.list : ''

      if(id){
        let url = `http://127.0.0.1:8000/api/contracts/${id}`
        axios.get(url)
        .then((response) => {
          this.setState({
            contractTitle: response.data.title,
            contractStart: moment(response.data.start_at).format('DD/MM/YYYY'),
            contractEnd: moment(response.data.start_end).format('DD/MM/YYYY'),
            pdf_file: response.data.pdf_file,
            parties: response.data.parties
          })
        });
      }  

    }

    /*
    =============================================================================
    */

    render() {
      const {pdf_file, contractTitle, contractStart, contractEnd, parties} = this.state
      const fileName = pdf_file;
      const extension = fileName.split('.')[1]
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero">
                <h1 className="hero__title upper">{contractTitle}</h1>
              </div>
              <h5 className="primary-text">Duração</h5>
              <div className="date-contract">
                <div className="date-contract__start">
                  <p>Início</p>
                  <IconCalendar/>&nbsp;&nbsp;{contractStart}
                </div>
                <div className="date-contract__end">
                  <p>Término</p>
                  <IconCalendar/>&nbsp;&nbsp;{contractEnd}
                </div>
              </div>
              <h5 className="primary-text">Partes associadas</h5>
              <div style={{margin: "0"}} className="list-contract__party">
                {
                  parties.map((party)=>{
                    return(
                      <div className="">
                        <IconUser/>&nbsp;&nbsp;{party.name} {party.lastname}
                      </div>
                    ) 
                  })
                }
              </div>
              <div class="col-md-12 pull-right">
                <button width="100%" type="button" class="btn btn--modal btn-info" data-toggle="modal" data-target="#contractModal">
                Visualizar contrato
                </button>
              </div>
              <Modal documentTitle={contractTitle}>
                {
                  extension == "pdf" && 
                  <PDFObject 
                            height="700px" 
                            url={`http://127.0.0.1:8000/storage/${pdf_file}`}/>
                }
                {
                  extension == "docx" && 
                  <FileViewer fileType={extension}
                              filePath={`http://127.0.0.1:8000/storage/${pdf_file}`}/>
                }
              </Modal>
            </div>
          </div>
        </div>
      );
  }
}

export default ListContract;
