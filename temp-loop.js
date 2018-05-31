      var table = new Table({
        head: ['Department name', 'Total Sales']
      });
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].title, res[i].description, res[i].price]);
      }
      console.log(table.toString());
    });