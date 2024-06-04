import { Provider } from "react-redux";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
import MainContainer from './components/MainContainer'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchPage from "./components/WatchPage";
import ResultPage from "./components/ResultPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "results",
        element: <ResultPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
  <div>
    <Head/>
    <RouterProvider router={appRouter} />
  </div>
  </Provider>
  );
}

export default App;