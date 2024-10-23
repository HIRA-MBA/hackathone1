

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplay = document.getElementById('resume-display') as HTMLElement;

    // Event listener for form submission
    resumeForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();  // Prevent form submission from refreshing the page
        generateCV();  // Generate the CV
    });

    // Function to generate the CV
    function generateCV(): void {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const age = (document.getElementById('age') as HTMLInputElement).value;
        const status = (document.getElementById('status') as HTMLInputElement).value;
        const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value;
        const education = (document.querySelector('select[name="education"]') as HTMLSelectElement).value;
        const experience = (document.getElementById('experience') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const number = (document.getElementById('number') as HTMLInputElement).value;

        // Collect the skills from checkboxes
        const skills: string[] = [];
        document.querySelectorAll('input[name="skills"]:checked').forEach((skill: Element) => {
            skills.push((skill as HTMLInputElement).value);
        });

        // Generate the resume display
        resumeDisplay.innerHTML = `
         <div class="resume-container">
            <h2>Resume</h2>
            <p><strong>Name:</strong> <span id="resume-name" class="editable">${name}</span></p>
            <p><strong>Age:</strong> <span id="resume-age" class="editable">${age}</span></p>
            <p><strong>Marital Status:</strong> <span id="resume-status" class="editable">${status}</span></p>
            <p><strong>Gender:</strong> <span id="resume-gender" class="editable">${gender}</span></p>
            <p><strong>Education:</strong> <span id="resume-education" class="editable">${education}</span></p>
            <p><strong>Experience:</strong> <span id="resume-experience" class="editable">${experience}</span></p>
            <p><strong>Skills:</strong> <span id="resume-skills" class="editable">${skills.join(', ')}</span></p>
            <p><strong>Email:</strong> <span id="resume-email" class="editable">${email}</span></p>
            <p><strong>Contact Number:</strong> <span id="resume-number" class="editable">${number}</span></p>
            <div>
        `;

        // Make the sections editable
        makeSectionsEditable();
    }

    // Function to make sections editable on click
    function makeSectionsEditable(): void {
        const editableSections = document.querySelectorAll('.editable');

        editableSections.forEach(section => {
            section.addEventListener('click', () => {
                (section as HTMLElement).setAttribute('contenteditable', 'true');
                (section as HTMLElement).focus();  // Cast to HTMLElement to access focus()
            });

            section.addEventListener('blur', () => {
                (section as HTMLElement).setAttribute('contenteditable', 'false');
            });
        });
    }
});

