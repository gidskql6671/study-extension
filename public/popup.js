chrome.runtime.sendMessage({
  message: 'userStatus'
}, (response) => {
  if (response.message === 'success') {
    console.log('로그인 성공');
  } else if (response.message === 'login'){
    console.log('로그인하세요');
    window.location.href = './login.html';
  }
});

document.querySelector('.logout').addEventListener('click', event => {
  chrome.runtime.sendMessage({
    message: 'logout'
  }, (response) => {
    if (response === 'success') {
      console.log('로그아웃 성공');
      window.location.href = './login.html';
    } else {
      console.log('로그아웃 실패');
    }
  });

})