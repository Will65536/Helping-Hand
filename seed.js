import { ObjectId } from "mongodb"
import {userData,eventData} from "./data/index.js"

try
{
    await userData.addUser("John",
    'Doe',
    'John@example.com',
    'John@1234',
    true)
}
catch(e)
{
    console.log(e)
}

try{
console.log(await eventData.addEvent(
    "Charity Run",
    "Join us for a charity run to raise funds for children in need. We'll be running a 5K race and all proceeds will go towards providing education and healthcare to underprivileged children.",
    "10/15/2023 11:59 PM",
    "11/05/2023 8:00 AM",
    {
        "address": "Central Park",
        "city": "New York",
        "state": "NY",
        "zipcode": "10019"
        },
    {
        "host_id": new ObjectId().toString(),
        "host_name": "Save the Children",
        "contact": "info@savethechildren.org"
    },
    "Event for charity run",
    "run.jpg"
    ))
}
catch(e)
{
    console.log(e)
}
    try
    {
        await eventData.addEvent(
    "Community Garden Cleanup",
    "Join us for a community garden cleanup. We'll be removing weeds and debris from the garden beds and making our garden cleaner and more beautiful for everyone to enjoy.",
    "06/15/2023 5:00 PM",
    "07/01/2023 9:00 AM",
    {
       
        "address": "Central Park",
        "city": "New York",
        "state": "NY",
        "zipcode": "10019"
    },
    {
        "host_id": "612f1d407166d132d38f80e1",
        "host_name": "Save the Children",
        "contact": "info@savethechildren.org"
    },
    "Event for garden cleanup",
    "garden_clean.jpeg"
    )
}
catch(e)
{
    console.log(e)
}
    
   try{

   await eventData.addEvent (
    "Beach Cleaning",
    "Join our beach cleaning event.",
    "09/01/2023 11:59 PM",
    "09/15/2023 7:00 PM",
    {
        
        "address": "Atlanta beach",
        "city": "Atlanta",
        "state": "GA",
        "zipcode": "10019"
    },
    {
        "host_id": "612f1d407166d132d38f80e1",
        "host_name": "Beach_cleaners",
        "contact": "info@savethechildren.org"
    },
    "event for beach cleaning",
    "beach_clean_graphic.avif"
    )
}
catch(e)
{
    console.log(e)
}

try{

    await eventData.addEvent (
     "Virtual Book Club",
     "Join our virtual book club to discuss the latest bestsellers and share your thoughts on your favorite books. This is a great opportunity to connect with fellow book lovers and discover new authors.",
     "09/01/2023 11:59 PM",
     "09/15/2023 7:00 PM",
     {
         
         "address": "Central Park",
         "city": "New York",
         "state": "NY",
         "zipcode": "10019"
     },
     {
         "host_id": "612f1d407166d132d38f80e1",
         "host_name": "Save the Children",
         "contact": "info@savethechildren.org"
     },
     "event for virtual book club",
     "bookclub.jpeg"
     )
 }
 catch(e)
 {
     console.log(e)
 }