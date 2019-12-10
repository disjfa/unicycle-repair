document.addEventListener('click', (evt) => {
  const tab = evt.target.closest('.tab');
  if (!tab) {
    return;
  }
  evt.preventDefault();

  // activateTab(tab);
  const { target } = tab.dataset;
  const el = document.querySelector(target);
  if (!el) {
    return;
  }
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
  if (tab.classList.contains('active')) {
    return;
  }

  tab.parentNode.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
  history.pushState(null, null, `${tab.dataset.target}`)
}

const screens = document.querySelectorAll('.screen-item');

function screenCallback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = document.querySelector(`[data-target="#${entry.target.id}"]`);
      if (!item) {
        return;
      }
      activateTab(item);
    }
  });
}

let options = {
  threshold: 0.4
};

let observer = new IntersectionObserver(screenCallback, options);
screens.forEach(screen => {
  observer.observe(screen);
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
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
