// ~ Made By Nourhan Farid Abo Baker 

// ? SideBar:
// ? ==================================
$(".btn").click(function () {
  $(this).toggleClass("click");
  $(".sidebar").toggleClass("show");
});
$(".feat-btn").click(function () {
  $("nav ul .feat-show").toggleClass("show");
  $("nav ul .first").toggleClass("rotate");
});
$(".serv-btn").click(function () {
  $("nav ul .serv-show").toggleClass("show1");
  $("nav ul .second").toggleClass("rotate");
});
$("nav ul li").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
});

// ? =====================================

const data = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" },
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1250 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 1, date: "2022-01-03", amount: 1300 },
    { id: 4, customer_id: 1, date: "2022-01-04", amount: 2500 },
    { id: 5, customer_id: 1, date: "2022-01-05", amount: 800 },
    { id: 6, customer_id: 1, date: "2022-01-06", amount: 2100 },
    { id: 7, customer_id: 1, date: "2022-01-07", amount: 1350 },
    { id: 8, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 9, customer_id: 2, date: "2022-01-02", amount: 1550 },
    { id: 10, customer_id: 2, date: "2022-01-03", amount: 2550 },
    { id: 11, customer_id: 2, date: "2022-01-04", amount: 1250 },
    { id: 12, customer_id: 2, date: "2022-01-05", amount: 750 },
    { id: 13, customer_id: 2, date: "2022-01-06", amount: 1300 },
    { id: 14, customer_id: 3, date: "2022-01-01", amount: 900 },
    { id: 15, customer_id: 3, date: "2022-01-02", amount: 8300 },
    { id: 16, customer_id: 3, date: "2022-01-03", amount: 7500 },
    { id: 17, customer_id: 3, date: "2022-01-04", amount: 5000 },
    { id: 18, customer_id: 3, date: "2022-01-05", amount: 1250 },
    { id: 19, customer_id: 4, date: "2022-01-01", amount: 1750 },
    { id: 20, customer_id: 4, date: "2022-01-02", amount: 2750 },
    { id: 21, customer_id: 4, date: "2022-01-03", amount: 2550 },
    { id: 22, customer_id: 4, date: "2022-01-04", amount: 750 },
    { id: 23, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 24, customer_id: 5, date: "2022-01-02", amount: 2100 },
    { id: 25, customer_id: 5, date: "2022-01-03", amount: 1500 },
    { id: 26, customer_id: 5, date: "2022-01-04", amount: 3500 },
  ],
};

// & Display Table
// & ============================
function displayTable(customers, transactions) {
  const tbody = document.getElementById("customersBody");
  tbody.innerHTML = "";
  customers.forEach((customer) => {
    const customerTransactions = transactions.filter(
      (t) => t.customer_id === customer.id
    );
    customerTransactions.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${transaction.id}</td>
                        <td>${customer.name}</td>
                        
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    `;
      tbody.appendChild(row);
    });
  });
}

// & ============================


// ^ Filiter Data:
// ^ ============================

function filterTable() {
  const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
  const amountFilter = document.getElementById("amountFilter").value;

  const filteredCustomers = data.customers.filter((customer) =>
    customer.name.toLowerCase().includes(nameFilter)
  );

  const filteredTransactions = data.transactions.filter(
    (transaction) => !amountFilter || transaction.amount >= amountFilter
  );

  displayTable(filteredCustomers, filteredTransactions);

  // Render chart for the first filtered customer if any
  if (filteredCustomers.length > 0) {
    renderChart(filteredCustomers[0].id);
  }
  else {
      clearChart();
  }
}
// ^ ============================

// * Display Chart:
// * ============================
let chartInstance;
function renderChart(customerId, customerName) {
  const filteredTransactions = data.transactions.filter(
    (t) => t.customer_id === customerId
  );
  const filteredCustomers = data.customers.filter(
    (t) => t.name === customerName
  );

  const transactionAmounts = {};

  filteredTransactions.forEach((transaction) => {
    const date = transaction.date;
    transactionAmounts[date] =
      (transactionAmounts[date] || 0) + transaction.amount;
  });

  const labels = Object.keys(transactionAmounts);
  const amounts = Object.values(transactionAmounts);

  const ctx = document.getElementById("transactionChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Transaction Amount",
          data: amounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderRadius: 10,
          barThickness: 20,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const index = tooltipItem.dataIndex;
              return `Customer: ${filteredCustomers[index].name}, Amount: ${tooltipItem.raw}, Date: ${filteredTransactions[index].date}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// * ============================
function clearChart() {
  const ctx = document.getElementById("transactionChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }
}


document.getElementById("nameFilter").addEventListener("input", filterTable);
document.getElementById("amountFilter").addEventListener("input", filterTable);


displayTable(data.customers, data.transactions);
