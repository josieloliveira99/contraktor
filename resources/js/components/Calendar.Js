import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('pt', pt)
 
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(date){
    this.setState({
      startDate: date
    });
    this.props.getDate(date)
  };
 
  render() {
    return (
      <DatePicker
        className="form-control"
        selected={this.state.startDate}
        onChange={this.handleChange}
        locale="pt"
        dateFormat="dd/MM/yyyy"
      />
    );
  }
}

export default Calendar