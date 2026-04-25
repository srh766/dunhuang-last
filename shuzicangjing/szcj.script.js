// 经籍数据管理
const scrollData = {
    scroll1: {
        title: '金刚经',
        images: ['tup/jingang1.png', 'tup/jingang2.png', 'tup/jingang3.png'],
        currentIndex: 0,
        info: {
            编号: '金刚经龙藏',
            名称: '金刚般若波罗蜜经',
            时期: '晚唐长兴，流通编定 1352',
            格式: '卷轴装，月径，轮册，珂罗版',
            经法: '大般若经·第九会金刚般若波罗蜜多经',
            全卷: '28页（共）'
        },
        audio: '《金刚经》全称《金刚般若波罗蜜经》，是敦煌遗书中保存最完整、流传最广泛的佛教经典之一，也是中古时期佛教思想传播与抄经文化的核心载体。 敦煌石窟所藏《金刚经》写卷跨越北朝至宋元数百年，以楷书、行书等多种书体书写，内容完整、题记丰富，兼具宗教价值、文献价值与艺术价值。经文以 "空性智慧" 为核心，阐释诸法实相、破执见性的哲学思想，是大乘佛教般若体系的关键经典。 在敦煌佛教艺术体系中，《金刚经》不仅是信众日常诵读、祈福抄经的核心文本，更与石窟造像、壁画内容形成深度呼应，真实反映了古代丝绸之路上佛教文化的传播脉络、民众信仰形态与书写传统。其传世写卷笔法精湛、章法严谨，是中国书法史与佛教文献史的珍贵实物遗存。'
    },
    scroll2: {
        title: '道德经',
        images: ['tup/szcj.ddj1.png', 'tup/szcj.ddj2.png', 'tup/szcj.ddj3.png'],
        currentIndex: 0,
        info: {
            编号: '道德经',
            名称: '道德经',
            时期: '公元前6世纪左右',
            作者: '老子（李耳）',
            格式: '卷轴装',
            全卷: '81章'
        },
        audio: '《道德经》（又称《老子》）是敦煌文献中极为重要的道家与哲学经典，代表了丝绸之路多元文明交融背景下道教文化的珍贵遗存。 敦煌本《道德经》多为六朝至唐代写本，保留了大量早期文本面貌，与传世版本存在重要异文，具有极高的校勘价值与文献研究价值。经文以 "道" 为核心范畴，阐述自然无为、守柔处下、天人合一的古典哲学体系，影响中国思想、政治、艺术与文化数千年。 在敦煌石窟的文化格局中，《道德经》写卷的大量出土，印证了中古时期佛道共存、三教融合的文化生态。这些写卷字体古朴、装帧简约，既是道家思想传播的重要物证，也是研究唐代道教发展、民间信仰、书写制度与丝路文化交流的不可替代资料。'
    },
    scroll3: {
        title: '其他经书',
        images: ['tup/szcj.qita1.png', 'tup/szcj.qita2.png', 'tup/szcj.qita3.png'],
        currentIndex: 0,
        info: {
            编号: '敦煌遗书·其他经书',
            名称: '敦煌其他古籍文献',
            时期: '公元4-11世纪',
            内容: '佛经、道经、儒家经典等',
            格式: '卷轴装、经折装',
            数量: '约20000卷'
        },
        audio: '敦煌石窟藏经洞出土的各类经文数量庞大、体系庞杂，涵盖佛教经律论、道教典籍、儒家文献、民间宝卷、仪式文疏等多种类型，构成了中古时期东亚最丰富的民间文献宝库之一。 这些经文包括佛教大乘、小乘、密教经典，道教仪轨文书，儒教劝善、礼忏、抄经题记，以及大量反映地方信仰、民俗活动、社会生活的世俗文本。它们书写时代跨度长、书写者身份多元，内容涉及哲学、宗教、语言、艺术、医学、历法等诸多领域。 作为丝路文明的实物见证，敦煌各类经文真实记录了古代中国与西域、中亚文化交流的历史轨迹，展现了民间信仰的鲜活形态与抄经、诵经、礼佛等传统习俗。其文献价值、艺术价值与历史价值相辅相成，成为研究中古社会、宗教传播与文化融合的核心资料。'
    }
};

// 当前显示的经籍类型
let currentScrollType = 'scroll1';

// 页面加载完成后初始化
window.onload = function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // 绑定遮罩层点击事件
    overlay.addEventListener('click', function() {
        const enlargedImage = document.querySelector('.scroll-content img.enlarged');
        if (enlargedImage) {
            enlargedImage.classList.remove('enlarged');
            this.classList.remove('active');
        }
    });
    
    // 绑定操作按钮事件
    bindActionButtons();
    
    // 绑定图片点击事件
    addImageClickEvent();
};

// 切换卷轴内容
function toggleScroll(scrollId) {
    // 更新当前显示的经籍类型
    currentScrollType = scrollId;
    
    // 获取当前经籍数据
    const scroll = scrollData[scrollId];
    if (scroll) {
        // 更新信息卡片
        updateInfoCard(scroll.title);
        
        // 检查是否当前显示的是文字介绍
        const scrollContent = document.getElementById('scrollContent');
        const introElement = scrollContent ? scrollContent.querySelector('.scroll-intro') : null;
        
        if (introElement) {
            // 如果当前显示的是文字介绍，更新介绍内容
            let introContent = `<h3>${scroll.title === '金刚经' || scroll.title === '道德经' ? `《${scroll.title}》` : scroll.title}</h3>`;
            introContent += `<p>${scroll.audio}</p>`;
            introElement.innerHTML = introContent;
            
            // 重新绑定点击事件
            introElement.onclick = function() {
                introElement.remove();
                const imgElement = scrollContent.querySelector('img');
                if (imgElement) {
                    imgElement.style.display = 'block';
                }
            };
        } else {
            // 如果当前显示的是图片，更新图片
            updateScrollContentWithAnimation(scroll.images[scroll.currentIndex]);
            // 重新绑定点击事件
            setTimeout(addImageClickEvent, 400);
        }
    }
}

// 上一页
function prevPage() {
    const scroll = scrollData[currentScrollType];
    if (scroll) {
        // 计算上一页索引
        scroll.currentIndex = (scroll.currentIndex - 1 + scroll.images.length) % scroll.images.length;
        // 更新卷轴内容
        updateScrollContentWithAnimation(scroll.images[scroll.currentIndex]);
    }
}

// 下一页
function nextPage() {
    const scroll = scrollData[currentScrollType];
    if (scroll) {
        // 计算下一页索引
        scroll.currentIndex = (scroll.currentIndex + 1) % scroll.images.length;
        // 更新卷轴内容
        updateScrollContentWithAnimation(scroll.images[scroll.currentIndex]);
    }
}

// 添加放大功能
function addImageClickEvent() {
    const scrollImage = document.querySelector('.scroll-content img');
    if (scrollImage) {
        // 先移除可能存在的点击事件监听器，避免重复绑定
        scrollImage.removeEventListener('click', handleImageClick);
        // 添加新的点击事件监听器
        scrollImage.addEventListener('click', handleImageClick);
    }
}

// 处理图片点击事件
function handleImageClick() {
    this.classList.toggle('enlarged');
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// 添加过渡动画的内容更新
function updateScrollContentWithAnimation(imageSrc) {
    const scrollContent = document.getElementById('scrollContent');
    if (scrollContent) {
        if (imageSrc) {
            // 确保scrollContent显示
            scrollContent.style.display = 'flex';
            
            const imgElement = scrollContent.querySelector('img');
            if (imgElement) {
                // 添加淡出动画
                imgElement.classList.add('fade-out');
                
                // 等待动画完成后更新图片
                setTimeout(() => {
                    imgElement.src = imageSrc;
                    // 移除淡出类，添加淡入类
                    imgElement.classList.remove('fade-out');
                    imgElement.classList.add('fade-in');
                    
                    // 等待淡入动画完成后移除淡入类
                    setTimeout(() => {
                        imgElement.classList.remove('fade-in');
                        // 重新绑定点击事件
                        addImageClickEvent();
                    }, 300);
                }, 300);
            }
        } else {
            // 隐藏scrollContent
            scrollContent.style.display = 'none';
        }
    }
}

// 更新信息卡片
function updateInfoCard(title) {
    const infoCard = document.querySelector('.info-card');
    let content = '';
    
    // 遍历scrollData找到对应的经籍
    for (const key in scrollData) {
        if (scrollData[key].title === title) {
            const scroll = scrollData[key];
            // 生成信息卡片内容
            content = `
                <h3>${scroll.title === '金刚经' || scroll.title === '道德经' ? `《${scroll.title}》` : scroll.title}</h3>
                <div class="info-detail">
                    ${Object.entries(scroll.info).map(([key, value]) => `<p><strong>${key}：</strong>${value}</p>`).join('')}
                </div>
                <div class="info-actions">
                    <button class="action-btn play-btn zoom-btn" onclick="document.querySelector('.scroll-content img').click()">
                        <span>🔍</span>
                    </button>
                    <button class="action-btn play-btn intro-btn" onclick="toggleIntroduction()">
                        <span>📖</span>
                    </button>
                </div>
            `;
            break;
        }
    }
    
    infoCard.innerHTML = content;
    
    // 重新绑定事件
    bindActionButtons();
}

// 绑定操作按钮事件
function bindActionButtons() {
    const playBtn = document.querySelector('.action-btn.play-btn:not(.zoom-btn):not(.intro-btn)');
    if (playBtn) {
        playBtn.addEventListener('click', playAudio);
    }
}

// 播放音频
function playAudio() {
    const infoCardTitle = document.querySelector('.info-card h3').textContent;
    let text = '';
    
    // 遍历scrollData找到对应的经籍
    for (const key in scrollData) {
        const scroll = scrollData[key];
        const formattedTitle = scroll.title === '金刚经' || scroll.title === '道德经' ? `《${scroll.title}》` : scroll.title;
        if (formattedTitle === infoCardTitle) {
            text = scroll.audio;
            break;
        }
    }
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持文字朗读功能');
    }
}

// 切换经文介绍
function toggleIntroduction() {
    const scrollContent = document.getElementById('scrollContent');
    if (scrollContent) {
        // 检查是否已经显示介绍
        const introElement = scrollContent.querySelector('.scroll-intro');
        if (introElement) {
            // 隐藏介绍，显示图片
            introElement.remove();
            const imgElement = scrollContent.querySelector('img');
            if (imgElement) {
                imgElement.style.display = 'block';
            }
        } else {
            // 隐藏图片，显示介绍
            const imgElement = scrollContent.querySelector('img');
            if (imgElement) {
                imgElement.style.display = 'none';
            }
            
            // 创建介绍元素
            const introElement = document.createElement('div');
            introElement.className = 'scroll-intro';
            
            // 获取当前经籍的信息
            const scroll = scrollData[currentScrollType];
            if (scroll) {
                // 生成介绍内容
                let introContent = `<h3>${scroll.title === '金刚经' || scroll.title === '道德经' ? `《${scroll.title}》` : scroll.title}</h3>`;
                introContent += `<p>${scroll.audio}</p>`;
                introElement.innerHTML = introContent;
            }
            
            // 添加到scrollContent
            scrollContent.appendChild(introElement);
            
            // 绑定介绍元素点击事件，点击后返回原样
            introElement.onclick = function() {
                introElement.remove();
                if (imgElement) {
                    imgElement.style.display = 'block';
                }
            };
        }
    }
}



