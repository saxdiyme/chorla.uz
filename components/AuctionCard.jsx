"use client";

import { useEffect, useState } from "react";
import { Heart, Clock, Gavel } from "lucide-react";

function format(sec) {
  if (sec <= 0) return null;
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (d > 0) return `${d} kun ${h} soat`;
  if (h > 0) return `${h} soat ${m} daq`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function AuctionCard({ item }) {
  const [left, setLeft] = useState(item.endsInSec);

  useEffect(() => {
    const t = setInterval(() => {
      setLeft((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const ended = left <= 0;
  const display = format(left);

  return (
    <div className="card auction">
      <div className="card-img">
        <span className="auc-flag">
          <span className="dot" /> JONLI
        </span>
        <button
          className="card-save"
          aria-label="Kuzatish"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>
        <span aria-hidden>{item.emoji}</span>
      </div>

      <div className={`timer ${ended ? "ended" : ""}`}>
        <Clock size={14} />
        {ended ? "Auktsion tugadi" : `${display} qoldi`}
      </div>

      <div className="card-body">
        <div className="seller">
          <span className="seller-ava">
            {item.seller.charAt(0).toUpperCase()}
          </span>
          <span className="seller-name">{item.seller}</span>
        </div>

        <div className="card-title">{item.title}</div>

        <div className="auc-meta">
          <span className="auc-bid-label">Joriy stavka</span>
          <span className="auc-bids">{item.bids} stavka</span>
        </div>
        <div className="price">
          {item.bid} <small>so'm</small>
        </div>

        {item.buyNow && (
          <div className="auc-buynow">
            Hoziroq sotib olish: <b>{item.buyNow} so'm</b>
          </div>
        )}

        <button className="btn-bid" disabled={ended}>
          <Gavel size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
          {ended ? "Yopilgan" : "Stavka qo'yish"}
        </button>
      </div>
    </div>
  );
}
