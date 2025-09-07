document.addEventListener('DOMContentLoaded', () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const detailDisplay = document.getElementById('detail-display');

    // Function to set the detail display to the default message
    const showDefaultMessage = () => {
        detailDisplay.innerHTML = `
            <p>请将鼠标悬停在队员头像上</p>
            <p>来查看他们的信息。</p>
            <p>点击队员头像</p>
            <p>跳转到他们的GitHub主页</p>
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

                // 鼠标进入头像: 显示对应信息
                memberLabel.addEventListener('mouseenter', () => {
                    document.querySelectorAll('.member-label').forEach(label => {
                        label.classList.remove('hovered');
                    });
                    memberLabel.classList.add('hovered');

                    detailDisplay.innerHTML = `
                        <h3>${member.name}</h3>
                        <p>${member.bio}</p>
                    `;
                    detailDisplay.classList.add('visible');
                });
                
                // 鼠标离开头像: 显示默认提示
                memberLabel.addEventListener('mouseleave', () => {
                    showDefaultMessage();
                });

                // 点击头像: 跳转到 GitHub 主页
                memberLabel.addEventListener('click', () => {
                    window.open(member.github, '_blank');
                });
            });

            // 初始状态: 页面加载时显示默认提示
            showDefaultMessage();
        })
        .catch(error => console.error('加载成员信息失败:', error));

    // 加载并渲染项目作品 (保持不变)
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