const searchInput = document.getElementById("pesquisa");
const filterButtons = document.querySelectorAll(".filter-btn");
const courseItems = document.querySelectorAll(".curso-item");
const emptyState = document.getElementById("sem-resultados");
let activeCategory = "todos";

function normalizeText(value = "") {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterCourses() {
  const term = normalizeText(searchInput?.value.trim() || "");
  let visibleCount = 0;

  courseItems.forEach((item) => {
    const category = item.dataset.categoria || "";
    const searchableText = normalizeText(
      `${item.dataset.nome || ""} ${item.textContent || ""}`
    );
    const categoryMatches = activeCategory === "todos" || category === activeCategory;
    const searchMatches = searchableText.includes(term);
    const visible = categoryMatches && searchMatches;

    item.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyState?.classList.toggle("d-none", visibleCount !== 0);
}

searchInput?.addEventListener("input", filterCourses);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.categoria || "todos";

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterCourses();
  });
});

// Os botões demonstram a seleção. Integre um canal de contato para receber inscrições reais.
document.querySelectorAll(".interesse").forEach((button) => {
  button.addEventListener("click", () => {
    const courseName = button.dataset.curso || "curso";
    const message = document.getElementById("toastMessage");
    const toastElement = document.getElementById("interestToast");

    if (message && toastElement && window.bootstrap?.Toast) {
      message.textContent = `Você selecionou "${courseName}". Entre em contato com a equipe para saber como se inscrever.`;
      bootstrap.Toast.getOrCreateInstance(toastElement).show();
    } else {
      alert(`Você selecionou ${courseName}. Configure um canal de contato para concluir a inscrição.`);
    }
  });
});

const year = document.getElementById("ano");
if (year) year.textContent = new Date().getFullYear();

// Fecha o menu móvel após selecionar uma seção.
document.querySelectorAll("#mainMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mainMenu");
    if (menu?.classList.contains("show") && window.bootstrap?.Collapse) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
