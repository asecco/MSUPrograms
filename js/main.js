document.addEventListener('DOMContentLoaded', function() {

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("quiz_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Quiz starts
// If more science, it will have a positive weight.
// If more arts, it will have a negative weight.
var prompts = [
    {
        prompt: '1) I have interest in the arts, such as theatre or music.',
        weight: -3,
        class: 'group0'
    },
    {
        prompt: '2) In High School I usually preferred math and science over language arts.',
        weight: 2,
        class: 'group1'
    },
    {
        prompt: '3) I am very interested in teaching and assisting people.',
        weight: -3,
        class: 'group2'
    },
    {
        prompt: '4) I enjoy working with large groups where I can share ideas.',
        weight: -1,
        class: 'group3'
    },
    {
        prompt: '5) I am good with numbers and detail-oriented.',
        weight: 2,
        class: 'group4'
    },
    {
        prompt: '6) During group projects I tend to gravitate towards the leader role.',
        weight: 1,
        class: 'group5'
    },
    {
        prompt: '7) I enjoy learning about different cultures and would like to travel the world.',
        weight: -2,
        class: 'group6'
    },
    {
        prompt: '8) I enjoy design and multimedia.',
        weight: -2,
        class: 'group7'
    },
    {
        prompt: '9) I am interested in engineering and technology and trying to solve everyday problems.',
        weight: 3,
        class: 'group8'
    },
    {
        prompt: '10) I consider myself more of an extrovert than an introvert. ',
        weight: -1,
        class: 'group9'
    },
    {
        prompt: '11) I work well with others and have strong communication skills.',
        weight: -1,
        class: 'group10'
    },
    {
        prompt: '12) I enjoy learning about the human body and would like to heal people',
        weight: 2,
        class: 'group11'
    },
    {
        prompt: '13) I am interested in politics, law, and the government.',
        weight: 1,
        class: 'group12'
    },
    {
        prompt: "14) I don't mind being the center of attention.",
        weight: -1,
        class: 'group13'
    },
    {
        prompt: '15) As a kid I often took things apart to see how they worked.',
        weight: 3,
        class: 'group14'
    },
    {
        prompt: '16) I am good at understanding people and being open to new ideas.',
        weight: -1,
        class: 'group15'
    },
    {
        prompt: '17) I would rather be a writer than an engineer.',
        weight: -2,
        class: 'group16'
    },
    {
        prompt: '18) I would rather be an accountant than a teacher',
        weight: 1,
        class: 'group17'
    },
    {
        prompt: '19) I would rather be a psychologist than a nurse.',
        weight: -1,
        class: 'group18'
    },
    {
        prompt: '20) I would rather be software engineer than a manager.',
        weight: 2,
        class: 'group19'
    }
    ]
    
    // This array stores all of the possible values and the weight associated with the value. 
    // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
    var prompt_values = [
    {
        value: 'Agree', 
        class: 'btn-default btn-agree',
        weight: 1
    },
    {
        value: 'Disagree',
        class: 'btn-default btn-agree',
        weight: -1
    },
    ]
    
    // For each prompt, create a list item to be inserted in the list group
    function createPromptItems() {
    
        for (var i = 0; i < prompts.length; i++) {
            var prompt_li = document.createElement('li');
            var prompt_p = document.createElement('p');
            var prompt_text = document.createTextNode(prompts[i].prompt);
    
            prompt_li.setAttribute('class', 'list-group-item prompt');
            prompt_p.appendChild(prompt_text);
            prompt_li.appendChild(prompt_p);
    
            document.getElementById('quiz').appendChild(prompt_li);
        }
    }

    function createValueButtons() {
        for (var li_index = 0; li_index < prompts.length; li_index++) {
            var group = document.createElement('div');
            group.className = 'btn-group btn-group-justified';
    
            for (var i = 0; i < prompt_values.length; i++) {
                var btn_group = document.createElement('div');
                btn_group.className = 'btn-group';
    
                var button = document.createElement('button');
                var button_text = document.createTextNode(prompt_values[i].value);
                button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
                button.appendChild(button_text);
    
                btn_group.appendChild(button);
                group.appendChild(btn_group);
    
                document.getElementsByClassName('prompt')[li_index].appendChild(group);
            }
        }
    }
    
    createPromptItems();
    createValueButtons();
    
    // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
    // Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
    var total = 0;
    
    // Get the weight associated to group number
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
    // Get the weight associated to the value
    function findValueWeight(values, value) {
        var weight = 0;
    
        for (var i = 0; i < values.length; i++) {
            if (values[i].value === value) {
                weight = values[i].weight;
            }
        }
    
        return weight;
    }
    
    // When user clicks a value to agree/disagree with the prompt, display to the user what they selected
    $('.value-btn').mousedown(function () {
        var classList = $(this).attr('class');
        // console.log(classList);
        var classArr = classList.split(" ");
        // console.log(classArr);
        var this_group = classArr[0];
        // console.log(this_group);
    
        // If button is already selected, de-select it when clicked and subtract any previously added values to the total
        // Otherwise, de-select any selected buttons in group and select the one just clicked
        // And subtract deselected weighted value and add the newly selected weighted value to the total
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        } else {
            // $('[class='thisgroup).prop('checked', false);
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            // console.log($('.'+this_group+'.active').text());
            $('.'+this_group).removeClass('active');
    
            // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
            // $(this).prop('checked', true);
            $(this).addClass('active');
            total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        }
    
        console.log(total);
    })
      
    $('#submit-btn').click(function () {
        // After clicking submit, add up the totals from answers
        $('.results').removeClass('hide');
        $('.results').addClass('show');

        if(total <= -6) { //Arts and Humanities
            document.getElementById('results').innerHTML = '<b>Arts and Humanities:</b><br><br>\
            You are someone who enjoys being creative and learning new ideas centered around humans and culture.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Arts-and-Humanities.html" target="_blank">Arts and Humanities</a>\
            <br><br>\
            <a href="/pages/English.html" target="_blank">English</a>\
            <br><br>\
            <a href="/pages/Film-Studies.html" target="_blank">Film Studies</a>\
            <br><br>\
            <a href="/pages/Theatre.html" target="_blank">Theatre</a>\
            <br><br>\
            <a href="/pages/Digital-Storytelling.html" target="_blank">Digital Storytelling</a>';

        } else if(total <= -3) { //Education
            document.getElementById('results').innerHTML = '<b>Education:</b><br><br>\
            You are someone who enjoys caring for others and sharing your knowledge through teaching.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Education.html" target="_blank">Education</a>\
            <br><br>\
            <a href="/pages/Child-Development.html" target="_blank">Child Development</a>\
            <br><br>\
            <a href="/pages/Special-Education.html" target="_blank">Special Education</a>\
            <br><br>\
            <a href="/pages/Social-Work.html" target="_blank">Social Work</a>\
            <br><br>\
            <a href="/pages/Early-Care-and-Education.html" target="_blank">Early Care and Education</a>';

        } else if(total < 0) { //Social Science
            document.getElementById('results').innerHTML = '<b>Social Science:</b><br><br>\
            You are someone who enjoys learning about why humans do what they do and are interested in the law and government.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Psychology.html" target="_blank">Psychology</a>\
            <br><br>\
            <a href="/pages/Sociology.html" target="_blank">Sociology</a>\
            <br><br>\
            <a href="/pages/Criminal-Justice.html" target="_blank">Criminal Justice</a>\
            <br><br>\
            <a href="/pages/Political-Science-Prelaw.html" target="_blank">Political Science Prelaw</a>\
            <br><br>\
            <a href="/pages/Philosophy.html" target="_blank">Philosophy</a>';

        } else if(total == 0) { //Hybrid
            document.getElementById('results').innerHTML = '<b>Hybrid:</b><br><br>\
            You are someone who is very unique! Unlike the other disciplines, you are not strongly one side or the other and prefer to learn about a wide range of topics.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Nursing.html" target="_blank">Nursing</a>\
            <br><br>\
            <a href="/pages/Applied-Engineering-Sciences.html" target="_blank">Applied Engineering Sciences</a>\
            <br><br>\
            <a href="/pages/Experience-Architecture.html" target="_blank">Experience Architecture</a>\
            <br><br>\
            <a href="/pages/Marketing.html" target="_blank">Marketing</a>\
            <br><br>\
            <a href="/pages/Communication.html" target="_blank">Communication</a>';

        } else if(total <= 3) { //Business
            document.getElementById('results').innerHTML = '<b>Business:</b><br><br>\
            You are someone who enjoys critical thinking and has strong leadership skills. You like to take the initiative and are a self-motivator.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Finance.html" target="_blank">Finance</a>\
            <br><br>\
            <a href="/pages/Accounting.html" target="_blank">Accounting</a>\
            <br><br>\
            <a href="/pages/Human-Resource-Management.html" target="_blank">Human Resource Management</a>\
            <br><br>\
            <a href="/pages/Supply-Chain-Management.html" target="_blank">Supply Chain Management</a>\
            <br><br>\
            <a href="/pages/Management.html" target="_blank">Management</a>';

        } else if(total <= 6) { //Math and Science
            document.getElementById('results').innerHTML = '<b>Math and Science:</b><br><br>\
            You are someone who enjoys thinking logically and exploring different concepts in the field of hard science.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Mathematics.html" target="_blank">Mathematics</a>\
            <br><br>\
            <a href="/pages/Human-Biology.html" target="_blank">Human Biology</a>\
            <br><br>\
            <a href="/pages/Chemistry.html" target="_blank">Chemistry</a>\
            <br><br>\
            <a href="/pages/Data-Science.html" target="_blank">Data-Science</a>\
            <br><br>\
            <a href="/pages/Zoology.html" target="_blank">Zoology</a>';

        } else { //Engineering and Technology
            document.getElementById('results').innerHTML = '<b>Engineering and Technology:</b><br><br>\
            You are someone who enjoys solving complex issues and can think outside the box to come up with unique solutions.\
            <br><br>\
            <b>Possible majors for you:</b>\
            <br><br>\
            <a href="/pages/Mechanical-Engineering.html" target="_blank">Mechanical Engineering</a>\
            <br><br>\
            <a href="/pages/Computer-Science.html" target="_blank">Computer Science</a>\
            <br><br>\
            <a href="/pages/Biosystems-Engineering.html" target="_blank">Biosystems Engineering</a>\
            <br><br>\
            <a href="/pages/Information-Science.html" target="_blank">Information Science</a>\
            <br><br>\
            <a href="/pages/Games-and-Interactive-Media.html" target="_blank">Games and Interactive Media</a>';
        }
    

        // Hide the quiz after they submit their results
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    
    // Refresh the screen to show a new quiz if they click the retake quiz button
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
    
        $('.results').addClass('hide');
        $('.results').removeClass('show');
    })
// Quiz ends
}, false);