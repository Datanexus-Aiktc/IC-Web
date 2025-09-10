const teamBoxesContainer = document.getElementById('team-selector');
const teamBoxes = document.querySelectorAll('.team-box');
const teamsDisplay = document.getElementById('teams-display');

// ✅ Team data with LinkedIn
const teamData = {
    technical: [
        { name: "Amrut Patankar", linkedin: "https://www.linkedin.com/in/amrut-patankar-7ab8b4378", image:"Images/AMRUT_PATANKAR.png" },
        { name: "Siddique Talha", linkedin: "https://www.linkedin.com/in/talha-siddique-723475231", image:"Images/Talha.png" },
        { name: "Raouf Shaikh", linkedin: "https://www.linkedin.com/in/mohammad-raouf-shaikh-684b93288", image:"Images/RAOUF_SHAIKH.png" }
    ],
    documentation: [
        { name: "Aqsa Obaray", linkedin: "https://www.linkedin.com/in/aqsa-obaray-0856252bb", image:"Images/AQSA_OBARAY.png" },
        { name: "Kelkar Umme", linkedin: "https://www.linkedin.com/in/aiman-kelkar-36b90136b" , image:"Images/UMME_KELKAR.png"}
    ],
    designing: [
        { name: "Madiha Lasne", linkedin: "https://www.linkedin.com/in/madiha-lasne-597404330", image:"Images/MADIHA_LASNE.png" },
        { name: "Rida Dhanse", linkedin: "", image:"../Images/RIDA_DHANSE.png" }
    ],
    marketing: [
        { name: "Mahek Bagdadi", linkedin: "https://www.linkedin.com/public-profile/settings", image:"Images/MAHEK_BAGDADI.png" },
        { name: "Ahmed Khan", linkedin: "https://www.linkedin.com/in/khan-mohammad-ahmed-tajuddin-2ab076326" , image:"Images/AHMED_KHAN.png"},
        { name: "Umair Khan", linkedin: "https://tinyurl.com/ybpz4bp8", image:"../Images/UMAIR_KHAN.png" }
    ]
};

const shownTeams = new Set();
const teamSections = {}; // Store active DOM sections for removal

const leaderMap = {
    technical: '.tech-head-card',
    documentation: '.doc-head-card',
    designing: '.design-head-card',
    marketing: ['.marketing-head-card', '.media-head-card']
};

// ✅ Fade-in observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('fade-out');
        } else {
            entry.target.classList.remove('fade-in');
            entry.target.classList.add('fade-out');
        }
    });
}, {
    threshold: 0.2
});

function observeFadeElements() {
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        if (!el.classList.contains('fade-in') && !el.classList.contains('fade-out')) {
            el.classList.add('fade-out');
            observer.observe(el);
        }
    });
}

observeFadeElements();

teamBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const teamKey = box.dataset.team;

        // 🔄 If already shown → undo
        if (shownTeams.has(teamKey)) {
            shownTeams.delete(teamKey);

            if (teamSections[teamKey]) {
                teamsDisplay.removeChild(teamSections[teamKey]);
                delete teamSections[teamKey];
            }

            // Restore original leader card(s)
            const leaderClasses = leaderMap[teamKey];
            const leaderList = Array.isArray(leaderClasses) ? leaderClasses : [leaderClasses];

            leaderList.forEach(sel => {
                const card = document.querySelector(sel);
                if (card) {
                    card.style.display = '';
                }
            });

            return;
        }

        // ➕ First-time click
        shownTeams.add(teamKey);

        const section = document.createElement('div');
        section.classList.add('team-reveal', 'fade-on-scroll');

        const heading = document.createElement('h2');
        heading.textContent = teamKey.charAt(0).toUpperCase() + teamKey.slice(1) + ' Team';
        heading.classList.add('underline-heading', 'fade-on-scroll');
        heading.style.textAlign = "center"; // ✅ keep centered
        section.appendChild(heading);

        // ➕ Leader cards row
        const leaderClasses = leaderMap[teamKey];
        const leaderList = Array.isArray(leaderClasses) ? leaderClasses : [leaderClasses];
        const leaderRow = document.createElement('div');
        leaderRow.classList.add('team-cards-row');

        leaderList.forEach(sel => {
            const leaderCard = document.querySelector(sel);
            if (leaderCard) {
                const cloned = leaderCard.cloneNode(true);
                cloned.classList.add('moved-leader');
                leaderCard.style.display = 'none';
                leaderRow.appendChild(cloned);
            }
        });

        section.appendChild(leaderRow);

        // ➕ Member row
        const memberRow = document.createElement('div');
        memberRow.classList.add('team-members');

//Changes
teamData[teamKey].forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-card fade-on-scroll';
    card.innerHTML = `
        <img src="${member.image || 'default.jpg'}" class="profile-pic" alt="${member.name}">
        <h3>${member.name}</h3>
        <p class="title">Member</p>
        ${member.linkedin ? `
          <a href="${member.linkedin}" target="_blank" class="linkedin-link">
            <i class="fab fa-linkedin fa-lg"></i>
          </a>` : ""}
    `;
    memberRow.appendChild(card);
});
//

        section.appendChild(memberRow);
        teamsDisplay.appendChild(section);

        // Save section for undo
        teamSections[teamKey] = section;

        // Keep team boxes pinned at bottom
        teamsDisplay.appendChild(teamBoxesContainer);

        observeFadeElements();
    });
});

//  Responsive adjustments
// Responsive adjustment function
function adjustLayoutForScreenSize() {
  const teamCards = document.querySelectorAll('.team-card');
  const screenWidth = window.innerWidth;
  
  if (screenWidth <= 768) {
    // Mobile view adjustments
    teamCards.forEach(card => {
      card.style.minHeight = '300px';
      card.style.marginBottom = '20px';
    });
  } else if (screenWidth <= 992) {
    // Tablet view adjustments
    teamCards.forEach(card => {
      card.style.minHeight = '320px';
      card.style.marginBottom = '0';
    });
  } else {
    // Desktop view adjustments
    teamCards.forEach(card => {
      card.style.minHeight = '360px';
      card.style.marginBottom = '0';
    });
  }
}

// Call on load and resize
window.addEventListener('load', adjustLayoutForScreenSize);
window.addEventListener('resize', adjustLayoutForScreenSize);