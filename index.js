const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const client = require("./db/dbconn");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://sanskrit-literature-cms.herokuapp.com",
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.send("Server is running !");
});

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One week
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // console.log(user.id);
  gId = user.id;
  return done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log("Inside deserializer:", userId);

  client
    .db()
    .collection("users")
    .findOne(
      {
        googleId: userId,
      },
      function (err, doc) {
        if (err) throw err;
        console.log(doc);
        return done(null, doc);
      }
    );
});

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      (async function () {
        await client
          .db()
          .collection("users")
          .updateOne(
            { googleId: profile.id },
            {
              $setOnInsert: {
                googleId: profile.id,
                username: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                image: profile.photos[0].value,
              },
            },
            { upsert: true }
          );
      })();

      cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://sanskrit-literature-cms.herokuapp.com",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://sanskrit-literature-cms.herokuapp.com/dashboard");
  }
);

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(200, "/");
    });
  } else {
    res.send("No User to be Logged Out!");
  }
});

app.use(require("./routes/text"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use("/static", express.static(path.join("/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
// else {
//   app.get("/", (req, res) => {
//     res.send("Server is running!");
//   });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started!");
});
