const database = require("./database");


const getUsers = (req, res) => {

  database

    .query("select * from users")

    .then(([users]) => {

      res.json(users);

    })

    .catch((err) => {

      console.error(err);

      res.status(200).send("Ok");

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