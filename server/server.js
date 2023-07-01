var express = require('express'); // оснастка веб сервера
var app = express();
var mysql = require('mysql2'); // клиент для MS SQL Server


// Создание пула соединений
const pool = mysql.createPool({
  host: "sql7.freesqldatabase.com",
  user: "sql7629397",
  database: "sql7629397",
  password: "psWXF3izjZ",
  port: '3306',
  connectionLimit: 10 // Максимальное количество соединений в пуле
});

// Обработчик маршрута '/tasks'
app.get('/tasks', function (req, res) {
  // Получение соединения из пула
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error('Ошибка при получении соединения из пула:', err.message);
      res.status(500).send('Ошибка при подключении к базе данных');
      return;
    }

    // Выполнение запроса к базе данных
    connection.query('SELECT * FROM tasks', function (err, results, fields) {
      // Освобождение соединения обратно в пул
      connection.release();

      if (err) {
        console.log(err);
        res.status(500).send('Ошибка при выполнении запроса к базе данных');
      } else {
        console.log(results);
        res.json(results); // Отправляем результат в формате JSON клиенту
      }
    });
  });
});

// Запуск сервера
// сервер для http://localhost:8081/
var server = app.listen(8081, function (err) {
  var host = server.address().address
  console.log(err);
  var port = server.address().port
  console.log(host);
  console.log('сервер доступен ')
});
