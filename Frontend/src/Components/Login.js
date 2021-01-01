import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingButton from "@material-ui/lab/LoadingButton";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [login, setLogin] = React.useState(true);
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
  });
  const handleClickOpen = () => {
    setLogin(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setPending(true);
    if (login) {
      const { username, password } = user;
      if (username && password) {
        setError1(false);
        setError2(false);
        setError3(false);
        setText1("");
        setText2("");
        setText3("");
        try {
          await axios.post("/v1/login/", { user });
          window.location.href = "/";
          setOpen(false);
        } catch (err) {
          alert("Incorrect Credentials");
        }
      } else if (username) {
        setError2(false);
        setText2("");
        setError3(true);
        setText3("password field is empty");
      } else {
        setError2(true);
        setText2("username field is empty");
        setError3(false);
        setText3("");
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
          const res = await axios.post("/v1/signup/", { user });
          setOpen(false);
          console.log(res.status);
        } catch (err) {
          alert("Email/Username already exists");
        }
      }
      if (!username) {
        if (password) {
          setError3(false);
          setText3("");
        }
        if (email) {
          setError1(false);
          setText1("");
        }

        setError2(true);
        setText2("username field is empty");
      }
      if (!password) {
        if (username) {
          setError2(false);
          setText2("");
        }
        if (email) {
          setError1(false);
          setText1("");
        }
        setError3(true);
        setText3("password field is empty");
      }
      if (!email) {
        if (username) {
          setError2(false);
          setText2("");
        }
        if (password) {
          setError2(false);
          setText2("");
        }
        setError1(true);
        setText1("email field is empty");
      }
    }
    setPending(false);
  };

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
