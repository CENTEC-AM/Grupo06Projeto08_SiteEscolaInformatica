document.addEventListener("DOMContentLoaded", () => {
    // Menu mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (menuToggle && nav) menuToggle.addEventListener("click", () => nav.classList.toggle("open"));

    // WhatsApp: substitua pelo número real da instituição.
    const whatsappNumber = "5592999999999";
    document.querySelectorAll("[data-whatsapp]").forEach(link => {
        link.href = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20obter%20informações%20sobre%20os%20cursos.`;
        link.target = "_blank";
        link.rel = "noopener";
    });

    // Modal de cursos
    const modal = document.getElementById("courseModal");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const list = document.getElementById("modalList");
    const courseData = {
        "Informática Básica": ["Fundamentos de hardware e software", "Sistema operacional e organização de arquivos", "Internet, segurança e ferramentas de escritório"],
        "Desenvolvimento Web": ["HTML5 para estruturação de páginas", "CSS3, responsividade e boas práticas", "JavaScript e projeto final"],
        "Informática Forense": ["Preservação e análise de evidências digitais", "Cadeia de custódia e documentação", "Fundamentos de investigação e segurança"],
        "Algoritmos e Lógica": ["Variáveis, operadores e estruturas de decisão", "Laços de repetição e vetores", "Funções e resolução de problemas"],
        "Segurança da Informação": ["Confidencialidade, integridade e disponibilidade", "Boas práticas de proteção de dados", "Gestão básica de riscos"],
        "Office e Produtividade": ["Documentos e formatação profissional", "Planilhas e organização de dados", "Apresentações e produtividade"]
    };
    document.querySelectorAll(".modal-open").forEach(btn => btn.addEventListener("click", () => {
        const course = btn.dataset.course;
        if (!modal) return;
        title.textContent = course;
        description.textContent = "Conteúdo planejado para desenvolvimento gradual de competências técnicas e aplicação prática.";
        list.innerHTML = (courseData[course] || []).map(item => `<li>${item}</li>`).join("");
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }));
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    };
    document.querySelector(".modal-close")?.addEventListener("click", closeModal);
    modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    // Carrossel
    const testimonials = document.querySelectorAll(".testimonial");
    const prev = document.querySelector(".carousel-btn.prev");
    const next = document.querySelector(".carousel-btn.next");
    const dots = document.querySelector(".carousel-dots");
    let current = 0;
    if (testimonials.length && dots) {
        testimonials.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
            dot.addEventListener("click", () => showSlide(i));
            dots.appendChild(dot);
        });
        function showSlide(index) {
            current = (index + testimonials.length) % testimonials.length;
            testimonials.forEach((item, i) => item.classList.toggle("active", i === current));
            dots.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === current));
        }
        prev?.addEventListener("click", () => showSlide(current - 1));
        next?.addEventListener("click", () => showSlide(current + 1));
        setInterval(() => showSlide(current + 1), 6000);
    }

    // Filtro de cursos
    const filters = document.querySelectorAll(".filter");
    const courseItems = document.querySelectorAll(".course-item");
    filters.forEach(filter => filter.addEventListener("click", () => {
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
        const category = filter.dataset.filter;
        courseItems.forEach(item => {
            item.style.display = category === "todos" || item.dataset.category === category ? "" : "none";
        });
    }));

    // Formulário
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    form?.addEventListener("submit", e => {
        e.preventDefault();
        formMessage.textContent = "Mensagem registrada com sucesso! Este formulário é demonstrativo para o projeto acadêmico.";
        form.reset();
    });

    // Calendário
    const calendar = document.getElementById("calendar");
    const monthTitle = document.getElementById("monthTitle");
    if (calendar && monthTitle) {
        let viewDate = new Date(2026, 7, 1);
        const eventDates = ["2026-08-24", "2026-08-29", "2026-09-05"];
        const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
        const weekdays = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
        function renderCalendar() {
            const year = viewDate.getFullYear(), month = viewDate.getMonth();
            monthTitle.textContent = `${months[month]} ${year}`;
            calendar.innerHTML = weekdays.map(day => `<div class="weekday">${day}</div>`).join("");
            const first = new Date(year, month, 1).getDay();
            const total = new Date(year, month + 1, 0).getDate();
            const previousTotal = new Date(year, month, 0).getDate();
            for (let i = first - 1; i >= 0; i--) calendar.innerHTML += `<div class="muted">${previousTotal - i}</div>`;
            for (let day = 1; day <= total; day++) {
                const key = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                calendar.innerHTML += `<div class="${eventDates.includes(key) ? "event-day" : ""}">${day}${eventDates.includes(key) ? "<br><small>Evento</small>" : ""}</div>`;
            }
            const cells = calendar.children.length;
            const remainder = cells % 7;
            if (remainder) for (let i = 1; i <= 7 - remainder; i++) calendar.innerHTML += `<div class="muted">${i}</div>`;
        }
        renderCalendar();
        document.getElementById("prevMonth")?.addEventListener("click", () => { viewDate.setMonth(viewDate.getMonth() - 1); renderCalendar(); });
        document.getElementById("nextMonth")?.addEventListener("click", () => { viewDate.setMonth(viewDate.getMonth() + 1); renderCalendar(); });
    }
});