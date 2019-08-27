import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Contract from './Contract';
import Party from './Party';
import Home from './Home';

/* An example React component */
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            archive: '',
            contractTitle: '',
            contractStart: '',
            contractEnd: '',
        }
        this.fileUploadHandler = this.fileUploadHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
                [name]: value
            }, () => console.log(this.state)

        );

    }


    onChangeHandler(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        console.log("files", files)
        this.setState({
            archive: files[0]
        })
    }

    fileUploadHandler(e) {
        e.preventDefault()
        this.fileUpload(this.state.file);
    }

    fileUpload(file) {
        //const url = 'http://localhost:8000/api/fileupload';
        // const data = new FormData()
        // data.append('file', this.state.image)
        // // console.log(formData)
        // const url = "http://localhost:8000/api/contracts"    
        // // return post(url, data).then(response => console.log(response))
        // fetch(url, {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     body: data
        // }).then(function(res){
        //     console.log("1",res)
        // }).catch(function(res){
        //     console.log("0",res)
        // })

        const data = new FormData()
        data.append('file', this.state.archive)
        data.append('title', this.state.contractTitle)
        data.append('start_at', this.state.contractStart)
        data.append('end_at', this.state.contractEnd)
        const url = "http://localhost:8000/api/contracts"

        // fetch("http://localhost:8000/api/contracts", {method: 'POST', mode: 'no-cors', body: data})
        // .then(res => res.json())

        //   fetch(url, {
        //     method: 'post',
        //     // mode: 'no-cors',
        //     body: data
        //   })
        //   .then(function(valor) {
        //     alert("cadastrado com sucesso")
        //     console.log(valor)
        //    }, function(motivo) {
        //     console.log(motivo)
        //  });

        axios.post(url, data)
            .then(function (response) {
                console.log(response)
            });
    }

    render() {
      return ( 
        <BrowserRouter>
          <div className = "container">
            <div className = "row">
              <div className = "col-md-12">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/contratos">Contratos</Link></li>
                  <li><Link to="/partes">Partes</Link></li>
                </ul>
                <Route exact path="/" component={Home}/>
                <Route path="/contratos" component={Contract}/>
                <Route path="/partes" component={Party}/>
              </div> 
            </div> 
          </div> 
        </BrowserRouter>
      );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
 */

if (document.getElementById('root')) {
    ReactDOM.render( < Main / > , document.getElementById('root'));
}
