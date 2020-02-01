let countdown;

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  return display;
}
function convertNum(num){
  const prefix = num < 10 ? '0' : '';
  return prefix + num + ':00';
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      break: 5,
      session: 25,
      timeLeft: '25:00',
      isPaused: true,
      type: 'Session'
    }
    this.reset = this.reset.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  reset(){
    clearInterval(countdown);
    this.setState({
      break: 5,
      session: 25,
      timeLeft: '25:00',
      isPaused: true,
      type: 'Session'
    })
  }
  breakDec(){
    if(this.state.break>1){
      this.setState(state => ({
        break: state.break-1
      }))
    }
  }
  breakInc(){
    if(this.state.break<60){
      this.setState(state => ({
        break: state.break+1
      }))
    }
  }
  sessionDec(){
    if(this.state.session>1 && this.state.isPaused){
      this.setState(state => ({
        session: state.session-1
      }), () => {
        this.setState(state => ({
          timeLeft: displayTimeLeft(state.session*60)
        }))
      })
    }
  }
  sessionInc(){
    if(this.state.session<60 && this.state.isPaused){
      this.setState(state => ({
        session: state.session+1
      }), () => {
        this.setState(state => ({
          timeLeft: displayTimeLeft(state.session*60)
        }))
      })
    }
  }
  controlTimer(){
    this.setState(state => ({
     isPaused: !state.isPaused
    }), () => {
      if(!this.state.isPaused){
        this.runTimer();
      }else{
        clearInterval(countdown);
      }
    })
  }
  runTimer(){
    // clear any existing timers
    clearInterval(countdown);

    let secondsLeft = parseInt(this.state.timeLeft.split(":")[0])*60+parseInt(this.state.timeLeft.split(":")[1]);
    
    countdown = setInterval(() => {
      secondsLeft = secondsLeft - 1;
      // check if we should stop it!
      if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
      // display it
      this.setState({
        timeLeft: displayTimeLeft(secondsLeft)
      })
    }, 1000);
    
  }
  handleChange(){
    if(this.state.timeLeft==='00:00'){
      setTimeout(()=>{ //need to delay 1 second to pass test
        if(this.state.type==='Session'){ 
              this.setState(state => ({
                type: 'Break',
                timeLeft: convertNum(state.break)
              }), ()=>{
                this.runTimer();
              })
            }else{
              this.setState(state => ({
                type: 'Session',
                timeLeft: convertNum(state.session)
              }), ()=>{
                this.runTimer();
              })
            }
      }, 1000)
    }
  }
  componentDidUpdate() {
    this.handleChange();
  }
  render(){
    return(
      <div className="container-fluid">
        <h1>Pomodoro Clock</h1>
        <div className="row">
          <h2 id='break-label' className="col">Break Length</h2>
          <h2 id='session-label' className="col">Session Length</h2>
        </div>
        <div className="row">
          <div className="col">
          <div><button id="break-decrement" onClick={this.breakDec}>-</button>
            <div id="break-length">{this.state.break}</div>
          <button id="break-increment" onClick={this.breakInc}>+</button></div>           
          </div>
          <div className="col">
          <div><button id="session-decrement" onClick={this.sessionDec}>-</button>
            <div id="session-length">{this.state.session}</div>
          <button id="session-increment" onClick={this.sessionInc}>+</button></div>           
          </div>
        </div>
        <h2 id="timer-label">{this.state.type}</h2>
        <div id="time-left">{this.state.timeLeft}</div>
        <button id="start_stop" onClick={this.controlTimer}><i className="fa fa-play fa-2x"/>
            <i className="fa fa-pause fa-2x"/></button>
        <button id="reset" onClick={this.reset}><i className="fa fa-refresh fa-2x"/></button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))