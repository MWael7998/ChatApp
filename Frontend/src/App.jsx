import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import MainSelection from "./MainSelection";
import Room from "./Room";
import Center from "./Components/Center";
function App() {
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <Center>
        <Routes>
          <Route
            path="/"
            element={
              <MainSelection
                setCurrentRoomId={setCurrentRoomId}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/room/:roomId"
            element={<Room currentRoomId={currentRoomId} user={user} />}
          />
        </Routes>
      </Center>
    </BrowserRouter>
  );
}

export default App;
