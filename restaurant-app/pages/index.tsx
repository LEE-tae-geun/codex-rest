import React, { useState } from "react"

type Place = {
  id: number
  name: string
  category: string
  address: string
}

export default function Home() {
  const [q, setQ] = useState("")
  const [results, setResults] = useState<Place[]>([])

  async function search(e?: React.FormEvent) {
    e?.preventDefault()
    const res = await fetch(`/api/places?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data.results || [])
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>주변 맛집 찾아 예약하기 (샘플)</h1>
      <form onSubmit={search} style={{ marginBottom: 16 }}>
        <input
          placeholder="검색어 (예: 한식, 김밥)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
        <button style={{ marginLeft: 8, padding: "8px 12px" }} onClick={search}>
          검색
        </button>
      </form>

      <div>
        {results.length === 0 ? (
          <p>검색 결과가 없습니다. 샘플 데이터를 사용합니다.</p>
        ) : (
          <ul>
            {results.map((p) => (
              <li key={p.id} style={{ marginBottom: 12 }}>
                <strong>{p.name}</strong> <span style={{ color: "#666" }}>{p.category}</span>
                <div style={{ color: "#333" }}>{p.address}</div>
                <button
                  onClick={async () => {
                    // quick demo reservation for now
                    const dt = new Date()
                    dt.setHours(dt.getHours() + 2)
                    await fetch("/api/reservations", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ placeId: p.id, datetime: dt.toISOString(), partySize: 2 })
                    })
                    alert("예약 요청을 보냈습니다 (샘플)")
                  }}
                >
                  예약하기
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

