import React, { useEffect, useState } from 'react'

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [changePosition, setChangePosition] = useState(4)
  const [xPos, setXPos] = useState(2)
  const [yPos, setYpos] = useState(2)
  const [message, setMessage] = useState('')
  const [steps, setSteps] = useState(0)
  const [inputEmail, setInputEmail] = useState({
    email: ''
  })
  const [time, setTime] = useState('times')


  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();

    if(evt.target.id === 'left' && changePosition != 0 && changePosition!= 3 && changePosition != 6){
      setChangePosition(changePosition - 1)
      setMessage("")
    }else if(evt.target.id === 'left' && (changePosition == 0 || changePosition == 3 || changePosition == 6)){
      //Message for user left error
      setMessage("You can't go left")
      return
    }else if(evt.target.id === 'right' && changePosition != 2 && changePosition!= 5 && changePosition != 8){
      setChangePosition(changePosition + 1)
      setMessage("")
    }else if(evt.target.id === 'right' && (changePosition == 2 || changePosition == 5 || changePosition == 8)){
      //Message for user rigth error
      setMessage("You can't go right")
      return
    }else if(evt.target.id === 'up' && changePosition != 0 && changePosition != 1 && changePosition != 2){
      setChangePosition(changePosition - 3)
      setMessage("")
    }else if(evt.target.id === 'up' && (changePosition == 0 || changePosition == 1 || changePosition == 2)){
      // Message for up error
      setMessage("You can't go up")
      return
    }else if(evt.target.id === 'down' && changePosition != 6 && changePosition != 7 && changePosition != 8){
      setChangePosition(changePosition + 3)
      setMessage("")
    }else if(evt.target.id === 'down' && (changePosition == 6 || changePosition == 7 || changePosition == 8)){
      //message for down error
      setMessage("You can't go down")
      return
    }
    setSteps(steps + 1)

    if(steps == 0){
      setTime('time');
    }else{
      setTime('times')
    }
    
    if(evt.target.id === 'reset'){
      setChangePosition(4)
      setMessage("")
      setSteps(0)
      setInputEmail({
        email: ''
      })
    }
  }

  useEffect(() => {
    if(changePosition >= 0 && changePosition <= 2){
      setXPos(1)
    }else if(changePosition >= 3 && changePosition <= 5){
      setXPos(2)
    }else if(changePosition >= 6 && changePosition <= 8){
      setXPos(3)
    }
  
    if (changePosition == 0 || changePosition == 3 || changePosition == 6){
      setYpos(1)
    }else if(changePosition == 1 || changePosition == 4 || changePosition == 7){
      setYpos(2)
    }else if(changePosition == 2 || changePosition == 5 || changePosition == 8){
      setYpos(3)
    }

  }, [changePosition])


  function onChange(evt) {
    setInputEmail({email: evt.target.value})
    
  }


  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const payload = {
      x: yPos,
      y: xPos,
      steps: steps,
      email: inputEmail.email
    };
    
    // Send a POST request to the endpoint
    fetch(' https://advanced-react-grid.herokuapp.com/api/result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setMessage(data.message)
    })
    evt.target[0].value = ''
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${yPos}, ${xPos})`}</h3>
        <h3 id="steps">{`You moved ${steps} ${time}`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === changePosition ? ' active' : ''}`}>
              {idx === changePosition ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad" onClick={move}>
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
