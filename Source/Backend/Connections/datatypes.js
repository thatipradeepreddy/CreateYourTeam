import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  nation: { type: String, required: true },
  ranking: { type: String, required: true },
  premierLeague: { type: String, required: true },
  image: { type: String, required: true },
  wikipediaUrl: { type: String, required: true }
});

const CricketersSchema = mongoose.Schema({
  place: { type: String, required: true, unique: true },
  player: [PlayerSchema],
});

const SignUpSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const LoginSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export { CricketersSchema, SignUpSchema, LoginSchema };
