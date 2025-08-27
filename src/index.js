import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DataProvider>
);
