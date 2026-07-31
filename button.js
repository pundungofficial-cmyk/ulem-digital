document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openBtn");
    const cover = document.getElementById("judul");
    const home = document.getElementById("home");
const music = document.getElementById("bgMusic");
  const navbar = document.getElementById("navbar-menu");
    // Kunci scroll saat cover tampil
    document.body.classList.add("no-scroll");

    openBtn.addEventListener("click", () => {
      
      music.play();

      explodeButton(openBtn);
        // Loading
        openBtn.classList.add("loading");
        openBtn.disabled = true;

        setTimeout(() => {

            // Hilangkan cover
            cover.classList.add("hide");
setTimeout(() => {
    cover.classList.add("hide");
}, 1000);
            // Aktifkan scroll
            document.body.classList.remove("no-scroll");
          // Tampilkan navbar setelah jeda 1 detik
setTimeout(() => {
    navbar.classList.add("show");
}, 1000);
            // Scroll ke home
            home.scrollIntoView({
                behavior: "smooth"
            });

            // Hapus cover setelah animasi selesai
            setTimeout(() => {
                cover.remove();
            }, 1000);

        }, 1500);

    });

});

function explodeButton(button){
const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = [
        "#ffffff",
        "#ffd166",
        "#ff4d6d",
        "#7b2cbf",
        "#4cc9f0"
    ];

    for(let i=0;i<80;i++){

        const particle=document.createElement("span");
        particle.className="particle";

        particle.style.left=centerX+"px";
        particle.style.top=centerY+"px";

        particle.style.background=
            colors[Math.floor(Math.random()*colors.length)];

        const angle=Math.random()*Math.PI*2;
        const distance=80+Math.random()*180;

        particle.style.setProperty(
            "--x",
            Math.cos(angle)*distance+"px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle)*distance+"px"
        );

        document.body.appendChild(particle);

        particle.addEventListener("animationend",()=>{
            particle.remove();
        });
    }
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navbar-menu .nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer.observe(section));