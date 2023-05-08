const pathnames = window.location.pathname.split("/")
let detailsURL = "/event/details/" + pathnames[pathnames.length - 1]

let requestConfig = {
    method: "GET",
    url: detailsURL
}

$.ajax(requestConfig).then(function(responseMessage){
    if(responseMessage.event_details){
        sessionStorage.setItem("event_details", JSON.stringify(responseMessage.event_details))
        sessionStorage.setItem("user_details", JSON.stringify(responseMessage.user_details))

        loadPage()
    }else{
        console.log("ERROR receiving details")
    }
})

function loadPage(){
    const event_details = JSON.parse(sessionStorage.getItem("event_details"))
    const host_time = new Date(event_details.host_time).getTime()
    const now = new Date().getTime()

    if(host_time > now){
        document.getElementById("story_feedback_section").remove()
    }

    let user_details = JSON.parse(sessionStorage.getItem("user_details"))
    if(user_details.isUser){
        let story_card = document.getElementById("story_card_" + user_details.user_id)
        
        if(story_card){
            let story = $("#story_" + user_details.user_id).text()
            let storyDiv = $("#div_story");
            storyDiv.empty();
            storyDiv.append(`<p class="fs-5 fw-bolder">Your Story</p>`);
            storyDiv.append(`<p class="fst-italic story" >${story}</p>`);
            storyDiv.append(`<btn class="btn btn-primary" onclick="onEditStory()">Edit</btn>`);
            story_card.remove()
        }
        
        let feedbackStr = ""
        event_details.feedbacks.find(feedback => {
            if(feedback.volunteer_id === user_details.user_id){
                feedbackStr = feedback.feedback_comment
            }
        })
        if(feedbackStr){
            let feedbackDiv = $("#div_feedback");
            feedbackDiv.empty();
            feedbackDiv.append(`<p class="fs-5 fw-bolder">Your Feedback</p>`);
            feedbackDiv.append(`<p class="fst-italic feedback" >${feedbackStr}</p>`);
            feedbackDiv.append(`<btn class="btn btn-primary" onclick="onEditFeedback()">Edit</btn>`);
        }

    }
}

function onSubmitStory(){
    let url = window.location.pathname + "/story";
    event.preventDefault();
    let errorDiv = $("#div_story_error");
    errorDiv.empty();
    try{
        let story = $("#story").val();
        let storyDiv = $("#div_story");   

        story = isValidString(story, 'Story');
        isValidStoryString(story);

        const requestConfig = {
            method: "POST",
            url: url,
            dataType: "json",
            data: {story: story},
        }

        $.ajax(requestConfig).then(function(responseMessage){
            if(responseMessage.success){
                storyDiv.empty();
                storyDiv.append(`<p class="fs-5 fw-bolder">Your Story</p>`);
                storyDiv.append(`<p class="fst-italic story" >${story}</p>`);
                storyDiv.append(`<btn class="btn btn-primary" onclick="onEditStory()">Edit</btn>`);
            }else{
                errorDiv.empty()
                errorDiv.append(`<span class="text-danger">${responseMessage.error}</span>`);
                errorDiv.show();
            }
        }) 
    }catch(error){
        errorDiv.empty()
        errorDiv.append(`<span class="text-danger">${error}</span>`);
        errorDiv.show();
    }
}

function onEditStory(){
    let storyDiv = $("#div_story");
    let story = storyDiv.find("p.story").text();
    storyDiv.empty();
    storyDiv.append(
        `<form id="story_form" action="/story" method="POST" onsubmit="onSubmitStory()" >
              <label class="labels" for="story">Share your Experience</label>
              <textarea
                rows="5"
                class="form-control"
                name="story"
                id="story"
                placeholder="Describe your experience with the event"
              >${story}</textarea>

              <div id="div_story_error" class="m-2 text-center"></div>

              <div class="m-2 text-center">
                <button
                  class="btn btn-primary profile-button"
                  type="submit"
                  id="btn_submit_story"
                  value="submit"
                >Submit</button>
              </div>
            </form>`
    )
}
function onSubmitFeedback(){
    let url = window.location.pathname + "/feedback";
    let isUser = JSON.parse(sessionStorage.getItem("user_details")).isUser
    event.preventDefault();
    let errorDiv = $("#div_feedback_error");
    errorDiv.empty();
    let data = {}

    try{
        let feedback = $('#feedback').val();
        let feedbackDiv = $("#div_feedback");

        feedback = isValidString(feedback, 'Feedback');
        isValidFeedbackString(feedback);

        if(isUser){
            data ={feedback: feedback}
        }else{
            let first_name = $('#first_name').val()
            first_name = isValidString(first_name, 'First Name')
            checkName(first_name)

            let last_name = $('#last_name').val()
            last_name = isValidString(last_name, 'Last Name')
            checkName(last_name)

            let email = $('#email').val()
            email = isValidString(email.toLowerCase(), 'Email')
            checkEmail(email)
            
            data ={
                first_name: first_name,
                last_name: last_name,
                email: email,
                feedback: feedback
            }

        }

        let requestConfig = {
            method: "POST",
            url: url,
            dataType: "json",
            data: data
        }

        $.ajax(requestConfig).then(function(responseMessage){
            if(responseMessage.success){
                feedbackDiv.empty();
                if(isUser){
                    feedbackDiv.append(`<p class="fs-5 fw-bolder">Your Feedback</p>`);
                    feedbackDiv.append(`<p class="fst-italic feedback" >${feedback}</p>`);
                    feedbackDiv.append(`<btn class="btn btn-primary" onclick="onEditFeedback()">Edit</btn>`);
                }else feedbackDiv.append(`<span class="text-success">Thank you for submitting feedback!</span>`)
            }else{
                errorDiv.empty()
                errorDiv.append(`<span class="text-danger">${responseMessage.error}</span>`);
                errorDiv.show();
            }
        })

    }catch(error){
        errorDiv.empty()
        errorDiv.append(`<span class="text-danger">${error}</span>`);
        errorDiv.show();
    }
}

function onEditFeedback(){
    let feedbackDiv = $("#div_feedback");
    let feedback = feedbackDiv.find("p.feedback").text();
    feedbackDiv.empty();
    feedbackDiv.append(`
        <form id="feedback_form" action="/feedback" method="POST" onsubmit="onSubmitFeedback()" >
            <label class="labels" for="feedback">Feedback (will only be seen by the host)</label>
            <textarea
            rows="5"
            class="form-control"
            name="feedback"
            id="feedback"
            placeholder="Share any feedback you have for the host"
            >${feedback}</textarea>
            <div id="div_feedback_error" class="m-2 text-center"></div>

            <div class="m-2 text-center">
                <button
                    class="btn btn-primary profile-button"
                    type="submit"
                    id="btn_submit_feedback"
                    value="submit"
                >Submit Feedback</button>
            </div>
        </form>
    `)
}

function isValidString(str, name) {
    if (!str) {
      throw `${name} cannot be empty`;
    }
    if (typeof str !== "string") {
      throw `${name} must be a string`;
    }
    str = str.trim();
    if (str.length == 0) {
      throw `${name} cannot be empty string`;
    }
    return str;
  }

function isValidStoryString(story){
    if(story.split(" ").length < 20){
        throw "Error: story must be at least 20 words long";
    }
}

function isValidFeedbackString(story){
    if(story.split(" ").length < 10){
        throw "Error: story must be at least 10 words long";
    }
}

function checkName(name){
    if(name.length < 2) throw "Name cannot be less than 2 characters";
    if(name.length > 25) throw "Name cannot be more than 25 characters";
    if(name.trim().length === 0) throw "Name cannot be empty";
    if(!isNaN(name)) throw "Name cannot be a number";
}

function checkEmail(email){
    email = email.toLowerCase();
    if(email.length < 5) throw "Email cannot be less than 5 characters";
    if(email.length > 50) throw "Email cannot be more than 50 characters";
    if(email.trim().length === 0) throw "Email cannot be empty";
    if(!isNaN(email)) throw "Email cannot be a number";
    if(!email.includes("@")) throw "Email must contain @";
    if(!email.includes(".")) throw "Email must contain .";  
  }