import React, {Component} from 'react';
import { data } from '../data';
import Input from '../component/input/input'
import Select from 'react-select';
import Loader from '../component/loader/loader';
import moment from 'moment';
import './converter.scss';

class Converter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: {},
        amount: '',
        result: '',
        date: ''
      };
    }

    async componentDidMount  () {
      
      // time
      const response = await fetch('http://worldclockapi.com/api/json/utc/now');
      let date = await response.json()
      
      date = moment(date.currentDateTime).format('DD MMM YYYY')
      this.setState({ date })

      // currency
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data);
        }, 150);

        setTimeout(() => {
          reject(new Error("Error"));
        }, 1000);
      });
      await promise
        .then(
          result => {
            result.rates = Object.entries(result.rates)
            this.setState ({ data: result })
            this.setState ({isLoading: false})
        },
          error => { alert(error); }
        );
    }

    onChangeAmount = event => {
      this.setState({ amount: event.target.value })
    }

    onChangeCurrency = selectedOption => {
      this.setState({ result: selectedOption })
    }

    renderContent = () => {
      const {data, amount, result} = this.state;
      let options = data.rates.map((el) => {
          return { label: el[0], value: el[1] } 
        })

      return (
        <>
          <div className="currency">
                <div className="currencyFrom">
                  <Input
                    type="text"
                    pattern={"[0-9]"}
                    parameter={"Amount from USD"}
                    placeholder={"type value"}
                    onChange={this.onChangeAmount}
                  >
                  </Input>
                </div>

                <div className="currencyTo">
                  <span>To</span>
                  <Select
                      onChange={this.onChangeCurrency}
                      options={options}
                  />
            </div>
          </div>
          <div className="result">
            <span>result:</span>
            <br />
            <span>
              { (this.state.result.value) ? (`${(amount * (result.value)).toFixed(3)} USD`) : ""}
            </span>
          </div>
        </>
      )
    }
  
    render() {
      return (
        <div className="converter">
          <div className="head">
            <h1>Currency rate today</h1>
            <h2>{this.state.date}</h2>
          </div>
          <div className="content">
            {this.state.isLoading ? <Loader /> : this.renderContent()}
          </div>
        </div>
      );
    }
  }
  
export default Converter;