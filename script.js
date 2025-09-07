document.addEventListener('DOMContentLoaded', () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const detailDisplay = document.getElementById('detail-display');

    // Function to set the detail display to the default message
    const showDefaultMessage = () => {
        detailDisplay.innerHTML = `
            <h3>请将鼠标悬停在队员头像上</h3>
            <p>来查看他们的信息。</p>
        `;
        detailDisplay.classList.add('visible');
        document.querySelectorAll('.member-label').forEach(label => {
            label.classList.remove('hovered');
        });
    };

    // Load and render team members
    fetch('members.json')
        .then(response => response.json())
        .then(members => {
            leftColumn.innerHTML = '';
            rightColumn.innerHTML = '';

            members.forEach((member, index) => {
                const memberLabel = document.createElement('div');
                memberLabel.className = 'member-label';
                memberLabel.innerHTML = `<img src="${member.image}" alt="${member.name}的Q版画像">`;

                if (index === 1) {
                    rightColumn.appendChild(memberLabel);
                } else {
                    leftColumn.appendChild(memberLabel);
                }

                // Mouse enters image: show specific info
                memberLabel.addEventListener('mouseenter', () => {
                    document.querySelectorAll('.member-label').forEach(label => {
                        label.classList.remove('hovered');
                    });
                    memberLabel.classList.add('hovered');

                    detailDisplay.innerHTML = `
                        <h3>${member.name} - ${member.role}</h3>
                        <p>${member.bio}</p>
                        <a href="${member.github}" class="github-link" target="_blank">GitHub主页</a>
                    `;
                    detailDisplay.classList.add('visible');
                });
                
                // Mouse leaves image: show default message
                memberLabel.addEventListener('mouseleave', () => {
                    showDefaultMessage();
                });
            });

            // Initial state: show the default message on page load
            showDefaultMessage();
        })
        .catch(error => console.error('加载成员信息失败:', error));

    // Load and render projects (unchanged)
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '';

            projects.forEach(project => {
                const techStackHtml = project.techStack.map(tech => `<span>${tech}</span>`).join('');
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}截图" loading="lazy">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech-stack">${techStackHtml}</div>
                    <a href="${project.link}" class="project-link" target="_blank">查看项目</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('加载项目信息失败:', error));
});