'use client';

import { useState } from 'react';

export default function Home() {
  const [d1Result, setD1Result] = useState<string>('');
  const [kvResult, setKvResult] = useState<string>('');
  const [r2Result, setR2Result] = useState<string>('');
  const [loading, setLoading] = useState<{ d1?: boolean; kv?: boolean; r2?: boolean }>({});

  async function callD1() {
    setLoading((l) => ({ ...l, d1: true }));
    const res = await fetch('/api/d1');
    const data = await res.json();
    setD1Result(JSON.stringify(data, null, 2));
    setLoading((l) => ({ ...l, d1: false }));
  }

  async function callKV() {
    setLoading((l) => ({ ...l, kv: true }));
    const key = 'demo-key-' + Date.now();
    // write
    await fetch('/api/kv', {
      method: 'POST',
      body: JSON.stringify({ key, value: `hello from kv @ ${new Date().toISOString()}` }),
      headers: { 'Content-Type': 'application/json' },
    });
    // read
    const res = await fetch(`/api/kv?key=${key}`);
    const data = await res.json();
    setKvResult(JSON.stringify(data, null, 2));
    setLoading((l) => ({ ...l, kv: false }));
  }

  async function callR2() {
    setLoading((l) => ({ ...l, r2: true }));
    const filename = `demo-${Date.now()}.txt`;
    // write
    await fetch('/api/r2', {
      method: 'POST',
      body: JSON.stringify({ filename, content: `hello from r2 @ ${new Date().toISOString()}` }),
      headers: { 'Content-Type': 'application/json' },
    });
    // list
    const res = await fetch('/api/r2');
    const data = await res.json();
    setR2Result(JSON.stringify(data, null, 2));
    setLoading((l) => ({ ...l, r2: false }));
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Next.js + Cloudflare Pages Demo</h1>
      <p style={{ color: '#aaa', marginBottom: 40 }}>集成 D1、R2、KV 的完整示例</p>

      <Section title="D1 数据库" onClick={callD1} loading={loading.d1} result={d1Result} />
      <Section title="KV 键值存储" onClick={callKV} loading={loading.kv} result={kvResult} />
      <Section title="R2 对象存储" onClick={callR2} loading={loading.r2} result={r2Result} />
    </main>
  );
}

function Section({ title, onClick, loading, result }: { title: string; onClick: () => void; loading?: boolean; result: string }) {
  return (
    <section style={{ background: '#141414', borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h2 style={{ marginTop: 0, fontSize: 20 }}>{title}</h2>
      <button
        onClick={onClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          borderRadius: 6,
          border: 'none',
          background: '#3b82f6',
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? '请求中...' : '发送请求'}
      </button>
      {result && (
        <pre
          style={{
            marginTop: 16,
            background: '#0a0a0a',
            padding: 16,
            borderRadius: 8,
            overflow: 'auto',
            fontSize: 13,
            color: '#4ade80',
          }}
        >
          {result}
        </pre>
      )}
    </section>
  );
}
