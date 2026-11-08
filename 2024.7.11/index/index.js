// ============================================================
// 1. 项目数据（增加 mobile 字段）
// ============================================================
const projects = [
    { id: 'page0', title: '从头制作一个网页', price: '完工后报价', thumb: 'index/item0.png', tag: 'hot', mobile: false},
    { id: 'page1', title: '桌球游戏', price: '￥3.9', thumb: 'index/item1.png', tag: 'hot', mobile: true },
    { id: 'page2', title: '黑人抬棺', price: '￥3.9', thumb: 'index/item2.gif', tag: 'hot', mobile: false },
    { id: 'page3', title: '打地鼠', price: '￥2.9', thumb: 'index/item3.png', tag: 'hot', mobile: false },
    { id: 'page4', title: '人工智障', price: '￥3.9', thumb: 'index/item4.png', tag: '', mobile: false },
    { id: 'page5', title: '简易乒乓', price: '￥2.9', thumb: 'index/item5.png', tag: '', mobile: false },
    { id: 'page6', title: '贪吃虫', price: '￥1.9', thumb: 'index/item6.png', tag: '', mobile: false },
    { id: 'page7', title: '恐怖图片', price: '￥3.9', thumb: 'index/item7.png', tag: '', mobile: false },
    { id: 'page8', title: '刮刮乐', price: '￥1.9', thumb: 'index/item8.png', tag: 'new', mobile: false },
    { id: 'page9', title: '查分系统', price: '￥1.9', thumb: 'index/item9.png', tag: 'new', mobile: false },
    { id: 'page10', title: '三角洲行动随机配装', price: '￥0.9', thumb: 'index/item10.gif', tag: 'new', mobile: false },
    { id: 'page11', title: '太阳系模拟', price: '￥1.9', thumb: 'index/item11.gif', tag: 'new', mobile: false },
    { id: 'page12', title: '烟花', price: '￥2.9', thumb: 'index/item12.gif', tag: 'hot', mobile: false },
    { id: 'page13', title: '箭头塔防', price: '￥2.9', thumb: 'index/item13.png', tag: 'hot', mobile: false },
    { id: 'page14', title: '高考倒计时', price: '￥0.9', thumb: 'index/item14.gif', tag: '', mobile: false },
    { id: 'page15', title: '节日祝福', price: '￥1.9', thumb: 'index/item15.png', tag: 'hot', mobile: false },
    { id: 'page16', title: '科技节代做', price: '￥9.9', thumb: 'index/item16.png', tag: 'hot', mobile: true },
    { id: 'page17', title: '表白代做', price: '￥5.9', thumb: 'index/item17.png', tag: 'hot', mobile: false },
];

// ============================================================
// 2. 聊天数据（不变）
// ============================================================
const chatMessages = [
    { type: 'user', text: 'DIY网页有什么用处？' },
    { type: 'service', text: '用处包括：我哪知道' },
    { type: 'user', text: '牛逼，那我要DIY一个网页' },
    { type: 'service', text: '请点击下面按钮，找到心仪的网页模板点击“购买”按钮，拿到微信号并给出一个4位验证码，在加上微信后发送四位验证码即可开始DIY' },
    { type: 'user', text: '都有什么需求可以满足？' },
    { type: 'service', text: '基础服务：更换模板内的字体、照片、视频、音频、玩法、网页内置功能。甚至从头开始零基础制作一个属于你的网页！<br>进阶服务：静态网页托管、远程控制安装、远程调试软件、我的世界/泰拉瑞亚小型多人服' }
];

// ============================================================
// 3. 状态（不变）
// ============================================================
let isTransitioning = false;
let currentPageId = 'startPage';
let buttonLock = false;
let currentVerifyCode = '';
let submitLock = false;
const tianApiKey = '868ffe977d3b445b541e7e28acb51e41';

// ============================================================
// 4. 工具函数（不变）
// ============================================================
function randomCode() {
    return String(Math.floor(Math.random() * 9000 + 1000));
}
function getNowTime() {
    const d = new Date();
    return d.toLocaleString('zh-CN', { hour12: false });
}
function showToast(text, type = 'success') {
    const toastWrap = document.getElementById('toastWrap');
    if (!toastWrap) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = text;
    toastWrap.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================================
// 5. 昼夜主题逻辑
// ============================================================
function isDayTime() {
    const hour = new Date().getHours();
    return hour >= 8 && hour < 18;
}
function setTheme(isDay) {
    const html = document.documentElement;
    html.classList.remove('theme-day', 'theme-night');
    if (isDay) {
        html.classList.add('theme-day');
        localStorage.setItem('siteTheme', 'day');
    } else {
        html.classList.add('theme-night');
        localStorage.setItem('siteTheme', 'night');
    }
}
function initTheme() {
    const saveTheme = localStorage.getItem('siteTheme');
    if (saveTheme) {
        setTheme(saveTheme === 'day');
    } else {
        setTheme(isDayTime());
    }
}

// ============================================================
// 6. 启动页聊天
// ============================================================
let msgIndex = 0;
let msgElements = [];
let typingTimer = null;

function renderStartChat() {
    const startChatScroll = document.getElementById('startChatScroll');
    if (!startChatScroll) return;
    startChatScroll.innerHTML = '';
    msgElements = [];
    chatMessages.forEach(function (msg) {
        const item = document.createElement('div');
        item.className = 'chat-item ' + msg.type;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg';
        msgDiv.textContent = '';
        item.appendChild(msgDiv);
        startChatScroll.appendChild(item);
        msgElements.push({
            element: item,
            msgDiv: msgDiv,
            text: msg.text
        });
    });
    msgIndex = 0;
    showNextMessage();
}
function showNextMessage() {
    const startChatScroll = document.getElementById('startChatScroll');
    if (msgIndex >= msgElements.length) {
        if (startChatScroll) startChatScroll.scrollTop = startChatScroll.scrollHeight;
        return;
    }
    const item = msgElements[msgIndex];
    const msgDiv = item.msgDiv;
    const text = item.text;
    item.element.classList.add('visible');
    let charIndex = 0;
    function typeChar() {
        if (charIndex < text.length) {
            if (text.substr(charIndex, 4) === '<br>') {
                msgDiv.innerHTML += '<br>';
                charIndex += 4;
            } else {
                msgDiv.innerHTML += text.charAt(charIndex);
                charIndex++;
            }
            typingTimer = setTimeout(typeChar, 30);
        } else {
            setTimeout(() => {
                msgIndex++;
                showNextMessage();
            }, 1000);
        }
    }
    typeChar();
}

// ============================================================
// 7. 渲染目录卡片
// ============================================================
function renderCatalog() {
    const catalogGrid = document.getElementById('catalogGrid');
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';
    const sortedProjects = [...projects].sort(function(a, b) {
        const getLevel = (item) => {
            if (item.tag === 'hot') return 0;
            if (item.tag === 'new') return 1;
            return 2;
        }
        return getLevel(a) - getLevel(b);
    });

    sortedProjects.forEach(function (proj) {
        const card = document.createElement('div');
        card.className = 'project-card';
        if (proj.tag) {
            let tagText = '';
            let tagClass = '';
            if (proj.tag === 'new') { tagText = '新品'; tagClass = 'new'; }
            else if (proj.tag === 'hot') { tagText = '热销'; tagClass = 'hot'; }
            else if (proj.tag === 'wait') { tagText = '预告'; tagClass = 'wait'; }
            const tagDom = document.createElement('span');
            tagDom.className = `card-tag ${tagClass}`;
            tagDom.innerText = tagText;
            card.appendChild(tagDom);
        }

        const thumb = document.createElement('div');
        thumb.className = 'card-thumb';
        thumb.style.backgroundImage = `url(${proj.thumb}), linear-gradient(135deg, #6e8efb, #a777e3)`;
        thumb.style.backgroundSize = 'cover';
        thumb.style.backgroundPosition = 'center';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = proj.title;

        const price = document.createElement('div');
        price.className = 'card-price';
        price.textContent = proj.price;

        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const tryBtn = document.createElement('button');
        tryBtn.className = 'nav-btn';
        if(proj.id === 'page0'){
            tryBtn.textContent = '详情';
        }else{
            tryBtn.textContent = '试用';
        }
        tryBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (buttonLock) return;
            buttonLock = true;
            const num = proj.id.replace('page', '');
            const isPortrait = window.innerHeight > window.innerWidth;
            if (isPortrait && proj.mobile === true) {
                openPortraitModal(num);
                setTimeout(() => buttonLock = false, 400);
            } else {
                window.location.href = `${num}/index.html`;
                setTimeout(() => buttonLock = false, 400);
            }
        });

        const buyBtn = document.createElement('button');
        buyBtn.className = 'nav-btn buy-btn';
        buyBtn.textContent = '购买';
        buyBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (buttonLock) return;
            buttonLock = true;
            openPurchaseModal(proj.title);
            setTimeout(() => buttonLock = false, 400);
        });

        actions.appendChild(tryBtn);
        actions.appendChild(buyBtn);
        card.appendChild(thumb);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(actions);
        catalogGrid.appendChild(card);
    });
}

// ============================================================
// 8. 站内页面切换
// ============================================================
function switchPage(targetId) {
    if (isTransitioning) return;
    if (targetId === currentPageId) return;
    const oldPage = document.getElementById(currentPageId);
    const newPage = document.getElementById(targetId);
    if (!oldPage || !newPage) {
        console.error('页面不存在:', currentPageId, targetId);
        return;
    }
    isTransitioning = true;
    oldPage.classList.remove('show');
    setTimeout(function () {
        newPage.classList.add('show');
        currentPageId = targetId;
        isTransitioning = false;
        if (targetId === 'page11') renderCatalog();
    }, 400);
}

// ============================================================
// 9. 弹窗控制（购买）
// ============================================================
let modalOverlay, modalCloseBtn, modalCancelBtn, modalConfirmBtn, buyerNameInput, buyProductInput;
let successModal, successCloseBtn, successFinishBtn, wxText, codeText, copyWxBtn, copyCodeBtn;

function openPurchaseModal(productName) {
    if (!buyerNameInput || !buyProductInput || !modalOverlay) return;
    buyProductInput.value = productName;
    buyerNameInput.value = '';
    modalOverlay.classList.add('active');
}
function closePurchaseModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
}
function closeSuccessModal() {
    if (successModal) successModal.classList.remove('active');
}

// ============================================================
// 10. 竖屏弹窗控制
// ============================================================
let portraitModal, portraitCloseBtn, portraitCancelBtn, portraitConfirmBtn;
let pendingTargetNum = null;

function openPortraitModal(targetNum) {
    if (!portraitModal) {
        console.error('竖屏弹窗元素 portraitModal 未找到');
        return;
    }
    pendingTargetNum = targetNum;
    portraitModal.classList.add('active');
}
function closePortraitModal() {
    if (!portraitModal) return;
    portraitModal.classList.remove('active');
    pendingTargetNum = null;
}

// ============================================================
// 11. 下单提交
// ============================================================
function submitBuyOrder() {
    if (submitLock) return;
    const name = buyerNameInput ? buyerNameInput.value.trim() : '';
    const product = buyProductInput ? buyProductInput.value.trim() : '';
    if (!name) {
        showToast('请填写您的称呼', 'error');
        return;
    }
    if (!product) {
        showToast('商品信息异常！', 'error');
        return;
    }
    const chineseEnglishRegex = /^[\u4e00-\u9fa5a-zA-Z ]+$/;
    if (!chineseEnglishRegex.test(name)) {
        showToast('称呼只能包含中文或英文字符', 'error');
        return;
    }
    if (!chineseEnglishRegex.test(product)) {
        showToast('项目只能包含中文或英文字符', 'error');
        return;
    }
    submitLock = true;
    currentVerifyCode = randomCode();
    const code = currentVerifyCode;
    const time = getNowTime();
    const msgContent = '称呼' + name + ', 项目' + product + ', 验证码' + code + ', 下单时间' + time;
    console.log('📤 发送内容：', msgContent);
    $.post('https://apis.tianapi.com/robot/index', {
        key: tianApiKey,
        question: msgContent
    })
    .done(function (res) {
        console.log('推送成功', res);
    })
    .fail(function (err) {
        console.error('推送失败', err);
    })
    .always(function () {
        setTimeout(function () {
            submitLock = false;
        }, 1200);
    });
    if (codeText) codeText.value = code;
    closePurchaseModal();
    if (successModal) successModal.classList.add('active');
}

// ============================================================
// 12. 复制文本
// ============================================================
function copyText(inputDom) {
    if (!inputDom) return;
    inputDom.select();
    document.execCommand('copy');
    showToast('复制成功');
}

// ============================================================
// 13. 初始化入口（所有 DOM 引用和事件绑定在此完成）
// ============================================================
function init() {
    // ----- 主题 -----
    initTheme();
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (this.classList.contains('rotate')) return;
            this.classList.add('rotate');
            setTimeout(() => this.classList.remove('rotate'), 500);
            const nowIsDay = document.documentElement.classList.contains('theme-day');
            setTheme(!nowIsDay);
        });
    }

    // ----- 启动页聊天 -----
    renderStartChat();

    // ----- 目录渲染 -----
    renderCatalog();

    // ----- 页面切换按钮（data-target） -----
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-target]');
        if (!btn) return;
        if (btn.id === 'startBtn') return;
        const target = btn.dataset.target;
        if (target) {
            e.preventDefault();
            if (buttonLock) return;
            buttonLock = true;
            switchPage(target);
            setTimeout(() => buttonLock = false, 400);
        }
    });

    // ----- 启动按钮（单独处理）-----
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (buttonLock) return;
            buttonLock = true;
            switchPage('page11');
            setTimeout(() => buttonLock = false, 400);
        });
    }

    // ----- 购买弹窗相关 -----
    modalOverlay = document.getElementById('purchaseModal');
    modalCloseBtn = document.getElementById('modalCloseBtn');
    modalCancelBtn = document.getElementById('modalCancelBtn');
    modalConfirmBtn = document.getElementById('modalConfirmBtn');
    buyerNameInput = document.getElementById('buyerName');
    buyProductInput = document.getElementById('buyProduct');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePurchaseModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closePurchaseModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', submitBuyOrder);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) closePurchaseModal();
        });
    }

    // ----- 成功弹窗 -----
    successModal = document.getElementById('successModal');
    successCloseBtn = document.getElementById('successCloseBtn');
    successFinishBtn = document.getElementById('successFinishBtn');
    wxText = document.getElementById('wxText');
    codeText = document.getElementById('codeText');
    copyWxBtn = document.getElementById('copyWxBtn');
    copyCodeBtn = document.getElementById('copyCodeBtn');

    if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);
    if (successFinishBtn) successFinishBtn.addEventListener('click', closeSuccessModal);
    if (successModal) {
        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) closeSuccessModal();
        });
    }
    if (copyWxBtn) copyWxBtn.addEventListener('click', function () { copyText(wxText); });
    if (copyCodeBtn) copyCodeBtn.addEventListener('click', function () { copyText(codeText); });

    // ----- 竖屏弹窗 -----
    portraitModal = document.getElementById('portraitModal');
    portraitCloseBtn = document.getElementById('portraitCloseBtn');
    portraitCancelBtn = document.getElementById('portraitCancelBtn');
    portraitConfirmBtn = document.getElementById('portraitConfirmBtn');

    if (portraitCloseBtn) portraitCloseBtn.addEventListener('click', closePortraitModal);
    if (portraitCancelBtn) portraitCancelBtn.addEventListener('click', closePortraitModal);
    if (portraitConfirmBtn) {
        portraitConfirmBtn.addEventListener('click', function() {
            if (pendingTargetNum) {
                window.location.href = `${pendingTargetNum}/index_m.html`;
            }
            closePortraitModal();
        });
    }
    if (portraitModal) {
        portraitModal.addEventListener('click', function(e) {
            if (e.target === portraitModal) closePortraitModal();
        });
    }

    // ----- 客服悬浮 -----
    const serviceFloat = document.getElementById('serviceFloat');
    const serviceTip = document.getElementById('serviceTip');
    const tipClose = document.querySelector('.tip-close');
    if (serviceFloat) {
        serviceFloat.addEventListener('click', function () {
            if (serviceTip) serviceTip.classList.toggle('show');
        });
    }
    if (tipClose) {
        tipClose.addEventListener('click', function () {
            if (serviceTip) serviceTip.classList.remove('show');
        });
    }
    document.addEventListener('click', function (e) {
        if (serviceFloat && serviceTip && !serviceFloat.contains(e.target) && !serviceTip.contains(e.target)) {
            serviceTip.classList.remove('show');
        }
    });

    // ----- ESC 关闭弹窗 -----
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (modalOverlay && modalOverlay.classList.contains('active')) closePurchaseModal();
            if (successModal && successModal.classList.contains('active')) closeSuccessModal();
            if (portraitModal && portraitModal.classList.contains('active')) closePortraitModal();
        }
    });

    console.log('✅ 网页程序已启动');
}

// ============================================================
// 14. 启动
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}