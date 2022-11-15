import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/appRouter";
import {ToastProvider} from "react-toast-notifications";


function App() {
    const routes = AppRouter();
  return (
      <ToastProvider>
      <BrowserRouter>
          {routes}
      </BrowserRouter>
      </ToastProvider>

  );
}

export default App;
