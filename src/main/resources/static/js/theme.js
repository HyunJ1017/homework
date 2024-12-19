console.log(pageTheme);

const userThemeBackgroundColor = document.querySelectorAll(".userTheme-backgroundColor");
const userThemeBackgroundColor70 = document.querySelectorAll(".userTheme-backgroundColor70");
const userThemeBackgroundColorSlider = document.querySelector(".userTheme-backgroundColorSlider");
const contentsSections = document.querySelectorAll(".contents-section");
const backgroundImg = document.querySelector("#backgroundBox>img");
const userThemeBorders = document.querySelectorAll(".userTheme-border");
const userThemeBorderTops = document.querySelectorAll(".userTheme-borderTop");
const userThemeBorderBottoms = document.querySelectorAll(".userTheme-borderBottom");
const userThemeBorderTables = document.querySelectorAll(".userTheme-borderTable");


document.querySelectorAll('*').forEach(element => {
  element.style.color = pageTheme.color;
});

userThemeBackgroundColor.forEach(element => {
  element.style.backgroundColor = pageTheme.backgroundColor;
}); // forEach end

if(pageTheme.backgroundColor === 'black'){
  userThemeBackgroundColor70.forEach(element => {
    element.style.backgroundColor = 'rgb(5, 5, 5)';
  })
  backgroundImg.style.filter = 'brightness(15%)';
  contentsSections.forEach(element => {
    element.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    element.style.border = `1px solid ${pageTheme.borderColor}`;
  })
  userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
    element.style.color = 'black';
  })
  
} else if (pageTheme.backgroundColor === 'white') {
  userThemeBackgroundColor70.forEach(element => {
    element.style.backgroundColor = 'rgb(250, 250, 250)';
  })
  backgroundImg.style.filter = 'brightness(39%)';
  contentsSections.forEach(element => {
    element.style.backgroundColor = 'rgb(255, 255, 255)';
    element.style.border = `1px solid ${pageTheme.borderColor}`;
  })
  userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
    element.style.color = 'white';
  })
} // backgroundColor end


userThemeBorders.forEach(element => {
  element.style.border = `1px solid ${pageTheme.borderColor}`;
})
userThemeBorderTops.forEach(element => {
  element.style.borderTop = `1px solid ${pageTheme.borderColor}`;
})
userThemeBorderBottoms.forEach(element => {
  element.style.borderBottom = `1px solid ${pageTheme.borderColor}`;
})
userThemeBorderTables.forEach(element => {
  element.style.borderColor = pageTheme.borderColor;
})





const gear = document.querySelector('#gear');
const footer = document.querySelector('footer');
const footerContents = document.querySelector('.footer-contents');
const loader = document.querySelector('#loader');
let themeFl = false;

gear.addEventListener('click', () => {
  footer.style.bottom = '-5vh';
  renderingTheme();
}); // click end

footer.addEventListener('mouseleave', () => {
  //footer.style.bottom = '-15vh';
  //contentsClear();
});  // mouseleave end

const renderingTheme = () => {
  footerContents.style.height = '10vh';
  footerContents.style.flexDirection = 'column';
  footerContents.style.justifyContent = 'center';
  footerContents.innerHTML
  = '<h4>화면 태마 변경</h4>'
  + '<div id="themeList-background">'
  + `<div class="userTheme-border" id="backgroundColorBlack" style="border: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'};">검은색 Black</div>`
  + `<div class="userTheme-border" id="backgroundColorWhite" style="border: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'};">흰색 White</div>`
  + '</div>';

  // 검은색 클릭시
  document.querySelector('#backgroundColorBlack').addEventListener('click', () => {
    if(themeFl) return;
    themeFl = true;
    gear.style.display = 'none';
    loader.style.display = 'block';

    // 현제페이지 변경
    document.querySelectorAll(".userTheme-backgroundColor").forEach(element => {
      element.style.backgroundColor = 'black';
    })
    document.querySelectorAll(".userTheme-backgroundColor70").forEach(element => {
      element.style.backgroundColor = 'rgba(5, 5, 5)';
    })
    backgroundImg.style.filter = 'brightness(15%)';
    document.querySelectorAll('*').forEach(element => {
      element.style.color = 'white';
    });
    contentsSections.forEach(element => {
      element.style.backgroundColor = 'rgba(255, 255, 255, 0)';
      element.style.border = '1px solid white';
    })
    document.querySelectorAll(".userTheme-border").forEach(element => {
      element.style.border = '1px solid white';
    })
    userThemeBorderTops.forEach(element => {
      element.style.borderTop = '1px solid white';
    })
    userThemeBorderBottoms.forEach(element => {
      element.style.borderBottom = '1px solid white';
    })
    userThemeBorderTables.forEach(element => {
      element.style.borderColor = 'white';
    })
    userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
      element.style.color = 'black';
    })

    // 세션 변경요청
    fetch('/main/theme?theme=theme&type=black')
    .then(response => response.json())
    .then(result => {
      pageTheme = result;
      loader.style.display = 'none';
      gear.style.display = 'block';
      themeFl = false;
    })
    .catch(err => {
      console.log(err);
    });
  }); // click end

  // 흰색 클릭시
  document.querySelector('#backgroundColorWhite').addEventListener('click', () => {
    if(themeFl) return;
    themeFl = true;
    gear.style.display = 'none';
    loader.style.display = 'block';

    // 현제페이지 변경
    document.querySelectorAll(".userTheme-backgroundColor").forEach(element => {
      element.style.backgroundColor = 'white';
    })
    document.querySelectorAll(".userTheme-backgroundColor70").forEach(element => {
      element.style.backgroundColor = 'rgb(250, 250, 250)';
    })
    backgroundImg.style.filter = 'brightness(39%)';
    document.querySelectorAll('*').forEach(element => {
      element.style.color = 'black';
    });
    contentsSections.forEach(element => {
      element.style.backgroundColor = 'rgb(255, 255, 255)';
      element.style.border = '1px solid black';
    })
    document.querySelectorAll(".userTheme-border").forEach(element => {
      element.style.border = '1px solid black';
    })
    userThemeBorderTops.forEach(element => {
      element.style.borderTop = '1px solid black';
    })
    userThemeBorderBottoms.forEach(element => {
      element.style.borderBottom = '1px solid black';
    })
    userThemeBorderTables.forEach(element => {
      element.style.borderColor = 'black';
    })
    userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
      element.style.color = 'white';
    })

    // 세션 변경요청
    fetch('/main/theme?theme=theme&type=white')
    .then(response => response.json())
    .then(result => {
      pageTheme = result;
      loader.style.display = 'none';
      gear.style.display = 'block';
      themeFl = false;
    })
    .catch(err => {
      console.log(err);
    });
  }); // click end
} // renderingTheme end

const contentsClear = () => {
  footerContents.style.height = '15vh';
  footerContents.style.flexDirection = 'row';
  footerContents.style.justifyContent = 'flex-end';
  footerContents.innerHTML = '';
}  // contentsClear end