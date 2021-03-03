import "./styles.scss";
import 'react-toastify/dist/ReactToastify.css';

import Toolbar from "./components/Toolbar";
import HomePage from "./pages/home";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <HomePage />
    </div>
  );
}

export default App;
