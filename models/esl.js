var mysqlModel = require('mysql');

var MyAppModel = mysqlModel.createPool({
  host     : 'localhost',
  agent	   :false,
  user     : 'root',
  password : 'ruixinihoin',
  database : 'warehouse',
  port:'3306',
  multipleStatements: true
});


module.exports = MyAppModel;
/*var mysql = require('mysql');
// 建立資料庫連線池
var pool  = mysql.createPool({
    host     : '10.1.1.77',
  user     : 'root',
  password : 'ruixinihoin',
  database : '2.4_test',
  port:'3306'
});

pool.getConnection(function(err, connection) {
            // 使用連線查詢完資料
			if(err) throw err
			
			console.log(connection);
			module.exports = true;
            // 釋放連線
            //connection.release();
            // 不要再使用釋放過後的連線了，這個連線會被放到連線池中，供下一個使用者使用
        });*/

