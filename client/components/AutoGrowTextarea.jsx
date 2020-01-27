// https://codepen.io/liborgabrhel
import React from 'react';

export default class ResizableTextarea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      rows: 1,
      minRows: 1,
      maxRows: 10
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  }

  render() {
    return (
      <textarea
        rows={this.state.rows}
        value={this.state.value}
        placeholder={'Enter your text here...'}
        className={'message-textarea col-10 mr-4 pt-1'}
        onChange={this.handleChange}
      >
      </textarea>
    );
  }
}
