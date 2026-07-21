document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = document.getElementById("nom").value.trim();
      const email = document.getElementById("email").value.trim();
      const telephone = document.getElementById("telephone").value.trim();
      const sujet = document.getElementById("sujet").value;
      const message = document.getElementById("message").value.trim();

      const corps = [
        `Nom : ${nom}`,
        `Email : ${email}`,
        telephone ? `Téléphone : ${telephone}` : null,
        `Sujet : ${sujet}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      // TODO: remplacer par l'adresse email réelle de la boulangerie une fois connue.
      const lien = `mailto:contact@boulangerie-nicolhas.fr?subject=${encodeURIComponent(
        "Message depuis le site, " + sujet
      )}&body=${encodeURIComponent(corps)}`;

      window.location.href = lien;
    });
  }

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 10
          ? "0 4px 22px rgba(62, 58, 57, 0.12)"
          : "0 2px 18px rgba(62, 58, 57, 0.06)";
    });
  }
});
