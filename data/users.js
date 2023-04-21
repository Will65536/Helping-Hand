import { users } from "../config/mongoCollections.js";
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
    firstName,
    lastName,
    user_contact,
    user_email,
    user_password,
    user_bio = "",
    user_skills = [],
    user_address = "",
    user_past_events = [],
    user_current_events = [],
    user_past_hosted_events=[],
    user_current_hosted_events=[],
    isHost,
    user_user_story = [],
    user_user_feedback = []
  ) {
    let{
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
      firstName,
      lastName,
      user_contact,
      user_email,
      user_bio,
      user_skills,
      user_address,
      user_past_events,
      user_current_events,
      user_past_hosted_events,
      user_current_hosted_events,
      user_user_story,
      user_user_feedback
    );
    let password = await bcrypt.hash(user_password,16);
    let user_since = new Date().getFullYear();
    let userData=await this.getAllUsers()
    let emails=userData.map(user => user.email);
    if(emails.includes(email))
    {
      throw "Error: User already exist"
    }
    let newUser = {
      first_name,
      last_name,
      contact,
      email,
      password,
      bio,
      skills,
      address,
      past_events,
      current_events,
      past_hosted_events,
      current_hosted_events,
      user_since,
      isHost,
      user_story,
      user_feedback
    };
    const usersCollection = await users();
    const insertUser = await usersCollection.insertOne(newUser);
    if (!insertUser.insertedId) throw "Failed Inserting a user";
    let newId=insertUser.insertedId;
    console.log(newId)
    return await this.getUserById(newId.toString());
  },
  async removeUser(id) {
    validation.isValidId(id);
    id=id.trim()
    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (deletionInfo.lastErrorObject.n === 0)
      throw [404, `Error: Could not delete user with id of ${id}`];

    //return {...deletionInfo.value, deleted: true};
    return true;
  },
  async updateUserDetails(id, userInfo) {
    id=id.toString()
    id=id.trim()
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

    return await updateInfo.value;
  }
  else
  {
    throw "No changes"
  }
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
