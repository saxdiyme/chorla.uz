import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AuctionDetail from '@/components/AuctionDetail';
import { getAuctionById } from '@/lib/queries';

export default async function AuctionPage({ params }) {
  const auction = await getAuctionById(params.id);
  if (!auction) notFound();

  return (
    <>
      <Navbar />
      <AuctionDetail initialAuction={auction} />
    </>
  );
}
