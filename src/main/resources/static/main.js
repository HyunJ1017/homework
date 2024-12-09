
/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {

  // 해더 에니메이션 시작
  waveAnimation();

  // 클릭이벤트
    // 이메일 복사
    const email = document.getElementById("email");
    email.addEventListener("click", () => {
      if(emailFl) return;
      emailFl = true;
      copyToClipboard("hyunj1017@naver.com");
      const emailBackup = email.innerHTML;
      email.innerHTML = '<i class="fa-brands fa-square-js" style="color: #FFD43B;"></i>이메일이 복사되었습니다: hyunj1017@naver.com';
      setTimeout(() => {
        email.innerHTML = emailBackup;
        emailFl = false;
      }, 3000);
    });
  
    // 전화번호 복사
    const phone = document.getElementById("phone");
    phone.addEventListener("click", () => {
      if(phoneFl) return;
      phoneFl = true;
      copyToClipboard("010-2113-3766");
      const phoneBackup = phone.innerHTML;
      phone.innerHTML = '<i class="fa-brands fa-square-js" style="color: #FFD43B;"></i>전화번호가 복사되었습니다: 010-2113-3766';
      setTimeout(() => {
        phone.innerHTML = phoneBackup;
        phoneFl = false;
      }, 3000);
    });
  
    // 클립보드 복사 함수
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('복사 실패:', err);
      });
    }
});

let emailFl = false;
let phoneFl = false;


/* ******************************************************* */
/* ERD 이미지 */
const semiErdImg = document.getElementById("semi-erd");
const finalErdImg = document.getElementById("final-erd");
let semiErdImgTime = false;
let semiErdImgState = false;
let finalErdImgTime = false;
let finalErdImgState = false;

semiErdImg.addEventListener('mouseenter', () => {
  enterEvent();
}); // mouseenter end

semiErdImg.addEventListener("click", () => {
  if(semiErdImgState) {
    if(semiErdImgTime) return;
    leaveEvent();
  } else enterEvent();
}) // click end

semiErdImg.addEventListener('mouseleave', () => {
  leaveEvent();
}); // mouseleave end

const enterEvent = () => {
  if(semiErdImgTime) return;
  semiErdImgTime = true;
  
  semiErdImg.style.transition = "all 0.3s ease";
  semiErdImg.style.cursor = 'pointer';
  semiErdImg.style.position = 'absolute';
  semiErdImg.style.top = '0';
  semiErdImg.style.right = '-10vw';
  semiErdImg.style.zIndex = '1';
  semiErdImg.style.width = '80vw';
  semiErdImg.style.height = 'auto';
  semiErdImg.style.maxHeight = '90vh';
  semiErdImg.style.border = '1px solid black';
  
  setTimeout((() => {
    semiErdImgState = true;
    semiErdImgTime = false;
  }), 300);
}

const leaveEvent = () => {
  if(!semiErdImgState) return;
  console.log("leaveEvent");
  semiErdImg.style.transition = "none";
  semiErdImg.style.cursor = 'default';
  semiErdImg.style.position = 'static';
  semiErdImg.style.width = '300px';
  semiErdImg.style.height = 'auto';
  semiErdImg.style.border = 'none';
  semiErdImgState = false;
} // leaveEvent end


finalErdImg.addEventListener('mouseenter', () => {
  enterEvent2();
}); // mouseenter end

finalErdImg.addEventListener("click", () => {
  if(finalErdImgState) {
    if(finalErdImgTime) return;
    leaveEvent2();
  } else enterEvent2();
}) // click end

finalErdImg.addEventListener('mouseleave', () => {
  leaveEvent2();
}); // mouseleave end

const enterEvent2 = () => {
  if(finalErdImgTime) return;
  console.log("enterEvent");
  finalErdImgTime = true;
  
  finalErdImg.style.transition = "all 0.3s ease";
  finalErdImg.style.cursor = 'pointer';
  finalErdImg.style.position = 'absolute';
  finalErdImg.style.top = '0';
  finalErdImg.style.right = '-10vw';
  finalErdImg.style.zIndex = '1';
  finalErdImg.style.width = '80vw';
  finalErdImg.style.height = 'auto';
  finalErdImg.style.maxHeight = '90vh';
  finalErdImg.style.border = '1px solid black';
  
  setTimeout((() => {
    finalErdImgState = true;
    finalErdImgTime = false;
  }), 300);
}

const leaveEvent2 = () => {
  if(!finalErdImgState) return;
  console.log("leaveEvent");
  finalErdImg.style.transition = "none";
  finalErdImg.style.cursor = 'default';
  finalErdImg.style.position = 'static';
  finalErdImg.style.width = '300px';
  finalErdImg.style.height = 'auto';
  finalErdImg.style.border = 'none';
  finalErdImgState = false;
} // leaveEvent end

/* ******************************************************* */
/* header-icons */
const headerIcons = document.getElementById("header-icons");

const wave = headerIcons.children;

const waveAnimation = () => {
  // 2초마다 각 아이콘들을화면 오른쪽에서 왼쪽으로 이동
  for(let i = 0; i < wave.length; i++){
    const icon = wave[i];
    
    // 이동과 회전 애니메이션 적용
    setTimeout(() => {
      icon.style.transition = "all 12s linear";
      icon.style.left = "-10vw";
      icon.style.transform = "rotate(-1080deg)";
    }, 2000 * i);
  }
  
  // 각 요소 이동 후 다시시작
  setTimeout(() => {
    for (let i = 0; i < wave.length; i++) {
      const icon = wave[i];
      setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.left = '110vw';
        icon.style.transform = 'rotate(0deg)';
      }, 2000 * i);
      
    }
    setTimeout( () => {waveAnimation()} , 2000);
  }, 2000 * (wave.length - 1 ));
} // waveAnimation end


/* ******************************************************* */
// 모든 <a> 태그에 대해 부드러운 스크롤 적용
document.querySelectorAll('.slider a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetElement = document.querySelector(this.getAttribute('href'));
    const headerHeight = window.innerHeight * 0.1; // 10vh를 픽셀로 변환

    // 목표 위치에서 헤더 높이만큼 위로 스크롤 (헤더 높이를 빼고 10px 더 위로)
    window.scrollTo({
      top: targetElement.offsetTop - headerHeight - 10, // 10px 추가로 위로 조정
      behavior: 'smooth'
    });
  });
}); // slider a end


/* ******************************************************* */
/* log */
const logSkills = document.querySelectorAll(".skill-relative");
const logChanges = document.querySelectorAll(".skill-change");
const logLogs = document.querySelectorAll(".skill-absolute");

logSkills.forEach((skill, index) => {
  skill.addEventListener('mouseenter', () => {
    logChanges[index].style.color = 'black';
    logLogs[index].style.display = 'block';
  });
  skill.addEventListener('mouseleave', () => {
    logChanges[index].style.color = 'white';
    logLogs[index].style.display = 'none';
  });
});