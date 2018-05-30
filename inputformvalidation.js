// The following javascript will be called to ensure that all inputs from user are valid, and saves all user input to the variables below

var cropCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cropType = "Corn";
var cropPrice = 0;
var unit = "kg(s)";
var wageExpenses = 0;
var toolExpenses = 0;
var utilExpenses = 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var ctx = document.getElementById("myChart").getContext("2d");

function canContinue() {
    if (positiveInputValidation()) {
        saveSingleData();
        addData();
        //printInputValues(cropCounts, cropType, unit, cropPrice, wageExpenses, toolExpenses, utilExpenses);
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

//will save the values set in  expenses to our javascript variables
function saveSingleData() {
    cropType = document.getElementById("cropTypes").value;
    cropPrice = document.getElementById("cropPrice").value;

    if (document.getElementById("kilos").checked)
        unit = document.getElementById("kilos").value;
    else
        unit = document.getElementById("tons").value;

    wageExpenses = document.getElementById("monthlyWage").value;
    toolExpenses = document.getElementById("monthlyTool").value;
    utilExpenses = document.getElementById("monthlyUtil").value;
    
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

function addData() {
    profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Crop Yield',
                data: cropCounts
            }]
        },
        options: {}
    });    
}



