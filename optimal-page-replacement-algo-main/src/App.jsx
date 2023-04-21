// Import necessary modules and components
import React, { useState} from "react";
import "./App.css";
import OptimalPageReplacementSimulator from './components/simulator';
// MUI
import { CssBaseline ,Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import assets from './Assets/assets'

// Create the main App component
const App = () => {
// Define the MUI theme
const theme = createTheme({
  palette: {
    mode: 'dark'
      },
        components: {
        MuiPaper: {
        styleOverrides: {
        root: {
        color:'#fff'
        },
      },
    },
  },
});

	// Define the state for the data array
const [data, setData] = useState([]);

return (
	// Wrap the App in the MUI ThemeProvider with the defined theme
	<ThemeProvider theme={createTheme(assets.theme)}>
		<CssBaseline />

		{/* Add a background video as a full-screen background */}
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height:'100%',
        zIndex: '-20',
        overflow: 'scroll',
        '&::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <video loop autoPlay muted>
        <source src='video.mp4' type='video/mp4' />
      </video>
    </Box>


	<div className="App">
		{/* Render the Page Simulator component, passing in the setData function as a prop */}
		<OptimalPageReplacementSimulator setData={setData} />
	</div>
</ThemeProvider>
);
};

// Export the App component as the default export of this module
export default App;
