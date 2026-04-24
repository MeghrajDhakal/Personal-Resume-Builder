// Initial Data Structure
const data = {
    personal: {
        name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: ''
    },
    summary: '',
    skills: [
        { category: 'Programming Languages', items: 'Java, JavaScript, C, C++, Python' }
    ],
    experience: [
        { title: 'Software Intern', company: 'Cognifyz Technologies', date: 'Nov 2025 – Jan 2026', bullets: 'Developed and optimized Java-based backend modules...\nCollaborated with cross-functional teams...' }
    ],
    projects: [
        { title: 'Secure Password Engine', sub: 'Java, Algorithms, OOP', bullets: 'Developed a robust application...\nApplied OOP principles...' }
    ],
    education: [
        { degree: 'Bachelor of Technology in Computer Science', date: 'Expected 2027', sub: 'University of Science and Technology | CGPA: 8+ / 10' }
    ],
    achievements: [
        { text: 'Solved 400+ problems on LeetCode' }
    ]
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Populate form with initial data
    renderSkillsForm();
    renderExperienceForm();
    renderProjectForm();
    renderEducationForm();
    renderAchievementForm();
    
    updatePreview();

    // Print button
    document.getElementById('downloadBtn').addEventListener('click', () => {
        window.print();
    });
});

// --- Update Data from Inputs ---
function updateData() {
    data.personal.name = document.getElementById('name').value;
    data.personal.title = document.getElementById('title').value; // if needed
    data.personal.email = document.getElementById('email').value;
    data.personal.phone = document.getElementById('phone').value;
    data.personal.location = document.getElementById('location').value;
    data.personal.linkedin = document.getElementById('linkedin').value;
    data.personal.github = document.getElementById('github').value;

    data.summary = document.getElementById('summary').value;
}

// --- Preview Rendering ---
function updatePreview() {
    updateData();

    // 1. Personal Info
    document.getElementById('previewName').innerText = data.personal.name || 'Your Name';
    
    let contactItems = [];
    if (data.personal.phone) contactItems.push(data.personal.phone);
    if (data.personal.email) contactItems.push(`<a href="mailto:${data.personal.email}">${data.personal.email}</a>`);
    if (data.personal.linkedin) contactItems.push(`<a href="${data.personal.linkedin}">linkedin</a>`);
    if (data.personal.github) contactItems.push(`<a href="${data.personal.github}">github</a>`);
    if (data.personal.location) contactItems.push(data.personal.location);
    
    document.getElementById('previewContact').innerHTML = contactItems.join(' <span class="separator">|</span> ');

    // 2. Summary
    const summaryContainer = document.getElementById('previewSummaryContainer');
    if (data.summary.trim()) {
        summaryContainer.style.display = 'block';
        document.getElementById('previewSummary').innerText = data.summary;
    } else {
        summaryContainer.style.display = 'none';
    }

    // 3. Skills
    const skillsContainer = document.getElementById('previewSkillsContainer');
    if (data.skills.length > 0) {
        skillsContainer.style.display = 'block';
        const html = data.skills.map(s => `<div class="skills-block"><strong>${s.category}:</strong> ${s.items}</div>`).join('');
        document.getElementById('previewSkills').innerHTML = html;
    } else {
        skillsContainer.style.display = 'none';
    }

    // 4. Experience
    const expContainer = document.getElementById('previewExperienceContainer');
    if (data.experience.length > 0) {
        expContainer.style.display = 'block';
        const html = data.experience.map(e => `
            <div class="entry">
                <div class="entry-header">
                    <span class="entry-title">${e.title}${e.company ? ' – ' + e.company : ''}</span>
                    <span class="entry-date">${e.date}</span>
                </div>
                <ul>
                    ${e.bullets.split('\n').filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        document.getElementById('previewExperience').innerHTML = html;
    } else {
        expContainer.style.display = 'none';
    }

    // 5. Projects
    const projContainer = document.getElementById('previewProjectsContainer');
    if (data.projects.length > 0) {
        projContainer.style.display = 'block';
        const html = data.projects.map(p => `
            <div class="entry">
                <div class="entry-header">
                    <span class="entry-title">${p.title}</span>
                    <span class="entry-sub">${p.sub}</span>
                </div>
                <ul>
                    ${p.bullets.split('\n').filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        document.getElementById('previewProjects').innerHTML = html;
    } else {
        projContainer.style.display = 'none';
    }

    // 6. Education
    const eduContainer = document.getElementById('previewEducationContainer');
    if (data.education.length > 0) {
        eduContainer.style.display = 'block';
        const html = data.education.map(e => `
            <div class="entry">
                <div class="entry-header">
                    <span class="entry-title">${e.degree}</span>
                    <span class="entry-date">${e.date}</span>
                </div>
                <div class="entry-sub">${e.sub}</div>
            </div>
        `).join('');
        document.getElementById('previewEducation').innerHTML = html;
    } else {
        eduContainer.style.display = 'none';
    }
    
    // 7. Achievements
    const achContainer = document.getElementById('previewAchievementsContainer');
    if (data.achievements.length > 0) {
        achContainer.style.display = 'block';
        const html = data.achievements.map(a => `<li>${a.text}</li>`).join('');
        document.getElementById('previewAchievements').innerHTML = html;
    } else {
        achContainer.style.display = 'none';
    }
}

// --- Dynamic Forms Handlers ---

function createNode(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

// Skills
function renderSkillsForm() {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    data.skills.forEach((item, index) => {
        const node = createNode(`
            <div class="dynamic-item">
                <button type="button" class="delete-btn" onclick="removeSkill(${index})"><i class="fas fa-trash"></i></button>
                <div class="item-grid">
                    <input type="text" placeholder="Category (e.g. Languages)" value="${item.category}" oninput="data.skills[${index}].category = this.value; updatePreview()">
                    <input type="text" placeholder="Items (comma separated)" value="${item.items}" oninput="data.skills[${index}].items = this.value; updatePreview()">
                </div>
            </div>
        `);
        container.appendChild(node);
    });
}
window.addSkill = function() {
    data.skills.push({ category: '', items: '' });
    renderSkillsForm();
    updatePreview();
}
window.removeSkill = function(index) {
    data.skills.splice(index, 1);
    renderSkillsForm();
    updatePreview();
}

// Experience
function renderExperienceForm() {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = '';
    data.experience.forEach((item, index) => {
        const node = createNode(`
            <div class="dynamic-item">
                <button type="button" class="delete-btn" onclick="removeExperience(${index})"><i class="fas fa-trash"></i></button>
                <div class="item-grid">
                    <input type="text" class="item-full" placeholder="Job Title" value="${item.title}" oninput="data.experience[${index}].title = this.value; updatePreview()">
                    <input type="text" placeholder="Company" value="${item.company}" oninput="data.experience[${index}].company = this.value; updatePreview()">
                    <input type="text" placeholder="Date (e.g. Jan 2020 - Present)" value="${item.date}" oninput="data.experience[${index}].date = this.value; updatePreview()">
                    <textarea class="item-full" placeholder="Responsibilities (one per line)" rows="3" oninput="data.experience[${index}].bullets = this.value; updatePreview()">${item.bullets}</textarea>
                </div>
            </div>
        `);
        container.appendChild(node);
    });
}
window.addExperience = function() {
    data.experience.push({ title: '', company: '', date: '', bullets: '' });
    renderExperienceForm();
    updatePreview();
}
window.removeExperience = function(index) {
    data.experience.splice(index, 1);
    renderExperienceForm();
    updatePreview();
}

// Projects
function renderProjectForm() {
    const container = document.getElementById('projectContainer');
    container.innerHTML = '';
    data.projects.forEach((item, index) => {
        const node = createNode(`
            <div class="dynamic-item">
                <button type="button" class="delete-btn" onclick="removeProject(${index})"><i class="fas fa-trash"></i></button>
                <div class="item-grid">
                    <input type="text" placeholder="Project Name" value="${item.title}" oninput="data.projects[${index}].title = this.value; updatePreview()">
                    <input type="text" placeholder="Technologies used" value="${item.sub}" oninput="data.projects[${index}].sub = this.value; updatePreview()">
                    <textarea class="item-full" placeholder="Description (one per line)" rows="3" oninput="data.projects[${index}].bullets = this.value; updatePreview()">${item.bullets}</textarea>
                </div>
            </div>
        `);
        container.appendChild(node);
    });
}
window.addProject = function() {
    data.projects.push({ title: '', sub: '', bullets: '' });
    renderProjectForm();
    updatePreview();
}
window.removeProject = function(index) {
    data.projects.splice(index, 1);
    renderProjectForm();
    updatePreview();
}

// Education
function renderEducationForm() {
    const container = document.getElementById('educationContainer');
    container.innerHTML = '';
    data.education.forEach((item, index) => {
        const node = createNode(`
            <div class="dynamic-item">
                <button type="button" class="delete-btn" onclick="removeEducation(${index})"><i class="fas fa-trash"></i></button>
                <div class="item-grid">
                    <input type="text" class="item-full" placeholder="Degree / Certificate" value="${item.degree}" oninput="data.education[${index}].degree = this.value; updatePreview()">
                    <input type="text" placeholder="Institution & Details" value="${item.sub}" oninput="data.education[${index}].sub = this.value; updatePreview()">
                    <input type="text" placeholder="Date (e.g. Expected 2027)" value="${item.date}" oninput="data.education[${index}].date = this.value; updatePreview()">
                </div>
            </div>
        `);
        container.appendChild(node);
    });
}
window.addEducation = function() {
    data.education.push({ degree: '', date: '', sub: '' });
    renderEducationForm();
    updatePreview();
}
window.removeEducation = function(index) {
    data.education.splice(index, 1);
    renderEducationForm();
    updatePreview();
}

// Achievements
function renderAchievementForm() {
    const container = document.getElementById('achievementContainer');
    container.innerHTML = '';
    data.achievements.forEach((item, index) => {
        const node = createNode(`
            <div class="dynamic-item">
                <button type="button" class="delete-btn" onclick="removeAchievement(${index})"><i class="fas fa-trash"></i></button>
                <div class="item-grid">
                    <textarea class="item-full" placeholder="Achievement Detail (You can use HTML tags like <strong>)" rows="2" oninput="data.achievements[${index}].text = this.value; updatePreview()">${item.text}</textarea>
                </div>
            </div>
        `);
        container.appendChild(node);
    });
}
window.addAchievement = function() {
    data.achievements.push({ text: '' });
    renderAchievementForm();
    updatePreview();
}
window.removeAchievement = function(index) {
    data.achievements.splice(index, 1);
    renderAchievementForm();
    updatePreview();
}
