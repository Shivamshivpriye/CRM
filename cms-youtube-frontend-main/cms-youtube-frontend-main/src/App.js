import { Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";
import EditProcess2 from "./pages/EditProcess2";
import EditProcess3 from "./pages/EditProcess3";
import EditProcess4 from "./pages/EditProcess4";
import Process2 from "./pages/Process2";
import Process3 from "./pages/Process3";
import Process4 from "./pages/Process4";
import Bprocess2 from "./pages/Bprocess2";
import Bprocess3 from "./pages/Bprocess3";
import Bprocess4 from "./pages/Bprocess4";
import Upload from "./pages/Upload";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/mycontacts" element={<AllContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="/edit1/:id" element={<EditProcess2 />} />
            <Route path="/edit13/:id" element={<EditProcess3 />} />
            <Route path="/edit14/:id" element={<EditProcess4 />} />
            <Route path="/edit2/:id" element={<Bprocess2 />} />
            <Route path="/edit3/:id" element={<Bprocess3 />} />
            <Route path="/edit4/:id" element={<Bprocess4 />} />
            <Route path="/process2" element={<Process2/>} />
            <Route path="/process3" element={<Process3/>} />
            <Route path="/process4" element={<Process4/>} />
            <Route path="/upload" element={<Upload/>} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
