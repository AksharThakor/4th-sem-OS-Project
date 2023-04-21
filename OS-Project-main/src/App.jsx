// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// MUI
import { CssBaseline ,Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// File Structure
import assets from './assets'
import AppLayout from './layout/AppLayout';
// import Ganttchart from './components/Ganttchart';

const App = () => {
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

	return (
		<ThemeProvider theme={createTheme(assets.theme)}>
			<CssBaseline />

			{/* Background Video */}
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					zIndex: '-50',
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' }
				}}
			>
				<video loop autoPlay muted>
					<source src='video.mp4' type='video/mp4' />
				</video>
			</Box>

			{/* Layout */}
			<AppLayout />
			{/* <Ganttchart /> */}
		</ThemeProvider>
	);
};

export default App;
