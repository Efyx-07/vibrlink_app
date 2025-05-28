import cookie from 'cookie';
import type { GetServerSidePropsContext } from 'next';

export async function getUserFromServerSideProps(
  ctx: GetServerSidePropsContext,
) {
  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const token = cookies['token']; // ← remplace par le nom que tu as mis dans res.cookie('token', ...)

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.API_URL}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user; // selon ce que retourne ton backend
  } catch (err) {
    console.error('Erreur auth:', err);
    return null;
  }
}
