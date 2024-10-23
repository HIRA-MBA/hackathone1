document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resume-form');
    var resumeDisplay = document.getElementById('resume-display');
    var shareableLinkDisplay = document.getElementById('shareable-link');
    var downloadBtn = document.getElementById('download-btn');
    // Event listener for form submission
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission from refreshing the page
        generateCV(); // Generate the CV and URL
    });
    // Function to generate the CV and unique shareable link
    function generateCV() {
        var username = document.getElementById('name').value.trim().toLowerCase();
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
        resumeDisplay.innerHTML = "\n            <h2>Resume</h2>\n            <p><strong>Name:</strong> <span id=\"resume-name\" class=\"editable\">".concat(username, "</span></p>\n            <p><strong>Age:</strong> <span id=\"resume-age\" class=\"editable\">").concat(age, "</span></p>\n            <p><strong>Marital Status:</strong> <span id=\"resume-status\" class=\"editable\">").concat(status, "</span></p>\n            <p><strong>Gender:</strong> <span id=\"resume-gender\" class=\"editable\">").concat(gender, "</span></p>\n            <p><strong>Education:</strong> <span id=\"resume-education\" class=\"editable\">").concat(education, "</span></p>\n            <p><strong>Experience:</strong> <span id=\"resume-experience\" class=\"editable\">").concat(experience, "</span></p>\n            <p><strong>Skills:</strong> <span id=\"resume-skills\" class=\"editable\">").concat(skills.join(', '), "</span></p>\n            <p><strong>Email:</strong> <span id=\"resume-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Contact Number:</strong> <span id=\"resume-number\" class=\"editable\">").concat(number, "</span></p>\n        ");
        // Create a unique shareable link based on username
        var uniqueLink = "".concat(username, ".vercel.app/resume");
        // Display the shareable link with an option to copy
        shareableLinkDisplay.innerHTML = "\n            <p>Shareable Link: <a href=\"https://".concat(uniqueLink, "\" target=\"_blank\">").concat(uniqueLink, "</a></p>\n            <button id=\"copy-link-btn\">Copy Link</button>\n        ");
        // Add copy link functionality
        var copyLinkBtn = document.getElementById('copy-link-btn');
        copyLinkBtn.addEventListener('click', function () {
            copyToClipboard("https://".concat(uniqueLink));
            alert('Link copied to clipboard!');
        });
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
    // Function to copy text to clipboard
    function copyToClipboard(text) {
        var tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
    // Event listener for downloading the resume as PDF
    downloadBtn.addEventListener('click', function () {
        downloadResumeAsPDF();
    });
    // Function to download the resume as PDF using html2pdf.js
    function downloadResumeAsPDF() {
        var element = document.getElementById('resume-display');
        if (element) {
            html2pdf()
                .from(element) // Convert the HTML element to PDF
                .set({
                margin: 1, // Set margin for the PDF
                filename: 'resume.pdf', // Set the file name
                html2canvas: { scale: 2 }, // Improve resolution for canvas rendering
                jsPDF: { orientation: 'portrait' } // PDF orientation set to portrait
            })
                .save(); // Automatically download the PDF
        }
    }
});
