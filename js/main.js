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
 * 7. Hero 粒子网络动画（Canvas）
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

    // ==================== 7. Hero 粒子网络动画 ====================
    /**
     * 在 Hero 区域绘制粒子网络动画
     * 粒子缓缓飘动，靠近的粒子之间会用线条连接，呈现电路/芯片网络效果
     * 自动适配窗口大小，手机端减少粒子数量以保证性能
     */
    function initParticleNetwork() {
        var canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        var ctx = canvas.getContext('2d');
        var particles = [];
        var animationId = null;
        var pointerX = -1000;   // 鼠标或触摸点的 X 坐标
        var pointerY = -1000;   // 鼠标或触摸点的 Y 坐标
        var isMobile = window.innerWidth < 768;
        var dpr = window.devicePixelRatio || 1;  // 高清屏适配
        var canvasW = 0;  // 逻辑宽度（CSS像素）
        var canvasH = 0;  // 逻辑高度（CSS像素）

        // 配置参数（桌面端 / 手机端自适应）
        var config = {
            particleColor: 'rgba(120, 190, 255, ',     // 粒子颜色前缀（更亮）
            lineColor: 'rgba(120, 190, 255, ',          // 连线颜色前缀
            particleCount: isMobile ? 50 : 80,          // 粒子数量
            maxSpeed: isMobile ? 0.3 : 0.4,             // 最大移动速度
            minSize: isMobile ? 2 : 1.5,                // 最小粒子半径
            maxSize: isMobile ? 4 : 3,                  // 最大粒子半径
            connectDistance: isMobile ? 120 : 150,       // 粒子连线最大距离
            pointerDistance: isMobile ? 160 : 200,       // 指针吸引范围
            lineOpacityMultiplier: isMobile ? 0.45 : 0.3,// 连线透明度系数（手机更亮）
            particleOpacityMin: isMobile ? 0.5 : 0.3,   // 粒子最低透明度
            particleOpacityRange: isMobile ? 0.4 : 0.5   // 粒子透明度浮动范围
        };

        /**
         * 设置 canvas 尺寸，匹配 Hero 区域
         * 关键：使用 devicePixelRatio 让高清屏（手机）上 canvas 清晰显示
         */
        function resizeCanvas() {
            var hero = document.getElementById('hero');
            canvasW = hero.offsetWidth;
            canvasH = hero.offsetHeight;
            canvas.width = canvasW * dpr;
            canvas.height = canvasH * dpr;
            canvas.style.width = canvasW + 'px';
            canvas.style.height = canvasH + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);  // 缩放绘图上下文
        }

        /** 创建单个粒子 */
        function createParticle() {
            return {
                x: Math.random() * canvasW,
                y: Math.random() * canvasH,
                vx: (Math.random() - 0.5) * config.maxSpeed * 2,
                vy: (Math.random() - 0.5) * config.maxSpeed * 2,
                size: config.minSize + Math.random() * (config.maxSize - config.minSize),
                opacity: config.particleOpacityMin + Math.random() * config.particleOpacityRange
            };
        }

        /** 初始化所有粒子 */
        function initParticles() {
            particles = [];
            for (var i = 0; i < config.particleCount; i++) {
                particles.push(createParticle());
            }
        }

        /** 更新粒子位置 */
        function updateParticles() {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                // 移动
                p.x += p.vx;
                p.y += p.vy;

                // 边界反弹（柔和处理）
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > canvasW) { p.x = canvasW; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > canvasH) { p.y = canvasH; p.vy *= -1; }

                // 指针（鼠标/触摸）吸引效果
                var dx = pointerX - p.x;
                var dy = pointerY - p.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < config.pointerDistance && dist > 0) {
                    var force = (config.pointerDistance - dist) / config.pointerDistance * 0.01;
                    p.vx += dx / dist * force;
                    p.vy += dy / dist * force;
                }

                // 限制最大速度
                var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > config.maxSpeed) {
                    p.vx = (p.vx / speed) * config.maxSpeed;
                    p.vy = (p.vy / speed) * config.maxSpeed;
                }
            }
        }

        /** 绘制粒子和连线 */
        function drawParticles() {
            ctx.clearRect(0, 0, canvasW, canvasH);

            // 绘制粒子间连线
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectDistance) {
                        var lineOpacity = (1 - dist / config.connectDistance) * config.lineOpacityMultiplier;
                        ctx.beginPath();
                        ctx.strokeStyle = config.lineColor + lineOpacity + ')';
                        ctx.lineWidth = isMobile ? 1 : 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // 绘制指针附近的连线（更亮）
            if (pointerX > 0 && pointerY > 0) {
                for (var k = 0; k < particles.length; k++) {
                    var mx = pointerX - particles[k].x;
                    var my = pointerY - particles[k].y;
                    var mDist = Math.sqrt(mx * mx + my * my);

                    if (mDist < config.pointerDistance) {
                        var mOpacity = (1 - mDist / config.pointerDistance) * 0.6;
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(180, 220, 255, ' + mOpacity + ')';
                        ctx.lineWidth = isMobile ? 1.5 : 1;
                        ctx.moveTo(particles[k].x, particles[k].y);
                        ctx.lineTo(pointerX, pointerY);
                        ctx.stroke();
                    }
                }
            }

            // 绘制粒子
            for (var m = 0; m < particles.length; m++) {
                var p = particles[m];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = config.particleColor + p.opacity + ')';
                ctx.fill();

                // 粒子发光效果
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = config.particleColor + (p.opacity * 0.2) + ')';
                ctx.fill();
            }
        }

        /** 动画循环 */
        function animate() {
            updateParticles();
            drawParticles();
            animationId = requestAnimationFrame(animate);
        }

        // 获取指针在 canvas 中的位置（通用方法）
        var heroSection = document.getElementById('hero');

        function getPointerPos(clientX, clientY) {
            var rect = canvas.getBoundingClientRect();
            pointerX = clientX - rect.left;
            pointerY = clientY - rect.top;
        }

        function clearPointer() {
            pointerX = -1000;
            pointerY = -1000;
        }

        // 鼠标事件（桌面端）
        heroSection.addEventListener('mousemove', function (e) {
            getPointerPos(e.clientX, e.clientY);
        });
        heroSection.addEventListener('mouseleave', clearPointer);

        // 触摸事件（手机端）
        heroSection.addEventListener('touchstart', function (e) {
            if (e.touches.length > 0) {
                getPointerPos(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        heroSection.addEventListener('touchmove', function (e) {
            if (e.touches.length > 0) {
                getPointerPos(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        heroSection.addEventListener('touchend', function () {
            // 触摸结束后延迟清除，让效果多停留一会儿
            setTimeout(clearPointer, 600);
        }, { passive: true });

        // 窗口调整时重新初始化
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                resizeCanvas();
                initParticles();
            }, 200);
        });

        // 当 Hero 不在视口时暂停动画以节省性能
        var heroObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                if (!animationId) animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        }, { threshold: 0 });

        heroObserver.observe(heroSection);

        // 启动
        resizeCanvas();
        initParticles();
        animate();

        console.log('[SOCAM] Particle network animation initialized.');
    }

    // ==================== 初始化 ====================
    handleNavbarScroll();   // 初始检查导航栏状态
    highlightActiveSection(); // 初始检查高亮状态
    initScrollReveal();      // 初始化滚动动画
    initParticleNetwork();   // 初始化粒子网络动画

    // ==================== 调试日志 ====================
    console.log('[SOCAM] Website initialized successfully.');
});
