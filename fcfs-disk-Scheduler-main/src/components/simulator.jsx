// import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // for displaying toast messages
import { ToastContainer } from 'react-toastify'; // for rendering the toast container
import 'react-toastify/dist/ReactToastify.css'; // import css for toastify library
import Graph from './graph'; // import the Graph component

// create the DiskSimulator component
const DiskSimulator = () => {
  // create state variables for the component
  const [data, setData] = useState([]); // data entered by the user
  const [currentPosition, setCurrentPosition] = useState(0); // current position of the disk head
  const [simulationStarted, setSimulationStarted] = useState(false); // whether the simulation has started
  const [totalSeekTime, setTotalSeekTime] = useState(0); // total seek time for the current data

  // useEffect hook to calculate total seek time whenever data or currentPosition changes
  useEffect(() => {
    let newTotalSeekTime = 0;
    for (let i = 1; i < data.length; i++) {
      if (!isNaN(data[i])) {
        newTotalSeekTime += Math.abs(data[i] - data[i-1]);
      }
    }
    setTotalSeekTime(newTotalSeekTime);
  }, [data]);

  // function to handle adding new data to the table
  const handleAddData = (e) => {
    e.preventDefault();
    const newData = e.target.elements.data.value;
    if (isNaN(newData)) {
      // Show toast message for NaN values
      toast.error('Please enter a valid number', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (newData<0) {
      // Show toast message for Negative values
      toast.error('Please enter a positive number', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    setData([...data, parseInt(newData)]);
    e.target.reset();
  }

  // function to handle starting the simulation
  const handleStartSimulation = () => {
    setSimulationStarted(true);
  }

  // function to handle changing the current position of the disk head
  const handleCurrentPositionChange = (e) => {
    setCurrentPosition(parseInt(e.target.value));
  }

  // render the component
  return (
    <div className="disk-simulator">
      <h2>FCFS Disk Simulator</h2>
      <div className="inputs">
        <form onSubmit={handleAddData}>
          <input type="number" name="data" placeholder="Enter data" />
          <button type="submit">Add Data</button>
          </form>
        <label htmlFor="current-position">Head Position:</label>
        <input type="number" id="current-position" value={data[0]} readOnly />
        <button onClick={handleStartSimulation}>Start Simulation</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Distance from Previous</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let distance = 0;
              if (index > 0 && !isNaN(item) && !isNaN(data[index-1])) {
                distance = Math.abs(item - data[index-1]);
              }
              return (
                <tr key={index}>
                  <td>{isNaN(item) ? 'NaN' : item}</td>
                  <td>{distance}</td>
                </tr>
              );
            })}
            <tr>
              <td>
Total Seek Time:</td>
              <td>{totalSeekTime}</td>
            </tr>
          </tbody>
        </table>
        {/* display the total seek time */}
        {/* <div className='total-seek-time'>Total Seek Time: {totalSeekTime}</div> */}
      </div>
      {/* display the graph if the simulation has started */}
      {simulationStarted && (
        <div className="graph-container">
          <Graph data={data} currentPosition={currentPosition} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DiskSimulator;
