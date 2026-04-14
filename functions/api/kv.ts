interface Env {
  KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const kv = context.env.KV;

  if (!kv) {
    return Response.json({ error: 'KV binding not found' }, { status: 500 });
  }

  const url = new URL(context.request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return Response.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  const value = await kv.get(key);
  const metadata = await kv.getWithMetadata(key);

  return Response.json({
    message: 'KV read success',
    key,
    value,
    metadata: metadata.metadata,
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const kv = context.env.KV;

  if (!kv) {
    return Response.json({ error: 'KV binding not found' }, { status: 500 });
  }

  const body = await context.request.json<{ key: string; value: string }>();

  if (!body.key || !body.value) {
    return Response.json({ error: 'Missing key or value' }, { status: 400 });
  }

  await kv.put(body.key, body.value, {
    metadata: { createdAt: new Date().toISOString() },
  });

  return Response.json({
    message: 'KV write success',
    key: body.key,
    value: body.value,
  });
};
