import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../../style/style.css";
import eurokidsLogo from "../../images/eurokids- logo-bunny.png";
import student from "../../images/student-grad-jumping-animated-clipart-crca.gif";
const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Add a state variable to control the shaking animation

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://eurokids-1aci.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.status) {
          const token = responseData.data.token;
          localStorage.setItem("authToken", token);
          window.location.href = "/popup";
        } else {
          // Handle unsuccessful login, e.g., show an error message.
          setError("Login failed: " + responseData.message);
          setIsShaking(true); // Trigger the shake animation
          setTimeout(() => {
            setIsShaking(false);
          }, 300);
        }
      } else {
        // Handle other network errors and access response data
        setError(responseData.message);
        setIsShaking(true); // Trigger the shake animation
        setTimeout(() => {
          setIsShaking(false);
        }, 300);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setIsShaking(true); // Trigger the shake animation
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}></Box>

      <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
        <CssBaseline />
        <Grid
          container
          spacing={0}
          sx={{
            height: "500px",
            width: "800px", // Adjust the width as needed
            marginTop: "70px",
            marginLeft: "auto", // Center the grid horizontally
            marginRight: "auto", // Center the grid horizontally
            justifyContent: "center", // Center the content horizontally
          }}
        >  
        <img
        src={student} // Use the imported student variable here
        alt="Student"
        style={{
          width: "230px", // Decrease the width of the image
          height: "250px", // Maintain the aspect ratio
          position: "absolute", // Position the image absolutely
          top: "370px", // Adjust the top position as needed
          left: "120px", // Adjust the left position as needed
          // right :"10px"
        }}
      />


          <Grid
            item
            xs={12}            
            sm={12}
            md={7}
            sx={{
              // backgroundColor:"red",
              position: "relative", // Ensure the Grid item is positioned relative to the pseudo-element
              backgroundColor: "light",
              backgroundPosition: "center",
              backgroundSize: "cover", // Cover the entire area of the Grid item
              '&::before': { // Pseudo-element for the background image
                content: '""',
                position: "absolute",
                top: 0,
                left: -30,
                right: -30,
                bottom: 0,
                backgroundImage: "url(https://media1.giphy.com/media/0PN1YBJbOcMwQHGAbA/giphy.gif)",
                backgroundRepeat: "no-repeat",
                     // backgroundPosition: "center",
                backgroundSize: "100% auto", // Increase the width of the background image
                zIndex: -10, // Ensure the pseudo-element is behind the content
              },
              height:"580px",
              width :"200px",
              marginTop:"-20px"
            }}
          />
           
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              height: "500px",
              width: "400px",
              my: 11,
              marginLeft: "100px",

              // backgroundColor :"green",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              padding: "50px",
              boxShadow: "1px 2px 7px rgba(0.3, 0.3, 0.3, 0.3)", // Add your shadow properties here
              borderRadius: "20px",
              justifyContent: "center", // Center the content horizontally
              animation: isShaking ? "shake 0.5s" : "",
            }}
          >
            <img
              src={eurokidsLogo}
              alt="Logo"
              // height="50"
              width="150"
              style={{ marginRight: "14px", marginTop: "-24px" }}
            />
            <Avatar sx={{ m: 1, backgroundColor: "#3e4396" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Sign in
            </Typography>

            {error && <p className="text-danger">{error}</p>}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3e4396",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
              >
                Login In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
