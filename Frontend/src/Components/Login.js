import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingButton from "@material-ui/lab/LoadingButton";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false); // Used to toggle open and close dialog box
  const [pending, setPending] = React.useState(false); // Controls progress icon when data is being submitted
  const [login, setLogin] = React.useState(true); // Used totoggle between Login and registration forms
  // error1,error2,error3, text1, text2, text3 are used to perforn field validation
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [error3, setError3] = React.useState(false);
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [text3, setText3] = React.useState("");

  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  }); // state variable to hold user data (username, password, email)
  const handleClickOpen = () => {
    setLogin(true);
    setOpen(true);
  }; // Opens Modal with Login form

  const handleClose = () => {
    setOpen(false);
  }; // handles the close button

  // authenticates user or Registers a new user
  const handleSubmit = async () => {
    setPending(true);
    if (login) {
      // user login
      const { username, password } = user;
      if (username && password) {
        setError1(false);
        setError2(false);
        setError3(false);
        setText1("");
        setText2("");
        setText3("");
        try {
          // Succesful Login
          await axios.post("/v1/login/", { user });
          window.location.href = "/";
          setOpen(false);
        } catch (err) {
          // Wrong UserName/Password
          alert("Incorrect Credentials");
        }
      } else {
        //user registration
        if (!username) {
          setError2(true);
          setText2("username field is empty");
        } else {
          setError2(false);
          setText2("");
        }
        if (!password) {
          setError3(true);
          setText3("password field is empty");
        } else {
          setError3(false);
          setText3("");
        }
      }
    } else {
      const { username, password, email } = user;
      if (username && password && email) {
        setError1(false);
        setError2(false);
        setError3(false);
        setText1("");
        setText2("");
        setText3("");
        try {
          // successful signup
          const res = await axios.post("/v1/signup/", { user });
          setOpen(false);
          console.log(res.status);
        } catch (err) {
          // Duplicate user details
          alert("Email/Username already exists");
        }
      }
      if (!username) {
        setError2(true);
        setText2("username field is empty");
      } else {
        setError2(false);
        setText2("");
      }
      if (!password) {
        setError3(true);
        setText3("password field is empty");
      } else {
        setError3(false);
        setText3("");
      }
      if (!email) {
        setError1(true);
        setText1("email field is empty");
      } else {
        setError1(false);
        setText1("");
      }
    }
    setPending(false);
  };
  // toggles between login/registration form
  const handleRegister = () => {
    setLogin(!login);
  };

  return (
    <>
      <li className="nav__item" onClick={handleClickOpen}>
        <a href="#" className="nav__link">
          Login/Register
        </a>
      </li>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {login ? "Login" : "Register"}
        </DialogTitle>
        <DialogContent>
          {login ? null : (
            <TextField
              error={error1}
              helperText={text1}
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          )}
          <TextField
            error={error2}
            helperText={text2}
            autoFocus
            margin="dense"
            id="email"
            label="Username"
            type="email"
            fullWidth
            required
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
          <TextField
            error={error3}
            helperText={text3}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <a
            style={{ marginRight: login ? "4.5em" : "13em", color: "#393939" }}
            onClick={handleRegister}
          >
            <u>Click Here To {login ? "Register" : "Login"} </u>
          </a>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            pending={pending}
            pendingPosition="end"
            variant="contained"
          >
            {login ? "Login" : "Register"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
