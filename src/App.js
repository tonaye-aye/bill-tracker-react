import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// sass
import "./scss/style.scss";

// layouts
import Layout from "./layout/default";

// components
import Nav from "./components/core/nav";
import Bills from "./components/bills";
import Contact from "./components/contact";
import Login from "./components/auth/login";
import Join from "./components/auth/join";

// pages
import Account from "./components/account";
import Landing from "./components/landing";

// grommet
import { Grommet, Main } from "grommet";
import { grommet } from "grommet/themes";

// init userbase
import userbase from "userbase-js";

function App() {
  // state stuff - auth and user data
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState("");

  // userbase init
  userbase.init({ appId: "b7b4cca8-9aec-4832-a035-3a671b0c82ac" });

  return (
    <Grommet theme={grommet} margin={0} full={true} background="whitesmoke">
      <Router>
        <Nav userData={userData} auth={auth} setAuth={setAuth} />
        <Main align="center" justify="center" pad="medium">
          <Switch>
            <Route path="/join">
              {!auth ? (
                <Layout>
                  <Join setAuth={setAuth} setUserData={setUserData} />
                </Layout>
              ) : (
                <Redirect to="/account" />
              )}
            </Route>
            <Route path="/login">
              {!auth ? (
                <Layout>
                  <Login setAuth={setAuth} setUserData={setUserData} />
                </Layout>
              ) : (
                <Redirect to="/account" />
              )}
            </Route>
            <Route path="/account">
              {auth ? (
                <Layout>
                  <Account
                    userData={userData}
                    setAuth={setAuth}
                    setUserData={setUserData}
                  />
                </Layout>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/contact">
              <Layout>
                <Contact />
              </Layout>
            </Route>
            <Route path="/bills">
              {auth ? <Bills userData={userData} /> : <Redirect to="/login" />}
            </Route>
            <Route path="/">
              <Layout>
                <Landing auth={auth} />
              </Layout>
            </Route>
          </Switch>
        </Main>
      </Router>
    </Grommet>
  );
}

export default App;
