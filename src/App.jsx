import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom"; // <-- use Outlet
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* <-- renders the child routes defined in main.jsx */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
