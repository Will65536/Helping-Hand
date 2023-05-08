(
    function($){
        let firstNameInput = $('#first_name'),
        lastNameInput = $('#last_name'),
        emailInput = $('#email'),
        contactInput = $('#contact'),
        bioInput = $('#bio'),
        skillsInput = $('#skills'),
        addBtn = $('#btn_add_skill'),
        skillBadges = $('#skill_badges'),
        addressInput = $('#address'),
        submitBtn = $('#submit_btn'),
        resultDiv = $('#result_div');
        resultDiv.hide();

        addBtn.on('click', function(e){
            e.preventDefault();

            let skill = skillsInput.val().trim();

            if(skill){
                skillBadges.append(`
                    <span class="bg-info mx-1 p-2 rounded-3 skill_badge">
                        ${skill} 
                        <button id="${skill}" type="button" class="btn-close" aria-label="Remove"></button>
                    </span>
                `);
                bindRemoveBadgeBtn(skillBadges.children().last().find("button"))
                skillsInput.val('');
            }
        });

        skillBadges.find("button").each( function(index, element){
            bindRemoveBadgeBtn($(element))
        });

        function bindRemoveBadgeBtn(skillElement){
            skillElement.on('click', function(e){
                e.preventDefault();
                $(this).parent().remove();
            });
        }

        // Submit the form
        submitBtn.on('click', function(e){
            e.preventDefault();
            let skillList = [];
            resultDiv.hide();
            try{
                skillBadges.find("span").each( function(index, element){
                    skillList.push($(element).text().trim());
                });
                let first_name = checkString(firstNameInput.val(), "First Name");
                checkName(first_name);
                let last_name = checkString(lastNameInput.val(), "Last Name");
                checkName(last_name);
                let email = checkString(emailInput.val(), "Email");
                checkEmail(email);
                let contact = contactInput.val()
                checkContact(contact);
                let bio = checkString(bioInput.val(), "Bio");
                let address = checkString(addressInput.val(), "Address");
                checkArray(skillList)
    
    
                let data = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    contact: contact,
                    bio: bio,
                    skills: skillList,
                    address: address
                };
    
                console.log(data);
    
                let requestConfig = {
                    url: '/profile',
                    method: 'PATCH',
                    data: data,
                    dataType: 'json'
                }
                
                $.ajax(requestConfig).then(function(responseMessage){
                    console.log(responseMessage);
                    if(responseMessage.success){
                        resultDiv.empty();
                        resultDiv.append(`<span class="text-success">Profile updated successfully!</span>`);
                        resultDiv.show();
                    }else{
                        resultDiv.empty();
                        resultDiv.append(`<span class="text-danger">${responseMessage.error}</span>`);
                        resultDiv.show();
                    }
                })
            }catch(e){
                resultDiv.empty()
                resultDiv.append(`<span class="text-danger">${e}</span>`);
                resultDiv.show();
            }
                
        })

        function checkString(strVal, varName) {
            if (!strVal) throw `You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
              throw `${varName} cannot be an empty string or string with just spaces`;
            if (!isNaN(strVal))
              throw `${strVal} is not a valid value for ${varName} as it only contains digits`;
            return strVal;
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

        function checkContact(contact){
            if(contact.length < 10) throw "Contact cannot be less than 10 digits";
            if(contact.length > 10) throw "Contact cannot be more than 10 digits";
            if(contact.trim().length === 0) throw "Contact cannot be empty";
            if(isNaN(contact)) throw "Contact must be a number";
        }

        //write a function to if the array is valid string array
        function checkArray(arr){
            if(!Array.isArray(arr)) throw `Please add skills`;
            if(arr.length === 0) throw `Please add skills`;
            for(let i = 0; i < arr.length; i++){
                if(typeof arr[i] !== 'string') throw `${arr[i]} is not a valid skill`;
                if(arr[i].length === 0) throw `${arr[i]} is not a valid skill`;
                if(!isNaN(arr[i])) throw `${arr[i]} is not a valid skill`;
            }
        }
    }
)(window.jQuery)