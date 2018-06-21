import React, { Component } from 'react'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
    this.onClickNextButton = this.onClickNextButton.bind(this)
    this.onClickPrevButton = this.onClickPrevButton.bind(this)
  }

  renderOptions () {
    return (
      this.props.question.options.map((option, index) => (
        <li key={index}>
          {
            this.props.checked === option.value
            ? <button onClick={() => this.props.onCheckOption(+option.value)} className="active" type="input" key={index} type="radio" value={option.value} >{option.name}.{option.value}</button>
            : <button onClick={() => this.props.onCheckOption(+option.value)} type="input" key={index} type="radio" value={option.value}>{option.name}.{option.value}</button>
          }
        </li>
      ))
    )
  }

  onClickPrevButton () {
    this.props.prevPage(this.props.checked)
  }

  onClickNextButton () {
    this.props.nextPage(this.props.checked)
    this.setState({
      checked: null
    })
  }

  render () {
    return (
      <div>
        <p>{this.props.question.question}</p>
        <ul>
          {this.renderOptions()}
        </ul>
        <div>
          <button onClick={this.onClickPrevButton}>Prev</button>
          <button onClick={this.onClickNextButton}>Next</button>
        </div>
      </div>
    )
  }
}