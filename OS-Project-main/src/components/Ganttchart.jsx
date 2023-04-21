import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

const ganttchart = props =>{
    const { processes, i} = props;
    return(
<Box>
        {/* {processes.map(process => ( */}
    <Box
        marginTop="20px"
        marginBottom="20px"
        p={7}
        shadow="2xl"
        borderWidth="4px"
        borderColor="blue.200"
        borderRadius="3xl"
        w="sm"
        textAlign="center"
        backgroundColor={"AppWorkspace"}
      >
        <Bar
          title="Gantt Chart"
          data={{
            // Name of the variables on x-axies for each bar
            labels: 'aum',
            datasets: [
              {
                label: "Gantt Chart",
                indexAxis: "y",
                barPercentage: 0.4,
                // data: s,
                backgroundColor: ["red", "green"],
              },
            ],
          }}
        />
    </Box>
        {/* )) */}
{/* }         */}
</Box>
);
}

export default ganttchart;