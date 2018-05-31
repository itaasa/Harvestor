// The following javascript will be called to ensure that all inputs from user are valid, and saves all user input to the variables below

var cropCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cropType = "Corn";
var cropPrice = 0;
var unit = "kg(s)";
var wageExpenses = 0, toolExpenses = 0, utilExpenses = 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var revenueContext = document.getElementById("revenueChart").getContext("2d");
var profitContext = document.getElementById("profitChart").getContext("2d");
var revenueChart, profitChart;


createCharts();
updateTotals();

function updateGraphs() {
    if (positiveInputValidation()) {
        saveSingleData();
        updateRevenueChartData();
        updateProfitChartData();
        updateTotals();
    }
}

function positiveInputValidation() {
    for (i = 1; i < document.forms[0].length - 1; i++) {
        if (document.forms[0].elements[i].value < 0) {
            alert("Cannot have negative values.");
            return false;
        }
    }

    return true;
}

//Will change the display html value depending on the month selected 
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
            ],
        },

        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "Revenue and Expenses"
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
                borderColor: "#F6FF3D"
            }
            ],
        },

        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "Profit/Loss"
            },

            scales: {
                zeroLineColor: "#000000"
            }
        }
    });


}

//Used to update the revenue/expenses graph with new values if values were changed
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

//Used to update the profit/loss graph if values were changed
function updateProfitChartData() {

    var i;
    var profits = calculateMonthlyProfit();

    for (i = 0; i < 12; i++) {
        profitChart.data.datasets[0].data[i] = profits[i];
    }

    profitChart.update();
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

function updateTotals() {
    var totalRevenue = document.getElementById("totalRevenue");
    var totalExpenses = document.getElementById("totalExpenses");
    var totalProfits = document.getElementById("totalProfit");

    totalRevenue.innerHTML = "The total revenue of the year is: " + calculateTotalRevenue();
    totalExpenses.innerHTML = "The total expenses of the year is: " + calculateTotalExpenses();
    totalProfits.innerHTML = "The total profit of the year is: " + calculateTotalProfit();
}

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
