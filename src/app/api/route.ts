import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('entrei aqui');
  revalidatePath('/clientes');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
