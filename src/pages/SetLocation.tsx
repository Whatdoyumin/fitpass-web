import { useState } from "react";
import { SetLocationOption } from "../components/setLocation/SetLocationOption";

function SetLocation() {
  const [mode, setMode] = useState<"default" | "my-location" | "search">("default");

  return <div>{mode === "default" && <SetLocationOption setMode={setMode} />}</div>;
}

export default SetLocation;
