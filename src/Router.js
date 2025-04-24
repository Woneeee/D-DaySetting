import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "./routes";
import { Home } from "./page/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
