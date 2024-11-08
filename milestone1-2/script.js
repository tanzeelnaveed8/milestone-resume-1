// Handle profile picture preview
const profilePictureInput = document.getElementById("profilePicture");
const profilePicturePreview = document.getElementById("profilePicturePreview");

profilePictureInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            profilePicturePreview.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle adding work experience fields dynamically
const addExperienceButton = document.getElementById("addExperience");
const experienceFieldsContainer = document.getElementById("experienceFields");

addExperienceButton.addEventListener("click", function () {
    const experienceDiv = document.createElement("div");
    experienceDiv.classList.add("experience-entry");

    experienceDiv.innerHTML = `
        <div class="form-group">
            <label for="jobTitle">Job Title</label>
            <input type="text" class="jobTitle" required>
        </div>
        <div class="form-group">
            <label for="companyName">Company Name</label>
            <input type="text" class="companyName" required>
        </div>
        <div class="form-group">
            <label for="jobDescription">Job Description</label>
            <textarea class="jobDescription" rows="4" required></textarea>
        </div>
        <button type="button" class="remove-button">Remove</button>
    `;
    
    experienceFieldsContainer.appendChild(experienceDiv);

    // Handle removing experience entry
    experienceDiv.querySelector(".remove-button").addEventListener("click", function () {
        experienceDiv.remove();
    });
});

// Handle adding education fields dynamically
const addEducationButton = document.getElementById("addEducation");
const educationFieldsContainer = document.getElementById("educationFields");

addEducationButton.addEventListener("click", function () {
    const educationDiv = document.createElement("div");
    educationDiv.classList.add("education-entry");

    educationDiv.innerHTML = `
        <div class="form-group">
            <label for="degree">Degree</label>
            <input type="text" class="degree" required>
        </div>
        <div class="form-group">
            <label for="institution">Institution</label>
            <input type="text" class="institution" required>
        </div>
        <div class="form-group">
            <label for="graduationYear">Graduation Year</label>
            <input type="text" class="graduationYear" required>
        </div>
        <button type="button" class="remove-button">Remove</button>
    `;

    educationFieldsContainer.appendChild(educationDiv);

    // Handle removing education entry
    educationDiv.querySelector(".remove-button").addEventListener("click", function () {
        educationDiv.remove();
    });
});

// Handle generating resume preview
const generateResumeButton = document.getElementById("generateResumeButton");
const resumePreviewContainer = document.getElementById("resumePreview");

generateResumeButton.addEventListener("click", function () {
    const fullName = document.getElementById("fullName").value;
    const title = document.getElementById("title").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const summary = document.getElementById("summary").value;

    let experience = "";
    const experienceEntries = experienceFieldsContainer.getElementsByClassName("experience-entry");
    for (const entry of experienceEntries) {
        const jobTitle = entry.querySelector(".jobTitle").value;
        const companyName = entry.querySelector(".companyName").value;
        const jobDescription = entry.querySelector(".jobDescription").value;

        experience += `<h4>${jobTitle}</h4>
                        <p><strong>${companyName}</strong></p>
                        <p>${jobDescription}</p>`;
    }

    let education = "";
    const educationEntries = educationFieldsContainer.getElementsByClassName("education-entry");
    for (const entry of educationEntries) {
        const degree = entry.querySelector(".degree").value;
        const institution = entry.querySelector(".institution").value;
        const graduationYear = entry.querySelector(".graduationYear").value;

        education += `<h4>${degree}</h4>
                        <p><strong>${institution}</strong> - ${graduationYear}</p>`;
    }

    resumePreviewContainer.innerHTML = `
        <div class="resume-preview-header">
            <img class="profile-picture" src="${profilePicturePreview.src}" alt="Profile Picture">
            <h2>${fullName}</h2>
            <p>${title}</p>
            <p>${email} | ${phone} | ${location}</p>
        </div>
        <div class="resume-preview-summary">
            <h3>Professional Summary</h3>
            <p>${summary}</p>
        </div>
        <div class="resume-preview-experience">
            <h3>Work Experience</h3>
            ${experience || "<p>No experience added.</p>"}
        </div>
        <div class="resume-preview-education">
            <h3>Education</h3>
            ${education || "<p>No education added.</p>"}
        </div>
    `;
});


/// Event listener for saving as image
document.getElementById("saveImageButton").addEventListener("click", function() {
    // Capture the resume preview container
    html2canvas(document.getElementById("resumePreview")).then(function(canvas) {
        // Convert the canvas to an image and save it
        const imageUrl = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "resume_preview.png"; // Set the image file name
        link.click();
    });
});


