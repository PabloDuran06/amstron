/* ============================================
   AMSTRON — Catalogue Filter & Search
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput   = document.getElementById('product-search');
  const chips         = document.querySelectorAll('.chip[data-family]');
  const familyBlocks  = document.querySelectorAll('.family-block');
  const allCards      = document.querySelectorAll('.product-card');
  const noResults     = document.getElementById('no-results');
  const resultsCount  = document.getElementById('results-count');

  let activeFamily = 'all';
  let searchTerm   = '';

  // ─── Count badges per family ───
  function updateFamilyCounts() {
    document.querySelectorAll('[data-family-count]').forEach(badge => {
      const fam = badge.dataset.familyCount;
      const count = document.querySelectorAll(`.product-card[data-family="${fam}"]`).length;
      badge.textContent = count;
    });
  }
  updateFamilyCounts();

  // ─── Apply filter + search ───
  function apply() {
    let visible = 0;

    familyBlocks.forEach(block => {
      const blockFamily = block.dataset.family;
      const matchFamily = activeFamily === 'all' || activeFamily === blockFamily;
      if (!matchFamily) {
        block.style.display = 'none';
        return;
      }
      block.style.display = '';

      const cards = block.querySelectorAll('.product-card');
      let blockVisible = 0;

      cards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const desc = card.querySelector('.product-card__desc')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');
        const matchSearch = !searchTerm ||
          name.includes(searchTerm) ||
          desc.includes(searchTerm) ||
          tags.includes(searchTerm);

        if (matchSearch) {
          card.style.display = '';
          blockVisible++;
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      // Hide block header if no cards visible
      block.style.display = blockVisible === 0 ? 'none' : '';
    });

    // No results state
    noResults.style.display = visible === 0 ? 'flex' : 'none';

    // Results counter
    const total = allCards.length;
    if (searchTerm || activeFamily !== 'all') {
      resultsCount.textContent = `${visible} de ${total} componentes`;
      resultsCount.style.display = 'block';
    } else {
      resultsCount.style.display = 'none';
    }
  }

  // ─── Chip clicks ───
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFamily = chip.dataset.family;
      apply();

      // Smooth scroll to first visible block
      setTimeout(() => {
        const firstBlock = document.querySelector('.family-block[style=""], .family-block:not([style])');
        if (firstBlock) {
          firstBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  });

  // ─── Search input ───
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    // When searching, reset family filter to all
    if (searchTerm) {
      chips.forEach(c => c.classList.remove('active'));
      document.querySelector('.chip[data-family="all"]').classList.add('active');
      activeFamily = 'all';
    }
    apply();
  });

  // ─── Clear search on ESC ───
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchTerm = '';
      apply();
    }
  });
});
