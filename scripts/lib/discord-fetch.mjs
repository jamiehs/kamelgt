const DISCORD_API = 'https://discord.com/api/v10';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Performs a single authenticated GET, retrying on 429 rate limits.
async function discordGet(url, token) {
  while (true) {
    const res = await fetch(url, {
      headers: { Authorization: `Bot ${token}` },
    });

    if (res.status === 429) {
      const body = await res.json();
      const retryMs = Math.ceil((body.retry_after ?? 1) * 1000);
      process.stderr.write(`  Rate limited — retrying in ${retryMs}ms\n`);
      await sleep(retryMs);
      continue;
    }

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Discord API ${res.status} at ${url}: ${body}`);
    }

    return res.json();
  }
}

// Returns all messages with .sto attachments posted after `afterDate` in `channelId`.
// Paginates newest-first using the `before` snowflake cursor.
async function fetchSetupAttachments(channelId, token, afterDate) {
  const results = [];
  let before = null;

  while (true) {
    const url = new URL(`${DISCORD_API}/channels/${channelId}/messages`);
    url.searchParams.set('limit', '100');
    if (before) url.searchParams.set('before', before);

    const messages = await discordGet(url.toString(), token);
    if (!messages.length) break;

    let hitCutoff = false;
    for (const message of messages) {
      if (new Date(message.timestamp) < afterDate) {
        hitCutoff = true;
        break;
      }
      for (const attachment of message.attachments ?? []) {
        if (attachment.filename.toLowerCase().endsWith('.sto')) {
          results.push({
            filename: attachment.filename,
            url: attachment.url,
            messageContent: (message.content ?? '').slice(0, 500),
            timestamp: message.timestamp,
            authorId: message.author.id,
            authorName: message.author.global_name ?? message.author.username,
          });
        }
      }
    }

    if (hitCutoff) break;

    const lastMessage = messages[messages.length - 1];
    if (new Date(lastMessage.timestamp) < afterDate) break;
    before = lastMessage.id;
  }

  return results;
}

// Downloads a file from a URL and returns a Buffer.
async function downloadFile(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

export { fetchSetupAttachments, downloadFile };
