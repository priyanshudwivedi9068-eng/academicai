async function test() {
  const res = await fetch('https://academicai-emzn.onrender.com/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'test', email: `test${Date.now()}@test.com`, password: 'password' })
  });
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}
test();
