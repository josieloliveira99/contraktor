import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
 
/* An example React component */
class Main extends Component {

      constructor(props) {
        super(props);
        this.state ={
          archive: ''
        }
        this.fileUploadHandler = this.fileUploadHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }
    
      
      onChangeHandler(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
        console.log("files",files)
        this.setState({
          archive: files[0]
        })
      }
      
      fileUploadHandler(e){
        e.preventDefault() 
        this.fileUpload(this.state.file);
      }  

    fileUpload(file){
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
    .then(function(response){
      console.log(response)
    }); 
  }
      
    render() {
      return (
        <div className="container">
      <div className="row">
        <div className="col-md-6">
            <form method="post">
                  <div className="form-group files">
                    <label>Upload Your File </label>
                    <input type="file" name="file" className="form-control" onChange={this.onChangeHandler}/>
                  </div>
                  <div className="col-md-6 pull-right">
                  <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                  </div>
              </form>
        </div>
      </div>
    </div>
      );
    }
}
 
export default Main;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}