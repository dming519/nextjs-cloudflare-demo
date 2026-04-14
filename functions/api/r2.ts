interface Env {
  R2: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const bucket = context.env.R2;

  if (!bucket) {
    return Response.json({ error: 'R2 binding not found' }, { status: 500 });
  }

  try {
    const objects = await bucket.list({ limit: 10 });

    return Response.json({
      message: 'R2 list success',
      files: objects.objects.map((o) => ({
        key: o.key,
        size: o.size,
        uploaded: o.uploaded,
        httpEtag: o.httpEtag,
      })),
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const bucket = context.env.R2;

  if (!bucket) {
    return Response.json({ error: 'R2 binding not found' }, { status: 500 });
  }

  try {
    const body = await context.request.json<{ filename: string; content: string }>();

    if (!body.filename || !body.content) {
      return Response.json({ error: 'Missing filename or content' }, { status: 400 });
    }

    await bucket.put(body.filename, new TextEncoder().encode(body.content), {
      httpMetadata: { contentType: 'text/plain' },
      customMetadata: { createdAt: new Date().toISOString() },
    });

    const object = await bucket.get(body.filename);

    return Response.json({
      message: 'R2 upload success',
      filename: body.filename,
      size: object?.size,
      uploaded: object?.uploaded,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
