const calendar = document.body.querySelector('.js-calendar-graph-svg')
const calendarHeight = Number(calendar.getAttribute('height'))
calendar.setAttribute('height', calendarHeight * 3.5)
const imgURL = chrome.runtime.getURL("images/tile.png")

const commitLines = calendar.querySelectorAll('g > g')
if (commitLines.length > 0) {
  for(let i = commitLines.length - 1; i > 0; i -= 2) {
    const prevCommitLine = commitLines[i - 1]
    const commitLine = commitLines[i]

    moveChildBlocks(commitLine, prevCommitLine)
    commitLine.parentElement.removeChild(commitLine)

    doubleBlocksSize(prevCommitLine)
    changeBlockcColor(prevCommitLine)
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
    commitBlock.setAttribute('width', width * 2)
    commitBlock.setAttribute('height', height * 2)
  })
}

function changeBlockcColor(line) {
  const commitBlocks = line.querySelectorAll('.ContributionCalendar-day')

  commitBlocks
  .forEach(commitBlock => {
    commitBlock.style.fill = '#744233'
    // commitBlock.style.fill = 'green'
  })
}