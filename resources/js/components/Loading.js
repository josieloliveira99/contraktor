import React from 'react';
import ReactLoading from 'react-loading';

const Loading = (props)=>{
  return(
    <div className="loading">
      <ReactLoading type="spokes" height={'5%'} width={'5%'} />
    </div>
  )
}

export default Loading