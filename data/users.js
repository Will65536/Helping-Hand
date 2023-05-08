import { users } from "../config/mongoCollections.js";
import * as validation from "../validation.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

let exportedMethods = {

  async getUserById(id) {
    validation.isValidId(id);
    id = id.trim();
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (user == null) throw "Error: No user found";

    return user;
  },

  async seedUser(first_name, last_name, email, password, isHost,
    contact = "", bio="", skills = [], address="") {
    first_name = validation.isValidString(first_name);
    validation.isValidName(first_name);
    last_name = validation.isValidString(last_name);
    validation.isValidName(last_name);
    email = validation.isValidString(email.trim().toLowerCase());
    validation.isValidEmail(email);
    password = validation.isValidString(password);
    validation.validatePassword(password);
    contact = validation.isValidString(contact);
    bio = validation.isValidString(bio);
    skills = validation.isValidArray(skills, 'skills');
    address = validation.isValidString(address);
    
    let hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = await users();

    let info = await usersCollection.findOne({email: email})
    if(info) throw "Email already exists";
    
    var newUser = {
      first_name: first_name,
      last_name: last_name,
      contact: contact,
      email: email,
      password: hashedPassword,
      bio: bio,
      skills: skills,
      address: address,
      isHost: isHost
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    //console.log(insertInfo);
    if (!insertInfo.insertedId || !insertInfo.acknowledged)
      throw "Failed Inserting a user";
    else return insertInfo.insertedId.toString();
  },

  async addUser(first_name, last_name, birth_date, email, password, isHost) {
    first_name = validation.isValidString(first_name);
    validation.isValidName(first_name);
    last_name = validation.isValidString(last_name);
    validation.isValidName(last_name);
    if(!validation.isValidTimeStamp(birth_date)) {
      throw " Invalid birth_date timeStamp"
    }
    validation.isUserAdult(birth_date);
    email = validation.isValidString(email.trim().toLowerCase());
    validation.isValidEmail(email);
    password = validation.isValidString(password);
    validation.validatePassword(password);

    let hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = await users();

    let info = await usersCollection.findOne({email: email})
    if(info) throw "Email already exists";
    
    var newUser = {
      first_name: first_name,
      last_name: last_name,
      birth_date: birth_date,
      contact: "",
      email: email,
      password: hashedPassword,
      bio: "",
      skills: [],
      address: "",
      isHost: isHost
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    if (!insertInfo.insertedId || !insertInfo.acknowledged)
      throw "Failed Inserting a user";
    else return insertInfo.insertedId.toString();
  },

  async removeUser(id) {
    validation.isValidId(id);
    id = id.trim();

    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (deletionInfo.lastErrorObject.n === 0)
      throw [404, `Error: Could not delete user with id of ${id}`];

    return true;
  },


  async updateUserProfile(id, userInfo){
    id = validation.isValidString(id);
    validation.isValidId(id);
    let first_name = validation.isValidString(userInfo.first_name);
    validation.isValidName(first_name);
    let last_name = validation.isValidString(userInfo.last_name);
    validation.isValidName(last_name);
    let contact = validation.isValidString(userInfo.contact);
    let email = validation.isValidString(userInfo.email.trim().toLowerCase());
    validation.isValidEmail(email);
    let bio = validation.isValidString(userInfo.bio);
    let skills = validation.isValidArray(userInfo.skills, 'skills');
    let address = validation.isValidString(userInfo.address);

    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) throw `Error: No user found with id ${id}`;

    user.first_name = first_name;
    user.last_name = last_name;
    user.contact = contact;
    user.email = email;
    user.bio = bio;
    user.skills = skills;
    user.address = address;

    const updatedInfo = await usersCollection.updateOne({ _id: new ObjectId(id) }, {$set: user}, {returnDocument: "after"});

    if(!updatedInfo.acknowledged) throw `Error: Could not update user with id ${id}`;

    return updatedInfo.value
  },

  async updateUserPassword(id, newPassword) {
    validation.isValidId(id);
    let userDetails = null;
    try {
      userDetails = await this.getUserById(id);
    } catch (e) {
      throw e;
    }
    let change = false;
    let {
      first_name,
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
      user_feedback
    } = validation.checkInputs(
      userInfo.first_name,
      userInfo.last_name,
      userInfo.contact,
      userInfo.email,
      userInfo.bio,
      userInfo.skills,
      userInfo.address,
      userInfo.past_events,
      userInfo.current_events,
      userInfo.past_hosted_events,
      userInfo.current_hosted_events,
      userInfo.user_story 
    );
    if (
      userDetails.first_name != first_name ||
      userDetails.last_name != last_name ||
      userDetails.contact != contact ||
      userDetails.email!=email ||
      userDetails.bio!=bio ||
      JSON.stringify(userDetails.skills)!== JSON.stringify(skills)||
      userDetails.address!=address ||
      JSON.stringify(userDetails.user_story) !== JSON.stringify(user_story)||
      JSON.stringify(userInfo.current_events)!==JSON.stringify(current_events)||
      JSON.stringify(userInfo.current_hosted_events)!==JSON.stringify(current_hosted_events)
    ) {
      change = true;
    }
    userInfo={
        first_name,
      last_name,
      contact,
      email,
      bio,
      skills,
      address,
      current_events,
      current_hosted_events,
      user_story
    }
if(change)
{

    const userCollection = await users();

    const updateInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: userInfo },
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [
        404,
        `Error: Update failed, could not find a user with id of ${id}`,
      ];

    if (newUser.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${id}`];

    return {updatePasswordSuccess: true};
  }},

  async verifyUser(email,password) {
    let userData=await users();
    let user=await userData.findOne({"email": email});

    if(user === null){
      throw "No records found"
    }

    if(await bcrypt.compare(password,user.password)) {
      return {user_id:user._id,isLoggedIn:true,userInfo:user.first_name,ishost:user.isHost}
    }
    
    throw "Password incorrect!"
  }

};
export default exportedMethods;
