// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/services/auth';

export async function GET() {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
