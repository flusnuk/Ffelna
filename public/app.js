const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price)
}

const toDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      const csrf = event.target.dataset.csrf

      fetch('/card/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        },
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }

  })
}


(function () {
  const menuBtn = document.querySelector(".burger");
  const burgerLinks = document.querySelector(".burger__links");
  const body = document.querySelector("body");
  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    burgerLinks.classList.toggle("burger__links-active");
    body.classList.toggle("lock");
  });
  burgerLinks.addEventListener("click", function () {
    menuBtn.classList.remove("active");
    burgerLinks.classList.remove("burger__links-active");
    body.classList.remove("lock");
  });
})();

(function () {
  const accordions = document.querySelectorAll(".accordion-label");

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function () {

      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.classList.remove("is-open");
      } else {
        let active = document.querySelectorAll(".accordion-label.is-open");
        for (let j = 0; j < active.length; j++) {
          active[j].classList.remove("is-open");
          active[j].nextElementSibling.style.maxHeight = null;
        }
        this.classList.toggle("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    })
  }
})();
// M.Tabs.init(document.querySelectorAll('.tabs'))