export async function placeBid(supabase, auctionId, userId, amount) {
  const { data, error } = await supabase.rpc('place_bid', {
    p_auction_id: auctionId,
    p_user_id: userId,
    p_amount: amount,
  });
  if (error) return { error: error.message };
  return data;
}
