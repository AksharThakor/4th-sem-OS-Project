// import react , as well as hooks
import React, { useState, useEffect } from "react";
// antd component library
import { Table, Button, Input } from "antd";
// import css
import "./simulator.css";

// custom table definition
const columns = [
  {
    title: "Frames",
    dataIndex: "page",
    key: "page",
  },
  {
    title: "Page Number",
    dataIndex: "content",
    key: "content",
    render: (text, record) => (
  <div className="page-stack">
      <div className={`memory ${record.className}`}>{text === 'Page [object Object]' ? 'Empty' : text || 'empty'}</div>
  </div>

    ),
  },
  {
    title: "Status of Page",
    dataIndex: "status",
    key: "status",
  },
];

// function to do the calculations as per opr
// This function simulates paging based on the given input and page size
const simulatePaging = (input, pageSize) => {
  // Split the input into an array of messages and trim any whitespace
  const messages = input.split(",").map((m) => m.trim());

  // Create an array of empty objects with a length of the page size
  const pages = new Array(pageSize).fill({});

  // Create an empty array to represent memory
  const memory = [];

  // Create an empty array to hold logs
  const logs = [];

  // Initialize page fault and hit counts to 0
  let pageFaults = 0;
  let hitCount = 0;

  // For each message in the input array
  messages.forEach((message, index) => {
    // Convert the message to an integer
    let page = parseInt(message, 10);

    if (isNaN(page)) {
      page = 'None'; // set page to an empty string if it's NaN
    }
    // If the page is already in memory, it's a page hit
    if (memory.includes(page)) {
      logs.push(`Page ${page} found in memory`);
      hitCount++;
    } else {
      // Otherwise, it's a page fault
      logs.push(`Page fault: ${page} not found in memory`);
      pageFaults++;

      if (memory.length < pageSize) {
        // If memory is not full, add the page to memory
        memory.push(page);
        logs.push(`Added page ${page} to memory`);
      } else {
        // If memory is full, replace a page
        const pageIndex = pages.findIndex((p) => p === memory[0]);
        memory.shift();
        memory.push(page);
        logs.push(`Page hit: ${pages[pageIndex]} replaced with ${page}`);
        pages[pageIndex] = page;
      }
    }

    // Update the pages array
    pages[memory.indexOf(page)] = page;

    // If we have processed all the messages, add a log to indicate that the simulation is complete
    if (index === messages.length - 1) {
      logs.push("Simulation completed.");
    }
  });

  // Calculate the hit rate as a percentage
  const hitRate = ((hitCount / messages.length) * 100).toFixed(2);

  // Create an array of objects representing the table data
  const dataSource = pages.map((page, index) => ({
    key: index,
    page: index,
    content: page !== null ? `Page ${page}` : "",
    status: memory.includes(page) ? "In Memory" : "Page Fault",
    className: memory.includes(page) ? "in-memory" : "page-fault",
  }));

  // Return an object with the simulation results
  return { dataSource, logs, pageFaults, hitRate };
};

// This component represents the paging simulator
export default function PagingSimulator() {
  //Maintaining the states
  const [input, setInput] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [logs, setLogs] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [hitRate, setHitRate] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  //hook to constantly update
  useEffect(() => {
    const { dataSource, logs, pageFaults, hitRate } = simulatePaging(input, pageSize);
    setLogs(logs);
    setPageFaults(pageFaults);
    setHitRate(hitRate);
  }, [input]);

  //function to set the input changes
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  //main function that does calculations , imports simulatePaging 
  const handleSimulate = () => {
    const { dataSource, logs, pageFaults, hitRate } = simulatePaging(input, pageSize);
    //Usestate updations
    setDataSource(dataSource);
    setPageFaults(pageFaults);
    setHitRate(hitRate);
    //set the state in memory
    let currentIndex = -1;
    const intervalId = setInterval(() => {
      currentIndex++;
      if (currentIndex >= logs.length) {
        clearInterval(intervalId);
        return;
      }
      // UPDATION OF LOGS FROM THE INDEX OBTAINED
      const currentLog = logs[currentIndex];
      const currentDataSource = dataSource.map((page) => {
        // Page fault if not in memory
        const status = page.content !== "" && memory.includes(page.content.split(" ")[1])
          ? "In Memory"
          //ternery operator to determine ste
          : "Page Fault";
        const className = page.content !== "" && memory.includes(page.content.split(" ")[1])
          ? "in-memory"
          : "page-fault";
        if (status === "Page Fault" && currentLog.includes(page.content.split(" ")[1])) {
          return {
            //Table properties
            ...page,
            status: "In Memory",
            className: "in-memory",
            //getting data
            content: page.content.split(" ")[1] ? `Page ${page.content.split(" ")[1]}` : ''
          };
        }
        return { ...page, status, className };
      });
  
      //maintain the logs and update states as changed
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs];
        newLogs[currentIndex] = currentLog;
        return newLogs;
      });
      
      //maintain the table
      setDataSource((prevDataSource) => {
        const newDataSource = [...prevDataSource];
        newDataSource.forEach((page, index) => {
          const status =
            page.content !== "" && memory.includes(page.content.split(" ")[1])
              ? "In Memory"
              : "Page Fault";
          const className =
            page.content !== "" && memory.includes(page.content.split(" ")[1])
              ? "in-memory"
              : "page-fault";
              if (status === "Page Fault" && currentLog.includes(page.content.split(" ")[1])) {
                newDataSource[index] = {
                  ...page,
                  status: "In Memory",
                  className: "in-memory",
                  content: page.content.split("")[1] ? `Page ${page.content.split(" ")[1]}` : ' ',
                };
              } else {
                newDataSource[index] = { ...page, status, className };
              }              
        });
        return newDataSource;
      });
          }, 1000);
  };
  // Function if frame changes , set thestates
  const handlePageSizeChange = (event) => {
    const pageSize = parseInt(event.target.value, 10);
    setPageSize(pageSize);
    const { dataSource, logs, pageFaults, hitRate } = simulatePaging(input, pageSize);
    setDataSource(dataSource);
    setPageFaults(pageFaults);
    setHitRate(hitRate);
    setLogs(logs);
  };
  // reset button function - set all states to default
  const handleReset = () => {
    setInput("");
    setDataSource([]);
    setLogs([]);
    setPageFaults(0);
    setHitRate(0);
    setPageSize("")
  };

// HTML part
return (
  <div className="paging-simulator">
    <h1 className="header-container">Optimal Page Replacement Simulator</h1>
    <div className="input-container">
    <Input placeholder="Enter message queue like 1,2,3,..." value={input} pattern="^([^,]*(,[^,]+)[^,]*)*$" onChange={handleInputChange} />
    </div>
    <div className="input-container">
      {/* Add buttons */}
    <Input placeholder="Enter no of frames/Cache" value={pageSize} onChange={handlePageSizeChange} />
      <div className="button-container">
        <Button type="primary" className="button" onClick={handleSimulate}>
          Simulate
        </Button>
        <Button type="primary" className="button" onClick={handleReset}>
          Reset
        </Button>
      </div>
  
    </div>

    {/* JS for antd table */}
    <div className="table-container">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
{/* Continer maintainig stats */}
    <div className="stats-container">
    <div>
    <h1>Stats</h1>
    </div>
      <p>Page Faults: {pageFaults}</p>
    <p>Hit Rate: {hitRate}%</p>
    <p>Miss Rate: {100 -hitRate}%</p>
    </div>
    {/* Maintaining and updating logs */}
    <div className="logs-container">
      <h1>Logs</h1>
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  </div>
);
}