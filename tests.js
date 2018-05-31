var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
  initialOptions();

});

function initialOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore store categories",
        "Find products by Category",
        "Find products by name",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore store categories":
        listCategories();
        break;

      case "Find products by Category":
        searchByType();
        break;

      case "Find products by name":
        productsNameSearch();
        break;

      }
    });
}


function productsNameSearch() {
  inquirer
  .prompt({
    name: "action",
    type: "input",
    message: "What would you like to search for?",
    
  })  .then(function(answer) {
    var query = "SELECT product_name, price FROM products WHERE product_name LIKE ?";
    connection.query(query, ["%" + answer.action + "%"] , function(err, res) {
      if(err) {
        console.log(err);
      }
        // console.log(res)
        for(var i = 0; i < res.length; i++) {
          console.log("Products with simlar names are: " + res[i].product_name + " || Price: $" + res[i].price  );
        }

      purchaseOptions();
    });
  })
}


function listCategories() {
  console.log("Selecting all product Categories ...\n");
  connection.query("SELECT DISTINCT department_name FROM products;", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Department: " + res[i].department_name );
    }
    chooseCatagory();
  });
}

function chooseCatagory() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What Catagory would you like to purchase from?",
      choices: [
        "Purchase Snacks Products",
        "Purchase Clothing Products",
        "Purchase Tools Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Purchase Snacks Products":
        dispSnacksProds();
        break;

      case "Purchase Clothing Products":
        dispClothingProds();
        break;

      case "Purchase Tools Products":
        dispToolsProds();
        break;  

      }
    });
}


function searchByType() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore Snacks Products",
        "Explore Clothing Products",
        "Explore Tools Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore Snacks Products":
        dispSnacksProds();
        break;

      case "Explore Clothing Products":
        dispClothingProds();
        break;

      case "Explore Tools Products":
        dispToolsProds();
        break;  

      }
    });
}

function dispSnacksProds() {
  console.log("Selecting all products in Snacks ...\n");
  connection.query("SELECT * FROM products WHERE department_name='Snacks'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispClothingProds() {
  console.log("Selecting all products in Clothing...\n");
  connection.query("SELECT * FROM products WHERE department_name='Clothing'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispToolsProds() {
  console.log("Selecting all products in Tools...\n");
  connection.query("SELECT * FROM products WHERE department_name='Tools'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}


function purchaseOptions() {
  inquirer
  .prompt([
    {
    name: "product_name",
    type: "input",
    message: "What Product would you like to purchase?"
    },
    {
    name: "order_quantity",
    type: "input",
    message: "How many would you like to purchase?"

    }
])
  .then(function(answer) {
    var query = "SELECT product_name, department_name, price, item_id, shipping FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name }, function(err, res) {
    
      console.log("You just purchased: " + answer.order_quantity + " " + res[0].product_name + "'s from the " + 
                  res[0].department_name + " Department! The price is $" + res[0].price + " each, the product ID is: " + 
                  res[0].item_id + ", and the shipping cost is: $" + res[0].shipping  );

          var queryP1 = "UPDATE products SET `stock_quantity` = `stock_quantity` -";
          var queryP2 = "`product_sales` = `product_sales` +";  
          var queryP3 = "WHERE `product_name` =?";        

      connection.query(queryP1, [answer.order_quantity], queryP2, [answer.order_quantity], queryP3, [answer.product_name],
        function (err, res) {
          if (err) {
            console.log(answer.order_quantity);
            console.log(err);
          }
          // console.log(res);
        }
      ); 
      addNewOrder(res[0].item_id, answer.order_quantity, res[0].shipping, res[0].department_name)
    });
  })
}

function addNewOrder(order_prod_id, order_quantity, shipping, department_name) {
  console.log("Insertig a new Order.... \n");
  var query2 = connection.query(
    "INSERT INTO orders SET ?",
    {
      order_prod_id,
      order_quantity,
      shipping,
      department_name,
    },
    function (err, res) {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log("Thanks for shopping with us!");
  connection.end();
}
