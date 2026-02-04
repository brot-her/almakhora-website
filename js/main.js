// Обработка записи на мастер-классы
document.addEventListener('DOMContentLoaded', function() {
  const signupButtons = document.querySelectorAll('.btn-signup');

  signupButtons.forEach(button => {
    button.addEventListener('click', function() {
      const masterclassName = this.getAttribute('data-masterclass');
      openSignupModal(masterclassName);
    });
  });

  function openSignupModal(masterclassName) {
    // Создаем модальное окно
    const modalHTML = `
      <div class="modal-overlay" id="signupModal">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <h3>Запись на мастер-класс</h3>
          <p class="modal-subtitle">${masterclassName}</p>
          <form id="signupForm">
            <div class="form-group">
              <input type="text" placeholder="Ваше имя" required>
            </div>
            <div class="form-group">
              <input type="tel" placeholder="Телефон" required>
            </div>
            <div class="form-group">
              <input type="email" placeholder="Email" required>
            </div>
            <div class="form-group">
              <textarea placeholder="Комментарий (необязательно)" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Отправить заявку</button>
          </form>
        </div>
      </div>
    `;

    // Добавляем модальное окно в body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Закрытие модального окна
    const modal = document.getElementById('signupModal');
    const closeBtn = modal.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Обработка формы
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Здесь код отправки формы
      alert(`Заявка на мастер-класс "${masterclassName}" отправлена! Мы свяжемся с вами в течение дня.`);
      modal.remove();
    });
  }
});