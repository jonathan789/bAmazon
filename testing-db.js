var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mystore_db"
});

connection.connect(function(err) {
  if (err) throw err;
  // displaySnacksProducts();
  displayClothingProducts();


});

function displaySnacksProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products WHERE department_name='Snacks'", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

function displayClothingProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products WHERE department_name='Clothing'", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
