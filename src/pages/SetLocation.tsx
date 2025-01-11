import { useState } from "react";
import { SetLocationOption } from "../components/setLocation/SetLocationOption";
import { SearchLocation } from "../components/setLocation/SearchLocation";
import GetCurrentLocation from "../components/setLocation/GetCurrentLocation";

function SetLocation() {
  const [mode, setMode] = useState<"default" | "my-location" | "search">("default");

  return (
    <div>
      {mode === "default" && <SetLocationOption setMode={setMode} />}
      {mode === "search" && <SearchLocation />}
      {mode == "my-location" && <GetCurrentLocation />}
    </div>
  );
}

export default SetLocation;
