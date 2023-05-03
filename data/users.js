import { users, events } from "../config/mongoCollections.js";
import * as validation from "../validation.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

let exportedMethods = {
  async getAllUsers() {
    let usersCollection = await users();
    const usersList = await usersCollection.find({}).toArray();
    const newList = usersList.map(({_id,first_name,
      last_name,
      contact,
      email,
      bio,
      skills,
      address,
      past_events,
      current_events,
      past_hosted_events,
      current_hosted_events,
      user_story,
      user_feedback }) => ({_id, first_name,
        last_name,
        contact,
        email,
        bio,
        skills,
        address,
        past_events,
        current_events,
        past_hosted_events,
        current_hosted_events,
        user_story,
        user_feedback }));


    return newList
  },

  async getUserById(id) {
    validation.isValidId(id);
    id=id.trim()
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id)});
    if (user==null) throw "Error: No user found";
    
    return user;
  },

  async addUser(
    first_name,
    last_name,
    email,
    password,
    isHost
  ) {
    first_name = validation.isValidString(first_name);
    validation.isValidName(first_name);
    last_name = validation.isValidString(last_name);
    validation.isValidName(last_name);
    email = validation.isValidString(email.trim().toLowerCase());
    validation.isValidEmail(email);
    password = validation.isValidString(password);
    validation.validatePassword(password);
    
    let hashedPassword = await bcrypt.hash(password,10);

    let user_since = new Date().getFullYear();

    const usersCollection = await users();
    let info = await usersCollection.findOne({email: email})
    if(info) throw "Email already exists";
    
    if(isHost) {
      var newUser = {
        first_name: first_name,
        last_name: last_name,
        contact: "",
        email: email,
        password: hashedPassword,
        bio: "",
        skills: [],
        address: "",
        past_hosted_events: [],
        current_hosted_events: [],
        user_since: user_since,
        isHost: isHost,
        user_story: [],
        user_feedback: []
      };
    }else {
      var newUser = {
        first_name: first_name,
        last_name: last_name,
        contact: "",
        email: email,
        password: hashedPassword,
        bio: "",
        skills: [],
        address: "",
        past_events: [],
        current_events: [],
        user_since: user_since,
        isHost: isHost,
        user_story: [],
        user_feedback: []
      };
    }

    const insertInfo = await usersCollection.insertOne(newUser);
    if (!insertInfo.insertedId || !insertInfo.acknowledged) throw "Failed Inserting a user";
    else return true
  },

  async removeUser(id) {
    validation.isValidId(id);
    id=id.trim();
    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (deletionInfo.lastErrorObject.n === 0)
      throw [404, `Error: Could not delete user with id of ${id}`];

    //return {...deletionInfo.value, deleted: true};
    return true;
  },

  async updateUserPassword(id, newPassword) {
    validation.isValidId(id);
    id=id.trim();
    password = validation.isValidString(password);
    validation.validatePassword(password);

    let newHashedPassword = await bcrypt.hash(newPassword,10);

    const usersCollection = await users();
    const newUser = await usersCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: {password: newHashedPassword}},
      {returnDocument: 'after'}
    );

    if (newUser.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${id}`];

    return {updatePasswrodSuccess: true};
  },

  async getFullnames()
  {
    let userData=await users();
  const participants = await userData.find({}).toArray();
  let p=participants.map(user => user.first_name + ' ' + user.last_name);
  if(!participants.length)
  {
    throw "No users in the database"
  }
  return p
  },

  async verifyUser(email,password)
  {
    let userData=await users();
    let user=await userData.findOne({email})
    if(user==null)
    {
      throw "No records found"
    }
    if(await bcrypt.compare(password,user.password))
    {
      return true
    }
    throw "Password incorrect!"
  }
};

export default exportedMethods;
