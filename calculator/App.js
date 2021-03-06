const endsWithOperator = /[/*\-+]$/; //escape minus character
const beginsWithOperator = /^[*+/]/;

function handleOp(op){ 
  switch(op){
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '*';
    case 'divide':
      return '/';
  }
}
/*Have trouble keeping precision
function fixNum(str){
  let num = parseFloat(str);
  num = num.toFixed(9);
  return num.toString();
}
*/
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: 0,
      first: true, //if input is the first number entered
      expression: '',
      isDecimal: false,
      justSolved: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    const id = e.target.id;
    if(this.state.justSolved){
      this.setState({
        expression: ''
      })
    }
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
        const val = e.target.textContent
        if(this.state.first){
          if(id!='zero'){
            this.setState({
              first: false,
              input: val
            })
          }
        }else{
          this.setState({
            input: this.state.input + val   
          })
        }
        
        this.setState(state => ({
          expression: state.expression + val 
        }))
        
        break;
      case 'clear':
        this.setState({
          input: 0,
          first: true,
          expression: '',
          isDecimal: false,
          justSolved: false
        })
        break;
      case 'add':
      case 'subtract':
      case 'divide':
      case 'multiply':
        this.setState(state => ({
          first: true,
          isDecimal: false
        }), () => { //callback because setState is async
          if(!this.state.justSolved){
            if(endsWithOperator.test(this.state.expression)){
              if(id=='subtract' &&  !/[-]$/.test(this.state.expression)){
                this.setState(state => ({
                  expression: state.expression + handleOp(id)
                }))
              }else if(id!='subtract' && /[/*\-+][/*\-+]$/.test(this.state.expression)){
                 this.setState(state => ({
                   expression: state.expression.replace(/[/*\-+][/*\-+]$/,handleOp(id))
                 }))      
              }else{
                this.setState(state => ({
                  expression: state.expression.replace(endsWithOperator,handleOp(id))
                }))
              }      

            }else{
              this.setState(state => ({
                expression: state.expression + handleOp(id)
              }))
            }
          }else{
            this.setState(state => ({
              justSolved: false,
              expression: state.input + handleOp(id)
            }))
          }
        })
        /*Logic for operators:
        •If last char is an operator:
            o	If current char is a minus sign and last char is not minus:
              	Add operator to expression
            o	Else If current char is not minus and last two char are operators:
              	Replace last two operators
            o	Else: replace last operator
         •Else: add operator to expression
        */
        break;
      
      case 'equals':
        if(!beginsWithOperator.test(this.state.expression) && !endsWithOperator.test(this.state.expression)){
          this.setState(state => ({
            first: true,
            isDecimal: false,
            input: eval(state.expression),
            justSolved: true
          }), () => {
            this.setState(state => ({
              expression: state.expression + ' = ' + state.input
            }))
          })
        }
        
        break;
      
      case 'decimal':
        
        if(!this.state.isDecimal){
          if(endsWithOperator.test(this.state.expression)){
            this.setState(state => ({
              expression: state.expression + '0.',
              input: '0.',
              first: false
            }))
          }else{
            this.setState(state => ({
              expression: state.expression + '.',
              input: state.input + '.'
            }))
          }
          this.setState({
            isDecimal: true
          })
        }
        
        break;
      default:
        console.log('Error in handle click case statement.');
    }
  }
  render(){
    return(
      <div className="grid-container">
        <div id="all">
          <p id='expr'>{this.state.expression}</p>
          <span id="display">{this.state.input}</span>
        </div>
        
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
            <div id="decimal" className="btn mainPad" onClick={this.handleClick}>.</div>
            <div id="equals" className="btn" onClick={this.handleClick}>=</div>
        </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('calc'))