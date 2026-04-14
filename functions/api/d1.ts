interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const db = context.env.DB;

  if (!db) {
    return Response.json({ error: 'DB binding not found' }, { status: 500 });
  }

  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const ip = context.request.headers.get('cf-connecting-ip') || 'unknown';
    await db.prepare('INSERT INTO visits (ip) VALUES (?)').bind(ip).run();
    const { results } = await db.prepare('SELECT * FROM visits ORDER BY visited_at DESC LIMIT 5').all();
    const countResult = await db.prepare('SELECT COUNT(*) as count FROM visits').first();

    return Response.json({
      message: 'D1 query success',
      recentVisits: results,
      totalVisits: countResult?.count,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
