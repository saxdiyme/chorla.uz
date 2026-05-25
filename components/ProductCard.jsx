"use client";

import { Heart, ShieldCheck } from "lucide-react";
import { condLabels } from "@/lib/data";

export default function ProductCard({ item }) {
  const cond = condLabels[item.cond];
  return (
    <a className="card" href={`/listing/${item.id}`}>
      <div className="card-img" style={{ background: "var(--bg-soft)" }}>
        {cond && <span className={`cond ${cond.cls}`}>{cond.label}</span>}
        <button
          className="card-save"
          aria-label="Saqlash"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>
        <span aria-hidden>{item.emoji}</span>
      </div>

      <div className="card-body">
        <div className="seller">
          <span className="seller-ava">
            {item.seller.charAt(0).toUpperCase()}
          </span>
          <span className="seller-name">{item.seller}</span>
          <span className="seller-time">{item.time}</span>
        </div>

        <div className="card-title">{item.title}</div>

        <div className="price">
          {item.price} <small>so'm</small>
          {item.old && <span className="price-old">{item.old}</span>}
        </div>

        {item.protect && (
          <span className="protect">
            <ShieldCheck size={12} /> Xaridor himoyasi
          </span>
        )}
      </div>
    </a>
  );
}
