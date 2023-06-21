import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag('clientes');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
