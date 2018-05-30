// The following javascript will be called to ensure that all inputs from user are valid

var cropCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wageExpenses;
var toolExpenses;
var utilExpenses;

function canContinue() {
    if (unitValidation() && positiveInputValidation()) {
        //Continue to the graph chart code
        printArrayValues(cropCounts);
        
        return true;
    }


    return false;
}

function unitValidation() {
    if (!document.getElementById('kilos').checked && !document.getElementById('tons').checked) {
        alert("No values for unit of measurment has been checked. Please choose kg or tons!");
        return false;
    }

    return true;
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

function monthChange(val) {
    var cropCount = document.getElementById("cropCount");
    var selectedMonth = val.selectedIndex;
    document.getElementById("cropCount").value = cropCounts[selectedMonth];
}

//When the user enters values for each seperate month they must be saved to the arrays
function valueChange(val) {
    var months = document.getElementById("cropMonth");
    var selectedMonth = months.selectedIndex;
    cropCounts[selectedMonth] = val.value;
}

function printArrayValues(val) {
    var i;
    for (i = 0; i < 12; i++) {
        alert("For month " + i + ":" + val[i]);
    }
}



