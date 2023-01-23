const validateMovie = (req, res, next) => {
   const { title, director, year, color, duration } = req.body;
   const errors = [];

   if (!title) {
     errors.push({ field: "title", message: "This field is required" });
   }  else if (title.length >= 255) {
    errors.push({ field: "title", message: "Should contain less than 255 characters" });}
   
    if (!director) {
     errors.push({ field: "director", message: "This field is required" });
   } else if (director.length >= 255) {
    errors.push({ field: "director", message: "Should contain less than 255 characters" });}

   if (!year) {
     errors.push({ field: "year", message: "This field is required" });
   } else if (year.length !== 4 || year < 1895 || year > 2030) { 
     errors.push({ field: "year", message: "Should be between 1895 and 2030" });
   }
   if (!color) {
     errors.push({ field: "color", message: "This field is required" });}
      else if (color.length >= 255) {
    errors.push({ field: "color", message: "Should contain less than 255 characters" });
   }
   if (!duration) {
     errors.push({ field: "duration", message: "This field is required" });
   } else if (typeof(duration) !== "number") {
    errors.push({ field: "duration", message: "Should be a number" });}

   if (errors.length) {
     res.status(422).json({ validationErrors: errors });
   } else {
     next();
   }
};

const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
    const errors = [];

     if (!firstname) {
       errors.push({ field: "firstname", message: "This field is required" });
     } else if (firstname.length >= 255) {
       errors.push({
         field: "firstname",
         message: "Should contain less than 255 characters",
       });
     }

     if (!lastname) {
       errors.push({ field: "lastname", message: "This field is required" });
     } else if (lastname.length >= 255) {
       errors.push({
         field: "lastname",
         message: "Should contain less than 255 characters",
       });
     }

     if (!email) {
       errors.push({ field: "email", message: "This field is required" });
     } else if (!emailRegex.test(email)) {
       errors.push({ field: "email", message: "Invalid email" });
     } else if (email.length >= 255) {
       errors.push({
         field: "email",
         message: "Should contain less than 255 characters",
       });
     }
     if (!city) {
       errors.push({ field: "city", message: "This field is required" });
     } else if (city.length >= 255) {
       errors.push({
         field: "city",
         message: "Should contain less than 255 characters",
       });
     }
     if (!language) {
       errors.push({ field: "language", message: "This field is required" });
     } else if (language.length >= 255) {
       errors.push({
         field: "language",
         message: "Should contain less than 255 characters",
       });
     }

    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
};



module.exports = {
  validateMovie,
  validateUser
  };