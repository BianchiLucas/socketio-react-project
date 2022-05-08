import './App.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import Container from '@mui/material/Container'
import { IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SendIcon from '@mui/icons-material/Send'



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
  
        <Container fixed >
          <Paper elevation={5} sx={{ width: "420px", height: "800px", margin: 'auto', marginY: '30px', borderRadius: '30px', backgroundColor: '#1C2E46' }}>

            <Box sx={{ padding: '10px' }} >
              <h2 >Messages</h2>
              <input type="text" placeholder='Room' onChange={(event) => { setRoom(event.target.value) }} />
              <IconButton onClick={joinRoom}>
                <AddCircleIcon fontSize="large" sx={{ color: "#fff" }} />
              </IconButton>
            </Box>

            <Box  sx={{ width: '100%', height: '70%', borderRadius: '30px', backgroundColor: '#fff' }}>

              <Typography variant="h5" >
                {messageSended}
              </Typography>


            </Box>

            <Box sx={{ padding: '24px' }}>
              <Box sx={{ borderRadius: '20px', backgroundColor: '#0b1e2b'}}>
                <input type="text-chat" placeholder='Text here!' onChange={(event) => { setMessages(event.target.value) }} />
                <IconButton onClick={sendMessage}>
                  <SendIcon fontSize="medium" sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>

          </Paper>
        </Container>

    </div>
  );
}

export default App;
