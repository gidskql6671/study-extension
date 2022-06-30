document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const pwd = document.querySelector('#password').value;
chrome.runtime.sendMessage({
    message: 'login',
    payload: { email, pwd }
  }, (response) => {
    if (response === 'success') {
      window.location.href = './popup.html';
    } else {
      alert('로그인 실패');
    }
  });
})