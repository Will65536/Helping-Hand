import {ObjectId} from 'mongodb';

export function isValidString(str)
{
    
    if(!str)
    {
        throw "Error: Value can't be empty"
    }
    if(typeof str!=='string')
    {
        throw "Error: Type should be string"
    }
    str=str.trim()
    if(str.length==0)
    {
        throw "Error: inputs can't be empty"
    }
    return str

}
export const isValidArray=(arr,arname)=>
{
if(!Array.isArray(arr))
{
  throw `Error: ${arname} should be an array`
}
if(arr.length==0)
{
  throw `Error: ${arname} list can't be empty`
}
for(let i=0;i<arr.length;i++)
{
  isValidString(arr[i])
  arr[i]=arr[i].trim()
}
return arr
}

export function isValidId(id)
{
  if (!id)
  {
    throw 'Error: Valid Id must be provided';
  } 
  if (typeof id !== 'string') throw 'Error: Id must be a string';
  if (id.trim().length === 0)
    throw 'Error: Id cannot be empty or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
}

export function isValidContact(contact)
{
    const r = /^\d{10}$/;
    let res= r.test(contact)
    if(res)
    {
      return contact.trim()
    }
    throw "Error: Contact number should be exactly 10 characters"
}
export function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,.?'";:/<>\-])\S{8,}$/;
  if(regex.test(password)){
    return password.trim()
  }
  throw "Error: Password should match the requirements[atleast 8 characters consisting atleast( 1 upper case, 1 number, 1 special character, 1 lower case)"
}
export function isUserAdult(d) {
  let dob = new Date(d);
  let now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) {
    age--;
  }
  return age >= 18;
}


export function isValidEmail(email) {
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(r.test(email))
  {
    return true
  }
  throw "Error: invalid email"
}

export function isValidName(name){
  if(name.length < 2) throw "Name cannot be less than 2 characters";
  if(name.length > 25) throw "Name cannot be more than 25 characters";
  if(name.trim().length === 0) throw "Name cannot be empty";
  if(!isNaN(name)) throw "Name cannot be a number";
}

export function isValidTime(time, timeName) {
  if(typeof time !== 'string') {
    throw `Error: ${timeName} is not a string`;
  }

  time = time.trim();
  
  if(time.length === 0) {
    throw `Error: ${timeName} should not be empty string`;
  }

  const regex = /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} (AM|PM)$/;
  if (!regex.test(time)) {
    throw `Error: ${timeName} is not in valid format`;
  }
  
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const now = new Date();
  const currentYear = now.getFullYear();

  if(month >= 1 && month <= 12 &&
  day >= 1 && day <= new Date(year, month, 0).getDate() &&
  year >= currentYear && year <= currentYear + 3 &&
  hour >= 0 && hour <= 24 &&
  minute >= 0 && minute <= 59) {
    return time;
  }else {
    throw `Error: ${timeName} has some invalid time numbers`;
  }
}

export function isValidLocation(location) {
  const keys = Object.keys(location);
  
  if(keys.length !== 4) {
    throw `Error: location object must have "address", "city", "state" and "zipcode" four keys`;
  }

  const expectedKeys = ["address", "city", "state", "zipcode"];
  for(const key of expectedKeys) {
    if(!keys.includes(key)) {
      throw `Error: location object must have "address", "city", "state" and "zipcode" four keys`;
    }
  }

  for(const key of expectedKeys) {
    location[key] = location[key].trim();
    if(location[key].length === 0) {
      throw "Error: location object has empty string value";
    }
  }

  return location;
}

export function isValidHostInfo(hostInfo) {
  const keys = Object.keys(hostInfo);

  if(keys.length !== 3) {
    throw `Error: hostInfo object must have "host_id", "host_name", "contact" three keys`;
  }

  const expectedKeys = ["host_id", "host_name", "contact"];
  for(const key of expectedKeys) {
    if(!keys.includes(key)) {
      throw `Error: hostInfo object must have "host_id", "host_name", "contact" three keys`;
    }
  }

  hostInfo.host_id = hostInfo.host_id.trim();
  isValidId(hostInfo.host_id);

  hostInfo.host_name = isValidString(hostInfo.host_name);

  hostInfo.contact = hostInfo.contact.trim().toLowerCase()
  isValidEmail(hostInfo.contact);

  return hostInfo;
}

export function isValidStory(story) {
  const keys = Object.keys(story);

  if(keys.length !== 5) {
    throw `Error: story object must have "_id", "volunteer_id", "volunteer_fname", "volunteer_lname", "story_comment" five keys`;
  }

  const expectedKeys = ["_id", "volunteer_id", "volunteer_fname", "volunteer_lname", "story_comment"];
  for(const key of expectedKeys) {
    if(!keys.includes(key)) {
      throw `Error: story object must have "_id", "volunteer_id", "volunteer_fname", "volunteer_lname", "story_comment" five keys`;
    }
  }

  _id = story._id.toString().trim();
  isValidId(_id);
  story.volunteer_id = story.volunteer_id.trim();
  isValidId(story.volunteer_id);

  story.volunteer_fname = isValidString(story.volunteer_fname);
  story.volunteer_lname = isValidString(story.volunteer_lname);
  story.story_comment = isValidString(story.story_comment);

  return story;
}

export function isValidFeedback(feedback) {
  const keys = Object.keys(feedback);

  if(feedback.length !== 4) {
    throw `Error: feedback object must have "_id", "first_name", "last_name", "feedback_comment" four keys`;
  }

  const expectedKeys = ["_id", "first_name", "last_name", "feedback_comment"];
  for(const key of expectedKeys) {
    if(!keys.includes(key)) {
      throw `Error: feedback object must have "_id", "first_name", "last_name", "feedback_comment" four keys`;
    }
  }

  _id = feedback._id.toString().trim();
  isValidId(_id);

  feedback.first_name = isValidString(feedback.first_name);
  feedback.last_name = isValidString(feedback.last_name);
  feedback.feedback_comment = isValidString(feedback.feedback_comment);

  return feedback;
}

export function checkInputs(
  first_name,
    last_name,
    contact,
    email,
    bio = "",
    skills = [],
    address = "",
    past_events = [],
    current_events=[],
    past_hosted_events=[],
    current_hosted_events=[],
    user_story=[],
    user_feedback=[]
)
{
  first_name=isValidString(first_name)
    last_name=isValidString(last_name)
    contact=isValidContact(contact)
    email=email.trim().toLowerCase()

    isValidEmail(email)
    bio=bio.trim()
    if(skills.length)
    {
        skills=isValidArray(skills)
    }
    address=address.trim()
    if(past_events.length)
    {
        past_events=isValidArray(past_events)
    }
    if(current_events.length)
    {
        current_events=isValidArray(current_events)
    }
    if(past_hosted_events.length)
    {
        past_hosted_events=isValidArray(past_hosted_events)
    }
    if(current_hosted_events.length)
    {
        current_hosted_events=isValidArray(current_hosted_events)
    }
    if(user_story.length)
    {
        user_story=isValidArray(user_story)
    }
    if(user_feedback.length)
    {
      user_feedback=isValidArray(user_feedback)
    }
    return {first_name,
    last_name,
    contact,
    email,
    bio,
    skills ,
    address,
    past_events,
    current_events,
    past_hosted_events,
    current_hosted_events,
    user_story,
    user_feedback}
    
}

export function checkEventsInputs(
  event_name,
  description,
  application_deadline,
  host_time,
  location,
  host_info,
  volunteers = [],
  stories = [],
  feedbacks = [],
  likes = 0
) {
  event_name = isValidString(event_name);
  description = isValidString(description);
  application_deadline = isValidTime(application_deadline, "application_deadline");
  host_time = isValidTime(host_time, "host_time");
  location = isValidLocation(location, "location");
  host_info = isValidHostInfo(host_info, "host_info");

  if(stories.length !== 0) {
    for(let i = 1; i < stories.length; i++) {
      stories[i] = isValidStory(stories[i]);
    }
  }

  if(feedbacks.length !== 0) {
    for(let i = 1; i < feedbacks.length; i++) {
      feedbacks[i] = isValidFeedback(feedbacks[i]);
    }
  }

  return {
    event_name,
    description,
    application_deadline,
    host_time,
    location,
    volunteers,
    host_info,
    stories,
    feedbacks,
    likes
  };
}