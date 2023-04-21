// Preemptive/ Priority scheduling algorithm
// Priority decreases with increase in value ,i.e., Highest priority = 0, Lowest priority = 10
/*

Smitkumar Sutariya 21BCP142

AT - Arrival Time 
BT - Burst time 
ST - Start time 
CT - Completion time 
TAT - Turnaround time 
WT - Waiting time 
RT - Response time 

Formulas used:

TAT = CT - AT
WT = TAT - BT
RT = ST - AT

*/


#include <iostream>
#include <algorithm> 
#include <iomanip>
#include <string.h> 
#include <climits>
using namespace std;

struct process {
    int pid;
    int arrival_time;
    int burst_time;
    int priority;
    int start_time;
    int completion_time;
    int turnaround_time;
    int waiting_time;
    int response_time;
};

// function prototypes
void priorityScheduling(process p[], int n);
void printAvgTime(process p[], int n);

// global variables
int burst_remaining[100];      
int total_turnaround_time = 0;
int total_waiting_time = 0;
int total_response_time = 0;
int total_idle_time = 0;


int main() {

    int n;    // Total number of processes
    struct process p[100];

    cout << setprecision(2) << fixed; //It means that the floating-point values will be written in fixed point notations,i.e., each with precision = 2

    cout<<"Enter the number of processes: ";
    cin>>n;

    for(int i = 0; i < n; i++) {
        cout<<"Enter arrival time of process "<<i+1<<": ";
        cin>>p[i].arrival_time;
        cout<<"Enter burst time of process "<<i+1<<": ";
        cin>>p[i].burst_time;
        cout<<"Enter priority of the process "<<i+1<<": ";
        cin>>p[i].priority;
        p[i].pid = i+1;
        burst_remaining[i] = p[i].burst_time;
        cout<<endl;
    }

    priorityScheduling(p,n);
    printAvgTime(p,n);

}


void priorityScheduling(process p[], int n)
{
    int current_time = 0;           // to calculate completion time
    int completed = 0;          
    int is_completed[100] = {0};
    int prev = 0;
    
    while(completed != n) {
        int index = -1;
        int max = INT_MAX;       // to reverse the priority, max = -1
        
        for(int i = 0; i < n; i++) {
            if(p[i].arrival_time <= current_time && is_completed[i] == 0) {
                if(p[i].priority < max) {     // p[i].priority > max
                    max = p[i].priority;
                    index = i;
                }
                if(p[i].priority == max) {
                    if(p[i].arrival_time < p[index].arrival_time) {
                        max = p[i].priority;
                        index = i;
                    }
                }
            }
        }

        if(index != -1) {
            if(burst_remaining[index] == p[index].burst_time) {
                p[index].start_time = current_time;
                total_idle_time += p[index].start_time - prev;
            }
            burst_remaining[index] -= 1;
            current_time++;
            prev = current_time;
            
            if(burst_remaining[index] == 0) {
                p[index].completion_time = current_time;
                p[index].turnaround_time = p[index].completion_time - p[index].arrival_time;
                p[index].waiting_time = p[index].turnaround_time - p[index].burst_time;
                p[index].response_time = p[index].start_time - p[index].arrival_time;

                total_turnaround_time += p[index].turnaround_time;
                total_waiting_time += p[index].waiting_time;
                total_response_time += p[index].response_time;

                is_completed[index] = 1;
                completed++;
            }
        }
        else {
             current_time++;
        }  
    }
}

void printAvgTime(process p[], int n)
{
    float avg_turnaround_time;
    float avg_waiting_time;
    float avg_response_time;
    float cpu_util;
    int max_completion_time = -1;
    
    for(int i = 0; i < n; i++) {
        max_completion_time = max(max_completion_time,p[i].completion_time);
    }

    avg_turnaround_time = (float) total_turnaround_time / n;
    avg_waiting_time = (float) total_waiting_time / n;
    avg_response_time = (float) total_response_time / n;
    cpu_util = ((max_completion_time - total_idle_time) / (float) max_completion_time )*100;

    cout<<endl<<endl;

    cout<<"#P\t"<<"AT\t"<<"BT\t"<<"PRI\t"<<"ST\t"<<"CT\t"<<"TAT\t"<<"WT\t"<<"RT\t"<<"\n"<<endl;

    for(int i = 0; i < n; i++) {
        cout<<p[i].pid<<"\t"<<p[i].arrival_time<<"\t"<<p[i].burst_time<<"\t"<<p[i].priority<<"\t"<<p[i].start_time<<"\t"<<p[i].completion_time<<"\t";
        cout<<p[i].turnaround_time<<"\t"<<p[i].waiting_time<<"\t"<<p[i].response_time<<"\t"<<"\n"<<endl;
    }

    cout<<"Average Turnaround Time = "<<avg_turnaround_time<<endl;
    cout<<"Average Waiting Time = "<<avg_waiting_time<<endl;
    cout<<"Average Response Time = "<<avg_response_time<<endl;
    cout<<"CPU Utilization = "<<cpu_util<<"%"<<endl;
}
