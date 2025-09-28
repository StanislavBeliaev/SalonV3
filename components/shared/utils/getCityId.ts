'use server';
import { cookies } from 'next/headers';

export async function getCityId() {
  const cookieStore = await cookies();
  const cityId = cookieStore.get('cityId')?.value;
  return cityId ? parseInt(cityId) : 1;
}

export async function setCityId(cityId: number) {
  const cookieStore = await cookies();
  cookieStore.set('cityId', cityId.toString());
}