const fs = require('fs');
const file = '../lonvi-redesign/tilda_main_page.html';
let html = fs.readFileSync(file, 'utf8');

console.log("Applying custom premium dark metallic redesign...");

// 1. Add review-card classes to review card containers (if not already done)
if (!html.includes('class="review-card')) {
    html = html.replace(
        /<!-- Review 1 -->\s*<div class="bg-white p-8 md:p-10 shadow-none/g,
        '<!-- Review 1 -->\n                <div class="review-card bg-white p-8 md:p-10 shadow-none'
    );
    html = html.replace(
        /<!-- Review 2 -->\s*<div class="bg-white p-8 md:p-10 shadow-none/g,
        '<!-- Review 2 -->\n                <div class="review-card bg-white p-8 md:p-10 shadow-none'
    );
    html = html.replace(
        /<!-- Review 3 -->\s*<div class="bg-white p-8 md:p-10 shadow-none/g,
        '<!-- Review 3 -->\n                <div class="review-card bg-white p-8 md:p-10 shadow-none'
    );
}

// 2. Add particles-canvas in Hero section
const heroStartTag = '<section class="relative min-h-screen pt-24 md:pt-40 pb-4 md:pb-8 flex flex-col justify-center overflow-hidden text-white brand-metallic-slide-bg">';
if (html.includes(heroStartTag)) {
    html = html.replace(
        heroStartTag,
        heroStartTag + '\n        <!-- Interactive 3D Particles Canvas -->\n        <canvas id="particles-canvas" class="absolute inset-0 z-0 pointer-events-none w-full h-full"></canvas>'
    );
    console.log("Particles canvas tag inserted into Hero!");
}

// 3. Make Outline Typography style on header title
// E.g. "ОМОЛОЖЕНИЕ" text outline
const oldTitlePart = `<span class="text-white font-light">ОМОЛОЖЕНИЕ</span>`;
const newTitlePart = `<span class="font-light tracking-wide text-transparent" style="-webkit-text-stroke: 1px rgba(255,255,255,0.7);">ОМОЛОЖЕНИЕ</span>`;
if (html.includes(oldTitlePart)) {
    html = html.replace(oldTitlePart, newTitlePart);
    console.log("Outline styling applied to 'ОМОЛОЖЕНИЕ' header!");
}

// 4. Convert Section 6 (Reviews) and Section 7 (FAQ) backgrounds to unified dark cells gradient
html = html.replace(
    /class="py-10 md:py-24 bg-neutral-100 text-black border-t border-neutral-200"/g,
    'class="py-10 md:py-24 border-t border-neutral-800 text-white brand-metallic-cells"'
);
html = html.replace(
    /id="faq" class="py-10 md:py-24 bg-neutral-100 text-black border-t border-neutral-200"/g,
    'id="faq" class="py-10 md:py-24 border-t border-neutral-800 text-white brand-metallic-cells"'
);
console.log("Reviews and FAQ section backgrounds converted to brand-metallic-cells!");

// 5. Append Custom Premium CSS to <head> style block
const targetStyleTag = '<style>';
const targetStyleIdx = html.indexOf(targetStyleTag);
if (targetStyleIdx !== -1) {
    const premiumCSS = `
      /* --- CUSTOM PREMIUM REDESIGN STYLES --- */
      #scroll-progress {
          background: linear-gradient(90deg, #FFFFFF 0%, #A8B2C1 50%, #FFFFFF 100%) !important;
      }
      
      /* Floating Island Navigation Header */
      header {
          position: fixed !important;
          top: 0px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 92% !important;
          max-width: 1240px !important;
          margin-top: 24px !important;
          border-radius: 9999px !important;
          z-index: 50 !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          background-color: rgba(13, 17, 23, 0.4) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.06) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
      }
      header.scrolled {
          margin-top: 12px !important;
          background-color: rgba(13, 17, 23, 0.88) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6) !important;
      }
      header a, header button, header nav ul li a {
          color: rgba(255, 255, 255, 0.85) !important;
          transition: color 0.3s ease !important;
      }
      header a:hover, header button:hover, header nav ul li a:hover {
          color: #FFFFFF !important;
      }
      #logo-blur-light {
          display: none !important;
      }
      header #custom-login-btn {
          color: rgba(255, 255, 255, 0.85) !important;
      }

      /* Dark Glassmorphic Review Cards */
      .review-card {
          background: rgba(19, 21, 26, 0.45) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
          box-shadow: none !important;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      .review-card p {
          color: rgba(255, 255, 255, 0.75) !important;
          transition: color 0.3s ease !important;
      }
      .review-card div.text-black {
          color: #FFFFFF !important;
      }
      .review-card div.bg-neutral-100 {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
      }
      .review-card:hover {
          background: rgba(26, 28, 34, 0.8) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
      }
      .review-card:hover p {
          color: #FFFFFF !important;
      }

      /* Dark Glassmorphic FAQ Accordions */
      details.group {
          background-color: rgba(19, 21, 26, 0.35) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
          transition: all 0.4s ease !important;
      }
      details.group:hover {
          background-color: rgba(26, 28, 34, 0.55) !important;
          border-color: rgba(255, 255, 255, 0.18) !important;
      }
      details.group summary span {
          color: #FFFFFF !important;
      }
      details.group summary span.relative {
          border-color: rgba(255, 255, 255, 0.15) !important;
      }
      details.group summary span.relative span {
          background-color: #FFFFFF !important;
      }
      details.group div.mt-8 {
          border-color: rgba(255, 255, 255, 0.08) !important;
          color: rgba(255, 255, 255, 0.75) !important;
      }
      details.group div.bg-white {
          background-color: rgba(13, 17, 23, 0.5) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
      }
      details.group div.bg-white p, details.group div.bg-white ul li {
          color: rgba(255, 255, 255, 0.7) !important;
      }
      details.group div.bg-white p.font-bold {
          color: #FFFFFF !important;
      }
      
      /* Header & titles dark theme overrides */
      section.brand-metallic-cells h2, section.brand-metallic-cells h2 span {
          color: #FFFFFF !important;
      }
      section.brand-metallic-cells p.text-neutral-500 {
          color: rgba(255, 255, 255, 0.5) !important;
      }
      section.brand-metallic-cells p.text-neutral-700 {
          color: rgba(255, 255, 255, 0.8) !important;
      }
      section.brand-metallic-cells div.border-neutral-900 {
          border-color: rgba(255, 255, 255, 0.08) !important;
      }
    `;
    
    html = html.substring(0, targetStyleIdx + 7) + premiumCSS + html.substring(targetStyleIdx + 7);
    console.log("Premium custom CSS rules appended!");
}

// 6. Append Javascript scripts for particles, ambient cursor glow, and scroll updates
const bodyCloseTag = '</body>';
const jsScriptCode = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const bar = document.getElementById('scroll-progress');
        if (bar) bar.style.width = scrolled + '%';
    });

    // 2. Dynamic Floating Header Scrolling
    const header = document.querySelector('header');
    if (header) {
        const checkScroll = () => {
            if (window.scrollY > 25) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // 3. Mouse Ambient Glow Light
    const isTouch = ('ontouchstart' in window) || window.matchMedia("(max-width: 768px)").matches;
    if (!isTouch) {
        const glow = document.createElement('div');
        glow.id = 'ambient-glow';
        glow.style.position = 'fixed';
        glow.style.width = '550px';
        glow.style.height = '550px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.zIndex = '1';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.transition = 'opacity 0.6s ease';
        glow.style.opacity = '0';
        document.body.appendChild(glow);

        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';
        });
        window.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }

    // 4. 3D Particles Canvas Background inside Hero
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });
        
        const particles = [];
        const particleCount = Math.min(50, Math.floor(width / 24));
        
        let mouse = { x: null, y: null, radius: 130 };
        if (!isTouch) {
            window.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            window.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = dx / distance;
                        let directionY = dy / distance;
                        this.x -= directionX * force * 2.5;
                        this.y -= directionY * force * 2.5;
                    }
                }
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 0.5;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 5. 3D Card Tilt for Reviews
    if (!isTouch) {
        const cards = document.querySelectorAll('.review-card');
        cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '1000px';
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                
                const rotateY = ((x - xc) / xc) * 7;
                const rotateX = -((y - yc) / yc) * 7;
                
                card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.025, 1.025, 1.025)\`;
                card.style.boxShadow = \`\${-rotateY * 2}px \${rotateX * 2}px 30px rgba(255, 255, 255, 0.05)\`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.boxShadow = 'none';
            });
        });
    }

    // 6. Smooth FAQ Height Transitions
    document.querySelectorAll('details').forEach((el) => {
        const summary = el.querySelector('summary');
        const content = el.querySelector('div.mt-8') || el.querySelector('div:not(.absolute)');
        if (!summary || !content) return;

        summary.addEventListener('click', (e) => {
            e.preventDefault();
            if (el.open) {
                const startHeight = el.offsetHeight;
                const endHeight = summary.offsetHeight + parseInt(window.getComputedStyle(el).paddingTop) + parseInt(window.getComputedStyle(el).paddingBottom);
                
                el.style.height = startHeight + 'px';
                el.style.overflow = 'hidden';
                el.offsetHeight; // force repaint
                
                el.style.transition = 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.height = endHeight + 'px';
                
                setTimeout(() => {
                    el.removeAttribute('open');
                    el.style.height = '';
                    el.style.overflow = '';
                    el.style.transition = '';
                }, 350);
            } else {
                el.setAttribute('open', 'true');
                const endHeight = el.scrollHeight;
                const startHeight = summary.offsetHeight + parseInt(window.getComputedStyle(el).paddingTop) + parseInt(window.getComputedStyle(el).paddingBottom);
                
                el.style.height = startHeight + 'px';
                el.style.overflow = 'hidden';
                el.offsetHeight; // force repaint
                
                el.style.transition = 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.height = endHeight + 'px';
                
                setTimeout(() => {
                    el.style.height = '';
                    el.style.overflow = '';
                    el.style.transition = '';
                }, 350);
            }
        });
    });
});
</script>
`;

if (html.includes(bodyCloseTag)) {
    html = html.replace(bodyCloseTag, jsScriptCode + '\n' + bodyCloseTag);
    console.log("Premium custom scripts inserted!");
}

fs.writeFileSync(file, html, 'utf8');
console.log("HTML file modifications complete!");

// 7. Split the modified HTML into Tilda parts immediately!
console.log("Re-splitting the modified page into Tilda parts...");
const updatedHtml = fs.readFileSync(file, 'utf8');
const lines = updatedHtml.split('\n');

let part1Lines = [];
let part2Lines = [];
let part3Lines = [];
let currentPart = 1;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<section id="science"')) {
        currentPart = 2;
    }
    if (line.includes('<section id="faq"')) {
        currentPart = 3;
    }
    
    if (currentPart === 1) {
        part1Lines.push(line);
    } else if (currentPart === 2) {
        part2Lines.push(line);
    } else {
        part3Lines.push(line);
    }
}

fs.writeFileSync('../lonvi-redesign/tilda_main_page_part1.html', part1Lines.join('\n'), 'utf8');
fs.writeFileSync('../lonvi-redesign/tilda_main_page_part2.html', part2Lines.join('\n'), 'utf8');
fs.writeFileSync('../lonvi-redesign/tilda_main_page_part3.html', part3Lines.join('\n'), 'utf8');

console.log("Re-split complete!");
console.log("Part 1 Size:", part1Lines.join('\n').length, "bytes");
console.log("Part 2 Size:", part2Lines.join('\n').length, "bytes");
console.log("Part 3 Size:", part3Lines.join('\n').length, "bytes");

// Re-apply sync and push
const { execSync } = require('child_process');
try {
    execSync('node sync_and_push.js', { stdio: 'inherit', cwd: __dirname });
} catch (e) {
    console.error("Error pushing:", e.message);
}
