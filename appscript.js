//Initializing default values for graph values
var cropCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cropType = "Corn";
var cropPrice = 0;
var unit = "kgs";
var wageExpenses = 0, toolExpenses = 0, utilExpenses = 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var revenueContext = document.getElementById("revenueChart").getContext("2d");
var profitContext = document.getElementById("profitChart").getContext("2d");
var revenueChart, profitChart;


//Setting charts and totals to default values
createCharts();
updateTotals();

//Called when "Go" button is clicked
function updateGraphs() {
    saveSingleData();
    updateRevenueChartData();
    updateProfitChartData();
    updateTotals();
}

//Will change the displayed crop count value depending on the month selected
function monthChange(val) {
    var cropCount = document.getElementById("cropCount");
    var selectedMonth = val.selectedIndex;
    document.getElementById("cropCount").value = cropCounts[selectedMonth];
}

//When the user enters a new value for a month they must be saved to the array
function valueChange(val) {
    var months = document.getElementById("cropMonth");
    var selectedMonth = months.selectedIndex;
    cropCounts[selectedMonth] = parseFloat(val.value);
}

//will save the non-array values to their specific javascript variables
function saveSingleData() {
    cropType = document.getElementById("cropTypes").value;
    cropPrice = document.getElementById("cropPrice").value;

    if (document.getElementById("kilos").checked)
        unit = document.getElementById("kilos").value;
    else
        unit = document.getElementById("tons").value;

    wageExpenses = parseFloat(document.getElementById("monthlyWage").value);
    toolExpenses = parseFloat(document.getElementById("monthlyTool").value);
    utilExpenses = parseFloat(document.getElementById("monthlyUtil").value);

}


function createCharts() {
    revenueChart = new Chart(revenueContext, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenue',
                data: calculateMonthlyRevenue(),
                fill: false,
                borderColor: "#5AFF4D"
            },
            {
                label: 'Expenses',
                data: calculateMonthlyExpenses(),
                fill: false,
                borderColor: "#FF4D4D"
            }
            ]
        },

        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "Revenue and Expenses"
            },
            responsive: true,
            scales: {
              xAxes: [{
                  gridLines: {
                      lineWidth: 2.5,
                      color: "#C0C0C0"
                  },
                  ticks: {
                      fontSize: 20
                  }
                }],

                yAxes: [{
                    gridLines: {
                        lineWidth: 2.5,
                        color: "#C0C0C0"
                    },
                    ticks: {
                        fontSize: 15
                    }
                }]
            }
        }
    });


    profitChart = new Chart(profitContext, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Profit/Loss',
                data: calculateMonthlyProfit(),
                fill: false,
                borderColor: "#CC6600"
            }
            ]
        },

        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "Profit/Loss"
            },

            scales: {
                xAxes: [{
                    gridLines: {
                        lineWidth: 2.5,
                        color: "#C0C0C0"
                    },
                    ticks: {
                        fontSize: 20
                    }
                }],

                yAxes: [{
                    gridLines: {
                        lineWidth: 2.5,
                        color: "#C0C0C0"
                    },
                    ticks: {
                        fontSize: 15
                    }
                }]
            },

            responsive: true
        }
    });


}

//Used to update the revenue/expenses chart data with new values if values were changed
function updateRevenueChartData() {

    var i;
    var revenues = calculateMonthlyRevenue();
    var expenses = calculateMonthlyExpenses();

    for (i = 0; i < 12; i++) {
        revenueChart.data.datasets[0].data[i] = revenues[i];
        revenueChart.data.datasets[1].data[i] = expenses[i];
    }

    revenueChart.update();
}

//Used to update the profit/loss chart data if values were changed
function updateProfitChartData() {

    var i;
    var profits = calculateMonthlyProfit();

    for (i = 0; i < 12; i++) {
        profitChart.data.datasets[0].data[i] = profits[i];
    }

    profitChart.update();
}

//Used to update the single-value totals
function updateTotals() {
    var totalRevenue = document.getElementById("totalRevenue");
    var totalExpenses = document.getElementById("totalExpenses");
    var totalProfits = document.getElementById("totalProfit");
    var totalCropCount = document.getElementById("totalCropCount");

    totalRevenue.innerHTML = "The total revenue of the year is: $" + calculateTotalRevenue();
    totalExpenses.innerHTML = "The total expenses of the year is: $" + calculateTotalExpenses();
    totalProfits.innerHTML = "The total profit of the year is: $" + calculateTotalProfit();
    totalCropCount.innerHTML = "The total crop count of the year is: " + calculateTotalCropCount() + " " + unit + " of " + cropType.toLowerCase();

}

//Returns array containing the revenue for each month
function calculateMonthlyRevenue() {

    var i;
    var revenues = new Array();
    for (i = 0; i < cropCounts.length; i++) {
        revenues[i] = cropCounts[i] * cropPrice;
    }

    return revenues;
}

//Returns array containing total expenses for each month
function calculateMonthlyExpenses() {
    var i;
    var expenses = new Array();

    for (i = 0; i < cropCounts.length; i++) {
        expenses[i] = wageExpenses + toolExpenses + utilExpenses;
    }

    return expenses;
}

//Returns array containing the profit for each month
function calculateMonthlyProfit() {
    var i;
    var profits = new Array();
    var revenues = calculateMonthlyRevenue();
    var expenses = calculateMonthlyExpenses();

    for (i = 0; i < cropCounts.length; i++) {
        profits[i] = revenues[i] - expenses[i];
    }
    return profits;
}


//The follow functions are used to find total values from their corresponding arrays (simple summation on elements)
function calculateTotalRevenue() {
    var monthlyRevenue = calculateMonthlyRevenue();

    var i, totalRevenue = 0;
    for (i = 0; i < 12; i++)
        totalRevenue += monthlyRevenue[i];

    return totalRevenue;
}

function calculateTotalExpenses() {
    var monthlyExpenses = calculateMonthlyExpenses();

    var i, totalExpenses = 0;
    for (i = 0; i < 12; i++)
        totalExpenses += monthlyExpenses[i];

    return totalExpenses;
}

function calculateTotalProfit() {
    var monthlyProfit = calculateMonthlyProfit();

    var i, totalProfit = 0;
    for (i = 0; i < 12; i++)
        totalProfit += monthlyProfit[i];

    return totalProfit;
}

function calculateTotalCropCount(){

    var i, totalCropCount = 0;
    for (i = 0; i < 12; i++)
        totalCropCount += cropCounts[i];

    return totalCropCount;
}
