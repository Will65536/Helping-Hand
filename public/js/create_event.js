var submitBtn = $("#submit_btn");
let release_time = new Date().getTime();

submitBtn.on("click", function (e) {
  e.preventDefault();

  let imageUrlInput = $("#image-url-input");
  // let imageFileInput = $("#image-input");
  let eventNameInput = $("#event_name");
  let descriptionInput = $("#description");
  let applicationDeadlineInput = $("#app_deadline");
  let hostTimeInput = $("#host_time");
  let streetAddressInput = $("#street_address");
  let cityInput = $("#city");
  let stateInput = $("#state");
  let zipCodeInput = $("#zipcode");
  let resultDiv = $("#result_div");
  resultDiv.empty();

  try {
    let imageUrl = imageUrlInput.val();
    // if (imageFileInput.prop("files")) {
    //   var imageFile = imageFileInput.prop("files")[0];
    //   var formData = new FormData();
    //   formData.append('image_file', imageFile);
    // }

    let eventName = eventNameInput.val();
    eventName = isValidString(eventName);

    let description = descriptionInput.val();
    description = isValidString(description);

    let applicationDeadline = applicationDeadlineInput.val();
    applicationDeadline = new Date(applicationDeadline).getTime();
    applicationDeadline = isValidEventTime(applicationDeadline, release_time);

    let hostTime = hostTimeInput.val();
    hostTime = new Date(hostTime).getTime();
    hostTime = isValidEventTime(hostTime, release_time);

    let streetAddress = streetAddressInput.val();
    isValidString(streetAddress);

    let city = cityInput.val();
    city = isValidString(city);

    let state = stateInput.val();
    state = isValidString(state);

    let zipCode = zipCodeInput.val();
    zipCode = isValidString(zipCode);
    zipCode = isValidZipCode(zipCode);

    if (hostTime < applicationDeadline)
      throw "Error: Event Date & Time should be after Registration Deadline";

    if (imageUrl) {
      imageUrl = isValidImageUrl(imageUrl);
      var data = {
        image_url: imageUrl,
        event_name: eventName,
        description: description,
        application_deadline: applicationDeadline,
        host_time: hostTime,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipCode,
      };
    }
    //  else if (imageFileInput.prop("files")) {
    //   var data = {
    //     image_file: formData,
    //     event_name: eventName,
    //     description: description,
    //     application_deadline: applicationDeadline,
    //     host_time: hostTime,
    //     streetAddress: streetAddress,
    //     city: city,
    //     state: state,
    //     zipcode: zipCode,
    //   };
     else {
      var data = {
        event_name: eventName,
        description: description,
        application_deadline: applicationDeadline,
        host_time: hostTime,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipCode,
      };
    }

    console.log(data);

    let requestConfig = {
      method: "POST",
      data: data,
      dataType: "json",
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage.success) {
        resultDiv.empty();
        resultDiv.append(
          `<span class="text-success">Event Created successfully!</span>`
        );
        resultDiv.show();
        window.location.href = `${responseMessage.event_id}`;
      } else {
        resultDiv.empty();
        resultDiv.append(
          `<span class="text-danger">${responseMessage.error}</span>`
        );
        resultDiv.show();
      }
    });
  } catch (error) {
    resultDiv.empty();
    resultDiv.append(`<span class="text-danger">${error}</span>`);
    resultDiv.show();
  }
});

function isValidString(str) {
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

function isValidZipCode(zipCode) {
  zipCode = zipCode.trim();
  const zipCodePattern = /^\d{5}(?:[-\s]\d{4})?$/;
  if (zipCodePattern.test(zipCode)) return zipCode;
  else throw "Error: Invalid Zip Code";
}

function isValidTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date);
}

function isValidEventTime(timestamp, release_time) {
  if (!isValidTimestamp(timestamp)) throw "Error: Invalid timestamp";
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

function isValidImageUrl(image_url) {
  const imageRegex = /\.(gif|jpg|jpeg|tiff|png|avif)/i;

  if (imageRegex.test(image_url)) {
    return image_url;
  } else {
    throw "Invalid image URL";
  }
}