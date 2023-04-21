import {
	Table,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	TableBody,
	Box,
	Typography
} from '@mui/material';

const GanttChart = props => {
	const { processes } = props;

	let ganttProcesses = processes.sort((p1, p2) =>
		p1.completionTime > p2.completionTime
			? 1
			: p1.completionTime < p2.completionTime
			? -1
			: 0
	);

	return (
		<TableContainer
			sx={{
				overflow: 'scroll',
				overscrollBehavior: 'contain',
				'&::-webkit-scrollbar': { display: 'none' }
			}}
		>
			<Table
				component={Paper}
				sx={{
					backdropFilter: 'blur(15px)'
				}}
			>
				<TableBody>
					{/* PID Row */}
					<TableRow
						sx={{
							'&:last-child td, &:last-child th': {
								border: 'none'
							}
						}}
					>
						<TableCell sx={{ width: '100px' }}>PID</TableCell>
						{ganttProcesses.map(process => (
							<TableCell key={process.pid} align='center'>
								{process.pid}
							</TableCell>
						))}
					</TableRow>

					{/* Time Row */}
					<TableRow
						sx={{
							'&:last-child td, &:last-child th': {
								border: 0
							}
						}}
					>
						<TableCell sx={{ width: '100px' }}>Time</TableCell>
						{/* First cell with flex */}
						<TableCell align='right'>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<Typography>0</Typography>
								<Typography>
									{ganttProcesses[0]['completionTime']}
								</Typography>
							</Box>
						</TableCell>
						{ganttProcesses.slice(1).map(process => (
							<TableCell key={process.pid} align='right'>
								<Box>{process.completionTime}</Box>
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GanttChart;