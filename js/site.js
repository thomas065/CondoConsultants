// get the user's input
function getUserInfo() {
    let loanAmount = document.getElementById('loanAmount').value;
    let monthlyTerm = document.getElementById('monthlyTerm').value;
    let interestRate = document.getElementById('interestRate').value;

    loanAmount = parseInt(loanAmount);
    monthlyTerm = parseInt(monthlyTerm);
    interestRate = parseFloat(interestRate);

    let newHome = calculateLoan(loanAmount, monthlyTerm, interestRate);
    displayStats(newHome);
}

// do the calculations
function calculateLoan(loan, term, interest) {
    // Convert annual interest rate to monthly by 12 and 100 to convert from percentage to a whole decimal number
    const monthlyInterestRate = interest / 1200;

    // calculate the number of monthly payments
    const numberOfPayments = term;

    // calculate rediculous math I had to look up
    let totalPrincipal = 0;
    let totalInterest = 0;
    let balance = loanAmount;

    let numerator = loan * monthlyInterestRate;
    let denominator = 1 - Math.pow(1 + monthlyInterestRate, -term);

    // calculate the monthly mortgage payment
    const monthlyPayment = numerator / denominator;

    for (let month = 1; month <= numberOfPayments; month++) {
        // interest
        const interestPayment = loan * monthlyInterestRate;
        // principal
        const principalPayment = monthlyPayment - interestPayment;
        
        totalPrincipal += principalPayment;
        totalInterest += interestPayment;
        balance -= principalPayment;
    }
    let totalCost = totalPrincipal + totalInterest;

    return {
        monthlyPayment: (Math.round(monthlyPayment * 100) / 100).toFixed(2).toLocaleString(),
        totalPrincipal: (Math.round(totalPrincipal * 100) / 100).toFixed(2).toLocaleString(),
        totalInterest: (Math.round(totalInterest * 100) / 100).toFixed(2).toLocaleString(),
        totalCost: (Math.round(totalCost * 100) / 100).toFixed(2).toLocaleString(),
        monthlyBalance: (Math.round(balance * 100) / 100).toFixed(2).toLocaleString()
    }
}

// display table on the page
function displayLoan(stats) {

    let data = document.getElementById('calculation-table');
    data.innerHTML = '';

    const dataTemplate = document.getElementById('calculate-data');
    dataTemplate.content.cloneNode(true);

    document.getElementById('payment').textContent = stats.monthlyPayment;
    document.getElementById('principle').textContent = stats.totalPrincipal;
    document.getElementById('interest').textContent = stats.totalInterest;
    document.getElementById('balance').textContent = stats.monthlyBalance;

    let html = '';

    let tbody = document.getElementById('calculation-table');
    tbody.innerHTML = html;

    data.appendChild(dataTemplate)
}

// display stats
function displayStats(params) {


    document.getElementById('totalPrincipal').textContent = params.totalPrincipal;
    document.getElementById('totalInterest').textContent = params.totalInterest;
    document.getElementById('totalCost').textContent = params.totalCost;
    document.getElementById('displayPage').textContent = params.monthlyPayment
}
