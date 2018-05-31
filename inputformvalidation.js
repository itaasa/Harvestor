// The following javascript will be called to ensure that all inputs from user are valid, and saves all user input to the variables below

var cropCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cropType = "Corn";
var cropPrice = 0;
var unit = "kg(s)";
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var ctx = document.getElementById("myChart").getContext("2d");

function updateGraph() {
    if (positiveInputValidation()) {
        saveSingleData();
        updateChartData();
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
    cropCounts[selectedMonth] = val.value;
}

//will save the non-array values to their specific javascript variables
function saveSingleData() {
    cropType = document.getElementById("cropTypes").value;
    cropPrice = document.getElementById("cropPrice").value;

    if (document.getElementById("kilos").checked)
        unit = document.getElementById("kilos").value;
    else
        unit = document.getElementById("tons").value;

    wageExpenses = parseInt(document.getElementById("monthlyWage").value);
    toolExpenses = parseInt(document.getElementById("monthlyTool").value);
    utilExpenses = parseInt(document.getElementById("monthlyUtil").value);
    
}

//used for testing
function printInputValues(cropCounts, type, unit, price, wage, tool, util) {
    var i;

    alert("Crop count for the year:" + cropCounts.toString());
    alert("Crop Type: " + type);
    alert("The unit we will be using is: " + unit);
    alert("The price for each crop is: " + price);
    alert("The expenses are: (wage, tool, util) = (" + wage + ", " + tool + ", " + util + ")");
}

//Used to update the revenue/expenses graph with new values if values were changed
function updateRevenueChartData() {
    profitChart = new Chart(ctx, {
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
}

//Used to update the profit/loss graph if values were changed
function updateProfitChartData() {

}


//Returns array containing total revenue for each month
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



