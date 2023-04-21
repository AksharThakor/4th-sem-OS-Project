// MUI
import { Backspace, Delete } from '@mui/icons-material';
import { TextField, IconButton, Paper } from '@mui/material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

const ProcessTable = props => {
	const { processes, setProcesses, errorText, setErrorText,averages } = props;

	const arrivalTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['arrivalTime'] = event.target.value;
		setProcesses(t);
	};

	const burstTimeUpdate = (event, index) => {
		const t = processes;
		t[index]['burstTime'] = event.target.value;
		setProcesses(t);
	};

	const priorityUpdate = (event, index) => {
		const t = processes;
		t[index]['priority'] = event.target.value;
		setProcesses(t);
	};

	const deleteProcess = (event, index) => {
		const e = [
			...errorText.slice(0, index),
			...errorText.slice(index + 1, errorText.length),
		];
		setErrorText(e);
		const t = [
			...processes.slice(0, index),
			...processes.slice(index + 1, processes.length),
		];
		setProcesses(t);
	};


	return (
		<TableContainer component={Paper}  >
			<Table 
				sx={{
					color:'#fff'
				}}
			>
				{/* Table Header */}
				<TableHead>
					<TableRow>
						<TableCell align='center'>MACHINE PID</TableCell>
						<TableCell align='center'>ARRIVAL TIME</TableCell>
						<TableCell align='center'>BURST TIME</TableCell>
						<TableCell align='center'>PRIORITY</TableCell>
						<TableCell align='center'>
							COMPLETION TIME
						</TableCell>
						<TableCell align='center'>
							TURNAROUND TIME 
						</TableCell>
						<TableCell align='center'>WAITING TIME</TableCell>
						<TableCell align='center'>RESPONSE TIME</TableCell>
						<TableCell align='center' />
					</TableRow>
				</TableHead>

				{/* Table Body */}
				<TableBody>
					{processes.map((process, i) => (
						<TableRow
							key={process.pid}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0,
									textAlign:'center'
								},
							}}
						>
							{/* PID Cell */}
							<TableCell sx={{textAlign:'center'}}>{process.pid}</TableCell>

							{/* Arrival Time Input */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.arrivalTime}
									onChange={e => arrivalTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={errorText[i][0] !== ''}
									helperText={errorText[i][0]}
								/>
							</TableCell>

							{/* Burst Time Input */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.burstTime}
									onChange={e => burstTimeUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={errorText[i][1] !== ''}
									helperText={errorText[i][1]}
								/>
							</TableCell>

							{/* Priority Input */}
							<TableCell align='center'>
								<TextField
									size='small'
									defaultValue={process.priority}
									onChange={e => priorityUpdate(e, i)}
									inputProps={{
										style: { textAlign: 'center' },
									}}
									error={errorText[i][1] !== ''}
									helperText={errorText[i][1]}
								/>
							</TableCell>
							{/* Completion Time Cell */}
							<TableCell align='center'>
								{process.completionTime}
							</TableCell>

							{/* Turnaround Time Cell */}
							<TableCell align='center'>
								{process.turnAroundTime}
							</TableCell>

							{/* Waiting Time Cell */}
							<TableCell align='center'>
								{process.waitingTime}
							</TableCell>

							{/* Response Time Cell */}
							<TableCell align='center'>
								{process.responseTime}
							</TableCell>

							{/* Delete Row Button */}
							<TableCell align='center'>
								<IconButton onClick={e => deleteProcess(e, i)}>
									<Backspace color='black' />
								</IconButton>
							</TableCell>

						</TableRow>
					))}
					<TableRow sx={{border:'none', textAlign:'center'}}>

						<TableCell sx={{border:'none', textAlign:'center'}}>AVERAGE TIMES</TableCell>

						<TableCell sx={{border:'none', textAlign:'center'}}> </TableCell>

						<TableCell sx={{border:'none', textAlign:'center'}}> </TableCell>

						<TableCell sx={{border:'none', textAlign:'center'}}> </TableCell>
									{/* Average Completion Time */}
						<TableCell sx={{border:'none', textAlign:'center'}}>{averages.ct}</TableCell>
									{/* Average TurnAround Time */}
						<TableCell sx={{border:'none', textAlign:'center'}}>{averages.tat}</TableCell>
									{/* Average Waiting Time */}
						<TableCell sx={{border:'none', textAlign:'center'}}>{averages.wt}</TableCell>
									{/* Average Response Time */}
						<TableCell sx={{border:'none', textAlign:'center'}}>{averages.rt}</TableCell>

					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};


export default ProcessTable;