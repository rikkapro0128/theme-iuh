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
  
  elementsInput && elementsInput.forEach(ele => {
    ele.setAttribute('spellcheck', false);
  })
  
  document.querySelector(idCalendarWeek).addEventListener("DOMNodeInserted", function () {
    
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
  
})
