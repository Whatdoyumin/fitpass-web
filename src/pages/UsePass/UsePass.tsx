import AvailableList from "./AvailableList";
import CompletedList from "./CompletedList";

function UsePass() {

  return (
    <div className="bg-gray-300 h-min-screen">
      <AvailableList />
      <CompletedList />
    </div>
  );
}

export default UsePass;
