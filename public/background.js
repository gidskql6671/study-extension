const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['content_script.js']
//   })
// })

function isLogedIn(sendResponse) {
  chrome.storage.local.get(['userStatus'], (response) => {
    const error = chrome.runtime.lastError;
    if (error) console.log(error);

    console.log(`isLogedIn : ${response.userStatus}`)
    if (!response.userStatus) {
      sendResponse({ message: 'login' });
    } else {
      sendResponse({ message: 'success' });
    }
  });
};

function getAuth({email, password}, sendResponse) {
  if (email == password) {
    chrome.storage.local.set({
      userStatus: email
    }, (res) => {
      if (chrome.runtime.lastError) sendResponse('failed');
      sendResponse('success');
    });
  } else {
    sendResponse('failed')
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userStatus') {
    console.log(request.message)
    isLogedIn(sendResponse);
    return true;
  } else if (request.message === 'login') {
    getAuth(request.payload, sendResponse);
    return true;
  }
});