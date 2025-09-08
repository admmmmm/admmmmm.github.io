document.addEventListener('DOMContentLoaded', () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const detailDisplay = document.getElementById('detail-display');

    // Function to set the detail display to the default message
    const showDefaultMessage = () => {
        detailDisplay.innerHTML = `
            <h3>请将鼠标悬停在队员头像上</h3>
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
                // 如果成员没有图片路径，则跳过创建头像
                if (member.image === '/') {
                    return; 
                }

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

                // 点击头像: 跳转到 GitHub 主页（如果链接存在）
                memberLabel.addEventListener('click', () => {
                    if (member.github && member.github !== '/') {
                        window.open(member.github, '_blank');
                    }
                });
            });

            // 在主成员区块的末尾，添加额外的介绍
            const additionalMember = members.find(m => m.image === '/');
            if (additionalMember) {
                const additionalBio = document.createElement('div');
                additionalBio.className = 'additional-bio';
                additionalBio.innerHTML = `
                    <h3>${additionalMember.name}</h3>
                    <p>${additionalMember.bio}</p>
                `;
                // 将次要成员介绍添加到 members-interactive-wrapper 的下方
                document.getElementById('members').querySelector('.container').appendChild(additionalBio);
            }

            // 初始状态: 页面加载时显示默认提示
            showDefaultMessage();
        })
        .catch(error => console.error('加载成员信息失败:', error));
});