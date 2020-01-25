function handleOp(a, b, op){
  a = Number(a);
  b = Number(b);
  
  switch(op){
    case 'add':
      return a+b;
    case 'subtract':
      return a-b;
    case 'multiply':
      return a*b;
    case 'divide':
      return a/b;
  }
}
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: 0,
      first: true, //if input is the first number entered
      answer: 0,
      operation: null //+,-,/,*
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    const id = e.target.id;
    switch(id){
      case 'one':
      case 'two':
      case 'three':
      case 'four':
      case 'five':
      case 'six':
      case 'seven':
      case 'eight':
      case 'nine':
      case 'zero':
        if(this.state.first){
          this.setState({
            first: false,
            input: e.target.textContent
          })
        }else{
          this.setState({
            input: this.state.input + e.target.textContent   
          })
        }
        break;
      case 'clear':
        this.setState({
          input: 0,
          first: true,
          answer: 0
        })
        break;
      case 'add':
      case 'subtract':
      case 'divide':
      case 'multiply':
        this.setState({
          operation: id,
          first: true,
          answer: this.state.input
        })
        break;
      case 'equals':
        this.setState({
          first: true,
          input: handleOp(this.state.answer,this.state.input,this.state.operation)
        })
        break;
    }
  }
  render(){
    return(
      <div className="grid-container">
          <div id="display">{this.state.input}</div>
        
          <div id="clear" className="btn" onClick={this.handleClick}>AC</div>
          <div id="divide" className="btn operations" onClick={this.handleClick}>/</div>
          <div id="multiply" className="btn operations" onClick={this.handleClick}>x</div>
       
          <div id="seven" className="btn mainPad" onClick={this.handleClick}>7</div>
          <div id="eight" className="btn mainPad" onClick={this.handleClick}>8</div>
          <div id="nine" className="btn mainPad" onClick={this.handleClick}>9</div>
          <div id="subtract" className="btn operations" onClick={this.handleClick}>-</div>
       
          <div id="four" className="btn mainPad" onClick={this.handleClick}>4</div>
          <div id="five" className="btn mainPad" onClick={this.handleClick}>5</div>
          <div id="six" className="btn mainPad" onClick={this.handleClick}>6</div>
          <div id="add" className="btn operations" onClick={this.handleClick}>+</div>    
        
            <div id="one" className="btn mainPad" onClick={this.handleClick}>1</div>
            <div id="two" className="btn mainPad" onClick={this.handleClick}>2</div>
            <div id="three" className="btn mainPad" onClick={this.handleClick}>3</div>
            <div id="zero" className="btn mainPad" onClick={this.handleClick}>0</div>
            <div id="decimal" className="btn mainPad">.</div>
            <div id="equals" className="btn" onClick={this.handleClick}>=</div>
        </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('calc'))