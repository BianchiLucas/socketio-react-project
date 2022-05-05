import './App.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {

  const [messages, setMessages] = useState("")
  const [messageSended, setMessageSended] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    socket.emit("join_room", room)
  }

  const sendMessage = () => {
    socket.emit("send_message", { messages, room })
  }

  useEffect(() => {
      socket.on("receive_message", (data => {
          setMessageSended(data.messages)
      }))
  }, [])

  return (
    <div className="App">
      <input placeholder='Room' onChange={(event) => {setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join Room</button>
      <input placeholder="Message..." onChange={(event) => {setMessages(event.target.value)}} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageSended}
    </div>
  );
}

export default App;
