/**
 * ============================================================
 * SOCAM INTERNATIONAL LIMITED - Main JavaScript
 * ============================================================
 * 功能模块：
 * 1. 导航栏滚动效果（添加阴影）
 * 2. 平滑滚动到锚点
 * 3. 移动端汉堡菜单开关
 * 4. 导航栏当前区块高亮
 * 5. 滚动显示动画（Scroll Reveal）
 * 6. Footer 年份自动更新
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==================== 元素引用 ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const yearSpan = document.getElementById('currentYear');

    // ==================== 1. Footer 年份自动更新 ====================
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==================== 2. 导航栏滚动效果 ====================
    /**
     * 当页面滚动超过 50px 时，为导航栏添加 .scrolled 类
     * 用于增加背景透明度和阴影效果
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ==================== 3. 移动端菜单开关 ====================
    /**
     * 切换移动端导航菜单的显示/隐藏状态
     * 同时切换汉堡按钮的动画样式
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        // 防止菜单打开时页面滚动
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    /**
     * 关闭移动端导航菜单
     */
    function closeMobileMenu() {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    }

    // 点击汉堡按钮切换菜单
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // 点击导航链接后关闭移动端菜单
    allNavLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // 点击页面其他区域时关闭移动端菜单
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ==================== 4. 导航栏当前区块高亮 ====================
    /**
     * 根据当前滚动位置，高亮对应的导航链接
     * 使用 Intersection Observer 或滚动偏移判断
     */
    function highlightActiveSection() {
        var scrollPos = window.scrollY + 150; // 偏移量，让高亮更自然

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                allNavLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==================== 5. 滚动显示动画 ====================
    /**
     * 为带有 .reveal 类的元素添加出现动画
     * 当元素进入视口时添加 .visible 类触发 CSS 动画
     */
    function initScrollReveal() {
        // 为需要动画的元素添加 .reveal 类
        var revealTargets = document.querySelectorAll(
            '.about-text, .highlight-card, .brand-card, .contact-card, .contact-map'
        );

        revealTargets.forEach(function (el) {
            el.classList.add('reveal');
        });

        // 检测元素是否在视口中
        function checkReveal() {
            var windowHeight = window.innerHeight;
            var revealElements = document.querySelectorAll('.reveal');

            revealElements.forEach(function (el) {
                var elementTop = el.getBoundingClientRect().top;
                var revealPoint = 120; // 元素进入视口多少像素后开始动画

                if (elementTop < windowHeight - revealPoint) {
                    el.classList.add('visible');
                }
            });
        }

        // 初始检查（页面加载时可能已在视口中的元素）
        checkReveal();

        // 滚动时检查
        window.addEventListener('scroll', checkReveal, { passive: true });
    }

    // ==================== 6. 滚动事件监听 ====================
    /**
     * 统一管理滚动事件，避免重复绑定
     * 使用 passive 选项提升滚动性能
     */
    window.addEventListener('scroll', function () {
        handleNavbarScroll();
        highlightActiveSection();
    }, { passive: true });

    // ==================== 初始化 ====================
    handleNavbarScroll();   // 初始检查导航栏状态
    highlightActiveSection(); // 初始检查高亮状态
    initScrollReveal();      // 初始化滚动动画

    // ==================== 调试日志 ====================
    console.log('[SOCAM] Website initialized successfully.');
});
