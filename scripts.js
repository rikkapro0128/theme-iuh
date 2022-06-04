(async () => {
  const src = chrome.runtime.getURL("helper.js");
  const { getComputedStyle } = await import(src);
  
  const wrap = document.querySelector('html');
  const themeDefault = 'theme--dracula';
  
  // add class theme to accept
  wrap.classList.add(themeDefault);
  
  // handle after DOM render is done!
  document.addEventListener('DOMContentLoaded', function() {
    
    // query DOM html on loaded
    const elementsInput = document.querySelectorAll('input');
    const elementsCalendar = document.querySelector('#viewLichTheoTuan');
    const eleLevelMark = document.querySelectorAll('#xemDiem_aaa tr td[title="DiemChu"]')
    const eleLevelMarkSum = document.querySelectorAll('#xemDiem_aaa tr td[colspan="2"] > span:nth-child(2)')
    const eleBody = document.body;
    let stateMousePoint = 'auto';

    const eleMouseMoveInner = document.createElement('div');
    const eleMouseMoveOuter = document.createElement('div');

    // set id control for element mouse move
    eleMouseMoveInner.setAttribute('id', 'miru-mouse-move--inner');
    eleMouseMoveOuter.setAttribute('id', 'miru-mouse-move--outer');
  
    eleBody.append(eleMouseMoveInner, eleMouseMoveOuter);

    // add event when mose move on screen
    document.addEventListener('mousemove', handleMouseMove);
    
    // // handle style DOM when mouse move
    function handleMouseMove(event) {
      const coordinate = {
        x: event.clientX,
        y: event.clientY,
        type: getComputedStyle(event.target, 'cursor'),
      }
      eleMouseMoveInner.style.left = coordinate.x + 'px'
      eleMouseMoveOuter.style.left = coordinate.x + 'px'
      eleMouseMoveInner.style.top = coordinate.y + 'px';
      eleMouseMoveOuter.style.top = coordinate.y + 'px';
      if(coordinate.type !== stateMousePoint) {
        if(coordinate.type === 'pointer') {
          eleMouseMoveOuter.classList.add('fade');
          eleMouseMoveInner.classList.add('zoom-out');
        }else if(coordinate.type === 'auto' || coordinate.type === 'default') {
          eleMouseMoveOuter.classList.remove('fade');
          eleMouseMoveInner.classList.remove('zoom-out');
          eleMouseMoveInner.classList.add('zoom-in');
          setTimeout(() => { eleMouseMoveInner.classList.remove('zoom-in') }, 200);
        }
        stateMousePoint = coordinate.type;
      }
    }
  
    elementsInput && elementsInput.forEach(ele => {
      ele.setAttribute('spellcheck', false);
    })
  
    // add attribute type for mark general to DOM ( CSS for style by type mark )
    eleLevelMarkSum && eleLevelMarkSum.forEach(ele => {
      insertLevelMark(ele);
    })
    
    // add attribute type for mark to DOM ( CSS for style by type mark )
    eleLevelMark && eleLevelMark.forEach(ele => {
      insertLevelMark(ele);
    })
  
    // follow element is table calendar when DOM insert into
    elementsCalendar && elementsCalendar.addEventListener("DOMNodeInserted", function () {
      
      const elementsCalendar = document.querySelectorAll('#viewLichTheoTuan table td > div.content.text-left');
  
      elementsCalendar.forEach(ele => {
        const color = getComputedStyle(ele, 'background-color');
        if(color === 'rgb(253, 255, 154)') {
          ele.setAttribute('type', 'calendar-exam');
        }else if(color === 'rgb(231, 236, 240)') {
          ele.setAttribute('type', 'calendar-goschool');
        }else if(color === 'rgb(146, 214, 255)') {
          ele.setAttribute('type', 'calendar-studyonline');
        }
      })
  
    }, false);
  
    // set attribute for of mark in table
    function insertLevelMark(element) {
      const getContent = element.textContent.trim();
      const tag = element.tagName;
      if(tag === 'TD') {
        if(getContent === 'A+') {
          element.setAttribute('level', 'very-good')
        }
        else if(getContent === 'A') {
          element.setAttribute('level', 'good')
        }
        else if(getContent === 'B+') {
          element.setAttribute('level', 'very-pretty')
        }
        else if(getContent === 'B') {
          element.setAttribute('level', 'pretty')
        }
        else if(getContent === 'C+' || getContent === 'C') {
          element.setAttribute('level', 'normal')
        }
        else if(getContent === 'D+') {
          element.setAttribute('level', 'weak')
        }
        else if(getContent === 'D') {
          element.setAttribute('level', 'very-weak')
        }
      }else if(tag === 'SPAN') {
        if(getContent === 'Giỏi') {
          element.setAttribute('level', 'very-good')
        }
        else if(getContent === 'Khá') {
          element.setAttribute('level', 'pretty')
        }
        else if(getContent === 'Trung bình') {
          element.setAttribute('level', 'normal')
        }
        else if(getContent === 'Yếu') {
          element.setAttribute('level', 'very-weak')
        }
      }
    }
    
  })

})();

