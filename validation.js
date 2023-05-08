import { ObjectId } from "mongodb";
import fs from "fs";
import sharp from "sharp";

export function isValidString(str) {
  if (!str) {
    throw "Error: Value can't be empty";
  }
  if (typeof str !== "string") {
    throw "Error: Type should be string";
  }
  str = str.trim();
  if (str.length == 0) {
    throw "Error: inputs can't be empty";
  }
  return str;
}

export const isValidArray = (arr, arname) => {
  if (!Array.isArray(arr)) {
    throw `Error: ${arname} should be an array`;
  }
  if (arr.length == 0) {
    throw `Error: ${arname} list can't be empty`;
  }
  for (let i = 0; i < arr.length; i++) {
    isValidString(arr[i]);
    arr[i] = arr[i].trim();
  }
  return arr;
};

export function isValidId(id) {
  if (!id) {
    throw "Error: Valid Id must be provided";
  }
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0) throw "Error: Id cannot be empty or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
}

export function isValidContact(contact) {
  const r = /^\d{10}$/;
  let res = r.test(contact);
  if (res) {
    return contact.trim();
  }
  throw "Error: Contact number should be exactly 10 characters";
}

export function validatePassword(password) {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,.?'";:/<>\-])\S{8,}$/;
  if (regex.test(password)) {
    return password.trim();
  }
  throw "Error: Password should match the requirements[atleast 8 characters consisting atleast( 1 upper case, 1 number, 1 special character, 1 lower case)";
}

export function isUserAdult(birth_date) {
  let dob = new Date(birth_date);
  let now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) {
    age--;
  }
  if (age < 18) {
    throw "User should be atleast 18 years old";
  }
}

export function isValidEmail(email) {
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (r.test(email)) {
    return email;
  }
  throw "Error: invalid email";
}

export function isValidName(name) {
  if (name.length < 2) throw "Name cannot be less than 2 characters";
  if (name.length > 25) throw "Name cannot be more than 25 characters";
  if (name.trim().length === 0) throw "Name cannot be empty";
  if (!isNaN(name)) throw "Name cannot be a number";
}

export function isValidTimeStamp(timestamp) {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date);
}

export function isValidEventTime(timestamp, release_time) {
  if (!isValidTimeStamp(timestamp)) throw "Error: Invalid timestamp";
  const date = new Date(timestamp);
  const currentDate = new Date();
  if (date.getTime() < currentDate.getTime())
    throw "Error: Application Deadline should be in future";

  const releaseDate = new Date(release_time);
  releaseDate.setMonth(releaseDate.getMonth() + 6);
  if (date.getTime() > releaseDate.getTime())
    throw "Error: Application Deadline should be within 6 months from Release Date";

  return timestamp;
}

export function isValidLocation(location) {
  const keys = Object.keys(location);

  if (keys.length !== 4) {
    throw `Error: location object must have "address", "city", "state" and "zipcode" four keys`;
  }

  const expectedKeys = ["address", "city", "state", "zipcode"];
  for (const key of expectedKeys) {
    if (!keys.includes(key)) {
      throw `Error: location object must have "address", "city", "state" and "zipcode" four keys`;
    }
  }

  for (const key of expectedKeys) {
    location[key] = location[key].trim();
    if (location[key].length === 0) {
      throw "Error: location object has empty string value";
    }
  }

  return location;
}

export function isValidHostInfo(hostInfo) {
  const keys = Object.keys(hostInfo);

  if (keys.length !== 3) {
    throw `Error: hostInfo object must have "host_id", "host_name", "contact" three keys`;
  }

  const expectedKeys = ["host_id", "host_name", "contact"];
  for (const key of expectedKeys) {
    if (!keys.includes(key)) {
      throw `Error: hostInfo object must have "host_id", "host_name", "contact" three keys`;
    }
  }

  hostInfo.host_id = hostInfo.host_id.trim();
  isValidId(hostInfo.host_id);

  hostInfo.host_name = isValidString(hostInfo.host_name);

  isValidEmail(hostInfo.contact);

  return hostInfo;
}

export function isValidStory(story) {
  const keys = Object.keys(story);

  if (keys.length !== 5) {
    throw `Error: story object must have "_id", "volunteer_id", "volunteer_fname", "volunteer_lname", "story_comment" five keys`;
  }

  const expectedKeys = [
    "_id",
    "volunteer_id",
    "volunteer_fname",
    "volunteer_lname",
    "story_comment",
  ];
  for (const key of expectedKeys) {
    if (!keys.includes(key)) {
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

export function isValidStoryString(story){
  if(story.split(" ").length < 20){
    throw "Error: story must be at least 20 words long";
  }
}

export function isValidFeedback(feedback) {
  const keys = Object.keys(feedback);

  if (feedback.length !== 5) {
    throw `Error: feedback object must have "_id", "volunteer_id", "first_name", "last_name", "feedback_comment" four keys`;
  }

  const expectedKeys = [
    "_id",
    "volunteer_id",
    "first_name",
    "last_name",
    "feedback_comment",
  ];
  for (const key of expectedKeys) {
    if (!keys.includes(key)) {
      throw `Error: feedback object must have "_id", "volunteer_id", "first_name", "last_name", "feedback_comment" four keys`;
    }
  }

  _id = feedback._id.toString().trim();
  isValidId(_id);

  if (feedback.volunteer_id) {
    volunteer_id = feedback.volunteer_id.toString().trim();
    isValidId(volunteer_id);
  }

  feedback.first_name = isValidString(feedback.first_name);
  feedback.last_name = isValidString(feedback.last_name);
  feedback.feedback_comment = isValidString(feedback.feedback_comment);

  return feedback;
}


export function isValidFeedbackString(story){
  if(story.split(" ").length < 10){
      throw "Error: story must be at least 10 words long";
  }
}

export function isValidImageUrls(image_urls) {
  const imageRegex = /\.(gif|jpg|jpeg|tiff|png|avif)/i;

  for(let image_url of image_urls) {
    image_url = isValidString(image_url);
    if (imageRegex.test(image_url)) {
      return image_url;
    } else {
      throw "Invalid image URL";
    }
  }
}

export function checkEventsInputs(
  event_name,
  description,
  application_deadline,
  host_time,
  location,
  host_info,
  image_urls = [],
  volunteers = [],
  stories = [],
  feedbacks = [],
  likes = []
) {
  event_name = isValidString(event_name);
  description = isValidString(description);

  application_deadline = isValidEventTime(application_deadline);
  host_time = isValidEventTime(host_time);

  location = isValidLocation(location, "location");
  host_info = isValidHostInfo(host_info, "host_info");

  if (image_urls) {
    image_urls = isValidImageUrls(image_urls);
  }

  if (stories.length !== 0) {
    for (let i = 1; i < stories.length; i++) {
      stories[i] = isValidStory(stories[i]);
    }
  }

  if (feedbacks.length !== 0) {
    for (let i = 1; i < feedbacks.length; i++) {
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
    likes,
    image_urls,
  };
}

export function searchObject(obj, regex) {
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      if (searchObject(obj[prop], regex)) {
        return true;
      }
    } else if (obj[prop]) {
      if (regex.test(obj[prop])) {
        return true;
      }
    }
  }
  return false;
}

export function imageToAlt(image_url) {
  sharp(image_url)
    .metadata()
    .then((metadata) => {
      const altText = metadata.exif.ImageDescription;
      return altText;
    })
    .catch((err) => {
      console.log(err);
    });
}
