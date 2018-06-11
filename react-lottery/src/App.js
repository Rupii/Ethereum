import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.players().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: 'waiting for trasaction success'
    });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({
      message: 'successfully enterd the lottery'
    });
  };
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: 'Waiting on trasaction'
    });
    await lottery.methods.picWinner().send({
      from: accounts[0]
    });
    this.setState({
      message: 'Winner has been picked'
    });
  };
  render() {
    return (
      <div className="App">
        <h2>Lottery contract</h2>
        <p>mangaed by {this.state.manager}</p>
        <p>
          There are {this.state.players.length} players competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Try Your luck</h4>
          <label>Amount of ether to enter</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <br />
          <button>Enter</button>
        </form>
        <hr />
        <h4>Read to pick a Winner</h4>
        <button onClick={this.onClick}>pick a winner</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
