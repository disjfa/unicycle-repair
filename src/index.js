document.addEventListener('click', (evt) => {
  const tab = evt.target.closest('.tab');
  if (!tab) {
    return;
  }
  evt.preventDefault();

  activateTab(tab);
  const { target } = tab.dataset;
  const el = document.querySelector(target);
  if (!el) {
    return;
  }
  history.pushState(null, null, `${target}`)
  el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  const { hash } = document.location;
  if (!hash) {
    return;
  }

  const item = document.querySelector(`[data-target="${hash}"]`);
  if (!item) {
    return;
  }
  if (!item.classList.contains('tab')) {
    return;
  }
  activateTab(item);
}

function activateTab(tab) {
  tab.parentNode.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();

  const a2hs = document.querySelector('#a2hs');
  a2hs.classList.add('show');
  a2hs.addEventListener('click', () => {
    event.prompt();
    event.userChoice.then(result => {
      // dismissed/accepted
      // send this to analytics
      console.log(result.outcome);
    });
  });
});
