import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3005"), []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id); // Logging the socket ID upon connection
    });
    socket.on("received-message", (data) => {
      console.log(data);
    });
    socket.on("welcome", (message) => {
      console.log(message); // Logging the welcome message received from the server
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome To Socket Io !
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
