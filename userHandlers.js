const database = require("./database");


const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if ( req.query.language != null) {
    where.push({
      column : "language",
      value: req.query.language,
      operator : "=",
    });
  }
  if (req.query.city !=null) {
    where.push({
      column:"city",
      value: req.query.city,
      operator:"=",
    })
  }
  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("select * from users where id = ?", [id])

    .then(([users]) => {

      if (users[0] != null) {

        res.json(users[0]);

      } else {

        res.status(404).send("Not Found");

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error retrieving data from database");

    });

};


const postUsers= (req, res) => {

  const { firstname, lastname, email, city, language } = req.body;


  database

    .query(

      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",

      [firstname, lastname, email, city, language]

    )

    .then(([result]) => {

      res.location(`/api/users/${result.insertId}`).sendStatus(201);

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error saving the movie");

    });

};

 const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
  
    database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0){
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
      })
      .catch((err) => {
      console.error(err)
      res.status(500).send("Error editing user")
    })
  }

  
const deleteUser = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("delete from users where id = ?", [id])

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error deleting the movie");

    });

};

module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUser,
    deleteUser,
}