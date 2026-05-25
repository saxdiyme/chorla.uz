import Navbar from '@/components/Navbar';
import AuctionCard from '@/components/AuctionCard';
import { getActiveAuctions } from '@/lib/queries';

export default async function AuctionsPage() {
  const auctions = await getActiveAuctions();

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>Jonli auktsionlar</h1>
          <span style={{ background: '#e11d48', color: 'white', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
            LIVE
          </span>
        </div>

        {auctions.length === 0 ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0', fontSize: 16 }}>
            Hozircha aktiv auktsionlar yo'q
          </p>
        ) : (
          <div className="grid">
            {auctions.map(item => (
              <a key={item.id} href={`/auctions/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <AuctionCard item={item} />
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
