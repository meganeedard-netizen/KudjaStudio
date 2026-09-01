// La Clef de Voûte — scripts du site
(function () {
  "use strict";

  /* Menu mobile */
  var burger = document.querySelector("[data-burger]");
  var navMobile = document.querySelector("[data-nav-mobile]");
  if (burger && navMobile) {
    burger.addEventListener("click", function () {
      var open = navMobile.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-locked", open);
    });
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("is-open");
        burger.classList.remove("is-open");
        document.body.classList.remove("nav-locked");
      });
    });
  }

  /* Formulaire de contact */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var statusBox = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Piège à robots (honeypot)
      if (form.querySelector('[name="site_web"]').value) {
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
      submitBtn.textContent = "Envoi en cours…";

      fetch(form.getAttribute("action"), {
        method: "POST",
        body: new FormData(form),
        headers: { "X-Requested-With": "XMLHttpRequest" }
      })
        .then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
        .then(function (data) {
          if (data && data.ok) {
            showStatus(true, "Merci ! Votre message a bien été envoyé. Fanny vous répondra rapidement.");
            form.reset();
          } else {
            showStatus(false, "Une erreur est survenue lors de l'envoi. Vous pouvez aussi écrire directement à contact@lcv-amo.fr.");
          }
        })
        .catch(function () {
          showStatus(false, "Une erreur est survenue lors de l'envoi. Vous pouvez aussi écrire directement à contact@lcv-amo.fr.");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText;
        });
    });

    function showStatus(ok, message) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.classList.remove("success", "error");
      statusBox.classList.add(ok ? "success" : "error", "is-visible");
      statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* Année courante dans le footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
