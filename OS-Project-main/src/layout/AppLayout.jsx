import React,{ useState ,useEffect} from 'react';

import { Box } from "@mui/material";

//MUI imports
import {
	Grid,
	Button,
	Alert,
	IconButton,
	AlertTitle,
	Zoom,
	Grow,
	Typography
} from '@mui/material';
import { CloseRounded} from '@mui/icons-material';

//Axios Imports
import axios from"axios";

//Component imports
import GanttChart from '../components/GanttChart';
import ProcessTable from '../ProcessTable';


const AppLayout = () => {
	// to create data in the object format
	const createData = () => {
		// PID between 0 - 100
		const pid = Math.floor(Math.random() * (100 - 0 + 1)) + 1;
		return {
			pid,
			arrivalTime: '',
			burstTime: '',
			completionTime: '',
			turnAroundTime: '',
			waitingTime: '',
			responseTime: '',
		};
	};
	//  USE STATES
	// array of objects containing process data 
	const [errorText, setErrorText] = useState([['', '']]);

	const [processes, setProcesses] = useState([createData()]);

	const [alertOpen, setAlertOpen] = useState(false);

	const [averages,setAverages] = useState({ct:0,tat:0,wt:0,rt:0});

	const [gantChart, setGantchart] = useState([]);

	const addProcess = () => {
		setErrorText([...errorText, ['', '']]);
		setProcesses([...processes, createData()]);
	};
	// dynamically update averages
	const updateAverages = () => {
		const length = processes.length;
		const tempAvg = averages
		processes.forEach(process => (
			tempAvg.ct+= parseFloat(( process['completionTime']/length)),
			tempAvg.tat+=parseFloat(( process['turnAroundTime']/length)),
			tempAvg.wt+=parseFloat(( process['waitingTime']/length)),
			tempAvg.rt+= parseFloat(( process['responseTime']/length))
			));

		console.log('')
		setAverages(tempAvg)
		};
		
	// Calling API
	const calculateProcess = async () => {
		// error flag
		let error = false;

		// setting error states on cells
		// check integer empty or not a number
		// Function for error toast
		processes.forEach((process, index) => {
			if (process.arrivalTime === ''||process.arrivalTime <0 ||isNaN(process.arrivalTime) ) {
				const t = errorText;
				t[index][0] = 'Error';
				setErrorText(t);
				error = true;
			} else {
				const t = errorText;
				t[index][0] = '';
				setErrorText(t);
			}

			if (process.burstTime === ''||process.burstTime <0||isNaN(process.burstTime)) {
				const t = errorText;
				t[index][1] = 'Error';
				setErrorText(t);
				error = true;
			} else {
				const t = errorText;
				t[index][1] = '';
				setErrorText(t);
			}
		});

		// fetch calculation data from backend if no error
		if (!error) {
			const axios_response = await axios.post(
				'https://osprojectbackend-production.up.railway.app/api/v1/schedule',
				{ processes }
			);

			// update the 'processes' array with the data from API
			setProcesses(axios_response.data.processes);
			// console.log('gantt',axios_response.data)	
			setGantchart(axios_response.data.ganttChart)
			updateAverages()
			useEffect(()=>{
			setAverages(averages)},[averages])
			useEffect(() => {
			setGantchart(axios_response.data.ganttChart);
			  }, []);
			return;
		}

		// else display error
		setAlertOpen(true);
	};

	return (
	
		<Grid
			container
			alignItems='flex-start'
			justifyContent='center'
			sx={{
				p: '2.5vh 2.5vw',
				// from top
				height: '100vh',
				// enable scroll and hide scrollbar
				overflow: 'scroll',
				'&::-webkit-scrollbar': { display: 'none' },
			}}
		>			<Grow in timeout={500}>
		<Grid item>
			<Typography
				variant='h4'
				sx={{ p: '5px',fontSize:'45px', color:'#00ffff',fontWeight: 'bold',textShadow:'2.5px 1px 0em #C92C6D, 0 0 0.1em black;' }}
			>
				PREMPTIVE PRIORITY CPU SCHEDULER
			</Typography>
		</Grid>
	</Grow>
			<Grid
				item
			
				sx={{
					width: '100%',
					height: '80vh',
					backgroundBlendMode:true,
					// enable scroll and hide scrollbar
					overflow: 'scroll',
					'&::-webkit-scrollbar': { display: 'none' },
				}}
			>
				<ProcessTable
					processes={processes}
					setProcesses={setProcesses}
					errorText={errorText}
					setErrorText={setErrorText}
					averages={averages}
				/>
	
			</Grid>
			<Grid item sx={{alignItems:'center',justifyContent:'center' }}>
				<Box sx={{display: 'flex', justifyContent: 'center' }}>
				<Button
					onClick={addProcess}
					variant='contained'
					sx={{ m: '25px' ,color: 'black', backgroundColor:'primary.light'}}
					disabled={alertOpen}
				>
					CREATE PROCESS
				</Button>
				<Button
					variant='contained'
					onClick={calculateProcess}
					sx={{ m: '25px' , color: 'black', backgroundColor:'primary.light'}}
					disabled={alertOpen}
				>
					SIMULATE
				</Button>	
				</Box>
			<Grid item>
				<Zoom in={alertOpen}>
					{/* Toast introduced so error handlig */}
					<Alert
						variant='filled'
						severity='info'
						sx={{
							m: '0',
							width: '10vw - 4vh',
							position: 'absolute',
							left: '40vh',
							right: '40vh',
							bottom: '3vh',
							zIndex: 'modal',
							color:'black',
							backgroundColor:'error.light'
						}}
						action={
							<IconButton
								color='inherit'
								sx = {{justifyItems:'center'}}
								onClick={() => setAlertOpen(false)}
							>
								<CloseRounded />
							</IconButton>
						}
					>
						<AlertTitle>ERROR</AlertTitle>	
						FILL ALL THE REQUIRED DETAILS CORRECTLY
					</Alert>
				</Zoom>
			</Grid>

		<Grid>
		</Grid>

		{/* Gantt component */}
		<Grid item>
			<Typography
				variant='h4'
				sx={{ marginTop:'2em',display:'flex',justifyContent:'center', p: '5px',fontSize:'45px', color:'#00ffff',fontWeight: 'bold',textShadow:'2.5px 1px 0em #C92C6D, 0 0 0.1em black;' }}
			>
				GANTT CHART
			</Typography>
		</Grid>
		<Grid
				item
				xs={12}
				sm={10}
				sx={{
					width: '100%',
					height: '75vh',
					borderRadius: '12px',
					overflowX: 'hidden',
					overflowY: 'scroll',
					overscrollBehavior: 'contain',
					'&::-webkit-scrollbar': { display: 'none' }
				}}
			>
				{/* Gantt Chart */}
				<Box sx={{marginTop:'2em',border:'black', display:'flex',justifyContent:'center'}}>
					<GanttChart 
					gantChart={gantChart} 
					processes={processes} 
					/>
				</Box>
			</Grid>
		</Grid>
		</Grid>
	);
};

export default AppLayout;
