var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var status = document.getElementById('status').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var education = document.querySelector('select').value;
    var experience = document.getElementById('Experience').value;
    var skills = [];
    document.querySelectorAll('input[name="skills"]:checked').forEach(function (skill) {
        skills.push(skill.value);
    });
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
    var resumeHTML = "\n  <div class=\"resume-container\">\n    <h1>Resume</h1>\n    <h2>Personal Information</h2>\n    \n    <p>Name: ".concat(name.toUpperCase(), "</p>\n    <p>Age: ").concat(age, "</p>\n    <p>Marital Status: ").concat(status, "</p>\n    <p>Gender: ").concat(gender, "</p>\n    <h2>Education</h2>\n    <p>Highest Education: ").concat(education, "</p>\n    <h2>Experience</h2>\n    <p>").concat(experience, "</p>\n    <h2>Skills</h2>\n    <p>").concat(skills.join(', '), "</p>\n    <h2>Contact</h2>\n    <p>Email: ").concat(email, "</p> \n\n    <p>Phone: ").concat(number, "</p>\n    </div>\n  ");
    resumeDisplay.innerHTML = resumeHTML;
});
