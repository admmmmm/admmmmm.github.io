document.addEventListener('DOMContentLoaded', () => {
    // 确保整个HTML文档加载完毕后，再执行下面的代码

    // 加载并渲染团队成员 (新逻辑，包含悬停交互)
    fetch('members.json')
        .then(response => response.json())
        .then(members => {
            const wrapper = document.getElementById('members-interactive-wrapper');

            // 创建一个容器来包裹所有标签
            const memberLabelsContainer = document.createElement('div');
            memberLabelsContainer.className = 'member-labels-container'; 
            wrapper.appendChild(memberLabelsContainer);

            // 创建一个用于显示详细信息的区域
            const detailDisplay = document.createElement('div');
            detailDisplay.className = 'member-detail-display';
            wrapper.appendChild(detailDisplay); 

            let activeMemberLabel = null; // 用于跟踪当前激活的标签

            members.forEach(member => {
                const memberLabel = document.createElement('div');
                memberLabel.className = 'member-label';

                memberLabel.innerHTML = `
                    <img src="${member.image}" alt="${member.name}的Q版画像">
                `;

                // 鼠标进入标签时，添加悬停效果并显示信息
                memberLabel.addEventListener('mouseenter', () => {
                    // 移除之前激活的标签样式
                    if (activeMemberLabel) {
                        activeMemberLabel.classList.remove('hovered');
                    }
                    // 添加当前标签的悬停样式
                    memberLabel.classList.add('hovered');
                    activeMemberLabel = memberLabel;

                    // 更新并显示详细信息
                    detailDisplay.innerHTML = `
                        <h3>${member.name} - ${member.role}</h3>
                        <p>${member.bio}</p>
                        <a href="${member.github}" class="github-link" target="_blank">GitHub主页</a>
                    `;
                    detailDisplay.classList.add('visible');
                });
                
                memberLabelsContainer.appendChild(memberLabel);
            });

            // 初始加载时，默认显示第一个成员的信息
            if (members.length > 0) {
                const firstMemberLabel = memberLabelsContainer.querySelector('.member-label');
                if (firstMemberLabel) {
                    firstMemberLabel.classList.add('hovered');
                    activeMemberLabel = firstMemberLabel;
                    detailDisplay.innerHTML = `
                        <h3>${members[0].name} - ${members[0].role}</h3>
                        <p>${members[0].bio}</p>
                        <a href="${members[0].github}" class="github-link" target="_blank">GitHub主页</a>
                    `;
                    detailDisplay.classList.add('visible');
                }
            }


            // 为了让鼠标从标签移动到详情面板也能保持显示，并最终隐藏
            detailDisplay.addEventListener('mouseleave', () => {
                detailDisplay.classList.remove('visible');
                if (activeMemberLabel) {
                    activeMemberLabel.classList.remove('hovered');
                    activeMemberLabel = null;
                }
            });
            detailDisplay.addEventListener('mouseenter', () => {
                detailDisplay.classList.add('visible');
            });
        })
        .catch(error => console.error('加载成员信息失败:', error));


    // 加载并渲染项目作品
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            // 清空现有的占位符内容
            projectsContainer.innerHTML = '';

            // 遍历JSON中的每个项目，创建它们的HTML卡片
            projects.forEach(project => {
                // 将技术栈数组转换成HTML字符串
                const techStackHtml = project.techStack.map(tech => `<span>${tech}</span>`).join('');
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}截图" loading="lazy">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech-stack">
                        ${techStackHtml}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">查看项目</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('加载项目信息失败:', error));

});