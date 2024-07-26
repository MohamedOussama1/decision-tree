import {useState} from "react";
import {authenticateUser, createUser} from "./auth.tsx";


export default function LoginComponent() {
    const [authMode, setAuthMode] = useState("signin")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    function handleUpSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        createUser(username, email, password).then(value => {
            console.log(value);
            setUsername("");
            setPassword("");
            setEmail("");
            // window.location.href = "/patients";
        }).catch((error) => console.log(error));
    }
    function handleInSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        authenticateUser(email, password).then(value => {
            localStorage.setItem("token", value.token)
            setUsername("");
            setPassword("");
            setEmail("");
            window.location.href = "/patients";
        });
    }
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
    <div className="login-body">
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleInSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                className="form-control mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                Submit
              </button>
              </div>
            </div>
          </form>
        </div>
        </div>
        )
    }

    return (
    <div className="login-body">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleUpSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
            Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
              type="text"
              className="form-control mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
              type="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              type="password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    )
}
