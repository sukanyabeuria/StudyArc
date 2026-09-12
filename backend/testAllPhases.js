/**
 * End-to-End Verification Test Suite for FocusNest Backend
 * Tests Phases 1 through 6
 */
const BASE_URL = 'http://localhost:5000/api';

const aliceAuth = { 'Authorization': 'Bearer dev_token_alice_' + Date.now(), 'Content-Type': 'application/json' };
const bobAuth = { 'Authorization': 'Bearer dev_token_bob_' + Date.now(), 'Content-Type': 'application/json' };

async function runVerification() {
  console.log('🧪 Starting FocusNest End-to-End Test Suite...\n');
  let passed = 0;
  let total = 0;

  function assert(condition, testName, details = '') {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName} ${details ? '(' + details + ')' : ''}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
    }
  }

  // ==========================================
  // PHASE 1: Health Check
  // ==========================================
  console.log('--- Phase 1: Health Check ---');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  assert(healthRes.status === 200 && healthData.success === true, 'GET /api/health returns 200 and success: true');

  // ==========================================
  // PHASE 2: Authentication & User Profile
  // ==========================================
  console.log('\n--- Phase 2: Auth & Users ---');
  const unauthRes = await fetch(`${BASE_URL}/users/me`);
  assert(unauthRes.status === 401, 'Unauthenticated request rejected with 401');

  const aliceMeRes = await fetch(`${BASE_URL}/users/me`, { headers: aliceAuth });
  const aliceMeData = await aliceMeRes.json();
  assert(aliceMeRes.status === 200 && aliceMeData.success === true, 'Alice JIT auto-provisioned', `ID: ${aliceMeData.data?._id}`);

  const aliceUpdateRes = await fetch(`${BASE_URL}/users/me`, {
    method: 'PUT',
    headers: aliceAuth,
    body: JSON.stringify({ name: 'Alice Study Master', avatar: 'https://focusnest.test/alice.png', xp: 99999 })
  });
  const aliceUpdateData = await aliceUpdateRes.json();
  assert(
    aliceUpdateData.data?.name === 'Alice Study Master' && aliceUpdateData.data?.xp === 0,
    'Profile update whitelists name & ignores xp tampering'
  );

  // ==========================================
  // PHASE 3: Todos & Ownership Protection
  // ==========================================
  console.log('\n--- Phase 3: Todos & Strict Ownership ---');
  // 1. Alice creates a todo
  const createTodoRes = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: aliceAuth,
    body: JSON.stringify({
      title: 'Complete Algorithms Chapter 4',
      description: 'Dynamic Programming & Memoization',
      priority: 'high'
    })
  });
  const createTodoData = await createTodoRes.json();
  const aliceTodoId = createTodoData.data?._id;
  assert(createTodoRes.status === 201 && aliceTodoId, 'Alice creates a Todo', `Todo ID: ${aliceTodoId}`);

  // 2. Alice lists her todos
  const listTodosRes = await fetch(`${BASE_URL}/todos`, { headers: aliceAuth });
  const listTodosData = await listTodosRes.json();
  assert(listTodosRes.status === 200 && listTodosData.count >= 1, 'Alice lists her own todos');

  // 3. Bob attempts to access Alice's todo (Forbidden - 403)
  const bobAccessRes = await fetch(`${BASE_URL}/todos/${aliceTodoId}`, { headers: bobAuth });
  assert(bobAccessRes.status === 403, 'Bob is forbidden (403) from viewing Alice’s todo');

  // 4. Bob attempts to update Alice's todo (Forbidden - 403)
  const bobUpdateRes = await fetch(`${BASE_URL}/todos/${aliceTodoId}`, {
    method: 'PUT',
    headers: bobAuth,
    body: JSON.stringify({ completed: true })
  });
  assert(bobUpdateRes.status === 403, 'Bob is forbidden (403) from updating Alice’s todo');

  // 5. Bob attempts to delete Alice's todo (Forbidden - 403)
  const bobDeleteRes = await fetch(`${BASE_URL}/todos/${aliceTodoId}`, {
    method: 'DELETE',
    headers: bobAuth
  });
  assert(bobDeleteRes.status === 403, 'Bob is forbidden (403) from deleting Alice’s todo');

  // 6. Alice updates her own todo
  const aliceUpdateTodoRes = await fetch(`${BASE_URL}/todos/${aliceTodoId}`, {
    method: 'PUT',
    headers: aliceAuth,
    body: JSON.stringify({ completed: true })
  });
  const aliceUpdateTodoData = await aliceUpdateTodoRes.json();
  assert(aliceUpdateTodoRes.status === 200 && aliceUpdateTodoData.data?.completed === true, 'Alice updates her own todo');

  // ==========================================
  // PHASE 4: Study Sessions & Gamification (XP & Streaks)
  // ==========================================
  console.log('\n--- Phase 4: Study Sessions & Gamification ---');
  // 1. Alice completes a 25-minute Pomodoro
  const session1Res = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: aliceAuth,
    body: JSON.stringify({ duration: 25, type: 'pomodoro' })
  });
  const session1Data = await session1Res.json();
  assert(
    session1Res.status === 201 &&
    session1Data.data?.gamification?.xpGained === 25 &&
    session1Data.data?.gamification?.currentStreak === 1,
    'Alice logs 25 min Pomodoro (+25 XP, Streak = 1)',
    `Total XP: ${session1Data.data?.gamification?.totalXp}`
  );

  // 2. Same-day second session (streak should remain 1)
  const session2Res = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: aliceAuth,
    body: JSON.stringify({ duration: 80, type: 'pomodoro' })
  });
  const session2Data = await session2Res.json();
  assert(
    session2Data.data?.gamification?.currentStreak === 1 &&
    session2Data.data?.gamification?.totalXp === 105 &&
    session2Data.data?.gamification?.level === 2 &&
    session2Data.data?.gamification?.leveledUp === true,
    'Second session adds 80 XP (Total 105 XP -> Leveled up to Level 2! Streak remains 1)'
  );

  // 3. Fetch Alice's session history
  const listSessionsRes = await fetch(`${BASE_URL}/sessions`, { headers: aliceAuth });
  const listSessionsData = await listSessionsRes.json();
  assert(listSessionsRes.status === 200 && listSessionsData.count === 2, 'Alice fetches session history (2 sessions)');

  // ==========================================
  // PHASE 5: Leaderboard
  // ==========================================
  console.log('\n--- Phase 5: Leaderboard ---');
  const lbRes = await fetch(`${BASE_URL}/leaderboard`, { headers: aliceAuth });
  const lbData = await lbRes.json();
  assert(
    lbRes.status === 200 &&
    Array.isArray(lbData.data) &&
    lbData.data.length > 0 &&
    lbData.data[0].rank === 1 &&
    lbData.currentUser?.name === 'Alice Study Master',
    'Leaderboard returns ranked users and currentUser rank info'
  );

  // ==========================================
  // PHASE 6: Gemini AI Study Assistant
  // ==========================================
  console.log('\n--- Phase 6: Gemini AI Assistant ---');
  // 1. Validation test (missing question)
  const aiInvalidRes = await fetch(`${BASE_URL}/ai/ask`, {
    method: 'POST',
    headers: aliceAuth,
    body: JSON.stringify({})
  });
  assert(aiInvalidRes.status === 400, 'POST /api/ai/ask rejects empty question with 400');

  // 2. Unauthenticated test
  const aiUnauthRes = await fetch(`${BASE_URL}/ai/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'Explain recursion' })
  });
  assert(aiUnauthRes.status === 401, 'POST /api/ai/ask rejects unauthenticated query with 401');

  // 3. Question handling test
  const aiRes = await fetch(`${BASE_URL}/ai/ask`, {
    method: 'POST',
    headers: aliceAuth,
    body: JSON.stringify({ question: 'Explain binary search simply' })
  });
  const aiData = await aiRes.json();
  // If GEMINI_API_KEY is not configured yet, it returns a 500 error explaining that key is needed
  // If configured, it returns 200 with answer
  assert(
    aiRes.status === 200 || (aiRes.status === 500 && aiData.message?.includes('GEMINI_API_KEY')),
    'AI assistant validates request and handles key configuration cleanly',
    aiRes.status === 200 ? 'AI answered successfully' : 'Handled missing GEMINI_API_KEY cleanly'
  );

  console.log(`\n==========================================`);
  console.log(`🎉 TEST SUMMARY: ${passed}/${total} tests passed!`);
  console.log(`==========================================\n`);
}

runVerification().catch((err) => console.error('Test execution error:', err));
