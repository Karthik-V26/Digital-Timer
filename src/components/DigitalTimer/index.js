import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    started: false,
    currentTime: '25:00',
    choosedTime: 25,
    clearId: '',
  }
  
  componentWillUnmount() {
    const {clearId} = this.state
    clearInterval(clearId)
  }
  
  starting = splitedTime => {
    let ti = parseInt(splitedTime[0], 10) * 60 + parseInt(splitedTime[1], 10)
    const id = setInterval(() => {
      ti -= 1
      let minu =
        Math.floor(ti / 60) > 9
          ? Math.floor(ti / 60)
          : `0${Math.floor(ti / 60)}`
      let seco = ti % 60 > 9 ? ti % 60 : `0${ti % 60}`
      minu = minu > 0 ? minu : '00'
      seco = seco > 0 ? seco : '00'
      this.setState({
        currentTime: `${minu}:${seco}`,
        started: true,
        clearId: id,
      })
    }, 1000)
  }

  running = splitedTime => {
    const {started, clearId} = this.state
    return started
      ? (clearInterval(clearId), this.setState({started: !started}))
      : this.starting(splitedTime)
  }

  changeStarted = () => {
    const {currentTime} = this.state
    const splitedTime = currentTime.split(':')
    return splitedTime[0] === '00' && splitedTime[1] === '00'
      ? this.setState({currentTime: '00:00', started: false})
      : this.running(splitedTime)
  }

  reset = () => {
    const {clearId} = this.state
    clearInterval(clearId)
    this.setState({currentTime: '25:00', choosedTime: 25, started: false})
  }

  decrease = () => {
    const {choosedTime} = this.state
    const currentChoosed = choosedTime > 0 ? choosedTime - 1 : '00'
    this.setState({
      currentTime: `${currentChoosed}:00`,
      choosedTime: currentChoosed,
    })
  }

  increase = () => {
    const {choosedTime} = this.state
    const currentChoosed = choosedTime > 0 ? choosedTime + 1 : '00'
    this.setState({
      currentTime: `${currentChoosed}:00`,
      choosedTime: currentChoosed,
    })
  }

  render() {
    const {started, currentTime, choosedTime} = this.state
    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="display-container">
          <div className="background-display">
            <div className="display-time">
              <h1 className="time" testid="timer">
                {currentTime}
              </h1>
              {started ? (
                <p className="status-text">Running</p>
              ) : (
                <p className="status-text">Paused</p>
              )}
            </div>
          </div>
          <div className="operations-container">
            <div>
              <div className="operation">
                {started ? (
                  <button className="operation-text" type="button">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                      onClick={this.changeStarted}
                    />
                    Pause
                  </button>
                ) : (
                  <button className="operation-text" type="button">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                      onClick={this.changeStarted}
                    />
                    Start
                  </button>
                )}
              </div>
              <div className="operation">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icon"
                  alt="reset icon"
                  onClick={this.reset}
                />
                <button className="operation-text" type="button">
                  Reset
                </button>
              </div>
            </div>
            <div>
              <p className="limit-text">Set Timer limit</p>
              <div className="plus-minus-container">
                {started ? (
                  <button className="plus-minus-icon" type="button">
                    -
                  </button>
                ) : (
                  <button
                    className="plus-minus-icon"
                    onClick={this.decrease}
                    type="button"
                  >
                    -
                  </button>
                )}

                <p className="plus-minus-display-text">{choosedTime}</p>
                {started ? (
                  <button className="plus-minus-icon" type="button">
                    +
                  </button>
                ) : (
                  <button
                    className="plus-minus-icon"
                    onClick={this.increase}
                    type="button"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
