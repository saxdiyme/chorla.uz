import { createClient } from '@/lib/supabase/server';
import { formatPrice, timeAgo } from '@/lib/utils';

function normalizeListing(row) {
  return {
    id: row.id,
    emoji: '📦',
    title: row.title,
    seller: row.profiles?.username ?? 'chorla',
    price: formatPrice(row.price),
    cond: row.condition,
    protect: row.is_protected,
    time: timeAgo(row.created_at),
  };
}

function normalizeAuction(row) {
  return {
    id: row.id,
    emoji: '🏷️',
    title: row.listings?.title ?? '',
    seller: row.profiles?.username ?? 'chorla',
    endsInSec: Math.max(0, Math.floor((new Date(row.ends_at) - Date.now()) / 1000)),
    bid: formatPrice(row.current_price),
    bids: row.bids_count,
    buyNow: row.buy_now_price ? formatPrice(row.buy_now_price) : null,
  };
}

function normalizeCategory(row) {
  return {
    name: row.name_uz,
    slug: row.slug,
    icon: row.icon,
    color: row.color,
  };
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name_uz, icon, color')
    .order('sort_order');
  if (error || !data) return [];
  return data.map(normalizeCategory);
}

export async function getTrendingListings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, price, condition, is_protected, images, created_at, profiles(username)')
    .eq('is_active', true)
    .order('views_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5);
  if (error || !data) return [];
  return data.map(normalizeListing);
}

export async function getActiveAuctions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('auctions')
    .select('id, current_price, buy_now_price, ends_at, bids_count, listings(id, title, images), profiles(username)')
    .eq('status', 'active')
    .gt('ends_at', new Date().toISOString())
    .order('ends_at', { ascending: true })
    .limit(4);
  if (error || !data) return [];
  return data.map(normalizeAuction);
}

const PAGE_SIZE = 12;

export async function getBrowseListings({ q, category, city, min_price, max_price, condition, sort, page = 1 } = {}) {
  const supabase = await createClient();

  let query = supabase
    .from('listings')
    .select('id, title, price, condition, is_protected, images, created_at, views_count, categories(slug), profiles(username)', { count: 'exact' })
    .eq('is_active', true);

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single();
    if (cat) query = query.eq('category_id', cat.id);
    else return { listings: [], total: 0, page, pageSize: PAGE_SIZE };
  }
  if (city) query = query.ilike('city', `%${city}%`);
  if (min_price) query = query.gte('price', Number(min_price));
  if (max_price) query = query.lte('price', Number(max_price));
  if (condition) query = query.eq('condition', condition);

  if (sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (sort === 'price_desc') query = query.order('price', { ascending: false });
  else if (sort === 'popular') query = query.order('views_count', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) return { listings: [], total: 0, page: 1, pageSize: PAGE_SIZE };
  return { listings: (data || []).map(normalizeListing), total: count ?? 0, page, pageSize: PAGE_SIZE };
}

export async function getAuctionById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('auctions')
    .select('*, listings(id, title, images, description, condition), profiles(username, avatar_url, rating, is_verified)')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data;
}

export async function getSlashedListings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, price, condition, is_protected, images, created_at, profiles(username)')
    .eq('is_active', true)
    .eq('is_promoted', true)
    .order('created_at', { ascending: false })
    .limit(4);
  if (error) return [];
  if (!data || data.length === 0) {
    const { data: fallback } = await supabase
      .from('listings')
      .select('id, title, price, condition, is_protected, images, created_at, profiles(username)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);
    return (fallback || []).map(normalizeListing);
  }
  return data.map(normalizeListing);
}
