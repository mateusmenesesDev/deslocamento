import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('entrei aqui');
  revalidateTag('clientes');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
