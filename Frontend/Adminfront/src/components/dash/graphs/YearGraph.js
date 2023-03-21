import React from 'react'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'
import {Box, CardContent} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,  
    Filler,
);

const YearGraph = ({Month, loading}) => {


    let prMonth01 = dayjs().subtract(11, 'month').format("MMM YY")
    let prMonth02 = dayjs().subtract(10, 'month').format("MMM YY")
    let prMonth03 = dayjs().subtract(9, 'month').format("MMM YY")
    let prMonth04 = dayjs().subtract(8, 'month').format("MMM YY")
    let prMonth05 = dayjs().subtract(7, 'month').format("MMM YY")
    let prMonth06 = dayjs().subtract(6, 'month').format("MMM YY")
    let prMonth07 = dayjs().subtract(5, 'month').format("MMM YY")
    let prMonth08 = dayjs().subtract(4, 'month').format("MMM YY")
    let prMonth09 = dayjs().subtract(3, 'month').format("MMM YY")
    let prMonth10 = dayjs().subtract(2, 'month').format("MMM YY")
    let prMonth11 = dayjs().subtract(1, 'month').format("MMM YY")
    let prMonth12 = dayjs().format("MMM YY")

    let months = {}
    const amt =  Month !== undefined && !loading ? Object.values(Month) : 1

    months[prMonth01] = amt[0]
    months[prMonth02] = amt[1]
    months[prMonth03] = amt[2]
    months[prMonth04] = amt[3]
    months[prMonth05] = amt[4]
    months[prMonth06] = amt[5]
    months[prMonth07] = amt[6]
    months[prMonth08] = amt[7]
    months[prMonth09] = amt[8]
    months[prMonth10] = amt[9]
    months[prMonth11] = amt[10]
    months[prMonth12] = amt[11]


    const chartData = {
        labels : Object.keys(months),
        datasets : [
            {
                label: 'Revenue',
                data :  Month !== undefined && !loading ? Object.values(Month) : [],
                borderColor: '#4a74de',
                fill : true,
                backgroundColor: '#81a4ff',
                borderRadius: 4,
                barPercentage : 0.5,
            },
        ],
    };

    const options = {
        animation: true,
        // responsive: true,
        maintainAspectRatio: false,
        redraw: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
      };

  return (
    <CardContent>
        <Box sx={{width:'70vw'}}>
          <Bar options={options} data={chartData} height={250} />
          </Box>
    </CardContent>
  )
}

export default React.memo(YearGraph)