/**
 * Today's Trip - 여행 추천 사이트 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSeasonTabs();
  initThemeFilters();
  initRandomPicker();
  initChecklist();
  initLikeButtons();
  initDetailModal();
  initQrModal();
  initBackToTop();
});

/* =========================================================
   1. 네비게이션 & 모바일 메뉴
   ========================================================= */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // 스크롤 시 네비게이션 배경 변화
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 모바일 햄버거 토글
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggleBtn.classList.toggle('open');
    });

    // 링크 클릭 시 모바일 메뉴 닫기
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggleBtn.classList.remove('open');
      });
    });
  }
}

/* =========================================================
   2. 사계절 추천 탭 전환
   ========================================================= */
function initSeasonTabs() {
  const seasonTabs = document.querySelectorAll('.season-tab');
  const seasonPanels = document.querySelectorAll('.season-panel');

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSeason = tab.dataset.season;

      // 탭 활성화 상태 변경
      seasonTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 패널 표시 전환
      seasonPanels.forEach(panel => {
        if (panel.id === `season-${targetSeason}`) {
          panel.classList.add('active');
          panel.style.display = 'grid';
        } else {
          panel.classList.remove('active');
          panel.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================
   3. 테마별 필터 기능
   ========================================================= */
function initThemeFilters() {
  const filterBtns = document.querySelectorAll('.theme-btn');
  const allCards = document.querySelectorAll('.theme-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      allCards.forEach(card => {
        const cardTheme = card.dataset.theme;
        if (theme === 'all' || cardTheme === theme) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* =========================================================
   4. 오늘의 랜덤 여행지 추천기 (Random Picker)
   ========================================================= */
const travelPool = [
  {
    name: "경주 보문관광단지 & 첨성대",
    season: "🌸 봄",
    theme: "자연 / 힐링",
    location: "경북 경주시",
    img: "images/spring.jpg",
    desc: "연분홍 벚꽃이 흩날리는 보문호수 산책로와 천년 고도의 밤하늘을 밝히는 첨성대 야경!",
    bestTime: "오후 4시 ~ 8시 (일몰과 야경)",
    food: "경주 황남빵, 십원빵, 맷돌순두부",
    mate: "가족, 연인, 친구 모두"
  },
  {
    name: "제주 가시리 녹산로 & 유채꽃밭",
    season: "🌸 봄",
    theme: "드라이브 / 인생샷",
    location: "제주 서귀포시 표선면",
    img: "images/img1-800.jpg",
    desc: "한국의 아름다운 길 100선! 10km에 걸쳐 노란 유채꽃과 벚꽃이 함께 피어나는 드라이브 천국.",
    bestTime: "오전 10시 ~ 오후 2시 (햇살 가득할 때)",
    food: "몸국, 흑돼지 두루치기, 보말칼국수",
    mate: "연인, 나홀로 드라이브"
  },
  {
    name: "강릉 경포대 & 안목해변",
    season: "🌊 여름",
    theme: "바다 / 감성카페",
    location: "강원 강릉시",
    img: "images/summer.jpg",
    desc: "푸르른 동해바다의 시원한 파도와 솔향 가득한 해안길, 안목 커피거리에서 즐기는 에스프레소의 여유.",
    bestTime: "새벽 일출 또는 정오",
    food: "초당순두부 젤라또, 장칼국수, 커피콩빵",
    mate: "친구들과 우정여행, 힐링러"
  },
  {
    name: "제주 협재 & 금능 해수욕장",
    season: "🌊 여름",
    theme: "바다 / 액티비티",
    location: "제주 제주시 한림읍",
    img: "images/img3-800.jpg",
    desc: "수채화를 풀어놓은 듯한 에메랄드빛 바다와 눈앞에 손에 잡힐 듯한 비양도의 황홀한 전경.",
    bestTime: "오후 5시 ~ 7시 (붉은 낙조)",
    food: "해물라면, 통갈치조림, 오메기떡",
    mate: "가족, 연인, 물놀이 매니아"
  },
  {
    name: "순천만 습지 & 갈대밭",
    season: "🍁 가을",
    theme: "힐링 / 자연생태",
    location: "전남 순천시",
    img: "images/autumn.jpg",
    desc: "황금빛 갈대 물결이 사각거리는 낭만적인 갯벌 산책로와 용산전망대에서 내려다보는 붉은 칠면초와 노을.",
    bestTime: "오후 4시 이후 (일몰 타임)",
    food: "꼬막정식, 짱뚱어탕, 순천 국밥",
    mate: "부모님 효도여행, 연인 산책"
  },
  {
    name: "경기 광주 화담숲",
    season: "🍁 가을",
    theme: "산책 / 포토스팟",
    location: "경기 광주시 도척면",
    img: "images/img11-800.jpg",
    desc: "LG 상록재단이 가꾼 명품 생태수목원. 오색 단풍 터널 사이를 지나는 모노레일과 자작나무 숲길.",
    bestTime: "오전 9시 첫 타임 (사전예약 필수)",
    food: "남한산성 백숙, 곤지암 소머리국밥",
    mate: "가족, 부모님, 조용한 힐링"
  },
  {
    name: "평창 대관령 양떼목장",
    season: "❄️ 겨울",
    theme: "설경 / 이국적풍경",
    location: "강원 평창군 대관령면",
    img: "images/winter.jpg",
    desc: "끝없이 펼쳐진 새하얀 설원과 목장 능선. 한국의 알프스라 불리는 겨울철 최고의 눈꽃 명소.",
    bestTime: "눈 내린 다음 날 오전 11시",
    food: "평창 황태구이, 메밀전병, 한우구이",
    mate: "연인 데이트, 인생샷 원정대"
  },
  {
    name: "청송 얼음골 빙벽",
    season: "❄️ 겨울",
    theme: "이색자연 / 감성사진",
    location: "경북 청송군 주왕산면",
    img: "images/img6-800.jpg",
    desc: "거대한 절벽 전체가 푸른 얼음 폭포로 변신! 마치 애니메이션 '겨울왕국' 엘사의 성에 온 듯한 신비로움.",
    bestTime: "오전 11시 ~ 오후 3시",
    food: "청송 사과빵, 달기약수 닭백숙",
    mate: "SNS 핫플 탐험가, 친구"
  }
];

function initRandomPicker() {
  const pickBtn = document.getElementById('pick-random-btn');
  const resultContainer = document.getElementById('random-result-container');
  const defaultPlaceholder = document.getElementById('random-placeholder');

  if (!pickBtn) return;

  pickBtn.addEventListener('click', () => {
    pickBtn.disabled = true;
    pickBtn.innerHTML = `<span>🎲 추천지 탐색 중...</span>`;

    // 룰렛 느낌의 로딩 애니메이션
    let counter = 0;
    const interval = setInterval(() => {
      const tempPick = travelPool[Math.floor(Math.random() * travelPool.length)];
      if (defaultPlaceholder) defaultPlaceholder.style.display = 'none';
      resultContainer.style.display = 'block';
      renderRandomCard(tempPick, true);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalPick = travelPool[Math.floor(Math.random() * travelPool.length)];
        renderRandomCard(finalPick, false);
        pickBtn.disabled = false;
        pickBtn.innerHTML = `<span>🎲 다른 여행지 다시 뽑기</span>`;
      }
    }, 100);
  });
}

function renderRandomCard(item, isRolling) {
  const resultContainer = document.getElementById('random-result-container');
  resultContainer.innerHTML = `
    <div class="random-card ${isRolling ? 'rolling' : 'card-appear'}">
      <div class="random-card-img-wrap">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='images/combined_seasons_gentle_blend.jpg'">
        <span class="random-badge">${item.season} 추천</span>
      </div>
      <div class="random-card-body">
        <span class="random-tag">📍 ${item.location} • ${item.theme}</span>
        <h3 class="random-title">${item.name}</h3>
        <p class="random-desc">${item.desc}</p>
        <div class="random-meta-grid">
          <div class="meta-item">
            <span class="meta-label">⏰ 추천 시간대</span>
            <span class="meta-val">${item.bestTime}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">🍲 추천 먹거리</span>
            <span class="meta-val">${item.food}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">👥 추천 동행</span>
            <span class="meta-val">${item.mate}</span>
          </div>
        </div>
        <div class="random-actions">
          <a href="https://map.naver.com/v5/search/${encodeURIComponent(item.name)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            🗺️ 네이버 지도에서 위치 보기
          </a>
          <button class="btn btn-outline btn-sm" onclick="openDetailModalWithName('${item.name}')">
            📖 상세 여행 가이드
          </button>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   5. 여행 준비물 체크리스트 (LocalStorage 연동)
   ========================================================= */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const progressText = document.getElementById('checklist-progress-text');
  const progressBar = document.getElementById('checklist-progress-bar');
  const resetBtn = document.getElementById('checklist-reset-btn');

  // 저장된 체크리스트 상태 복원
  const savedChecks = JSON.parse(localStorage.getItem('todays_trip_checklist') || '{}');
  checkboxes.forEach(cb => {
    const id = cb.id;
    if (savedChecks[id]) {
      cb.checked = true;
      cb.closest('.checklist-item').classList.add('checked');
    }

    cb.addEventListener('change', () => {
      savedChecks[id] = cb.checked;
      localStorage.setItem('todays_trip_checklist', JSON.stringify(savedChecks));
      if (cb.checked) {
        cb.closest('.checklist-item').classList.add('checked');
      } else {
        cb.closest('.checklist-item').classList.remove('checked');
      }
      updateChecklistProgress();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => {
        cb.checked = false;
        cb.closest('.checklist-item').classList.remove('checked');
      });
      localStorage.removeItem('todays_trip_checklist');
      updateChecklistProgress();
    });
  }

  function updateChecklistProgress() {
    if (!checkboxes.length) return;
    const total = checkboxes.length;
    const checkedCount = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const percentage = Math.round((checkedCount / total) * 100);

    if (progressText) {
      progressText.textContent = `${checkedCount} / ${total} 개 완료 (${percentage}%)`;
    }
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
  }

  updateChecklistProgress();
}

/* =========================================================
   6. 찜하기 (좋아요) 버튼
   ========================================================= */
function initLikeButtons() {
  const likeBtns = document.querySelectorAll('.btn-like');
  const savedLikes = JSON.parse(localStorage.getItem('todays_trip_likes') || '{}');

  likeBtns.forEach(btn => {
    const cardId = btn.dataset.id;
    const countSpan = btn.querySelector('.like-count');
    let baseCount = parseInt(countSpan ? countSpan.textContent : '0', 10);

    if (savedLikes[cardId]) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = btn.classList.toggle('active');
      savedLikes[cardId] = isActive;
      localStorage.setItem('todays_trip_likes', JSON.stringify(savedLikes));

      if (isActive) {
        baseCount += 1;
        btn.classList.add('heart-burst');
        setTimeout(() => btn.classList.remove('heart-burst'), 600);
      } else {
        baseCount = Math.max(0, baseCount - 1);
      }
      if (countSpan) countSpan.textContent = baseCount;
    });
  });
}

/* =========================================================
   7. 여행지 상세 모달창 (Detail Modal)
   ========================================================= */
const travelDetails = {
  "경주 보문단지": {
    name: "경주 보문관광단지 & 첨성대",
    sub: "역사와 벚꽃이 어우러진 천년 고도의 봄",
    img: "images/spring.jpg",
    season: "봄 (3월~5월)",
    location: "경북 경주시 보문로 일원",
    desc: "보문호를 감싸 안고 있는 수만 그루의 벚나무가 일제히 꽃망울을 터뜨리면 호수 전체가 분홍빛 구름에 휩싸입니다. 첨성대 주변에는 튤립과 유채꽃 단지가 함께 조성되어 사계절 내내 꽃향기가 끊이지 않는 국내 최고의 힐링 여행지입니다.",
    highlights: [
      "보문호수 오리배 & 벚꽃 둘레길 자전거 산책",
      "야간 조명이 켜지는 첨성대와 동궁과 월지 야경 투어",
      "황리단길의 개성 넘치는 한옥 카페와 소품샵"
    ],
    tips: "벚꽃 만개 시즌(4월 초)에는 보문호수 진입로가 매우 혼잡하므로 오전 9시 이전 방문 또는 대중교통 이용을 권장합니다.",
    mapQuery: "경주 보문관광단지"
  },
  "제주 가시리 녹산로": {
    name: "제주 가시리 녹산로 유채꽃 도로",
    sub: "노란 유채꽃과 벚꽃 터널의 환상적인 10km 드라이브",
    img: "images/img1-800.jpg",
    season: "봄 (3월~4월)",
    location: "제주특별자치도 서귀포시 표선면 가시리",
    desc: "국토교통부가 선정한 '한국의 아름다운 길 100선'에 빛나는 녹산로는 도로 양옆으로 노란 유채꽃과 팝콘 같은 벚꽃이 동시에 개화하여 환상적인 2단 컬러를 연출합니다. 유채꽃 프라자와 큰사슴이오름이 인접해 있어 함께 둘러보기 좋습니다.",
    highlights: [
      "차창 밖으로 쏟아지는 꽃비와 유채꽃 드라이브",
      "유채꽃 프라자 전망대에서 조망하는 풍력발전기 뷰",
      "인생 사진을 건질 수 있는 도로변 갓길 포토스팟"
    ],
    tips: "주말에는 갓길 주차가 어려울 수 있으니 가시리 조랑말체험공원 주차장에 주차 후 도보 산책을 추천합니다.",
    mapQuery: "녹산로 유채꽃도로"
  },
  "구례 산수유마을": {
    name: "구례 산수유 꽃마을",
    sub: "지리산 자락을 노랗게 수놓는 봄의 첫 전령사",
    img: "images/img2-800.jpg",
    season: "봄 (3월 중순)",
    location: "전남 구례군 산동면 위안리 일원",
    desc: "지리산 만복대 아래 자리한 상위마을과 반곡마을은 마을 전체가 100년 넘은 산수유 고목들로 둘러싸여 있습니다. 봄이면 노란 물감을 흩뿌려놓은 듯 아기자기한 돌담길과 맑은 서시천 계곡물이 어우러져 평화로운 시골 정취를 선사합니다.",
    highlights: [
      "서시천을 따라 돌담길을 걷는 '꽃담길 산책로'",
      "반곡마을 꽃길 다리 위에서 찍는 반영 사진",
      "구례 특산물인 달콤새콤 산수유 막걸리와 차 맛보기"
    ],
    tips: "이른 아침 계곡 사이로 피어오르는 물안개와 산수유꽃이 어우러질 때 가장 몽환적인 사진이 찍힙니다.",
    mapQuery: "구례 산수유꽃축제장"
  },
  "강릉 경포대 & 안목해변": {
    name: "강릉 경포대 & 안목해변 커피거리",
    sub: "에메랄드빛 동해와 진한 원두 향이 가득한 바다",
    img: "images/summer.jpg",
    season: "여름 (6월~8월)",
    location: "강원특별자치도 강릉시 창해로 14",
    desc: "거침없이 밀려오는 동해의 파란 파도와 백사장, 그리고 솔향기 가득한 솔숲길이 끝없이 이어집니다. 국내 최초의 커피 메카 안목해변에서는 오션뷰 카페 창가에 앉아 시원한 바닷바람과 함께 스페셜티 커피를 음미할 수 있습니다.",
    highlights: [
      "경포호수 둘레길 자전거 하이킹과 경포해변 맨발 걷기",
      "안목 커피거리 테라스에서 즐기는 일출과 핸드드립 커피",
      "초당 순두부마을에서 맛보는 고소한 순두부 젤라또"
    ],
    tips: "여름 성수기 주차난을 피하려면 강문해변 공영주차장 또는 안목항 여객터미널 쪽 주차장을 이용하세요.",
    mapQuery: "강릉 안목해변 커피거리"
  },
  "제주 협재 & 금능": {
    name: "제주 협재 & 금능 해수욕장",
    sub: "비양도가 손에 잡힐 듯한 투명한 코발트빛 천국",
    img: "images/img3-800.jpg",
    season: "여름 (6월~9월)",
    location: "제주특별자치도 제주시 한림읍 협재리",
    desc: "수심이 얕고 조개껍질이 섞인 은빛 모래사장이 완만하게 펼쳐져 있어 가족 여행객과 수영 초보자에게도 최적인 해변입니다. 썰물 때면 금능해변까지 너른 백사장이 드러나며 비양도 너머로 떨어지는 황홀한 노을은 제주 서쪽 최고의 명장면입니다.",
    highlights: [
      "스노클링과 패들보드로 만나는 투명한 제주 바다",
      "해질녘 붉게 물드는 비양도 배경의 실루엣 노을샷",
      "야자수 숲 산책로와 한림공원 연계 관광"
    ],
    tips: "물놀이는 썰물 시간대에 맞춰 가면 잔잔한 천연 수영장처럼 변해 가장 안전하고 즐겁습니다.",
    mapQuery: "제주 협재해수욕장"
  },
  "양양 서피비치": {
    name: "양양 서피비치 & 하조대",
    sub: "이국적인 비치 바와 서핑의 열정이 공존하는 핫플레이스",
    img: "images/img4-800.jpg",
    season: "여름 (7월~8월)",
    location: "강원특별자치도 양양군 현북면 하조대해안길 119",
    desc: "국내 최초의 서핑 전용 해변으로 동남아 휴양지를 연상시키는 빈백, 라탄 파라솔, 비치 바가 마련되어 있어 젊음의 열기가 가득합니다. 서핑 초보자 강습부터 밤마다 펼쳐지는 신나는 비치 펍 파티까지 감각적인 여름을 즐길 수 있습니다.",
    highlights: [
      "노란색 SURFYY BEACH 대형 레터링 앞 인증샷",
      "서핑 입문 강습 및 선셋 요가 클래스",
      "하조대 전망대에서 내려다보는 기암괴석과 솔숲"
    ],
    tips: "서핑 강습은 주말 조기 마감되므로 사전 온라인 예약이 필수입니다. 해 질 무렵 무알콜 칵테일 한 잔을 추천합니다.",
    mapQuery: "양양 서피비치"
  },
  "순천만 습지": {
    name: "순천만 습지 & 갈대밭",
    sub: "바람을 따라 황금빛 파도가 일렁이는 국내 최대 갈대 군락",
    img: "images/autumn.jpg",
    season: "가을 (9월~11월)",
    location: "전남 순천시 순천만길 513-25",
    desc: "끝이 보이지 않는 5.4㎢ 규모의 갈대밭이 바람에 흔들리며 사각사각 가을 노래를 부릅니다. 흑두루미 등 천연기념물 철새들의 보금자리이며 용산전망대에 오르면 S자로 굽이치는 순천만 물길과 붉은 낙조가 한 폭의 수묵화를 완성합니다.",
    highlights: [
      "갈대숲 데크길을 천천히 걷는 힐링 산책",
      "용산전망대에서 감상하는 환상의 S자 수로 낙조",
      "순천만 갈대열차와 생태체험선 탑승"
    ],
    tips: "용산전망대까지 왕복 약 40분이 소요되므로 편안한 운동화와 일몰 1시간 전 등반 시작을 추천합니다.",
    mapQuery: "순천만습지"
  },
  "경기 광주 화담숲": {
    name: "경기 광주 화담숲",
    sub: "자연과 사람이 조화롭게 어우러진 수도권 최고의 명품 단풍",
    img: "images/img11-800.jpg",
    season: "가을 (10월~11월)",
    location: "경기 광주시 도척면 도척윗로 278-8",
    desc: "4,000여 종의 다채로운 식물이 16개 테마원으로 정성스럽게 가꿔진 생태수목원입니다. 완만한 데크로드로 조성되어 유모차나 휠체어도 편안하게 다닐 수 있으며 울긋불긋한 단풍 사이를 유영하는 친환경 모노레일이 큰 인기입니다.",
    highlights: [
      "알록달록 단풍 숲을 가로지르는 모노레일 체험",
      "새하얀 자작나무 숲과 암석·하경정원의 조화",
      "원앙이 헤엄치는 연못 한옥 주막에서 즐기는 파전과 식혜"
    ],
    tips: "가을 단풍 시즌에는 전면 100% 사전 예약제로 운영되므로 9월 중순 티켓팅 오픈일을 꼭 확인하세요.",
    mapQuery: "화담숲"
  },
  "단양 보발재": {
    name: "단양 보발재 & 도담삼봉",
    sub: "구불구불 소백산 고갯길을 따라 화려하게 물든 단풍 파노라마",
    img: "images/img5-800.jpg",
    season: "가을 (10월 하순~11월 초)",
    location: "충북 단양군 가곡면 보발리",
    desc: "소백산 자락을 휘감아 도는 해발 540m의 보발재 전망대에서 내려다보는 굽이굽이 단풍길은 사진작가들이 손꼽는 전국 제1의 가을 드라이브 코스입니다. 남한강 맑은 물 위에 우뚝 솟은 도담삼봉과 석문, 만천하스카이워크까지 단양 8경의 매력을 만끽할 수 있습니다.",
    highlights: [
      "보발재 전망대에서 감상하는 S자 단풍 드라이브 코스",
      "남한강 유람선을 타고 둘러보는 도담삼봉과 석문",
      "단양 구경시장에서 맛보는 마늘떡갈비와 마늘만두"
    ],
    tips: "단풍 절정기 주말에는 전망대 쉼터 주차 공간이 협소하므로 평일 오전 또는 이른 아침 방문을 추천합니다.",
    mapQuery: "단양 보발재전망대"
  },
  "평창 대관령 양떼목장": {
    name: "평창 대관령 양떼목장",
    sub: "새하얀 눈꽃 세상이 펼쳐지는 한국의 알프스",
    img: "images/winter.jpg",
    season: "겨울 (12월~2월)",
    location: "강원특별자치도 평창군 대관령면 대관령마루길 483-32",
    desc: "해발 832m 고원지대에 펼쳐진 초원이 겨울이면 온통 순백의 눈밭으로 변신합니다. 목장 능선을 따라 1.2km의 산책로를 걸으면 가슴이 뻥 뚫리는 시원한 설경과 나무 움막이 마치 동화 속 북유럽 시골마을에 온 듯한 감동을 선사합니다.",
    highlights: [
      "눈 덮인 능선 위 나무 움막 앞 감성 사진 촬영",
      "축사 안에서 온순한 양들에게 건초 주기 체험",
      "대관령 옛길과 선자령 눈꽃 트레킹 연계 코스"
    ],
    tips: "대관령 정상부는 바람이 매우 매섭습니다. 방한 모자, 귀마개, 핫팩, 장갑 등 방한 장비를 철저히 준비하세요.",
    mapQuery: "대관령 양떼목장"
  },
  "청송 얼음골": {
    name: "청송 얼음골 빙벽",
    sub: "거대한 푸른 얼음 폭포가 빚어낸 신비로운 겨울왕국",
    img: "images/img6-800.jpg",
    season: "겨울 (1월~2월)",
    location: "경북 청송군 주왕산면 내룡리 1",
    desc: "여름에는 얼음이 얼고 겨울에는 김이 나는 신비의 계곡. 높이 60m가 넘는 거대한 수직 암벽에 스프링클러로 물을 뿌려 얼린 웅장한 빙벽은 그 푸르스름한 빛깔과 압도적인 크기로 보는 이들의 탄성을 자아냅니다.",
    highlights: [
      "국내 최대 규모의 인공 빙벽과 얼음 고드름 터널",
      "아이스클라이밍 월드컵 경기장 구경",
      "주왕산 국립공원과 주산지 겨울 풍경 둘러보기"
    ],
    tips: "빙벽 주변 바닥이 얼어붙어 매우 미끄러우므로 아이젠이나 미끄럼 방지 신발을 착용하는 것이 안전합니다.",
    mapQuery: "청송 얼음골"
  },
  "제주 동백포레스트": {
    name: "제주 동백포레스트",
    sub: "눈부신 겨울 설경 속 탐스럽게 피어난 붉은 애기동백꽃",
    img: "images/img7-800.jpg",
    season: "겨울 (11월 하순~2월)",
    location: "제주특별자치도 서귀포시 남원읍 생기악로 166",
    desc: "동글동글 귀여운 애기동백나무들이 빽빽하게 숲을 이루고 있어 겨울 제주에서 가장 사랑받는 힐링 명소입니다. 붉은 꽃잎이 눈처럼 흩날리는 동백 꽃길 산책로와 하얀 통창 너머로 동백 정원이 액자처럼 펼쳐지는 카페 포토존이 백미입니다.",
    highlights: [
      "동백꽃 숲속 오솔길과 벤치에서 찍는 인생 사진",
      "카페 실내 대형 액자창 앞 시그니처 포토존",
      "동백 밀크티와 갓 구운 디저트의 달콤한 휴식"
    ],
    tips: "인기 액자 포토존은 번호표를 뽑고 대기해야 할 수 있으니 입장 직후 카페 1층 포토존 순번을 먼저 등록하세요.",
    mapQuery: "동백포레스트"
  }
};

function initDetailModal() {
  const modal = document.getElementById('detail-modal');
  const closeBtn = document.querySelector('.modal-close');
  const backdrop = document.querySelector('.modal-backdrop');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 카드 내 '자세히 보기' 버튼 클릭 이벤트 위임
  document.addEventListener('click', (e) => {
    const detailTrigger = e.target.closest('[data-detail-key]');
    if (detailTrigger) {
      const key = detailTrigger.dataset.detailKey;
      openDetailModalByKey(key);
    }
  });
}

function openDetailModalByKey(key) {
  const modal = document.getElementById('detail-modal');
  const item = travelDetails[key] || travelPool.find(p => p.name.includes(key));
  if (!modal || !item) return;

  const titleEl = document.getElementById('modal-title');
  const subEl = document.getElementById('modal-sub');
  const imgEl = document.getElementById('modal-img');
  const seasonEl = document.getElementById('modal-season');
  const locEl = document.getElementById('modal-loc');
  const descEl = document.getElementById('modal-desc');
  const highlightsEl = document.getElementById('modal-highlights');
  const tipEl = document.getElementById('modal-tip');
  const mapLinkEl = document.getElementById('modal-map-link');

  if (titleEl) titleEl.textContent = item.name;
  if (subEl) subEl.textContent = item.sub || `${item.theme} 추천 명소`;
  if (imgEl) {
    imgEl.src = item.img;
    imgEl.alt = item.name;
  }
  if (seasonEl) seasonEl.textContent = item.season || "사계절 추천";
  if (locEl) locEl.textContent = item.location;
  if (descEl) descEl.textContent = item.desc;
  if (tipEl) tipEl.textContent = item.tips || `추천 시간: ${item.bestTime || '상시'}, 추천 음식: ${item.food || '지역 명물'}`;

  if (highlightsEl) {
    highlightsEl.innerHTML = '';
    const list = item.highlights || [item.desc, `추천 먹거리: ${item.food}`, `추천 시간: ${item.bestTime}`];
    list.forEach(hl => {
      const li = document.createElement('li');
      li.textContent = hl;
      highlightsEl.appendChild(li);
    });
  }

  if (mapLinkEl) {
    const q = item.mapQuery || item.name;
    mapLinkEl.href = `https://map.naver.com/v5/search/${encodeURIComponent(q)}`;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// 글로벌 함수 (랜덤 카드에서 호출용)
window.openDetailModalWithName = function(name) {
  // 매칭되는 키 찾기
  for (const k of Object.keys(travelDetails)) {
    if (name.includes(k) || k.includes(name)) {
      openDetailModalByKey(k);
      return;
    }
  }
  // 없으면 첫 번째 키로 오픈
  openDetailModalByKey("경주 보문단지");
};

/* =========================================================
   8. QR 모달창
   ========================================================= */
function initQrModal() {
  const qrTriggers = document.querySelectorAll('.open-qr-modal');
  const qrModal = document.getElementById('qr-modal');
  const qrClose = document.querySelector('.qr-modal-close');
  const qrBackdrop = document.querySelector('.qr-modal-backdrop');

  if (!qrModal) return;

  const openQr = (e) => {
    if (e) e.preventDefault();
    qrModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeQr = () => {
    qrModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  qrTriggers.forEach(btn => btn.addEventListener('click', openQr));
  if (qrClose) qrClose.addEventListener('click', closeQr);
  if (qrBackdrop) qrBackdrop.addEventListener('click', closeQr);
}

/* =========================================================
   9. 맨 위로 가기 버튼 (Back to Top)
   ========================================================= */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
