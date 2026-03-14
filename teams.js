const accordionContainer = document.getElementById('teams-accordion-container');

// ✅ Expanded Team Data based on user requirements
const allTeamData = {
    '2025': {
        faculty: [
            { name: "Prof. Zeeshan Khan", title: "HOD, Data Science", image: "Images/Zeeshan_Khan.jpeg", linkedin: "https://www.linkedin.com/in/zeeshan-khan-9584b3185" },
            { name: "Dr. Tabassum Maktum", title: "Former HOD", image: "Images/Tabassum_Mam.jpg", linkedin: "https://www.linkedin.com/in/dr-tabassum-maktum-3020b8260" },
            { name: "Dr. Renuka Chimankare", title: "Faculty Coordinator", image: "Images/Renuka_Mam.jpg", linkedin: "https://www.linkedin.com/in/dr-renuka-chimankare-9676b012b" },
            { name: "To Be Announced", title: "Faculty Member", image: "Images/nexus.png", linkedin: "#" }
        ],
        executives: [
            { name: "Mueez Hajwani", title: "President", image: "Images/MUEEZ_HAJWANI.png", linkedin: "https://www.linkedin.com/in/mueez-hajwani-8a80562b6" },
            { name: "Ali Khan", title: "Vice President", image: "Images/KHAN_ALI.png", linkedin: "https://www.linkedin.com/in/ali-khan-6486b02a7" }
        ],
        secretariat: [
            { name: "Irfan Shaikh", title: "Secretary", image: "Images/IRFANALI_SHAIKH.png", linkedin: "https://tinyurl.com/7297tuum" },
            { name: "Vivek Bangar", title: "Treasurer", image: "Images/VIVEK_BANGAR.png", linkedin: "http://www.linkedin.com/in/vivek-bangar-09b45b2b6" },
            { name: "Saeem Bijle", title: "Joint Treasurer", image: "Images/SAEEM_BIJLE.png", linkedin: "http://www.linkedin.com/in/saeem-bijle-698943288" }
        ],
        departments: [
            {
                name: "Technical Team",
                lead: { name: "Sana Shaikh", title: "Technical Head", image: "Images/SANA_SHAIKH_1.png", linkedin: "https://www.linkedin.com/in/sana-shaikh-88b692325" },
                members: [
                    { name: "Amrut Patankar", title: "Technical Member", image: "Images/AMRUT_PATANKAR.png", linkedin: "https://www.linkedin.com/in/amrut-patankar-7ab8b4378" },
                    { name: "Siddique Talha", title: "Technical Member", image: "Images/Talha.png", linkedin: "https://www.linkedin.com/in/talha-siddique-723475231" },
                    { name: "Raouf Shaikh", title: "Technical Member", image: "Images/RAOUF_SHAIKH.png", linkedin: "https://www.linkedin.com/in/mohammad-raouf-shaikh-684b93288" }
                ]
            },
            {
                name: "Documentation Team",
                lead: { name: "Sandip Dusadh", title: "Documentation Head", image: "Images/SANDIP_DUSADH.png", linkedin: "https://www.linkedin.com/in/sandip-dusadh-83264028a" },
                members: [
                    { name: "Aqsa Obaray", title: "Documentation Member", image: "Images/AQSA_OBARAY.png", linkedin: "https://www.linkedin.com/in/aqsa-obaray-0856252bb" },
                    { name: "Kelkar Umme", title: "Documentation Member", image: "Images/UMME_KELKAR.png", linkedin: "https://www.linkedin.com/in/aiman-kelkar-36b90136b" }
                ]
            },
            {
                name: "Design Team",
                lead: { name: "Maseera Rumani", title: "Design Head", image: "Images/Maseera_rumani.png", linkedin: "https://www.linkedin.com/in/maseera-rumani-09240628a" },
                members: [
                    { name: "Madiha Lasne", title: "Design Member", image: "Images/MADIHA_LASNE.png", linkedin: "https://www.linkedin.com/in/madiha-lasne-597404330" },
                    { name: "Rida Dhanse", title: "Design Member", image: "Images/RIDA_DHANSE.png", linkedin: "#" }
                ]
            },
            {
                name: "Media & Marketing Team",
                leads: [
                    { name: "Altaf Kasu", title: "Marketing Head", image: "Images/ALTAF_KASU.png", linkedin: "https://www.linkedin.com/in/altaf-kasu-0161252b6" },
                    { name: "Fiza Peerkhan", title: "Media Head", image: "Images/FIZA_PEERKHAN.png", linkedin: "https://www.linkedin.com/in/fiza-peerkhan-222b58289" }
                ],
                members: [
                    { name: "Mahek Bagdadi", title: "Media Member", image: "Images/MAHEK_BAGDADI.png", linkedin: "#" },
                    { name: "Ahmed Khan", title: "Marketing Member", image: "Images/AHMED_KHAN.png", linkedin: "https://www.linkedin.com/in/khan-mohammad-ahmed-tajuddin-2ab076326" },
                    { name: "Umair Khan", title: "Media Member", image: "Images/UMAIR_KHAN.png", linkedin: "https://tinyurl.com/ybpz4bp8" }
                ]
            }
        ],
        volunteers: [
            { name: "Volunteer 1", title: "Volunteer", image: "Images/nexus.png", linkedin: "#" },
            { name: "Saaim Rais", title: "Volunteer", image: "Images/saaim.png", linkedin: "https://www.linkedin.com/in/saaim-rais-7531a7328" },
            { name: "Volunteer 3", title: "Volunteer", image: "Images/nexus.png", linkedin: "#" },
            { name: "Volunteer 4", title: "Volunteer", image: "Images/nexus.png", linkedin: "#" },
            { name: "Usaid Duldule", title: "Volunteer", image: "Images/nexus.png", linkedin: "https://www.linkedin.com/in/usaid-d-8abb83292" },
            { name: "Volunteer 6", title: "Volunteer", image: "Images/nexus.png", linkedin: "#" }
        ]
    },
    '2026': {
        faculty: [
            { name: "Prof. Zeeshan Khan", title: "HOD, Data Science", image: "Images/Zeeshan_Khan.jpeg", linkedin: "https://www.linkedin.com/in/zeeshan-khan-9584b3185" },
            { name: "To Be Announced", title: "Faculty Member", image: "Images/nexus.png", linkedin: "#" }
        ],
        executives: [
            { name: "To Be Announced", title: "President", image: "Images/nexus.png", linkedin: "#" },
            { name: "To Be Announced", title: "Vice President", image: "Images/nexus.png", linkedin: "#" }
        ],
        secretariat: [
            { name: "To Be Announced", title: "Secretary", image: "Images/nexus.png", linkedin: "#" },
            { name: "To Be Announced", title: "Treasurer", image: "Images/nexus.png", linkedin: "#" }
        ],
        departments: [],
        volunteers: []
    }
};

// ✅ Create a card element
function createCard(person, sizeClass = '') {
    const card = document.createElement('div');
    card.className = `team-card fade-on-scroll ${sizeClass}`;
    card.innerHTML = `
        <div class="card-glass-overlay"></div>
        <div class="profile-pic-container">
            <img src="${person.image || 'Images/nexus.png'}" class="profile-pic" alt="${person.name}">
        </div>
        <div class="card-content">
            <h3>${person.name}</h3>
            <p class="title">${person.title}</p>
            ${person.linkedin && person.linkedin !== '#' ? `
                <div class="social-links">
                    <a href="${person.linkedin}" target="_blank" class="linkedin-link" title="LinkedIn Profile">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>` : ''}
        </div>
    `;
    return card;
}

// ✅ Render a year section
function renderYearSection(year) {
    const yearData = allTeamData[year];
    const section = document.createElement('div');
    section.className = 'accordion-section';
    section.innerHTML = `
        <div class="accordion-header" data-year="${year}">
            <h2>Team of ${year}</h2>
            <i class="fas fa-chevron-down toggle-icon"></i>
        </div>
        <div class="accordion-content" id="content-${year}">
            <!-- Content will be filled here -->
        </div>
    `;

    const contentDiv = section.querySelector('.accordion-content');

    // Row 1: Leadership & Faculty
    if (yearData.faculty && yearData.faculty.length > 0) {
        const facultyRow = document.createElement('div');
        facultyRow.className = 'team-cards-row level-faculty';
        yearData.faculty.forEach(p => facultyRow.appendChild(createCard(p, 'large-card')));
        contentDiv.appendChild(facultyRow);
    }

    // Row 2: Student Executives
    if (yearData.executives && yearData.executives.length > 0) {
        const executiveRow = document.createElement('div');
        executiveRow.className = 'team-cards-row level-execs';
        yearData.executives.forEach(p => executiveRow.appendChild(createCard(p, 'xl-card')));
        contentDiv.appendChild(executiveRow);
    }

    // Row 3: Secretariat & Treasury
    if (yearData.secretariat && yearData.secretariat.length > 0) {
        const secretariatRow = document.createElement('div');
        secretariatRow.className = 'team-cards-row level-secretariat';
        yearData.secretariat.forEach(p => secretariatRow.appendChild(createCard(p)));
        contentDiv.appendChild(secretariatRow);
    }

    // Row 4: Departmental Leads & Members
    if (yearData.departments && yearData.departments.length > 0) {
        yearData.departments.forEach(dept => {
            const deptHeader = document.createElement('h3');
            deptHeader.className = 'department-heading underline-heading';
            deptHeader.textContent = dept.name;
            contentDiv.appendChild(deptHeader);

            const deptContainer = document.createElement('div');
            deptContainer.className = 'department-container';

            // Leads row
            const leadsRow = document.createElement('div');
            leadsRow.className = 'team-cards-row level-leads';
            if (dept.lead) {
                leadsRow.appendChild(createCard(dept.lead, 'large-card'));
            } else if (dept.leads) {
                dept.leads.forEach(l => leadsRow.appendChild(createCard(l, 'large-card')));
            }
            deptContainer.appendChild(leadsRow);

            // Members row
            if (dept.members && dept.members.length > 0) {
                const membersRow = document.createElement('div');
                membersRow.className = 'team-members-grid';
                dept.members.forEach(m => membersRow.appendChild(createCard(m)));
                deptContainer.appendChild(membersRow);
            }

            contentDiv.appendChild(deptContainer);
        });
    }

    // Row 5: Volunteers
    if (yearData.volunteers && yearData.volunteers.length > 0) {
        const volunteerHeader = document.createElement('h3');
        volunteerHeader.className = 'department-heading underline-heading';
        volunteerHeader.textContent = "Volunteers";
        contentDiv.appendChild(volunteerHeader);

        const volunteerRow = document.createElement('div');
        volunteerRow.className = 'volunteers-grid';
        yearData.volunteers.forEach(v => volunteerRow.appendChild(createCard(v)));
        contentDiv.appendChild(volunteerRow);
    }

    return section;
}

// ✅ Initialize Accordion
function initAccordion() {
    Object.keys(allTeamData).reverse().forEach(year => {
        const section = renderYearSection(year);
        accordionContainer.appendChild(section);

        const header = section.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = section.querySelector('.accordion-content');
            const icon = section.querySelector('.toggle-icon');
            const isOpen = content.classList.contains('open');

            // Close others (optional - commented out for multi-expand as requested "multiple years to coexist")
            /*
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
            document.querySelectorAll('.toggle-icon').forEach(i => i.classList.remove('rotate'));
            */

            if (!isOpen) {
                content.classList.add('open');
                icon.classList.add('rotate');
                observeFadeElements();
            } else {
                content.classList.remove('open');
                icon.classList.remove('rotate');
            }
        });
    });
}

// ✅ Fade-in observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('fade-out');
        }
    });
}, { threshold: 0.1 });

function observeFadeElements() {
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize
initAccordion();
observeFadeElements();
