document.addEventListener('DOMContentLoaded', () => {
    // 获取新的布局容器
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const detailDisplay = document.getElementById('detail-display');
    
    // 加载并渲染团队成员
    fetch('members.json')
        .then(response => response.json())
        .then(members => {
            // 清空默认内容（在HTML中已经设置了，但这个习惯很好）
            leftColumn.innerHTML = '';
            rightColumn.innerHTML = '';
            
            // 遍历JSON中的每个成员，创建他们的HTML卡片
            members.forEach((member, index) => {
                const memberLabel = document.createElement('div');
                memberLabel.className = 'member-label';
                memberLabel.innerHTML = `<img src="${member.image}" alt="${member.name}的Q版画像">`;
                
                // 根据索引号决定放在哪一列
                if (index === 1) { // 成员2放在右边
                    rightColumn.appendChild(memberLabel);
                } else { // 成员1和3放在左边
                    leftColumn.appendChild(memberLabel);
                }
                
                // 鼠标进入标签时，更新中间的浮动窗口
                memberLabel.addEventListener('mouseenter', () => {
                    // 移除所有标签的悬停样式
                    document.querySelectorAll('.member-label').forEach(label => {
                        label.classList.remove('hovered');
                    });
                    // 为当前悬停的标签添加悬停样式
                    memberLabel.classList.add('hovered');
                    
                    // 更新并显示详细信息
                    detailDisplay.innerHTML = `
                        <h3>${member.name} - ${member.role}</h3>
                        <p>${member.bio}</p>
                        <a href="${member.github}" class="github-link" target="_blank">GitHub主页</a>
                    `;
                    detailDisplay.classList.add('visible');
                });
            });

            // 鼠标从任一标签或详情区域移开时，恢复默认状态
            detailDisplay.addEventListener('mouseleave', () => {
                detailDisplay.classList.remove('visible');
                document.querySelectorAll('.member-label').forEach(label => {
                    label.classList.remove('hovered');
                });
                // 恢复默认的提示信息
                detailDisplay.innerHTML = `
                    <h3>请将鼠标悬停在队员头像上</h3>
                    <p>来查看他们的信息。</p>
                `;
            });
            // 确保鼠标从标签移到详情区域时，状态不改变
            document.querySelectorAll('.member-label').forEach(label => {
                label.addEventListener('mouseleave', () => {
                    // 在此处不立即移除悬停效果，让详情区域的mouseleave事件处理
                });
            });
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