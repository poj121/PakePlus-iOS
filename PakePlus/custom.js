window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
setInterval(() => document.querySelector('div.absolute.top-4.left-4')?.remove(), 10)


let exitFlag = false;

window.addEventListener('popstate', function () {
    if (!exitFlag) {
        // 显示提示
        showToast('再按一次退出');
        exitFlag = true;
        // 重新压入一个历史记录，防止立即退出
        history.pushState(null, null, location.href);
        // 3秒后重置标志
        setTimeout(() => { exitFlag = false; }, 3000);
    } else {
        // 第二次按，真正退出（需要调用原生关闭 WebView）
        if (window.NativeBridge && window.NativeBridge.closeApp) {
            window.NativeBridge.closeApp();
        } else {
            // 如果无法调用原生，尝试用 history.back() 或 alert
            alert('再按一次退出（实际退出需原生支持）');
        }
    }
});

// 初始化时压入一个历史状态
history.pushState(null, null, location.href);

// 简单 toast 提示函数
function showToast(msg) {
    const toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20%';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
    toast.style.color = '#fff';
    toast.style.padding = '8px 16px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = 9999;
    toast.style.fontSize = '14px';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}