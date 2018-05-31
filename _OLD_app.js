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

      case "Find products by Type or Category":
        searchByType();
        break;

      case "Find products by name":
        productsNameSearch();
        break;

      }
    });
}

function purchaseOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do Now? You can:",
      choices: [
        "Purchase a Product",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore store categories":
        purchaseProduct();
        break;

      }
    });
}


function listCategories() {
  console.log("Choose a category to explore");
  inquirer.prompt([
    {
      type: "list",
      name: "catList",
      message: "What Category you like to explore? Please choose one",
      choices: ["Products listed in Snacks", "Products listed in Tools", "Products listed in Clothing"]
    }
  ]).then(function(answer) {
    switch (answer.action) {
    case "Products listed in Snacks":
      displaySnacksProducts();
      break;

    case "Products listed in Tools":
      displayToolsProducts();
      break;

    case "Products listed in Clothing":
      displayClothingProducts();
      break;

    }
  });
  
}

function displaySnacksProducts() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  });
}


function productsNameSearch() {
  inquirer
    .prompt({
      name: "product_name",
      type: "input",
      message: "What Product would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT product_name, department_name, price FROM products WHERE ?";
      connection.query(query, { product_name: answer.product_name }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Product: " + res[i].product_name +
                      " || Department: " + res[i].department_name +
                      " || Price: $" + res[i].price  );
        }
        purchaseOptions();
      });
    });
}

function purchaseOptions() {
  inquirer
  .prompt({
    name: "product_name",
    type: "input",
    message: "What Product would you like to purchase?"
  })
  .then(function(answer) {
    var query = "SELECT product_name, department_name, price FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("You just purchased the " + res[i].product_name + " for $" + res[i].price  );
      }
      // purchaseOptions();
      console.log("Thanks for shopping with us!");
      connection.end();
    });
  });
}







// function listCategories() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT position, song, year FROM top_songs WHERE ?";
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }

















// function productsNameSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT column_name1, column_name2 FROM table_name", function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }





// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top_songs WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }