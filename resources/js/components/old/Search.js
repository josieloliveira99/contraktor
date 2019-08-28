import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Search extends Component {

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <form className="form-inline">
            <div className="form-group files col-md-12">
              <input type="text" placeholder="Digite sua busca ..." name="search" className="form-control col-md-10" onChange = {this.handleInputChange} />
              <button type="submit" className="btn btn-primary my-1 col-md-2" onClick={this.handleSubmit}>Pesquisar</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
