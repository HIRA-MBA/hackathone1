document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resume-form');
    var resumeDisplay = document.getElementById('resume-display');
    // Event listener for form submission
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission from refreshing the page
        generateCV(); // Generate the CV
    });
    // Function to generate the CV
    function generateCV() {
        var name = document.getElementById('name').value;
        var age = document.getElementById('age').value;
        var status = document.getElementById('status').value;
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var education = document.querySelector('select[name="education"]').value;
        var experience = document.getElementById('experience').value;
        var email = document.getElementById('email').value;
        var number = document.getElementById('number').value;
        // Collect the skills from checkboxes
        var skills = [];
        document.querySelectorAll('input[name="skills"]:checked').forEach(function (skill) {
            skills.push(skill.value);
        });
        // Generate the resume display
        resumeDisplay.innerHTML = "\n         <div class=\"resume-container\">\n            <h2>Resume</h2>\n            <p><strong>Name:</strong> <span id=\"resume-name\" class=\"editable\">".concat(name, "</span></p>\n            <p><strong>Age:</strong> <span id=\"resume-age\" class=\"editable\">").concat(age, "</span></p>\n            <p><strong>Marital Status:</strong> <span id=\"resume-status\" class=\"editable\">").concat(status, "</span></p>\n            <p><strong>Gender:</strong> <span id=\"resume-gender\" class=\"editable\">").concat(gender, "</span></p>\n            <p><strong>Education:</strong> <span id=\"resume-education\" class=\"editable\">").concat(education, "</span></p>\n            <p><strong>Experience:</strong> <span id=\"resume-experience\" class=\"editable\">").concat(experience, "</span></p>\n            <p><strong>Skills:</strong> <span id=\"resume-skills\" class=\"editable\">").concat(skills.join(', '), "</span></p>\n            <p><strong>Email:</strong> <span id=\"resume-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Contact Number:</strong> <span id=\"resume-number\" class=\"editable\">").concat(number, "</span></p>\n            <div>\n        ");
        // Make the sections editable
        makeSectionsEditable();
    }
    // Function to make sections editable on click
    function makeSectionsEditable() {
        var editableSections = document.querySelectorAll('.editable');
        editableSections.forEach(function (section) {
            section.addEventListener('click', function () {
                section.setAttribute('contenteditable', 'true');
                section.focus(); // Cast to HTMLElement to access focus()
            });
            section.addEventListener('blur', function () {
                section.setAttribute('contenteditable', 'false');
            });
        });
    }
});
