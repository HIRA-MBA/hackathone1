const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const age = (document.getElementById('age') as HTMLInputElement).value;
  const status = (document.getElementById('status') as HTMLInputElement).value;
  const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value;
  const education = (document.querySelector('select') as HTMLSelectElement).value;
  const experience = (document.getElementById('Experience') as HTMLInputElement).value;
  const skills: string[] = [];
  (document.querySelectorAll('input[name="skills"]:checked') as NodeListOf<HTMLInputElement>).forEach((skill) => {
    skills.push(skill.value);
  });
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const number = (document.getElementById('number') as HTMLInputElement).value;

  const resumeHTML = `
  <div class="resume-container">
    <h1>Resume</h1>
    <h2>Personal Information</h2>
    
    <p>Name: ${name.toUpperCase()}</p>
    <p>Age: ${age}</p>
    <p>Marital Status: ${status}</p>
    <p>Gender: ${gender}</p>
    <h2>Education</h2>
    <p>Highest Education: ${education}</p>
    <h2>Experience</h2>
    <p>${experience}</p>
    <h2>Skills</h2>
    <p>${skills.join(', ')}</p>
    <h2>Contact</h2>
    <p>Email: ${email}</p> \n
    <p>Phone: ${number}</p>
    </div>
  `;

  resumeDisplay.innerHTML = resumeHTML;
});


