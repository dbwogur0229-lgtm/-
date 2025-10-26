// 러니버스 공통 스크립트

// 전역 변수
let currentUser = null;
let isRunning = false;
let runTimer = null;
let runStartTime = null;
let currentDistance = 0;
let currentPace = 0;

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    console.log('러니버스 앱이 초기화되었습니다.');
    
    // 현재 페이지에 따른 이벤트 리스너 설정
    const currentPage = getCurrentPage();
    setupPageEventListeners(currentPage);
    
    // 사용자 데이터 로드 (로컬 스토리지에서)
    loadUserData();
}

// 현재 페이지 확인
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename === 'index.html' || filename === '') return 'login';
    if (filename === 'home.html') return 'home';
    if (filename === 'run_start.html') return 'runStart';
    if (filename === 'avatar.html') return 'avatar';
    if (filename === 'room_detail.html') return 'roomDetail';
    if (filename === 'run_history.html') return 'runHistory';
    
    return 'unknown';
}

// 페이지별 이벤트 리스너 설정
function setupPageEventListeners(page) {
    switch(page) {
        case 'login':
            setupLoginPageEvents();
            break;
        case 'home':
            setupHomePageEvents();
            break;
        case 'runStart':
            setupRunStartPageEvents();
            break;
        case 'avatar':
            setupAvatarPageEvents();
            break;
        case 'roomDetail':
            setupRoomDetailPageEvents();
            break;
        case 'runHistory':
            setupRunHistoryPageEvents();
            break;
    }
}

// 로그인 페이지 이벤트
function setupLoginPageEvents() {
    const loginBtn = document.getElementById('loginBtn');
    const googleLoginBtn = document.getElementById('googleLogin');
    const kakaoLoginBtn = document.getElementById('kakaoLogin');
    const signupLink = document.getElementById('signupLink');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('로그인 버튼 클릭됨');
            handleLogin();
        });
    }
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            console.log('Google 로그인 버튼 클릭됨');
            handleSocialLogin('google');
        });
    }
    
    if (kakaoLoginBtn) {
        kakaoLoginBtn.addEventListener('click', function() {
            console.log('카카오 로그인 버튼 클릭됨');
            handleSocialLogin('kakao');
        });
    }
    
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('회원가입 링크 클릭됨');
            handleSignup();
        });
    }
}

// 홈 페이지 이벤트
function setupHomePageEvents() {
    const startRunningBtn = document.getElementById('startRunningBtn');
    const createTeamBtn = document.getElementById('createTeamBtn');
    const customizeAvatarBtn = document.getElementById('customizeAvatarBtn');
    const communityBtn = document.getElementById('communityBtn');
    const profileBtn = document.getElementById('profileBtn');
    
    // 하단 네비게이션
    const homeNav = document.getElementById('homeNav');
    const runNav = document.getElementById('runNav');
    const teamNav = document.getElementById('teamNav');
    const profileNav = document.getElementById('profileNav');
    
    if (startRunningBtn) {
        startRunningBtn.addEventListener('click', function() {
            console.log('러닝 시작하기 버튼 클릭됨');
            navigateToPage('run_start.html');
        });
    }
    
    if (createTeamBtn) {
        createTeamBtn.addEventListener('click', function() {
            console.log('팀 만들기 버튼 클릭됨');
            handleCreateTeam();
        });
    }
    
    if (customizeAvatarBtn) {
        customizeAvatarBtn.addEventListener('click', function() {
            console.log('아바타 꾸미기 버튼 클릭됨');
            navigateToPage('avatar.html');
        });
    }
    
    if (communityBtn) {
        communityBtn.addEventListener('click', function() {
            console.log('커뮤니티 이동 버튼 클릭됨');
            handleCommunityNavigation();
        });
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            console.log('프로필 버튼 클릭됨');
            handleProfileSettings();
        });
    }
    
    // 네비게이션 이벤트
    if (homeNav) homeNav.addEventListener('click', () => navigateToPage('home.html'));
    if (runNav) runNav.addEventListener('click', () => navigateToPage('run_start.html'));
    if (teamNav) teamNav.addEventListener('click', () => handleTeamNavigation());
    if (profileNav) profileNav.addEventListener('click', () => navigateToPage('avatar.html'));
}

// 러닝 시작 페이지 이벤트
function setupRunStartPageEvents() {
    const backBtn = document.getElementById('backBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const relayStartBtn = document.getElementById('relayStartBtn');
    const ghostStartBtn = document.getElementById('ghostStartBtn');
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            console.log('뒤로가기 버튼 클릭됨');
            navigateToPage('home.html');
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            console.log('설정 버튼 클릭됨');
            handleRunSettings();
        });
    }
    
    if (relayStartBtn) {
        relayStartBtn.addEventListener('click', function() {
            console.log('릴레이 시작 버튼 클릭됨');
            startRelayRun();
        });
    }
    
    if (ghostStartBtn) {
        ghostStartBtn.addEventListener('click', function() {
            console.log('AI 고스트런 버튼 클릭됨');
            startGhostRun();
        });
    }
}

// 아바타 페이지 이벤트
function setupAvatarPageEvents() {
    const backBtn = document.getElementById('backBtn');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const saveAvatarBtn = document.getElementById('saveAvatarBtn');
    
    // 이모지 선택 이벤트
    const emojiOptions = document.querySelectorAll('.emoji-option');
    emojiOptions.forEach(option => {
        option.addEventListener('click', function() {
            console.log('이모지 선택됨:', this.dataset.emoji);
            selectEmoji(this.dataset.emoji);
        });
    });
    
    // 색상 선택 이벤트
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            console.log('색상 선택됨:', this.dataset.color);
            selectColor(this.dataset.color);
        });
    });
    
    // 테마 선택 이벤트
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            console.log('테마 선택됨:', this.dataset.theme);
            selectTheme(this.dataset.theme);
        });
    });
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            console.log('뒤로가기 버튼 클릭됨');
            navigateToPage('home.html');
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('저장 버튼 클릭됨');
            saveAvatarSettings();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('기본값 버튼 클릭됨');
            resetAvatarToDefault();
        });
    }
    
    if (saveAvatarBtn) {
        saveAvatarBtn.addEventListener('click', function() {
            console.log('아바타 저장 버튼 클릭됨');
            saveAvatarSettings();
        });
    }
}

// 실시간 러닝 페이지 이벤트
function setupRoomDetailPageEvents() {
    const backBtn = document.getElementById('backBtn');
    const menuBtn = document.getElementById('menuBtn');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const batonBtn = document.getElementById('batonBtn');
    const resetBtn = document.getElementById('resetBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const musicBtn = document.getElementById('musicBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            console.log('뒤로가기 버튼 클릭됨');
            navigateToPage('run_start.html');
        });
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            console.log('메뉴 버튼 클릭됨');
            handleRunMenu();
        });
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('시작 버튼 클릭됨');
            startRun();
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            console.log('일시정지 버튼 클릭됨');
            pauseRun();
        });
    }
    
    if (batonBtn) {
        batonBtn.addEventListener('click', function() {
            console.log('바통 넘기기 버튼 클릭됨');
            passBaton();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('종료 버튼 클릭됨');
            endRun();
        });
    }
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            console.log('음성 버튼 클릭됨');
            toggleVoiceRecording();
        });
    }
    
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            console.log('음악 버튼 클릭됨');
            toggleMusic();
        });
    }
    
    if (cameraBtn) {
        cameraBtn.addEventListener('click', function() {
            console.log('카메라 버튼 클릭됨');
            takePhoto();
        });
    }
}

// 기록 페이지 이벤트
function setupRunHistoryPageEvents() {
    const backBtn = document.getElementById('backBtn');
    const exportBtn = document.getElementById('exportBtn');
    const exportJsonBtn = document.getElementById('exportJsonBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    
    // 필터 버튼들
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('필터 버튼 클릭됨:', this.dataset.filter);
            filterHistory(this.dataset.filter);
        });
    });
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            console.log('뒤로가기 버튼 클릭됨');
            navigateToPage('home.html');
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('내보내기 버튼 클릭됨');
            exportRunData();
        });
    }
    
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', function() {
            console.log('JSON 내보내기 버튼 클릭됨');
            exportRunDataAsJSON();
        });
    }
    
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function() {
            console.log('전체 삭제 버튼 클릭됨');
            deleteAllRunHistory();
        });
    }
}

// 로그인 처리
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }
    
    // 임시 로그인 처리 (실제로는 Firebase 인증 사용)
    console.log('로그인 시도:', email);
    
    // 로그인 성공 시뮬레이션
    setTimeout(() => {
        currentUser = {
            email: email,
            name: '러너',
            avatar: '🏃‍♂️'
        };
        saveUserData();
        navigateToPage('home.html');
    }, 1000);
}

// 소셜 로그인 처리
function handleSocialLogin(provider) {
    console.log(`${provider} 로그인 시도`);
    
    // 소셜 로그인 성공 시뮬레이션
    setTimeout(() => {
        currentUser = {
            email: `${provider}@example.com`,
            name: `${provider} 사용자`,
            avatar: '🏃‍♂️'
        };
        saveUserData();
        navigateToPage('home.html');
    }, 1000);
}

// 회원가입 처리
function handleSignup() {
    console.log('회원가입 페이지로 이동');
    alert('회원가입 기능은 추후 구현 예정입니다.');
}

// 팀 생성 처리
function handleCreateTeam() {
    console.log('팀 생성 기능');
    alert('팀 생성 기능은 추후 구현 예정입니다.');
}

// 커뮤니티 네비게이션
function handleCommunityNavigation() {
    console.log('커뮤니티 페이지로 이동');
    alert('커뮤니티 기능은 추후 구현 예정입니다.');
}

// 프로필 설정
function handleProfileSettings() {
    console.log('프로필 설정 페이지로 이동');
    navigateToPage('avatar.html');
}

// 팀 네비게이션
function handleTeamNavigation() {
    console.log('팀 페이지로 이동');
    alert('팀 기능은 추후 구현 예정입니다.');
}

// 러닝 설정
function handleRunSettings() {
    console.log('러닝 설정');
    alert('러닝 설정 기능은 추후 구현 예정입니다.');
}

// 릴레이 러닝 시작
function startRelayRun() {
    console.log('릴레이 러닝 시작');
    navigateToPage('room_detail.html');
}

// 고스트 러닝 시작
function startGhostRun() {
    console.log('AI 고스트런 시작');
    navigateToPage('room_detail.html');
}

// 이모지 선택
function selectEmoji(emoji) {
    const previewEmoji = document.getElementById('previewEmoji');
    if (previewEmoji) {
        previewEmoji.textContent = emoji;
    }
    
    // 선택된 이모지 표시 업데이트
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 색상 선택
function selectColor(color) {
    const previewBackground = document.getElementById('previewBackground');
    if (previewBackground) {
        previewBackground.style.background = color;
    }
    
    // 선택된 색상 표시 업데이트
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 테마 선택
function selectTheme(theme) {
    console.log('테마 변경:', theme);
    
    // 선택된 테마 표시 업데이트
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 아바타 설정 저장
function saveAvatarSettings() {
    console.log('아바타 설정 저장');
    alert('아바타 설정이 저장되었습니다!');
    navigateToPage('home.html');
}

// 아바타 기본값으로 리셋
function resetAvatarToDefault() {
    console.log('아바타 기본값으로 리셋');
    
    // 기본값으로 설정
    const previewEmoji = document.getElementById('previewEmoji');
    const previewBackground = document.getElementById('previewBackground');
    
    if (previewEmoji) previewEmoji.textContent = '🏃‍♂️';
    if (previewBackground) previewBackground.style.background = '#4CAF50';
    
    // 선택 상태 리셋
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.emoji === '🏃‍♂️') option.classList.add('active');
    });
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.color === '#4CAF50') option.classList.add('active');
    });
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === 'modern') option.classList.add('active');
    });
}

// 러닝 시작
function startRun() {
    console.log('러닝 시작');
    isRunning = true;
    runStartTime = new Date();
    
    // 타이머 시작
    runTimer = setInterval(updateRunStats, 1000);
    
    // 버튼 상태 변경
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const batonBtn = document.getElementById('batonBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    if (batonBtn) batonBtn.disabled = false;
    if (resetBtn) resetBtn.disabled = false;
}

// 러닝 일시정지
function pauseRun() {
    console.log('러닝 일시정지');
    isRunning = false;
    
    if (runTimer) {
        clearInterval(runTimer);
        runTimer = null;
    }
    
    // 버튼 상태 변경
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
}

// 바통 넘기기
function passBaton() {
    console.log('바통 넘기기');
    alert('바통이 다음 러너에게 넘어갔습니다!');
}

// 러닝 종료
function endRun() {
    console.log('러닝 종료');
    isRunning = false;
    
    if (runTimer) {
        clearInterval(runTimer);
        runTimer = null;
    }
    
    // 러닝 기록 저장
    saveRunRecord();
    
    // 버튼 상태 리셋
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const batonBtn = document.getElementById('batonBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (batonBtn) batonBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = true;
    
    // 홈으로 이동
    navigateToPage('home.html');
}

// 러닝 통계 업데이트
function updateRunStats() {
    if (!isRunning || !runStartTime) return;
    
    const now = new Date();
    const elapsed = now - runStartTime;
    
    // 시간 업데이트
    const timeDisplay = document.getElementById('timeDisplay');
    if (timeDisplay) {
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // 거리 업데이트 (시뮬레이션)
    currentDistance += 0.001; // 1초마다 1m씩 증가
    const distanceDisplay = document.getElementById('distanceDisplay');
    if (distanceDisplay) {
        distanceDisplay.textContent = currentDistance.toFixed(2);
    }
    
    // 페이스 업데이트 (시뮬레이션)
    if (currentDistance > 0) {
        currentPace = elapsed / (currentDistance * 1000); // 분/km
        const paceDisplay = document.getElementById('paceDisplay');
        if (paceDisplay) {
            const paceMinutes = Math.floor(currentPace / 60000);
            const paceSeconds = Math.floor((currentPace % 60000) / 1000);
            paceDisplay.textContent = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
        }
    }
    
    // 진행률 업데이트
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (progressFill && progressText) {
        const targetDistance = 3.0; // 목표 거리
        const progress = Math.min((currentDistance / targetDistance) * 100, 100);
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `목표까지 ${(targetDistance - currentDistance).toFixed(1)}km 남음`;
    }
}

// 러닝 메뉴
function handleRunMenu() {
    console.log('러닝 메뉴');
    alert('러닝 메뉴 기능은 추후 구현 예정입니다.');
}

// 음성 녹음 토글
function toggleVoiceRecording() {
    console.log('음성 녹음 토글');
    alert('음성 녹음 기능은 추후 구현 예정입니다.');
}

// 음악 토글
function toggleMusic() {
    console.log('음악 토글');
    alert('음악 기능은 추후 구현 예정입니다.');
}

// 사진 촬영
function takePhoto() {
    console.log('사진 촬영');
    alert('사진 촬영 기능은 추후 구현 예정입니다.');
}

// 기록 필터링
function filterHistory(filter) {
    console.log('기록 필터링:', filter);
    
    // 필터 버튼 활성화 상태 업데이트
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 실제 필터링 로직은 추후 구현
    alert(`${filter} 필터가 적용되었습니다.`);
}

// 러닝 데이터 내보내기
function exportRunData() {
    console.log('러닝 데이터 내보내기');
    alert('러닝 데이터 내보내기 기능은 추후 구현 예정입니다.');
}

// JSON 내보내기
function exportRunDataAsJSON() {
    console.log('JSON 내보내기');
    
    // 샘플 데이터
    const sampleData = {
        runs: [
            {
                date: '2024-01-15',
                distance: 3.2,
                time: '18:24',
                pace: '5:45',
                type: '개인 러닝'
            },
            {
                date: '2024-01-14',
                distance: 5.0,
                time: '28:15',
                pace: '5:39',
                type: '팀 릴레이'
            }
        ]
    };
    
    const dataStr = JSON.stringify(sampleData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'run_history.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// 전체 기록 삭제
function deleteAllRunHistory() {
    console.log('전체 기록 삭제');
    
    if (confirm('모든 러닝 기록을 삭제하시겠습니까?')) {
        alert('모든 러닝 기록이 삭제되었습니다.');
    }
}

// 러닝 기록 저장
function saveRunRecord() {
    const runRecord = {
        date: new Date().toISOString().split('T')[0],
        distance: currentDistance,
        time: document.getElementById('timeDisplay')?.textContent || '00:00:00',
        pace: document.getElementById('paceDisplay')?.textContent || '--:--',
        type: '개인 러닝'
    };
    
    console.log('러닝 기록 저장:', runRecord);
    
    // 로컬 스토리지에 저장
    const existingRecords = JSON.parse(localStorage.getItem('runRecords') || '[]');
    existingRecords.push(runRecord);
    localStorage.setItem('runRecords', JSON.stringify(existingRecords));
}

// 사용자 데이터 로드
function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        console.log('사용자 데이터 로드됨:', currentUser);
    }
}

// 사용자 데이터 저장
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log('사용자 데이터 저장됨:', currentUser);
    }
}

// 페이지 네비게이션
function navigateToPage(page) {
    console.log('페이지 이동:', page);
    window.location.href = page;
}

// 상세보기 함수 (run_history.html에서 사용)
function viewDetails(runId) {
    console.log('러닝 상세보기:', runId);
    alert(`러닝 기록 ${runId}의 상세 정보를 보여줍니다.`);
}

// 유틸리티 함수들
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

function formatDistance(meters) {
    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(2)}km`;
    } else {
        return `${meters}m`;
    }
}

function formatPace(secondsPerKm) {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.floor(secondsPerKm % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', function() {
    if (runTimer) {
        clearInterval(runTimer);
    }
});

console.log('러니버스 스크립트가 로드되었습니다.');
