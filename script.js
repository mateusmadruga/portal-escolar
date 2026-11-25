document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var htmlEl = document.documentElement;
  var themeBtn = document.getElementById("btn-theme-toggle");
  var contrastBtn = document.getElementById("btn-contrast-toggle");

  var savedFont = localStorage.getItem("horizonte_fontSize");
  var currentFontSize = savedFont ? parseInt(savedFont, 10) : 16;
  var currentTheme = localStorage.getItem("horizonte_theme") || "light";

  function applyTheme(theme) {
    currentTheme = theme;
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("horizonte_theme", theme);

    if (themeBtn) {
      themeBtn.textContent = theme === "dark" ? "☀️ Modo Claro" : "🌓 Modo Escuro";
    }
    if (contrastBtn) {
      contrastBtn.textContent =
        theme === "high-contrast" ? "🎨 Contraste Padrão" : "👁️ Alto Contraste";
    }
  }

  function applyFontSize(size) {
    currentFontSize = Math.min(22, Math.max(13, size));
    htmlEl.style.setProperty("--font-scale", currentFontSize + "px");
    localStorage.setItem("horizonte_fontSize", String(currentFontSize));
  }

  applyTheme(currentTheme);
  applyFontSize(currentFontSize);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", function () {
      var nextContrast = currentTheme === "high-contrast" ? "light" : "high-contrast";
      applyTheme(nextContrast);
    });
  }

  var btnFontInc = document.getElementById("btn-font-inc");
  var btnFontDec = document.getElementById("btn-font-dec");
  var btnFontReset = document.getElementById("btn-font-reset");

  if (btnFontInc) {
    btnFontInc.addEventListener("click", function () {
      applyFontSize(currentFontSize + 2);
    });
  }

  if (btnFontDec) {
    btnFontDec.addEventListener("click", function () {
      applyFontSize(currentFontSize - 2);
    });
  }

  if (btnFontReset) {
    btnFontReset.addEventListener("click", function () {
      applyFontSize(16);
    });
  }

  var menuToggle = document.getElementById("menu-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕ Fechar" : "☰ Menu";
    });
  }

  var slides = document.querySelectorAll(".carousel-slide");
  var dots = document.querySelectorAll(".dot");
  var pauseBtn = document.getElementById("carousel-pause");
  var nextSlideBtn = document.getElementById("next-slide");
  var prevSlideBtn = document.getElementById("prev-slide");

  var slideIndex = 0;
  var isPaused = false;
  var autoPlayTimer = null;

  function showSlide(n) {
    if (slides.length === 0) {
      return;
    }

    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    for (var j = 0; j < dots.length; j++) {
      dots[j].classList.remove("active");
      dots[j].setAttribute("aria-selected", "false");
    }

    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");

    if (dots[slideIndex]) {
      dots[slideIndex].classList.add("active");
      dots[slideIndex].setAttribute("aria-selected", "true");
    }
  }

  function startAutoPlay() {
    if (slides.length === 0) {
      return;
    }
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
    autoPlayTimer = setInterval(function () {
      if (!isPaused) {
        showSlide(slideIndex + 1);
      }
    }, 5000);
  }

  if (slides.length > 0) {
    if (nextSlideBtn) {
      nextSlideBtn.addEventListener("click", function () {
        showSlide(slideIndex + 1);
      });
    }

    if (prevSlideBtn) {
      prevSlideBtn.addEventListener("click", function () {
        showSlide(slideIndex - 1);
      });
    }

    for (var d = 0; d < dots.length; d++) {
      dots[d].addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-index"), 10);
        showSlide(idx);
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? "▶ Retomar" : "⏸ Pausar";
        pauseBtn.setAttribute(
          "aria-label",
          isPaused ? "Retomar rotação automática" : "Pausar rotação automática"
        );
      });
    }

    startAutoPlay();
  }

  var tabBtns = document.querySelectorAll(".tab-btn");
  var tabPanels = document.querySelectorAll(".tab-panel");
  var searchInput = document.getElementById("search-input");
  var emptyMsg = document.getElementById("search-empty-msg");

  function filterActiveTab() {
    var activePanel = document.querySelector(".tab-panel.active");
    if (!activePanel) {
      return;
    }

    var term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var items = activePanel.querySelectorAll(".info-card");
    var visibleCount = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var keywords = item.getAttribute("data-keywords") || "";
      var searchableText = (keywords + " " + item.textContent).toLowerCase();
      var match = searchableText.indexOf(term) !== -1;

      item.style.display = match ? "block" : "none";
      if (match) {
        visibleCount++;
      }
    }

    if (emptyMsg) {
      if (visibleCount > 0) {
        emptyMsg.classList.add("hidden");
      } else {
        emptyMsg.classList.remove("hidden");
      }
    }
  }

  for (var t = 0; t < tabBtns.length; t++) {
    tabBtns[t].addEventListener("click", function () {
      for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
        tabBtns[i].setAttribute("aria-selected", "false");
      }

      for (var j = 0; j < tabPanels.length; j++) {
        tabPanels[j].classList.remove("active");
      }

      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      var targetId = "tab-" + this.getAttribute("data-tab");
      var targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      filterActiveTab();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterActiveTab);
  }

  var contactForm = document.getElementById("contact-form");
  var phoneInput = document.getElementById("telefone");

  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      var v = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 6) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
      } else if (v.length > 2) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2);
      } else if (v.length > 0) {
        v = "(" + v;
      }
      e.target.value = v;
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      var nome = document.getElementById("nome");
      var email = document.getElementById("email");
      var telefone = document.getElementById("telefone");
      var mensagem = document.getElementById("mensagem");
      var lgpd = document.getElementById("lgpd");
      var feedback = document.getElementById("form-feedback");

      function setFieldError(input, errorId, msg) {
        var errEl = document.getElementById(errorId);
        if (errEl) {
          errEl.textContent = msg;
        }
        if (input) {
          input.setAttribute("aria-invalid", msg ? "true" : "false");
        }
        if (msg) {
          isValid = false;
        }
      }

      setFieldError(
        nome,
        "erro-nome",
        nome.value.trim().length < 3 ? "Informe seu nome completo." : ""
      );

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFieldError(
        email,
        "erro-email",
        !emailRegex.test(email.value.trim()) ? "Informe um e-mail válido." : ""
      );

      setFieldError(
        telefone,
        "erro-telefone",
        telefone.value.replace(/\D/g, "").length < 10 ? "Informe um telefone com DDD." : ""
      );

      setFieldError(
        mensagem,
        "erro-mensagem",
        mensagem.value.trim().length < 10 ? "A mensagem deve ter ao menos 10 caracteres." : ""
      );

      setFieldError(
        lgpd,
        "erro-lgpd",
        !lgpd.checked ? "É necessário aceitar o termo de contato." : ""
      );

      if (!isValid) {
        feedback.className = "feedback-banner error";
        feedback.textContent = "Por favor, corrija os campos destacados antes de enviar.";
        return;
      }

      var protocolo = Math.floor(1000 + Math.random() * 9000);
      feedback.className = "feedback-banner";
      feedback.textContent =
        "Obrigado, " +
        nome.value.trim() +
        "! Sua solicitação foi registrada com sucesso. Protocolo #2026-" +
        protocolo +
        ".";
      contactForm.reset();
    });
  }

  var loginForm = document.getElementById("login-form");
  var togglePassBtn = document.getElementById("toggle-password");
  var senhaInput = document.getElementById("senha");
  var fillAlunoBtn = document.getElementById("fill-aluno");
  var fillProfBtn = document.getElementById("fill-prof");

  if (togglePassBtn && senhaInput) {
    togglePassBtn.addEventListener("click", function () {
      var isPassword = senhaInput.type === "password";
      senhaInput.type = isPassword ? "text" : "password";
      togglePassBtn.textContent = isPassword ? "Ocultar" : "Mostrar";
    });
  }

  if (fillAlunoBtn) {
    fillAlunoBtn.addEventListener("click", function () {
      document.getElementById("perfil").value = "aluno";
      document.getElementById("matricula").value = "20260145";
      document.getElementById("senha").value = "aluno123";
    });
  }

  if (fillProfBtn) {
    fillProfBtn.addEventListener("click", function () {
      document.getElementById("perfil").value = "professor";
      document.getElementById("matricula").value = "prof.carlos@horizonte.edu.br";
      document.getElementById("senha").value = "prof123";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var perfil = document.getElementById("perfil").value;
      var matricula = document.getElementById("matricula").value.trim();
      var senha = document.getElementById("senha").value.trim();
      var feedback = document.getElementById("login-feedback");

      if (!matricula || !senha) {
        feedback.className = "feedback-banner error";
        feedback.textContent = "Preencha sua matrícula/e-mail e senha para continuar.";
        return;
      }

      var userSession = {
        perfil: perfil,
        identificador: matricula,
        nome:
          perfil === "professor"
            ? "Prof. Carlos Mendes (Matemática)"
            : "Lucas Almeida — 2º Ano EM"
      };

      sessionStorage.setItem("horizonte_user", JSON.stringify(userSession));
      window.location.href = "portal.html";
    });
  }

  var gradesTbody = document.getElementById("grades-tbody");

  if (gradesTbody) {
    var rawUser = sessionStorage.getItem("horizonte_user");
    var user = rawUser
      ? JSON.parse(rawUser)
      : { perfil: "aluno", nome: "Lucas Almeida — 2º Ano EM (Modo Visualização)" };

    var greetingEl = document.getElementById("user-greeting");
    if (greetingEl) {
      greetingEl.textContent = user.nome;
    }

    var defaultRecords = [
      { id: 1, labelAluno: "Matemática e Lógica", labelProf: "Ana Clara Silva (20260101)", n1: 8.5, n2: 9.0, freq: 96 },
      { id: 2, labelAluno: "Algoritmos e Web", labelProf: "Bruno Ferreira (20260102)", n1: 7.0, n2: 6.5, freq: 88 },
      { id: 3, labelAluno: "Língua Portuguesa", labelProf: "Gabriel Santos (20260103)", n1: 5.5, n2: 6.0, freq: 92 },
      { id: 4, labelAluno: "Física Aplicada", labelProf: "Mariana Costa (20260104)", n1: 4.0, n2: 5.0, freq: 72 }
    ];

    var savedRecords = localStorage.getItem("horizonte_records");
    var records = savedRecords ? JSON.parse(savedRecords) : defaultRecords;

    function evaluateStatus(media, freq) {
      if (freq < 75) {
        return { text: "Reprovado por Falta", css: "status-reprovado" };
      }
      if (media >= 7.0) {
        return { text: "Aprovado", css: "status-aprovado" };
      }
      if (media >= 5.0) {
        return { text: "Recuperação", css: "status-recuperacao" };
      }
      return { text: "Reprovado por Nota", css: "status-reprovado" };
    }

    function renderAcademicTable() {
      var isProf = user.perfil === "professor";
      var titleEl = document.getElementById("dashboard-title");
      var colEntityEl = document.getElementById("col-entity");
      var profActionsEl = document.getElementById("prof-actions");

      if (titleEl) {
        titleEl.textContent = isProf
          ? "Diário de Classe — Turma 2º Ano B"
          : "Boletim Escolar Digital";
      }
      if (colEntityEl) {
        colEntityEl.textContent = isProf ? "Estudante (Matrícula)" : "Disciplina";
      }
      if (profActionsEl) {
        if (isProf) {
          profActionsEl.classList.remove("hidden");
        } else {
          profActionsEl.classList.add("hidden");
        }
      }

      gradesTbody.innerHTML = "";
      var sumMedia = 0;
      var sumFreq = 0;

      for (var i = 0; i < records.length; i++) {
        var rec = records[i];
        var media = (Number(rec.n1) + Number(rec.n2)) / 2;
        sumMedia += media;
        sumFreq += Number(rec.freq);
        var status = evaluateStatus(media, Number(rec.freq));

        var tr = document.createElement("tr");
        var nomeLinha = isProf ? rec.labelProf : rec.labelAluno;

        var tdNome = "<td><strong>" + nomeLinha + "</strong></td>";
        var tdN1 = isProf
          ? '<td><input type="number" step="0.5" min="0" max="10" class="grade-input" data-idx="' + i + '" data-field="n1" value="' + rec.n1 + '" aria-label="Nota 1 de ' + nomeLinha + '"></td>'
          : "<td>" + Number(rec.n1).toFixed(1) + "</td>";
        var tdN2 = isProf
          ? '<td><input type="number" step="0.5" min="0" max="10" class="grade-input" data-idx="' + i + '" data-field="n2" value="' + rec.n2 + '" aria-label="Nota 2 de ' + nomeLinha + '"></td>'
          : "<td>" + Number(rec.n2).toFixed(1) + "</td>";
        var tdMedia = "<td><strong>" + media.toFixed(1) + "</strong></td>";
        var tdFreq = isProf
          ? '<td><input type="number" step="1" min="0" max="100" class="grade-input" data-idx="' + i + '" data-field="freq" value="' + rec.freq + '" aria-label="Frequência de ' + nomeLinha + '">%</td>'
          : "<td>" + rec.freq + "%</td>";
        var tdStatus = '<td><span class="status-pill ' + status.css + '">' + status.text + "</span></td>";

        tr.innerHTML = tdNome + tdN1 + tdN2 + tdMedia + tdFreq + tdStatus;
        gradesTbody.appendChild(tr);
      }

      var kpiMediaEl = document.getElementById("kpi-media");
      var kpiFreqEl = document.getElementById("kpi-freq");

      if (kpiMediaEl) {
        kpiMediaEl.textContent = (sumMedia / records.length).toFixed(1);
      }
      if (kpiFreqEl) {
        kpiFreqEl.textContent = Math.round(sumFreq / records.length) + "%";
      }

      if (isProf) {
        var inputs = document.querySelectorAll(".grade-input");
        for (var k = 0; k < inputs.length; k++) {
          inputs[k].addEventListener("change", function () {
            var idx = parseInt(this.getAttribute("data-idx"), 10);
            var field = this.getAttribute("data-field");
            var maxVal = field === "freq" ? 100 : 10;
            var parsed = parseFloat(this.value);
            var val = isNaN(parsed) ? 0 : Math.min(maxVal, Math.max(0, parsed));
            records[idx][field] = val;
            renderAcademicTable();
          });
        }
      }
    }

    renderAcademicTable();

    var saveGradesBtn = document.getElementById("btn-save-grades");
    if (saveGradesBtn) {
      saveGradesBtn.addEventListener("click", function () {
        localStorage.setItem("horizonte_records", JSON.stringify(records));
        var saveStatus = document.getElementById("save-status");
        if (saveStatus) {
          saveStatus.textContent = "✓ Notas e frequências atualizadas com sucesso!";
          setTimeout(function () {
            saveStatus.textContent = "";
          }, 3500);
        }
      });
    }

    var logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("horizonte_user");
        window.location.href = "login.html";
      });
    }
  }
});
