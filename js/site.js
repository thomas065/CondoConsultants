// get the user's input
function getUserInfo() {
    let loanAmount = document.getElementById('loanAmount').value;
    let monthlyTerm = document.getElementById('monthlyTerm').value;
    let interestRate = document.getElementById('interestRate').value;

    loanAmount = parseInt(loanAmount);
    monthlyTerm = parseInt(monthlyTerm);
    interestRate = parseFloat(interestRate);

    // if the results are NOT A NUMBER
    if (isNaN(loanAmount) || isNaN(monthlyTerm) || isNaN(interestRate) || loanAmount <= 0 || monthlyTerm <= 0 || interestRate <= 0) {
        Swal.fire ({
            icon: 'error',
            backdrop: false,
            title: `Oops!`,
            text: `Please enter valid numbers for your loan.`
        })
    } else {

        let newHome = calculateLoan(loanAmount, monthlyTerm, interestRate);
        displayStats(newHome);

        // let payments = calculateLoanTable(loanAmount, monthlyTerm, interestRate);
        // displayLoanTable(payments)
    }
}

// do the calculations
function calculateLoan(loan, term, interest) {
    // Convert annual interest rate to monthly by 12 and 100 to convert from percentage to a whole decimal number
    const monthlyInterestRate = interest / 1200;

    // calculate the number of monthly payments
    const numberOfPayments = parseInt(term);

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

    let formatOptions = {
        style: 'currency',
        currency: 'USD'
    }

    return {
        monthlyPayment: monthlyPayment.toLocaleString('en-US', formatOptions),
        totalPrincipal: totalPrincipal.toLocaleString('en-US', formatOptions),
        totalInterest: totalInterest.toLocaleString('en-US', formatOptions),
        totalCost: totalCost.toLocaleString('en-US', formatOptions),
        monthlyBalance: balance.toLocaleString('en-US', formatOptions)
    }
}

// display stats
function displayStats(params) {

    document.getElementById('totalPrincipal').textContent = params.totalPrincipal;
    document.getElementById('totalInterest').textContent = params.totalInterest;
    document.getElementById('totalCost').textContent = params.totalCost;
    document.getElementById('displayPage').textContent = params.monthlyPayment
}

// calculate table on the page
// function calculateLoanTable() {
//     let data = document.getElementById('calculation-table');

//     let table = [
//         {
//             month: month,
//             payment: monthlyPayment,
//             principal: principalPayment,
//             interest: interest,
//             total_interest: total_interest,
//             balance: loanAmount,
//         },
//     ];

//     const dataTemplate = document.getElementById('calculate-data');

//     paymentsArr.forEach(table => {
//         let tableRow = dataTemplate.content.cloneNode(true);

//         let tableCells = tableRow.querySelectorAll('td');

//         tableCells[0].textContent = table.month;
//         tableCells[1].textContent = table.payment.toLocaleString('en-US', formatOptions);
//         tableCells[2].textContent = table.principal.toLocaleString('en-US', formatOptions);
//         tableCells[3].textContent = table.interest.toLocaleString('en-US', formatOptions);
//         tableCells[4].textContent = table.total_interest.toLocaleString('en-US', formatOptions);
//         tableCells[5].textContent = Math.abs(table.balance).toLocaleString('en-US', formatOptions);

//         paymentsTable.appendChild(tableRow)
//     });
// }
