const wrap = document.querySelector('html');
const themeDefault = 'theme--dracula';
const idChangeDate = '#dateNgayXemLich';
const idChangeDateBack = '#btn_TroVe';
const idChangeDateNext = '#btn_Tiep';
const idCalendarWeek = '#viewLichTheoTuan';
let runOnce = false;

wrap.classList.add(themeDefault);

document.addEventListener('DOMContentLoaded', function() {
  
  const elementsInput = document.querySelectorAll('input');
  const elementsCalendar = document.querySelector(idCalendarWeek);
  // const eleTableMark = document.querySelectorAll('td[title="DiemChu"]')
  const eleLevelMark = document.querySelectorAll('#xemDiem_aaa tr td[title="DiemChu"]')
  const eleLevelMarkSum = document.querySelectorAll('#xemDiem_aaa tr td[colspan="2"] > span:nth-child(2)')
  
  console.log(eleLevelMarkSum);

  elementsInput && elementsInput.forEach(ele => {
    ele.setAttribute('spellcheck', false);
  })

  eleLevelMarkSum && eleLevelMarkSum.forEach(ele => {
    insertLevelMark(ele);
  })
  
  eleLevelMark && eleLevelMark.forEach(ele => {
    insertLevelMark(ele);
  })

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

  function getComputedStyle(element, style = 'color') {
    return window.getComputedStyle(element, null).getPropertyValue(style);
  }

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
