import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";
import { setCredentials } from "./store/authSlice";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ActivityDetail from "./components/ActivityDetail";
import ActivitiesPage from "./pages/ActvitiesPage";

// const ActvitiesPage = () => {
//   return (<Box sx={{ p: 2, border: '1px dashed grey' }}>
//     <ActivityForm onActivityAdded = {() => window.location.reload()} />
//     <ActivityList />
//   </Box>);
// }

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#6D28D9',
      light: '#8B5CF6',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#d3ebee',
      paper: '#f5f7ff',
    },

    text: {
      primary: '#01040c',
      secondary: '#010408',
    },

    divider: '#8695b3',
  },

  // 👇 overall rounding kam
  shape: {
    borderRadius: 6,
  },

  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          textTransform: 'none',
          fontWeight: 800,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },

      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 7,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 6,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 7,
        },
      },
    },
  },
});


  return (

      <ThemeProvider theme={theme} >
    <CssBaseline />
    <Router>
      {!token ? (
 <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    px: 2,

    background: `
      radial-gradient(circle at 20% 20%, rgba(124,58,237,0.18), transparent 30%),
      radial-gradient(circle at 80% 80%, rgba(6,182,212,0.14), transparent 30%),
      linear-gradient(135deg, #f8f7ff 0%, #f8fafc 100%)
    `,

    "&::before": {
      content: '""',
      position: "absolute",
      width: 350,
      height: 350,
      borderRadius: "50%",
      background: "rgba(124,58,237,0.08)",
      top: -150,
      right: -100,
      animation: "float 7s ease-in-out infinite",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "rgba(6,182,212,0.07)",
      bottom: -130,
      left: -100,
      animation: "float 8s ease-in-out infinite reverse",
    },

    "@keyframes float": {
      "0%, 100%": {
        transform: "translateY(0px)",
      },
      "50%": {
        transform: "translateY(-25px)",
      },
    },

    "@keyframes fadeUp": {
      from: {
        opacity: 0,
        transform: "translateY(35px) scale(0.96)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0) scale(1)",
      },
    },

    "@keyframes pulse": {
      "0%, 100%": {
        boxShadow: "0 0 0 0 rgba(124,58,237,0.35)",
      },
      "50%": {
        boxShadow: "0 0 0 12px rgba(124,58,237,0)",
      },
    },
  }}
>
  {/* LOGIN CARD */}
  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      width: "100%",
      maxWidth: 480,
      p: { xs: 3, sm: 5 },
      borderRadius: 5,

      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",

      border: "1px solid rgba(255,255,255,0.8)",

      boxShadow:
        "0 25px 70px rgba(15,23,42,0.12)",

      textAlign: "center",

      animation: "fadeUp 0.7s ease-out",

      transition: "transform 0.3s ease, box-shadow 0.3s ease",

      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow:
          "0 30px 80px rgba(15,23,42,0.16)",
      },
    }}
  >
    {/* ICON */}
    <Box
      sx={{
        width: 72,
        height: 72,
        mx: "auto",
        mb: 3,
        borderRadius: 4,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background:
          "linear-gradient(135deg, #6d28d9, #8b5cf6, #06b6d4)",

        color: "white",

        fontSize: 32,

        boxShadow:
          "0 12px 30px rgba(109,40,217,0.28)",

        animation: "pulse 2.5s infinite",
      }}
    >
      🏋️
    </Box>

    {/* SMALL BADGE */}
    <Typography
      variant="overline"
      sx={{
        color: "#7c3aed",
        fontWeight: 800,
        letterSpacing: 2,
      }}
    >
      AI POWERED FITNESS
    </Typography>

    {/* TITLE */}
    <Typography
      variant="h4"
      sx={{
        mt: 1,
        fontWeight: 900,

        background:
          "linear-gradient(135deg, #4c1d95, #7c3aed, #0891b2)",

        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        letterSpacing: "-1px",
      }}
    >
      Welcome Back
    </Typography>

    {/* DESCRIPTION */}
    <Typography
      variant="body1"
      sx={{
        mt: 1.5,
        mb: 4,
        color: "#64748b",
        lineHeight: 1.7,
      }}
    >
      Track your workouts, understand your performance,
      and get personalized AI-powered fitness insights.
    </Typography>

    {/* LOGIN BUTTON */}
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      onClick={() => {
        logIn();
      }}
      sx={{
        py: 1.6,
        borderRadius: 3,

        fontSize: "1rem",
        fontWeight: 800,
        textTransform: "none",

        background:
          "linear-gradient(135deg, #6d28d9, #8b5cf6, #06b6d4)",

        boxShadow:
          "0 10px 25px rgba(109,40,217,0.25)",

        transition: "all 0.3s ease",

        "&:hover": {
          background:
            "linear-gradient(135deg, #5b21b6, #7c3aed, #0891b2)",

          transform: "translateY(-3px)",

          boxShadow:
            "0 15px 35px rgba(109,40,217,0.35)",
        },

        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      LOGIN →
    </Button>

    {/* FOOTER */}
    <Typography
      variant="caption"
      sx={{
        display: "block",
        mt: 3,
        color: "#94a3b8",
      }}
    >
      Your fitness journey starts here.
    </Typography>
  </Box>
</Box>
            ) : (
              // <div>
              //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
              //   <pre>{JSON.stringify(token, null, 2)}</pre>
              // </div>

             

              <Box sx={{ p: 2, border: '1px dashed grey' }}>
                 <Button variant="contained" color="secondary" onClick={logOut}>
                  Logout
                </Button>
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />}/>
                <Route path="/activites/:id" element={<ActivityDetail />}/>

                <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login.</div>} />
              </Routes>
            </Box>
            )}
    </Router>
    </ThemeProvider>
  )
}

export default App
