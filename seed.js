import {userData,eventData} from "./data/index.js"
import {dbConnection, closeConnection} from './config/mongoConnection.js';

// const db = await dbConnection();
// awaitdb.dropDatabase();

const events_data = [
    {
      "event_name": "'Run for a Cause'",
      "description": "'Join us for a run to raise awareness and funds for a local charity.'",
      "application_deadline": 1689055957303,
      "host_time": 1689142357303,
      "location": {
        "address": "854 Lawn Circle",
        "city": "Bozeman",
        "state": "MT",
        "zipcode": "59771"
      }
    },
    {
      "event_name": "'Charity Auction'",
      "description": "'Bid on unique and valuable items donated by local businesses and individuals to support a good cause.'",
      "application_deadline": 1683785557303,
      "host_time": 1683871957303,
      "location": {
        "address": "5 Delaware Place",
        "city": "Miami",
        "state": "FL",
        "zipcode": "33185"
      }
    },
    {
      "event_name": "'Benefit Concert'",
      "description": "'Enjoy live music while supporting a charity that helps people in need.'",
      "application_deadline": 1683871957303,
      "host_time": 1683958357303,
      "location": {
        "address": "72819 Lakeland Point",
        "city": "Rochester",
        "state": "NY",
        "zipcode": "14614"
      }
    },
    {
      "event_name": "'Walk for a Cure'",
      "description": "'Join us for a walk to raise awareness and funds for research on a life-threatening disease.'",
      "application_deadline": 1689055957303,
      "host_time": 1689142357303,
      "location": {
        "address": "4434 Bonner Center",
        "city": "Lake Worth",
        "state": "FL",
        "zipcode": "33462"
      }
    },
    {
      "event_name": "'Charity Bake Sale'",
      "description": "'Satisfy your sweet tooth while supporting a good cause.'",
      "application_deadline": 1690611157303,
      "host_time": 1690697557303,
      "location": {
        "address": "3 Hoepker Hill",
        "city": "Irvine",
        "state": "CA",
        "zipcode": "92619"
      }
    },
    {
      "event_name": "'Community Service Day'",
      "description": "'Volunteer your time to help out a local charity and make a difference in your community.'",
      "application_deadline": 1687673557303,
      "host_time": 1687759957303,
      "location": {
        "address": "6 Larry Way",
        "city": "Plano",
        "state": "TX",
        "zipcode": "75074"
      }
    },
    {
      "event_name": "'Charity Gala'",
      "description": "'Dress up and attend an elegant evening of dinner and entertainment to support a charity that makes a difference.'",
      "application_deadline": 1686291157303,
      "host_time": 1686377557303,
      "location": {
        "address": "8509 4th Terrace",
        "city": "Houston",
        "state": "TX",
        "zipcode": "77206"
      }
    },
    {
      "event_name": "'Food Drive'",
      "description": "'Collect non-perishable food items to help feed those who are food insecure.'",
      "application_deadline": 1684390357303,
      "host_time": 1684476757303,
      "location": {
        "address": "28262 Badeau Terrace",
        "city": "Columbus",
        "state": "MS",
        "zipcode": "39705"
      }
    },
    {
      "event_name": "'5K Color Run'",
      "description": "Join a fun run where you'll be doused in vibrant colors to raise funds for a charity.",
      "application_deadline": 1687673557303,
      "host_time": 1687759957303,
      "location": {
        "address": "856 Walton Drive",
        "city": "Birmingham",
        "state": "AL",
        "zipcode": "35285"
      }
    },
    {
      "event_name": "'Charity Golf Tournament'",
      "description": "'Participate in a golf tournament to raise funds for a charity that makes a difference.'",
      "application_deadline": 1691561557303,
      "host_time": 1691647957303,
      "location": {
        "address": "6 Hoard Crossing",
        "city": "Washington",
        "state": "DC",
        "zipcode": "20566"
      }
    },
    {
      "event_name": "'Virtual Charity Challenge'",
      "description": "'Join a virtual challenge to raise funds for a charity and make a difference from the comfort of your own home.'",
      "application_deadline": 1685254357303,
      "host_time": 1685340757303,
      "location": {
        "address": "1 Ludington Crossing",
        "city": "Stamford",
        "state": "CT",
        "zipcode": "06912"
      }
    },
    {
      "event_name": "'Charity Bike Ride'",
      "description": "'Join a bike ride to raise funds for a charity and enjoy the great outdoors.'",
      "application_deadline": 1689315157303,
      "host_time": 1689401557303,
      "location": {
        "address": "228 Anniversary Crossing",
        "city": "Dallas",
        "state": "TX",
        "zipcode": "75205"
      }
    },
    {
      "event_name": "'Holiday Charity Drive'",
      "description": "'Donate to a holiday charity drive to help make the season brighter for those in need.'",
      "application_deadline": 1689055957303,
      "host_time": 1689142357303,
      "location": {
        "address": "221 Emmet Avenue",
        "city": "Henderson",
        "state": "NV",
        "zipcode": "89012"
      }
    },
    {
      "event_name": "'Charity Talent Show'",
      "description": "'Showcase your talent or enjoy the talents of others while supporting a good cause.'",
      "application_deadline": 1685945557303,
      "host_time": 1686031957303,
      "location": {
        "address": "9130 Continental Terrace",
        "city": "Chicago",
        "state": "IL",
        "zipcode": "60681"
      }
    },
    {
      "event_name": "'Charity Art Auction'",
      "description": "'Bid on beautiful artwork to support a charity that makes a difference.'",
      "application_deadline": 1690351957303,
      "host_time": 1690438357303,
      "location": {
        "address": "353 Calypso Way",
        "city": "Hayward",
        "state": "CA",
        "zipcode": "94544"
      }
    },
    {
      "event_name": "'Charity Book Sale'",
      "description": "'Purchase books at a discounted price to support a good cause.'",
      "application_deadline": 1690265557303,
      "host_time": 1690351957303,
      "location": {
        "address": "00649 Haas Pass",
        "city": "Milwaukee",
        "state": "WI",
        "zipcode": "53210"
      }
    },
    {
      "event_name": "'Charity Movie Night'",
      "description": "'Enjoy a movie while supporting a charity that makes a difference.'",
      "application_deadline": 1688105557303,
      "host_time": 1688191957303,
      "location": {
        "address": "3996 Cody Park",
        "city": "Oakland",
        "state": "CA",
        "zipcode": "94660"
      }
    },
    {
      "event_name": "'Charity Yoga Class'",
      "description": "'Unwind and destress while supporting a charity that helps others.'",
      "application_deadline": 1685427157303,
      "host_time": 1685513557303,
      "location": {
        "address": "868 Hoffman Way",
        "city": "Petaluma",
        "state": "CA",
        "zipcode": "94975"
      }
    },
    {
      "event_name": "'Charity Bowling Tournament'",
      "description": "'Participate in a bowling tournament to raise funds for a charity that makes a difference.'",
      "application_deadline": 1690524757303,
      "host_time": 1690611157303,
      "location": {
        "address": "78 Summit Drive",
        "city": "Lakeland",
        "state": "FL",
        "zipcode": "33805"
      }
    },
    {
      "event_name": "'Charity Trivia Night'",
      "description": "'Show off your knowledge and compete with others while supporting a charity that helps people in need.'",
      "application_deadline": 1688796757303,
      "host_time": 1688883157303,
      "location": {
        "address": "4808 Everett Crossing",
        "city": "Cincinnati",
        "state": "OH",
        "zipcode": "45999"
      }
    }
  ]  

const users_data = [
    {
      "first_name": "Lefty",
      "last_name": "McDermot",
      "contact": "3925810926",
      "email": "lmcdermot0@alibaba.com",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": [
        "Patience",
        "Self-regulation",
        "Humility",
        "Tact",
        "Celebration"
      ],
      "address": "6 Killdeer Park",
      "isHost": false
    },
    {
      "first_name": "Bronnie",
      "last_name": "Bau",
      "contact": "5145378467",
      "email": "bbau1@symantec.com",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Encouragement", "Mentoring", "Decision-making"],
      "address": "83 Rieder Circle",
      "isHost": true
    },
    {
      "first_name": "Devy",
      "last_name": "Hatcher",
      "contact": "6649999682",
      "email": "dhatcher2@seattletimes.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Celebration", "Encouragement", "Problem-solving"],
      "address": "3788 Express Junction",
      "isHost": false
    },
    {
      "first_name": "Lorie",
      "last_name": "Schultze",
      "contact": "9094935196",
      "email": "lschultze3@rakuten.co.jp",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Self-confidence", "Teamwork"],
      "address": "065 Monument Street",
      "isHost": true
    },
    {
      "first_name": "Roberta",
      "last_name": "Claasen",
      "contact": "7451646838",
      "email": "rclaasen4@parallels.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Stress management", "Recognition"],
      "address": "42 Old Shore Terrace",
      "isHost": true
    },
    {
      "first_name": "Sylas",
      "last_name": "Benedyktowicz",
      "contact": "7162508589",
      "email": "sbenedyktowicz5@mit.edu",
      "password": "Test@1234",
      "bio": "I'm a software engineer who loves to code and solve problems.",
      "skills": ["Self-motivation", "Motivation"],
      "address": "046 Haas Avenue",
      "isHost": false
    },
    {
      "first_name": "Dorise",
      "last_name": "Doumenc",
      "contact": "4214539954",
      "email": "ddoumenc6@usa.gov",
      "password": "Test@1234",
      "bio": "I'm a passionate traveler who has visited over 20 countries.",
      "skills": ["Self-motivation", "Assertiveness"],
      "address": "5 Straubel Point",
      "isHost": false
    },
    {
      "first_name": "Dinnie",
      "last_name": "Cinavas",
      "contact": "1182701221",
      "email": "dcinavas7@marketwatch.com",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": ["Time management", "Networking", "Leadership"],
      "address": "9 Jana Drive",
      "isHost": true
    },
    {
      "first_name": "Hyacinth",
      "last_name": "Falconer",
      "contact": "2836510710",
      "email": "hfalconer8@ow.ly",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Teaching"],
      "address": "8 Onsgard Center",
      "isHost": false
    },
    {
      "first_name": "Robbi",
      "last_name": "Elsey",
      "contact": "2391336101",
      "email": "relsey9@independent.co.uk",
      "password": "Test@1234",
      "bio": "I'm a gamer who loves to play video games in my free time.",
      "skills": ["Gratitude", "Communication", "Influencing", "Counseling"],
      "address": "96 Rieder Park",
      "isHost": false
    },
    {
      "first_name": "Jodi",
      "last_name": "Edginton",
      "contact": "7312066184",
      "email": "jedgintona@cocolog-nifty.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Active listening", "Honesty"],
      "address": "1175 Bashford Circle",
      "isHost": false
    },
    {
      "first_name": "Annora",
      "last_name": "Malzard",
      "contact": "3613608260",
      "email": "amalzardb@japanpost.jp",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Teaching", "Recognition"],
      "address": "08784 Kropf Way",
      "isHost": false
    },
    {
      "first_name": "Waldon",
      "last_name": "Raxworthy",
      "contact": "7274700674",
      "email": "wraxworthyc@joomla.org",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": ["Persuasion", "Teamwork"],
      "address": "3251 Continental Hill",
      "isHost": false
    },
    {
      "first_name": "Giralda",
      "last_name": "Bransden",
      "contact": "5972709999",
      "email": "gbransdend@narod.ru",
      "password": "Test@1234",
      "bio": "I'm a spiritual person who practices meditation and yoga.",
      "skills": [
        "Tact",
        "Stress management",
        "Coaching",
        "Self-regulation",
        "Self-motivation"
      ],
      "address": "96070 Eagle Crest Terrace",
      "isHost": true
    },
    {
      "first_name": "Tiffany",
      "last_name": "Garrie",
      "contact": "8026485604",
      "email": "tgarriee@pcworld.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": [
        "Feedback",
        "Self-regulation",
        "Communication",
        "Negotiation",
        "Support"
      ],
      "address": "9684 Southridge Park",
      "isHost": true
    },
    {
      "first_name": "Colman",
      "last_name": "Westoll",
      "contact": "6677830813",
      "email": "cwestollf@hibu.com",
      "password": "Test@1234",
      "bio": "I'm a foodie who loves to cook and try new recipes.",
      "skills": [
        "Motivation",
        "Teamwork",
        "Trustworthiness",
        "Integrity",
        "Self-motivation"
      ],
      "address": "777 Bluestem Park",
      "isHost": false
    },
    {
      "first_name": "Rafa",
      "last_name": "Balden",
      "contact": "9663215352",
      "email": "rbaldeng@weebly.com",
      "password": "Test@1234",
      "bio": "I'm a nature lover who enjoys hiking and camping.",
      "skills": [
        "Decision-making",
        "Constructive criticism",
        "Trustworthiness",
        "Humility",
        "Feedback"
      ],
      "address": "9514 Springview Drive",
      "isHost": true
    },
    {
      "first_name": "Artair",
      "last_name": "Wilcott",
      "contact": "1097458554",
      "email": "awilcotth@youku.com",
      "password": "Test@1234",
      "bio": "I'm a passionate traveler who has visited over 20 countries.",
      "skills": [
        "Empathy",
        "Active listening",
        "Self-motivation",
        "Stress management",
        "Networking"
      ],
      "address": "252 7th Place",
      "isHost": false
    },
    {
      "first_name": "Hans",
      "last_name": "Tarburn",
      "contact": "4969983324",
      "email": "htarburni@businessinsider.com",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": [
        "Self-regulation",
        "Networking",
        "Self-confidence",
        "Influencing",
        "Support"
      ],
      "address": "71 Anniversary Junction",
      "isHost": false
    },
    {
      "first_name": "Bess",
      "last_name": "Rowdell",
      "contact": "7789369183",
      "email": "browdellj@arstechnica.com",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": [
        "Active listening",
        "Adaptability",
        "Celebration",
        "Self-awareness",
        "Leadership"
      ],
      "address": "9584 Spenser Terrace",
      "isHost": false
    },
    {
      "first_name": "Hetty",
      "last_name": "Beardwood",
      "contact": "3729465070",
      "email": "hbeardwoodk@alexa.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Respect"],
      "address": "6 Havey Circle",
      "isHost": true
    },
    {
      "first_name": "Leonid",
      "last_name": "Jones",
      "contact": "9858877932",
      "email": "ljonesl@creativecommons.org",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": [
        "Problem-solving",
        "Influencing",
        "Communication",
        "Self-regulation",
        "Patience"
      ],
      "address": "87563 Bonner Way",
      "isHost": true
    },
    {
      "first_name": "Deedee",
      "last_name": "Kanzler",
      "contact": "5471874388",
      "email": "dkanzlerm@redcross.org",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": [
        "Constructive criticism",
        "Stress management",
        "Active participation",
        "Celebration",
        "Self-awareness"
      ],
      "address": "29410 Pleasure Park",
      "isHost": false
    },
    {
      "first_name": "Monro",
      "last_name": "Huot",
      "contact": "5214685401",
      "email": "mhuotn@deviantart.com",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": ["Feedback", "Coaching"],
      "address": "84196 Chinook Park",
      "isHost": false
    },
    {
      "first_name": "Shem",
      "last_name": "Gilston",
      "contact": "2243625523",
      "email": "sgilstono@aol.com",
      "password": "Test@1234",
      "bio": "I'm a gamer who loves to play video games in my free time.",
      "skills": ["Trustworthiness", "Teamwork"],
      "address": "0 Petterle Drive",
      "isHost": true
    },
    {
      "first_name": "Bernard",
      "last_name": "Ortet",
      "contact": "4458957209",
      "email": "bortetp@ovh.net",
      "password": "Test@1234",
      "bio": "I'm a wine connoisseur who enjoys trying new wines from around the world.",
      "skills": ["Integrity", "Negotiation"],
      "address": "96662 Tennessee Avenue",
      "isHost": false
    },
    {
      "first_name": "Case",
      "last_name": "Staning",
      "contact": "5395426024",
      "email": "cstaningq@indiegogo.com",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": ["Encouragement", "Diplomacy"],
      "address": "435 Sutherland Point",
      "isHost": false
    },
    {
      "first_name": "Sanders",
      "last_name": "Ronisch",
      "contact": "8758814450",
      "email": "sronischr@shareasale.com",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": [
        "Honesty",
        "Integrity",
        "Time management",
        "Negotiation",
        "Trustworthiness"
      ],
      "address": "60 Sutteridge Alley",
      "isHost": false
    },
    {
      "first_name": "Ryann",
      "last_name": "Pitkin",
      "contact": "6924553423",
      "email": "rpitkins@vkontakte.ru",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Empathy"],
      "address": "933 Tennyson Way",
      "isHost": false
    },
    {
      "first_name": "Renate",
      "last_name": "Gerbel",
      "contact": "5209943993",
      "email": "rgerbelt@dropbox.com",
      "password": "Test@1234",
      "bio": "I'm a passionate traveler who has visited over 20 countries.",
      "skills": ["Stress management", "Accountability", "Patience"],
      "address": "16 Russell Avenue",
      "isHost": false
    },
    {
      "first_name": "Claudette",
      "last_name": "Sleith",
      "contact": "9585298098",
      "email": "csleithu@usa.gov",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": [
        "Constructive criticism",
        "Patience",
        "Problem-solving",
        "Gratitude",
        "Leadership"
      ],
      "address": "211 Stoughton Court",
      "isHost": false
    },
    {
      "first_name": "Rutter",
      "last_name": "Blythe",
      "contact": "4939473878",
      "email": "rblythev@desdev.cn",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": [
        "Assertiveness",
        "Self-confidence",
        "Communication",
        "Diplomacy"
      ],
      "address": "134 Rockefeller Court",
      "isHost": false
    },
    {
      "first_name": "Barry",
      "last_name": "Eggle",
      "contact": "5713367640",
      "email": "begglew@ted.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Integrity"],
      "address": "27 Trailsway Street",
      "isHost": false
    },
    {
      "first_name": "Ferrell",
      "last_name": "Serrels",
      "contact": "7317065931",
      "email": "fserrelsx@mediafire.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Support"],
      "address": "38 Pine View Circle",
      "isHost": false
    },
    {
      "first_name": "Rubetta",
      "last_name": "Emsley",
      "contact": "9833598667",
      "email": "remsleyy@epa.gov",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": ["Counseling"],
      "address": "432 Buhler Park",
      "isHost": false
    },
    {
      "first_name": "Claudell",
      "last_name": "Pumphreys",
      "contact": "1952777366",
      "email": "cpumphreysz@feedburner.com",
      "password": "Test@1234",
      "bio": "I'm a gamer who loves to play video games in my free time.",
      "skills": ["Dependability", "Tact"],
      "address": "3579 Golf View Alley",
      "isHost": false
    },
    {
      "first_name": "Alidia",
      "last_name": "Tantrum",
      "contact": "7486711442",
      "email": "atantrum10@mediafire.com",
      "password": "Test@1234",
      "bio": "I'm a nature lover who enjoys hiking and camping.",
      "skills": ["Diplomacy", "Negotiation"],
      "address": "0 Lien Lane",
      "isHost": false
    },
    {
      "first_name": "Dominik",
      "last_name": "Jolland",
      "contact": "3184351937",
      "email": "djolland11@paypal.com",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": ["Collaboration", "Gratitude", "Responsibility"],
      "address": "6 Logan Drive",
      "isHost": false
    },
    {
      "first_name": "Llywellyn",
      "last_name": "Beidebeke",
      "contact": "5996306968",
      "email": "lbeidebeke12@gmpg.org",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": ["Cultural sensitivity"],
      "address": "73957 Northwestern Road",
      "isHost": false
    },
    {
      "first_name": "Sarah",
      "last_name": "Lattka",
      "contact": "2001882033",
      "email": "slattka13@angelfire.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Coaching"],
      "address": "5 International Plaza",
      "isHost": false
    },
    {
      "first_name": "Urbanus",
      "last_name": "Gittins",
      "contact": "8599697882",
      "email": "ugittins14@irs.gov",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Decision-making"],
      "address": "37 Sachtjen Center",
      "isHost": false
    },
    {
      "first_name": "Tine",
      "last_name": "Islep",
      "contact": "4477558835",
      "email": "tislep15@redcross.org",
      "password": "Test@1234",
      "bio": "I'm a chef who enjoys experimenting with different cuisines and flavors.",
      "skills": ["Teamwork", "Integrity"],
      "address": "1 Tennyson Court",
      "isHost": false
    },
    {
      "first_name": "Nicholle",
      "last_name": "Ketteman",
      "contact": "4144649809",
      "email": "nketteman16@nsw.gov.au",
      "password": "Test@1234",
      "bio": "I'm a nature lover who enjoys hiking and camping.",
      "skills": ["Feedback", "Patience"],
      "address": "32642 Loftsgordon Hill",
      "isHost": false
    },
    {
      "first_name": "Jillian",
      "last_name": "Dolle",
      "contact": "1332618026",
      "email": "jdolle17@cdbaby.com",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": [
        "Decision-making",
        "Active listening",
        "Influencing",
        "Patience",
        "Constructive criticism"
      ],
      "address": "147 Riverside Place",
      "isHost": false
    },
    {
      "first_name": "Wilton",
      "last_name": "Chieze",
      "contact": "2052287129",
      "email": "wchieze18@pcworld.com",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": [
        "Self-regulation",
        "Tact",
        "Negotiation",
        "Gratitude",
        "Recognition"
      ],
      "address": "05138 Pond Terrace",
      "isHost": false
    },
    {
      "first_name": "Sayers",
      "last_name": "Sawden",
      "contact": "1126600629",
      "email": "ssawden19@bluehost.com",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Diplomacy", "Conflict resolution"],
      "address": "3 Hollow Ridge Center",
      "isHost": false
    },
    {
      "first_name": "Greg",
      "last_name": "Kort",
      "contact": "8378909212",
      "email": "gkort1a@economist.com",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Humility"],
      "address": "453 Vera Junction",
      "isHost": false
    },
    {
      "first_name": "Shelton",
      "last_name": "MacWhirter",
      "contact": "4599014459",
      "email": "smacwhirter1b@indiegogo.com",
      "password": "Test@1234",
      "bio": "I'm a software engineer who loves to code and solve problems.",
      "skills": ["Accountability", "Teaching"],
      "address": "6 Wayridge Parkway",
      "isHost": false
    },
    {
      "first_name": "Max",
      "last_name": "Sustin",
      "contact": "4561716610",
      "email": "msustin1c@behance.net",
      "password": "Test@1234",
      "bio": "I'm a software engineer who loves to code and solve problems.",
      "skills": [
        "Celebration",
        "Influencing",
        "Stress management",
        "Problem-solving",
        "Conflict resolution"
      ],
      "address": "96 Londonderry Avenue",
      "isHost": false
    },
    {
      "first_name": "Stearn",
      "last_name": "Jerzycowski",
      "contact": "2104412308",
      "email": "sjerzycowski1d@biblegateway.com",
      "password": "Test@1234",
      "bio": "I'm a passionate traveler who has visited over 20 countries.",
      "skills": ["Humility", "Patience", "Celebration"],
      "address": "67 Village Green Avenue",
      "isHost": false
    },
    {
      "first_name": "Susann",
      "last_name": "Wisniowski",
      "contact": "2306353545",
      "email": "swisniowski1e@moonfruit.com",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": [
        "Trustworthiness",
        "Honesty",
        "Motivation",
        "Open-mindedness",
        "Mentoring"
      ],
      "address": "53 Coolidge Road",
      "isHost": false
    },
    {
      "first_name": "Helaine",
      "last_name": "Cutchie",
      "contact": "6504788005",
      "email": "hcutchie1f@so-net.ne.jp",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": [
        "Patience",
        "Conflict resolution",
        "Influencing",
        "Active participation",
        "Celebration"
      ],
      "address": "3 Northport Circle",
      "isHost": false
    },
    {
      "first_name": "Sheryl",
      "last_name": "Welton",
      "contact": "4409449848",
      "email": "swelton1g@posterous.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Decision-making"],
      "address": "60 Di Loreto Center",
      "isHost": false
    },
    {
      "first_name": "Tymon",
      "last_name": "Grigorio",
      "contact": "4507161924",
      "email": "tgrigorio1h@accuweather.com",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Adaptability", "Teamwork", "Self-confidence"],
      "address": "525 Muir Circle",
      "isHost": false
    },
    {
      "first_name": "Philip",
      "last_name": "Whenman",
      "contact": "3819396448",
      "email": "pwhenman1i@exblog.jp",
      "password": "Test@1234",
      "bio": "I'm a social butterfly who enjoys meeting new people and making friends.",
      "skills": ["Respect", "Integrity", "Counseling"],
      "address": "50885 Iowa Lane",
      "isHost": false
    },
    {
      "first_name": "Keen",
      "last_name": "Chicchelli",
      "contact": "1923315110",
      "email": "kchicchelli1j@shinystat.com",
      "password": "Test@1234",
      "bio": "I'm a volunteer who enjoys giving back to my community.",
      "skills": ["Negotiation"],
      "address": "5021 Corscot Avenue",
      "isHost": false
    },
    {
      "first_name": "Stanislaus",
      "last_name": "Seedull",
      "contact": "6495673298",
      "email": "sseedull1k@shop-pro.jp",
      "password": "Test@1234",
      "bio": "I'm a sports fan who loves to watch and play basketball and football.",
      "skills": [
        "Stress management",
        "Constructive criticism",
        "Influencing",
        "Conflict resolution"
      ],
      "address": "86292 Lunder Court",
      "isHost": false
    },
    {
      "first_name": "Tristan",
      "last_name": "Bridges",
      "contact": "7639430982",
      "email": "tbridges1l@twitter.com",
      "password": "Test@1234",
      "bio": "I'm a sports fan who loves to watch and play basketball and football.",
      "skills": [
        "Humility",
        "Accountability",
        "Motivation",
        "Empathy",
        "Mentoring"
      ],
      "address": "876 West Drive",
      "isHost": false
    },
    {
      "first_name": "Chelsy",
      "last_name": "Forten",
      "contact": "9961515859",
      "email": "cforten1m@who.int",
      "password": "Test@1234",
      "bio": "I'm a musician who plays the guitar and sings in a band.",
      "skills": [
        "Positive attitude",
        "Mentoring",
        "Feedback",
        "Accountability",
        "Networking"
      ],
      "address": "22 Lake View Lane",
      "isHost": false
    },
    {
      "first_name": "Fons",
      "last_name": "Aubrun",
      "contact": "3625887765",
      "email": "faubrun1n@sfgate.com",
      "password": "Test@1234",
      "bio": "I'm a musician who plays the guitar and sings in a band.",
      "skills": [
        "Relationship building",
        "Self-awareness",
        "Recognition",
        "Humility",
        "Encouragement"
      ],
      "address": "33 Briar Crest Court",
      "isHost": false
    },
    {
      "first_name": "Ethelyn",
      "last_name": "Dennert",
      "contact": "1251981948",
      "email": "edennert1o@artisteer.com",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": ["Trustworthiness", "Adaptability"],
      "address": "4 Orin Terrace",
      "isHost": false
    },
    {
      "first_name": "Elna",
      "last_name": "Kuban",
      "contact": "6314983201",
      "email": "ekuban1p@prweb.com",
      "password": "Test@1234",
      "bio": "I'm a nature lover who enjoys hiking and camping.",
      "skills": ["Influencing", "Problem-solving"],
      "address": "2 Alpine Plaza",
      "isHost": false
    },
    {
      "first_name": "Sarene",
      "last_name": "Girault",
      "contact": "5381148765",
      "email": "sgirault1q@state.tx.us",
      "password": "Test@1234",
      "bio": "I'm a teacher who loves to inspire and educate young minds.",
      "skills": ["Gratitude", "Positive attitude", "Patience", "Tact"],
      "address": "48916 Tennessee Street",
      "isHost": false
    },
    {
      "first_name": "Zenia",
      "last_name": "Tearle",
      "contact": "4443277544",
      "email": "ztearle1r@psu.edu",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": ["Humility", "Time management", "Tact", "Celebration"],
      "address": "05135 Westport Crossing",
      "isHost": false
    },
    {
      "first_name": "Royall",
      "last_name": "Prantoni",
      "contact": "9203203946",
      "email": "rprantoni1s@indiatimes.com",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Teaching", "Active listening", "Stress management"],
      "address": "9 Fallview Park",
      "isHost": false
    },
    {
      "first_name": "Marti",
      "last_name": "Bromet",
      "contact": "1445799508",
      "email": "mbromet1t@vkontakte.ru",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": ["Respect"],
      "address": "0 Tony Alley",
      "isHost": false
    },
    {
      "first_name": "Noel",
      "last_name": "Abbett",
      "contact": "7211671467",
      "email": "nabbett1u@va.gov",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": ["Influencing", "Self-regulation"],
      "address": "7105 Center Trail",
      "isHost": false
    },
    {
      "first_name": "Yovonnda",
      "last_name": "Bendtsen",
      "contact": "6753571108",
      "email": "ybendtsen1v@dagondesign.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Communication"],
      "address": "18 Clyde Gallagher Terrace",
      "isHost": false
    },
    {
      "first_name": "Roarke",
      "last_name": "Lipsett",
      "contact": "8951398536",
      "email": "rlipsett1w@storify.com",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": ["Teaching", "Decision-making", "Respect"],
      "address": "85730 Nova Road",
      "isHost": false
    },
    {
      "first_name": "Denver",
      "last_name": "Denyukhin",
      "contact": "7964669687",
      "email": "ddenyukhin1x@spiegel.de",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": [
        "Recognition",
        "Coaching",
        "Communication",
        "Celebration",
        "Positive attitude"
      ],
      "address": "15 Lakewood Gardens Lane",
      "isHost": false
    },
    {
      "first_name": "Pippo",
      "last_name": "Offa",
      "contact": "7719956605",
      "email": "poffa1y@disqus.com",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": ["Self-confidence", "Persuasion", "Accountability"],
      "address": "953 Farwell Junction",
      "isHost": false
    },
    {
      "first_name": "Shane",
      "last_name": "Fend",
      "contact": "5021182002",
      "email": "sfend1z@prlog.org",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": ["Celebration", "Persuasion", "Counseling"],
      "address": "894 Orin Road",
      "isHost": false
    },
    {
      "first_name": "Shawn",
      "last_name": "Droogan",
      "contact": "3193999882",
      "email": "sdroogan20@clickbank.net",
      "password": "Test@1234",
      "bio": "I'm a gamer who loves to play video games in my free time.",
      "skills": ["Humility", "Gratitude", "Open-mindedness"],
      "address": "7651 Nobel Junction",
      "isHost": false
    },
    {
      "first_name": "Read",
      "last_name": "Mathis",
      "contact": "4473962682",
      "email": "rmathis21@tmall.com",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": ["Teaching"],
      "address": "6906 Sauthoff Court",
      "isHost": false
    },
    {
      "first_name": "Ruggiero",
      "last_name": "Freddi",
      "contact": "6433786511",
      "email": "rfreddi22@yandex.ru",
      "password": "Test@1234",
      "bio": "I'm a sports fan who loves to watch and play basketball and football.",
      "skills": ["Mentoring", "Humility"],
      "address": "2679 Wayridge Street",
      "isHost": false
    },
    {
      "first_name": "Claiborne",
      "last_name": "Bouette",
      "contact": "6743284728",
      "email": "cbouette23@alibaba.com",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": ["Honesty", "Assertiveness", "Active listening", "Encouragement"],
      "address": "47791 Namekagon Place",
      "isHost": false
    },
    {
      "first_name": "Padraic",
      "last_name": "Chippin",
      "contact": "8043390887",
      "email": "pchippin24@stumbleupon.com",
      "password": "Test@1234",
      "bio": "I'm a sports fan who loves to watch and play basketball and football.",
      "skills": ["Constructive criticism", "Self-awareness", "Honesty"],
      "address": "43 Hooker Center",
      "isHost": false
    },
    {
      "first_name": "Beck",
      "last_name": "Patridge",
      "contact": "8546311731",
      "email": "bpatridge25@narod.ru",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": [
        "Collaboration",
        "Feedback",
        "Active listening",
        "Relationship building",
        "Patience"
      ],
      "address": "4 Maple Wood Trail",
      "isHost": false
    },
    {
      "first_name": "Yoshiko",
      "last_name": "Eginton",
      "contact": "7907214945",
      "email": "yeginton26@un.org",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Persuasion", "Active participation"],
      "address": "2 Knutson Alley",
      "isHost": false
    },
    {
      "first_name": "Marlow",
      "last_name": "Dignall",
      "contact": "6639426055",
      "email": "mdignall27@diigo.com",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": ["Honesty", "Feedback", "Gratitude"],
      "address": "4005 Lindbergh Place",
      "isHost": false
    },
    {
      "first_name": "Gussy",
      "last_name": "Trigwell",
      "contact": "3573251478",
      "email": "gtrigwell28@independent.co.uk",
      "password": "Test@1234",
      "bio": "I'm a gamer who loves to play video games in my free time.",
      "skills": [
        "Cultural sensitivity",
        "Responsibility",
        "Recognition",
        "Self-motivation"
      ],
      "address": "25392 Warner Way",
      "isHost": false
    },
    {
      "first_name": "Lee",
      "last_name": "Marguerite",
      "contact": "1898695978",
      "email": "lmarguerite29@desdev.cn",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": [
        "Diplomacy",
        "Accountability",
        "Collaboration",
        "Support",
        "Responsibility"
      ],
      "address": "723 Petterle Lane",
      "isHost": false
    },
    {
      "first_name": "Leigh",
      "last_name": "Duester",
      "contact": "9435281525",
      "email": "lduester2a@privacy.gov.au",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Time management"],
      "address": "7 Dryden Trail",
      "isHost": false
    },
    {
      "first_name": "Tonya",
      "last_name": "Grouer",
      "contact": "5866734070",
      "email": "tgrouer2b@soup.io",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Humility", "Respect"],
      "address": "862 Marquette Parkway",
      "isHost": false
    },
    {
      "first_name": "Violet",
      "last_name": "Jenicke",
      "contact": "2099282426",
      "email": "vjenicke2c@xinhuanet.com",
      "password": "Test@1234",
      "bio": "I'm a teacher who loves to inspire and educate young minds.",
      "skills": ["Cultural sensitivity"],
      "address": "06 Michigan Plaza",
      "isHost": false
    },
    {
      "first_name": "Eddie",
      "last_name": "Tamplin",
      "contact": "2569277528",
      "email": "etamplin2d@apple.com",
      "password": "Test@1234",
      "bio": "I'm a scientist who is fascinated by the mysteries of the universe.",
      "skills": ["Tact", "Constructive criticism", "Feedback", "Assertiveness"],
      "address": "498 Clove Plaza",
      "isHost": false
    },
    {
      "first_name": "Sonnie",
      "last_name": "Dany",
      "contact": "1942954637",
      "email": "sdany2e@google.ca",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": ["Dependability"],
      "address": "829 Reinke Lane",
      "isHost": false
    },
    {
      "first_name": "Heather",
      "last_name": "Mateus",
      "contact": "4908162645",
      "email": "hmateus2f@dyndns.org",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": ["Communication"],
      "address": "55302 Butterfield Lane",
      "isHost": false
    },
    {
      "first_name": "Ricky",
      "last_name": "Tween",
      "contact": "5581852651",
      "email": "rtween2g@diigo.com",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": ["Leadership", "Cultural sensitivity", "Patience"],
      "address": "822 Norway Maple Hill",
      "isHost": false
    },
    {
      "first_name": "Frazer",
      "last_name": "Hitscher",
      "contact": "4775025332",
      "email": "fhitscher2h@columbia.edu",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Active participation", "Negotiation"],
      "address": "8138 Delladonna Point",
      "isHost": false
    },
    {
      "first_name": "Bernelle",
      "last_name": "Maraga",
      "contact": "1001291632",
      "email": "bmaraga2i@tumblr.com",
      "password": "Test@1234",
      "bio": "I'm a chef who enjoys experimenting with different cuisines and flavors.",
      "skills": [
        "Active listening",
        "Teamwork",
        "Tact",
        "Decision-making",
        "Empathy"
      ],
      "address": "053 Messerschmidt Point",
      "isHost": false
    },
    {
      "first_name": "Neila",
      "last_name": "Burrells",
      "contact": "8102037174",
      "email": "nburrells2j@xing.com",
      "password": "Test@1234",
      "bio": "I'm a chef who enjoys experimenting with different cuisines and flavors.",
      "skills": ["Empowerment", "Collaboration"],
      "address": "4 Kennedy Trail",
      "isHost": false
    },
    {
      "first_name": "Eugenie",
      "last_name": "Towlson",
      "contact": "2161756281",
      "email": "etowlson2k@jugem.jp",
      "password": "Test@1234",
      "bio": "I'm a writer who enjoys expressing my thoughts and ideas through words.",
      "skills": ["Influencing", "Collaboration", "Counseling", "Respect"],
      "address": "956 Little Fleur Pass",
      "isHost": false
    },
    {
      "first_name": "Velvet",
      "last_name": "Heikkinen",
      "contact": "8258553916",
      "email": "vheikkinen2l@ca.gov",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Mentoring", "Accountability", "Positive attitude"],
      "address": "23 Valley Edge Pass",
      "isHost": false
    },
    {
      "first_name": "Myrle",
      "last_name": "Hadcock",
      "contact": "3864459491",
      "email": "mhadcock2m@wired.com",
      "password": "Test@1234",
      "bio": "I'm a musician who plays the guitar and sings in a band.",
      "skills": ["Coaching"],
      "address": "7363 Green Ridge Park",
      "isHost": false
    },
    {
      "first_name": "Shalna",
      "last_name": "Kern",
      "contact": "8264198711",
      "email": "skern2n@ucsd.edu",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": ["Diplomacy", "Empathy", "Celebration"],
      "address": "498 Sachs Hill",
      "isHost": false
    },
    {
      "first_name": "Guy",
      "last_name": "Diack",
      "contact": "9609704986",
      "email": "gdiack2o@odnoklassniki.ru",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": [
        "Self-regulation",
        "Mentoring",
        "Networking",
        "Open-mindedness",
        "Empathy"
      ],
      "address": "6984 Commercial Plaza",
      "isHost": false
    },
    {
      "first_name": "Corty",
      "last_name": "Aldred",
      "contact": "9696236775",
      "email": "caldred2p@alibaba.com",
      "password": "Test@1234",
      "bio": "I'm a passionate traveler who has visited over 20 countries.",
      "skills": ["Trustworthiness", "Diplomacy"],
      "address": "09 Canary Circle",
      "isHost": false
    },
    {
      "first_name": "Uriel",
      "last_name": "Sleith",
      "contact": "8775645443",
      "email": "usleith2q@last.fm",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": ["Active participation", "Persuasion"],
      "address": "72 Merchant Drive",
      "isHost": false
    },
    {
      "first_name": "Currey",
      "last_name": "Marchiso",
      "contact": "9771534388",
      "email": "cmarchiso2r@odnoklassniki.ru",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": ["Integrity", "Support", "Recognition"],
      "address": "9 Weeping Birch Crossing",
      "isHost": false
    },
    {
      "first_name": "Rowena",
      "last_name": "Lind",
      "contact": "1643028503",
      "email": "rlind2s@earthlink.net",
      "password": "Test@1234",
      "bio": "I'm a teacher who loves to inspire and educate young minds.",
      "skills": [
        "Assertiveness",
        "Self-awareness",
        "Patience",
        "Open-mindedness"
      ],
      "address": "5 Kim Pass",
      "isHost": false
    },
    {
      "first_name": "Mirelle",
      "last_name": "Goodenough",
      "contact": "5642465669",
      "email": "mgoodenough2t@biglobe.ne.jp",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Persuasion"],
      "address": "530 Gateway Plaza",
      "isHost": false
    },
    {
      "first_name": "Yoko",
      "last_name": "Doubleday",
      "contact": "2083487160",
      "email": "ydoubleday2u@psu.edu",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": ["Networking"],
      "address": "4873 Hallows Center",
      "isHost": false
    },
    {
      "first_name": "Kilian",
      "last_name": "Druhan",
      "contact": "8392687283",
      "email": "kdruhan2v@creativecommons.org",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": ["Integrity", "Trustworthiness", "Self-motivation"],
      "address": "0988 Eagle Crest Place",
      "isHost": false
    },
    {
      "first_name": "Norton",
      "last_name": "Ivins",
      "contact": "3299172494",
      "email": "nivins2w@issuu.com",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Feedback", "Persuasion", "Time management"],
      "address": "91 Lillian Center",
      "isHost": false
    },
    {
      "first_name": "Sherwynd",
      "last_name": "Sharple",
      "contact": "5992798923",
      "email": "ssharple2x@hp.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Gratitude", "Constructive criticism"],
      "address": "01549 Johnson Parkway",
      "isHost": false
    },
    {
      "first_name": "Ricardo",
      "last_name": "Stuer",
      "contact": "4065003561",
      "email": "rstuer2y@cisco.com",
      "password": "Test@1234",
      "bio": "I'm a volunteer who enjoys giving back to my community.",
      "skills": ["Leadership", "Self-awareness", "Respect", "Gratitude"],
      "address": "2233 Red Cloud Junction",
      "isHost": false
    },
    {
      "first_name": "Adelice",
      "last_name": "Shmyr",
      "contact": "9371868473",
      "email": "ashmyr2z@buzzfeed.com",
      "password": "Test@1234",
      "bio": "I'm a foodie who loves to cook and try new recipes.",
      "skills": ["Influencing", "Problem-solving"],
      "address": "4 Saint Paul Plaza",
      "isHost": false
    },
    {
      "first_name": "Sib",
      "last_name": "Bagnold",
      "contact": "4539801286",
      "email": "sbagnold30@printfriendly.com",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Dependability", "Positive attitude", "Networking"],
      "address": "0338 Oak Pass",
      "isHost": false
    },
    {
      "first_name": "Bondon",
      "last_name": "Elcombe",
      "contact": "7135182182",
      "email": "belcombe31@oracle.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": ["Stress management", "Motivation"],
      "address": "0 Rockefeller Terrace",
      "isHost": false
    },
    {
      "first_name": "Avictor",
      "last_name": "Boreham",
      "contact": "2888513508",
      "email": "aboreham32@so-net.ne.jp",
      "password": "Test@1234",
      "bio": "I'm a beach bum who loves to soak up the sun and swim in the ocean.",
      "skills": ["Self-awareness", "Persuasion", "Patience"],
      "address": "45 2nd Park",
      "isHost": false
    },
    {
      "first_name": "Lock",
      "last_name": "Plaskitt",
      "contact": "8339484633",
      "email": "lplaskitt33@cornell.edu",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": [
        "Self-awareness",
        "Empowerment",
        "Self-regulation",
        "Motivation"
      ],
      "address": "8 Grayhawk Lane",
      "isHost": false
    },
    {
      "first_name": "Gerry",
      "last_name": "Rowcliffe",
      "contact": "4482008659",
      "email": "growcliffe34@comsenz.com",
      "password": "Test@1234",
      "bio": "I'm a volunteer who enjoys giving back to my community.",
      "skills": [
        "Negotiation",
        "Teamwork",
        "Patience",
        "Networking",
        "Active listening"
      ],
      "address": "2 Coleman Drive",
      "isHost": false
    },
    {
      "first_name": "Arlyne",
      "last_name": "Macer",
      "contact": "5707135209",
      "email": "amacer35@google.ru",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": ["Active listening", "Trustworthiness"],
      "address": "64 Milwaukee Trail",
      "isHost": false
    },
    {
      "first_name": "Maggee",
      "last_name": "Hallsworth",
      "contact": "8826088250",
      "email": "mhallsworth36@fda.gov",
      "password": "Test@1234",
      "bio": "I'm a musician who plays the guitar and sings in a band.",
      "skills": ["Negotiation", "Celebration", "Recognition", "Open-mindedness"],
      "address": "07615 Farwell Center",
      "isHost": false
    },
    {
      "first_name": "Kermie",
      "last_name": "Garnul",
      "contact": "3148609198",
      "email": "kgarnul37@nih.gov",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": [
        "Stress management",
        "Self-confidence",
        "Active listening",
        "Problem-solving"
      ],
      "address": "3 Vermont Pass",
      "isHost": false
    },
    {
      "first_name": "Fred",
      "last_name": "Winston",
      "contact": "3476937714",
      "email": "fwinston38@geocities.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Diplomacy", "Trustworthiness"],
      "address": "5 Cody Junction",
      "isHost": false
    },
    {
      "first_name": "Kristina",
      "last_name": "Leads",
      "contact": "6304454496",
      "email": "kleads39@latimes.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Diplomacy", "Support", "Celebration", "Respect", "Feedback"],
      "address": "1 East Trail",
      "isHost": false
    },
    {
      "first_name": "Sonja",
      "last_name": "Davidsen",
      "contact": "9623273935",
      "email": "sdavidsen3a@is.gd",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": ["Empowerment", "Open-mindedness", "Encouragement"],
      "address": "64789 Merry Terrace",
      "isHost": false
    },
    {
      "first_name": "Tiebout",
      "last_name": "Ledingham",
      "contact": "7934714724",
      "email": "tledingham3b@sphinn.com",
      "password": "Test@1234",
      "bio": "I'm a musician who plays the guitar and sings in a band.",
      "skills": ["Tact", "Encouragement"],
      "address": "451 Milwaukee Plaza",
      "isHost": false
    },
    {
      "first_name": "Patin",
      "last_name": "Demcik",
      "contact": "4632281918",
      "email": "pdemcik3c@gov.uk",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": [
        "Time management",
        "Encouragement",
        "Relationship building",
        "Humility",
        "Active participation"
      ],
      "address": "916 Debs Hill",
      "isHost": false
    },
    {
      "first_name": "Meade",
      "last_name": "Splevin",
      "contact": "4489844487",
      "email": "msplevin3d@usnews.com",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": ["Tact", "Active participation", "Networking"],
      "address": "44 Westend Center",
      "isHost": false
    },
    {
      "first_name": "Kingsly",
      "last_name": "Flobert",
      "contact": "4838272676",
      "email": "kflobert3e@china.com.cn",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": ["Coaching"],
      "address": "3 Hintze Street",
      "isHost": false
    },
    {
      "first_name": "Sunny",
      "last_name": "Ion",
      "contact": "3298737994",
      "email": "sion3f@jigsy.com",
      "password": "Test@1234",
      "bio": "I'm a volunteer who enjoys giving back to my community.",
      "skills": [
        "Leadership",
        "Gratitude",
        "Negotiation",
        "Self-regulation",
        "Accountability"
      ],
      "address": "402 Cody Center",
      "isHost": false
    },
    {
      "first_name": "Odelinda",
      "last_name": "Fellnee",
      "contact": "7541731340",
      "email": "ofellnee3g@mlb.com",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Cultural sensitivity", "Time management"],
      "address": "002 La Follette Avenue",
      "isHost": true
    },
    {
      "first_name": "Una",
      "last_name": "Voysey",
      "contact": "8609943782",
      "email": "uvoysey3h@usnews.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Self-awareness"],
      "address": "81610 Buhler Center",
      "isHost": true
    },
    {
      "first_name": "Shayne",
      "last_name": "Piatto",
      "contact": "5757776057",
      "email": "spiatto3i@shutterfly.com",
      "password": "Test@1234",
      "bio": "I'm a photographer who loves to capture beautiful moments and landscapes.",
      "skills": ["Support", "Problem-solving", "Active participation"],
      "address": "16200 Superior Place",
      "isHost": false
    },
    {
      "first_name": "Kendra",
      "last_name": "Dommerque",
      "contact": "3478376525",
      "email": "kdommerque3j@stumbleupon.com",
      "password": "Test@1234",
      "bio": "I'm a movie buff who watches at least one movie a day.",
      "skills": ["Self-awareness", "Cultural sensitivity", "Positive attitude"],
      "address": "38 Loeprich Junction",
      "isHost": false
    },
    {
      "first_name": "Ella",
      "last_name": "Wathall",
      "contact": "3296057544",
      "email": "ewathall3k@sohu.com",
      "password": "Test@1234",
      "bio": "I'm a gardener who enjoys growing my own fruits and vegetables.",
      "skills": [
        "Coaching",
        "Empowerment",
        "Active participation",
        "Accountability",
        "Teaching"
      ],
      "address": "95 Prairieview Point",
      "isHost": true
    },
    {
      "first_name": "Idette",
      "last_name": "Sheehan",
      "contact": "5004033477",
      "email": "isheehan3l@amazon.co.uk",
      "password": "Test@1234",
      "bio": "I'm a software engineer who loves to code and solve problems.",
      "skills": ["Communication", "Responsibility", "Active participation"],
      "address": "169 Lukken Way",
      "isHost": true
    },
    {
      "first_name": "Bekki",
      "last_name": "Bagguley",
      "contact": "9461454281",
      "email": "bbagguley3m@1688.com",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": ["Teamwork", "Communication", "Accountability"],
      "address": "1 Fisk Park",
      "isHost": false
    },
    {
      "first_name": "Alie",
      "last_name": "Kingaby",
      "contact": "3459530918",
      "email": "akingaby3n@unesco.org",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": [
        "Support",
        "Empowerment",
        "Constructive criticism",
        "Teaching",
        "Tact"
      ],
      "address": "48637 Towne Crossing",
      "isHost": false
    },
    {
      "first_name": "Desiri",
      "last_name": "Papaccio",
      "contact": "2759468238",
      "email": "dpapaccio3o@networkadvertising.org",
      "password": "Test@1234",
      "bio": "I'm a coffee addict who can't start my day without a cup of joe.",
      "skills": ["Conflict resolution"],
      "address": "04 Golden Leaf Pass",
      "isHost": true
    },
    {
      "first_name": "Worthington",
      "last_name": "Antonchik",
      "contact": "4931813966",
      "email": "wantonchik3p@mysql.com",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": ["Conflict resolution", "Self-motivation", "Integrity"],
      "address": "41 Sage Lane",
      "isHost": true
    },
    {
      "first_name": "Thaxter",
      "last_name": "Godain",
      "contact": "9687312696",
      "email": "tgodain3q@live.com",
      "password": "Test@1234",
      "bio": "I'm a language learner who speaks four languages fluently.",
      "skills": ["Humility", "Assertiveness", "Self-motivation"],
      "address": "02 Longview Drive",
      "isHost": true
    },
    {
      "first_name": "Damian",
      "last_name": "Tezure",
      "contact": "1033848412",
      "email": "dtezure3r@google.com.br",
      "password": "Test@1234",
      "bio": "I'm a collector who has a passion for vintage items and antiques.",
      "skills": ["Encouragement"],
      "address": "7 Upham Plaza",
      "isHost": false
    },
    {
      "first_name": "Steffane",
      "last_name": "Riddlesden",
      "contact": "1595305952",
      "email": "sriddlesden3s@bloglovin.com",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Active listening"],
      "address": "9143 Miller Center",
      "isHost": false
    },
    {
      "first_name": "Bird",
      "last_name": "Holburn",
      "contact": "6334751442",
      "email": "bholburn3t@geocities.jp",
      "password": "Test@1234",
      "bio": "I'm a minimalist who believes in living a simple and clutter-free life.",
      "skills": ["Self-motivation", "Accountability", "Celebration"],
      "address": "05146 Lakewood Point",
      "isHost": true
    },
    {
      "first_name": "Crissie",
      "last_name": "Robrow",
      "contact": "6246431055",
      "email": "crobrow3u@yellowbook.com",
      "password": "Test@1234",
      "bio": "I'm a software engineer who loves to code and solve problems.",
      "skills": ["Cultural sensitivity", "Collaboration", "Persuasion"],
      "address": "8 Columbus Avenue",
      "isHost": false
    },
    {
      "first_name": "Morlee",
      "last_name": "Lindelof",
      "contact": "2509210419",
      "email": "mlindelof3v@admin.ch",
      "password": "Test@1234",
      "bio": "I'm a fashionista who enjoys keeping up with the latest trends.",
      "skills": ["Open-mindedness", "Accountability", "Positive attitude"],
      "address": "00 Lawn Drive",
      "isHost": false
    },
    {
      "first_name": "Ervin",
      "last_name": "Stobbe",
      "contact": "5229733173",
      "email": "estobbe3w@eepurl.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": [
        "Stress management",
        "Trustworthiness",
        "Support",
        "Conflict resolution",
        "Feedback"
      ],
      "address": "64 Scott Parkway",
      "isHost": false
    },
    {
      "first_name": "Damien",
      "last_name": "Dinneen",
      "contact": "2891462150",
      "email": "ddinneen3x@google.it",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": [
        "Celebration",
        "Self-confidence",
        "Self-awareness",
        "Persuasion",
        "Teaching"
      ],
      "address": "84 Susan Hill",
      "isHost": false
    },
    {
      "first_name": "Rhody",
      "last_name": "Shapcote",
      "contact": "3296768705",
      "email": "rshapcote3y@google.co.uk",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Trustworthiness", "Leadership"],
      "address": "6 Macpherson Point",
      "isHost": false
    },
    {
      "first_name": "Bailey",
      "last_name": "Ors",
      "contact": "1805303071",
      "email": "bors3z@gov.uk",
      "password": "Test@1234",
      "bio": "I'm a bookworm who reads at least one book a week.",
      "skills": [
        "Positive attitude",
        "Empowerment",
        "Decision-making",
        "Conflict resolution",
        "Accountability"
      ],
      "address": "0 Judy Park",
      "isHost": false
    },
    {
      "first_name": "Jackqueline",
      "last_name": "Corneck",
      "contact": "8592248269",
      "email": "jcorneck40@shinystat.com",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": ["Teaching", "Stress management", "Persuasion", "Counseling"],
      "address": "5 Arrowood Road",
      "isHost": false
    },
    {
      "first_name": "Cindy",
      "last_name": "Camin",
      "contact": "7418329559",
      "email": "ccamin41@godaddy.com",
      "password": "Test@1234",
      "bio": "I'm a sports fan who loves to watch and play basketball and football.",
      "skills": [
        "Encouragement",
        "Cultural sensitivity",
        "Self-awareness",
        "Recognition",
        "Negotiation"
      ],
      "address": "49 Mesta Crossing",
      "isHost": true
    },
    {
      "first_name": "Matthus",
      "last_name": "Easom",
      "contact": "4981334189",
      "email": "measom42@seattletimes.com",
      "password": "Test@1234",
      "bio": "I'm a fitness enthusiast who enjoys running and weightlifting.",
      "skills": [
        "Assertiveness",
        "Constructive criticism",
        "Self-confidence",
        "Patience"
      ],
      "address": "294 American Center",
      "isHost": true
    },
    {
      "first_name": "Melonie",
      "last_name": "Cleyne",
      "contact": "2498667418",
      "email": "mcleyne43@google.ca",
      "password": "Test@1234",
      "bio": "I'm a DIY enthusiast who enjoys crafting and home improvement projects.",
      "skills": ["Counseling", "Decision-making", "Tact", "Respect", "Humility"],
      "address": "00 Schiller Circle",
      "isHost": true
    },
    {
      "first_name": "Laureen",
      "last_name": "Pressey",
      "contact": "1606245891",
      "email": "lpressey44@goo.gl",
      "password": "Test@1234",
      "bio": "I'm a pet lover who has two dogs and a cat.",
      "skills": [
        "Negotiation",
        "Patience",
        "Open-mindedness",
        "Self-confidence",
        "Positive attitude"
      ],
      "address": "58132 Dorton Plaza",
      "isHost": true
    },
    {
      "first_name": "Brig",
      "last_name": "Gawthrop",
      "contact": "3397992864",
      "email": "bgawthrop45@tamu.edu",
      "password": "Test@1234",
      "bio": "I'm a history buff who enjoys learning about different cultures and civilizations.",
      "skills": [
        "Leadership",
        "Honesty",
        "Coaching",
        "Self-confidence",
        "Feedback"
      ],
      "address": "27120 Rieder Parkway",
      "isHost": true
    }
  ]


let host_info_list = []
let volunteer_ids = []
let event_ids = []


async function seedUsers(){

    for (let i = 0; i < users_data.length; i++){       
        try{
            const id = await userData.seedUser(
                users_data[i].first_name,
                users_data[i].last_name,
                users_data[i].email,
                users_data[i].password,
                users_data[i].isHost,
                users_data[i].contact,
                users_data[i].bio,
                users_data[i].skills,
                users_data[i].address
            )
    
            if(users_data[i].isHost){
                let host_info = {
                    host_id: id,
                    host_name: users_data[i].first_name + " " + users_data[i].last_name,
                    contact: users_data[i].contact
                };
                host_info_list.push(host_info);
            }else{
                volunteer_ids.push(id)
            }
        }catch(e){
            console.log("Error seeding user: " + JSON.stringify(users_data[i]))
            console.log(e)
        }
    }

}

async function seedEvents(){
    for (let i = 0; i < events_data.length; i++){
        try{
            const host_info = host_info_list[Math.floor(Math.random() * (host_info_list.length + 1))]
            const event = await eventData.addEvent(
                events_data[i].event_name,
                events_data[i].description,
                events_data[i].application_deadline,
                events_data[i].host_time,
                events_data[i].location,
                host_info,
                "No_Image_Available.jpg"
            )

        event_ids.push(event._id)
        }catch(e){
            console.log("Error seeding event: " + JSON.stringify(events_data[i]))
            console.log(e)
        }
    }


    event_ids.forEach( async event_id => {
        const numVolunteers = Math.floor(Math.random() * 15) + 1
        const volunteers = []
        for(let i = 0; i < numVolunteers; i++){
            volunteers.push(volunteer_ids[Math.floor(Math.random() * volunteer_ids.length)])
        }

        volunteers.forEach( async volunteer_id => {
            await eventData.addVolunteerToEvent(event_id, volunteer_id)
        })
    })
}

await seedUsers();
await seedEvents();
    
// await closeConnection()
