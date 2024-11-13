import User from "../models/VolontarioModel.js";

export const getVolontari = async (req, res) => {
  req.log.info("something");
  User.find({})
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// export const createUser = async (req, res) => {
//   console.log(req);
//   try {
//     // const user = new User(req.query);
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Errore nella creazione dell'utente" });
//   }
// };
