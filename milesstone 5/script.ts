document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
    const shareableLinkDisplay = document.getElementById('shareable-link') as HTMLElement;
    const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;

    // Event listener for form submission
    resumeForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();  // Prevent form submission from refreshing the page
        generateCV();  // Generate the CV and URL
    });

    // Function to generate the CV and unique shareable link
    function generateCV(): void {
        const username = (document.getElementById('name') as HTMLInputElement).value.trim().toLowerCase();
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
            <p><strong>Name:</strong> <span id="resume-name" class="editable">${username}</span></p>
            <p><strong>Age:</strong> <span id="resume-age" class="editable">${age}</span></p>
            <p><strong>Marital Status:</strong> <span id="resume-status" class="editable">${status}</span></p>
            <p><strong>Gender:</strong> <span id="resume-gender" class="editable">${gender}</span></p>
            <p><strong>Education:</strong> <span id="resume-education" class="editable">${education}</span></p>
            <p><strong>Experience:</strong> <span id="resume-experience" class="editable">${experience}</span></p>
            <p><strong>Skills:</strong> <span id="resume-skills" class="editable">${skills.join(', ')}</span></p>
            <p><strong>Email:</strong> <span id="resume-email" class="editable">${email}</span></p>
            <p><strong>Contact Number:</strong> <span id="resume-number" class="editable">${number}</span></p>
            </div>
        `;

        // Create a unique shareable link based on username
        const uniqueLink = `${username}.vercel.app/resume`;

        // Display the shareable link with an option to copy
        shareableLinkDisplay.innerHTML = `
            <p>Shareable Link: <a href="https://${uniqueLink}" target="_blank">${uniqueLink}</a></p>
            <button id="copy-link-btn">Copy Link</button>
        `;

        // Add copy link functionality
        const copyLinkBtn = document.getElementById('copy-link-btn') as HTMLButtonElement;
        copyLinkBtn.addEventListener('click', () => {
            copyToClipboard(`https://${uniqueLink}`);
            alert('Link copied to clipboard!');
        });

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

    // Function to copy text to clipboard
    function copyToClipboard(text: string): void {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }

    // Event listener for downloading the resume as PDF
    downloadBtn.addEventListener('click', () => {
        downloadResumeAsPDF();
    });

    // Function to download the resume as PDF using html2pdf.js
    function downloadResumeAsPDF(): void {
        const element = document.getElementById('resume-display');
        if (element) {
            html2pdf()
                .from(element)  // Convert the HTML element to PDF
                .set({
                    margin: 1,  // Set margin for the PDF
                    filename: 'resume.pdf',  // Set the file name
                    html2canvas: { scale: 2 },  // Improve resolution for canvas rendering
                    jsPDF: { orientation: 'portrait' }  // PDF orientation set to portrait
                })
                .save();  // Automatically download the PDF
        }
    }
});

