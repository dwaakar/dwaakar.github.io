const CLIENT_ID = 'Ov23lik9f3ldrdT1Zd91';
const CLIENT_SECRET = 'cad6e399bd4e7fc18d1455b111146549724831e8';
const ORIGIN = 'https://dwaakar-github-io.pages.dev';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  // Step 1 — redirect to GitHub OAuth
  if (!code) {
    const redirect = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
    return Response.redirect(redirect, 302);
  }

  // Step 2 — exchange code for token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;

  if (!token) {
    return new Response('Auth failed', { status: 400 });
  }

  // Step 3 — return token to CMS via postMessage
  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e);
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: '${token}', provider: 'github' }).replace(/'/g, "\\'")}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })()
</script>
</body>
</html>`;

  return new Response(html.replace('${token}', token), {
    headers: { 'Content-Type': 'text/html' }
  });
}
