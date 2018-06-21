import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: null,
      current: null,
      records: {}
    }
    this.nextPage = this.nextPage.bind(this)
    this.getScore = this.getScore.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.onCheckOption = this.onCheckOption.bind(this)
    this.reset = this.reset.bind(this)
  }

  fetchQuestions () {
    return fetch('questions.json').then((res) => res.json(res)).then(res => {
      this.setState({
        ...this.state,
        questions: res.questions,
        current: 0
      })
    })
  }

  componentDidMount () {
    this.fetchQuestions()
  }

  onCheckOption (value) {
    this.setState((prevState) => ({
      ...prevState,
      records: {
        ...prevState.records,
        [prevState.current]: value
      }
    }))
  }

  prevPage () {
    if (this.state.current === 0) return
    this.setState((prevState) => ({
      ...prevState,
      current: prevState.current - 1
    }))
  }

  nextPage () {
    this.setState((prevState) => ({
      ...prevState,
      current: prevState.current + 1
    }))
  }

  getScore () {
    let res = 0
    for(var index in this.state.records) {
      if (this.state.records[index] === this.state.questions[index].answer) {
        res += this.state.questions[index].score
      }
    }
    return res
  }

  reset () {
    this.setState({
      ...this.state,
      current: 0,
      records: {}
    })
  }

  render() {
    const current = this.state.current
    const questions = this.state.questions
    if (questions && current === questions.length) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div>
            You Score is: {this.getScore()}
            <button onClick={this.reset}>Reset</button>
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          questions && questions.length > 1
          ? <Question question={questions[current]} nextPage={this.nextPage} prevPage={this.prevPage} checked={this.state.records[current] || null} onCheckOption={this.onCheckOption}/>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
