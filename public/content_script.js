const calendar = document.body.querySelector('.js-calendar-graph-svg')
const calendarHeight = Number(calendar.getAttribute('height'))
calendar.setAttribute('height', calendarHeight * 3.5)
const tileImgUrl = chrome.runtime.getURL("images/tile.png")
const grass2ImgUrl = chrome.runtime.getURL("images/grass2.png")
const grass3ImgUrl = chrome.runtime.getURL("images/grass3.png")
const flower1ImgUrl = chrome.runtime.getURL("images/flower1.png")
const flower2ImgUrl = chrome.runtime.getURL("images/flower2.png")
const flower3ImgUrl = chrome.runtime.getURL("images/flower3.png")
const flower4ImgUrl = chrome.runtime.getURL("images/flower4.png")

const commitLines = calendar.querySelectorAll('g > g')
if (commitLines.length > 0) {
  for(let i = commitLines.length - 1; i > 0; i -= 2) {
    const prevCommitLine = commitLines[i - 1]
    const commitLine = commitLines[i]

    moveChildBlocks(commitLine, prevCommitLine)
    commitLine.parentElement.removeChild(commitLine)

    doubleBlocksSize(prevCommitLine)
    changeBlocksToFlower(prevCommitLine)
  }

  if (commitLines.length % 2) {
    commitLines[0].parentElement.removeChild(commitLines[0])
  }
}

function moveChildBlocks(sourceLine, targetLine) {
  const commitBlocks = sourceLine.querySelectorAll('.ContributionCalendar-day')

  commitBlocks
  .forEach(commitBlock => {
    const x = Number(commitBlock.getAttribute('x'))
    const y = Number(commitBlock.getAttribute('y'))

    commitBlock.setAttribute('x', x + 1)
    commitBlock.setAttribute('y', y + 91)

    targetLine.appendChild(commitBlock)
  })
}

function doubleBlocksSize(line) {
  const commitBlocks = line.querySelectorAll('.ContributionCalendar-day')

  commitBlocks
  .forEach(commitBlock => {
    const y = Number(commitBlock.getAttribute('y'))
    const width = Number(commitBlock.getAttribute('width'))
    const height = Number(commitBlock.getAttribute('height'))

    commitBlock.setAttribute('y', y * 2)
    commitBlock.setAttribute('width', width * 2 + 6)
    commitBlock.setAttribute('height', height * 2 + 6)
  })
}

function changeBlocksToFlower(line) {
  const commitBlocks = line.querySelectorAll('.ContributionCalendar-day')

  commitBlocks
  .forEach(commitBlock => {
    // commitBlock.style.fill = '#744233'
    // commitBlock.style.fill = 'green'
    const x = commitBlock.getAttribute('x')
    const y = commitBlock.getAttribute('y')
    const width = commitBlock.getAttribute('width')
    const height = commitBlock.getAttribute('height')
    const level = commitBlock.dataset.level
    const count = commitBlock.dataset.count

    const imageElement = document.createElementNS("http://www.w3.org/2000/svg", "image")

    imageElement.setAttribute('x', x)
    imageElement.setAttribute('y', y)
    imageElement.setAttribute('width', width)
    imageElement.setAttribute('height', height)
    imageElement.classList.add('ContributionCalendar-day');
    imageElement.dataset.level = level;
    imageElement.dataset.count = count;
    if (level == 0) {
      imageElement.setAttribute('href', tileImgUrl)
    }
    else if (level == 1) {
      imageElement.setAttribute('href', grass2ImgUrl)
    }
    else if (level == 2) {
      imageElement.setAttribute('href', grass3ImgUrl)
    }
    else {
      if (Math.random() <= 0.5) {
        imageElement.setAttribute('href', flower1ImgUrl)
      }
      else {
        imageElement.setAttribute('href', flower2ImgUrl)
      }
    }

    commitBlock.parentElement.appendChild(imageElement)
    commitBlock.parentElement.removeChild(commitBlock)
  })
}