
const priorityScheduling = (processes) => {
    let currentTime = 0;
    let completed = 0;
    let n=processes.length;
    if(n==0) return [];
    let isCompleted = Array(100).fill(0);
    let prev = 0;
    let burstRemaining = processes.map((x) => x.burstTime);

    while (completed !== n) {
      let index = -1;
      let max = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= currentTime && isCompleted[i] === 0) {
          if (processes[i].priority < max) {
            max = processes[i].priority;
            index = i;
          }
          if (processes[i].priority === max) {
            if (processes[i].arrivalTime < processes[index].arrivalTime) {
              max = processes[i].priority;
              index = i;
            }
          }
        }
      }
      if (index !== -1) {
        if (burstRemaining[index] === processes[index].burstTime) {
          processes[index].startTime = currentTime;
        }
        burstRemaining[index] -= 1;
        currentTime++;
        prev = currentTime;
        if (burstRemaining[index] === 0) {
          processes[index].completionTime = currentTime;
          processes[index].turnAroundTime =
            processes[index].completionTime - processes[index].arrivalTime;
          processes[index].waitingTime = processes[index].turnAroundTime - processes[index].burstTime;
          processes[index].responseTime = processes[index].startTime - processes[index].arrivalTime;

          isCompleted[index] = 1;
          completed++;
        }
      } else {
        currentTime++;
      }
    }
    return processes;
  }

  export default priorityScheduling;










  // Shortest Job First
		//   for (let i = 0; i < processes.length; i++) {
		// 	console.log(currentTime);
	  
		// 	let availableJobs = processes.filter(
		// 	  (process) => process.arrivalTime <= currentTime && process.isCompleted == false
		// 	);
		// 	let shortestJob = availableJobs.reduce(function (prev, curr) {
		// 	  return prev.burstTime < curr.burstTime ? prev : curr;
		// 	});
	  
		// 	shortestJob.waitingTime = currentTime - shortestJob.arrivalTime;
		// 	shortestJob.responseTime = shortestJob.waitingTime;
		// 	currentTime += shortestJob.burstTime;
		// 	shortestJob.completionTime = currentTime;
		// 	shortestJob.turnAroundTime = shortestJob.completionTime - shortestJob.arrivalTime;
		// 	shortestJob.isCompleted = true;
	  
		// 	processes[
		// 	  processes.indexOf((process) => process.pid == shortestJob.pid)
		// 	] = shortestJob;
		//   }	