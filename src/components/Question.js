import React, { Component } from 'react'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions () {
    return (
      this.props.question.options.map((option, index) => (
        <li key={index}>
          {
            this.props.checked === option.value
            ? <button onClick={() => this.props.onCheckOption(+option.value)} className="active"  value={option.value} >{option.name}.{option.value}</button>
            : <button onClick={() => this.props.onCheckOption(+option.value)}  value={option.value}>{option.name}.{option.value}</button>
          }
        </li>
      ))
    )
  }

  render () {
    return (
      <div>
        <p>{this.props.question.question}</p>
        <ul>
          {this.renderOptions()}
        </ul>
        <div>
          <button onClick={this.props.prevPage}>Prev</button>
          <button onClick={this.props.nextPage}>Next</button>
        </div>
      </div>
    )
  }
}