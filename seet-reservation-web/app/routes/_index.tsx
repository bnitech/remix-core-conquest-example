import type { LinksFunction } from '@remix-run/node';
import Stylesheet from '~/styles/test.css';

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
  {
    rel: 'stylesheet',
    href: 'https://example-css-six.vercel.app/example.css',
  },
  { rel: 'stylesheet', href: Stylesheet },
    {rel: 'prefetch', href: '/img/cat.png'}
];

export default function Index() {
  return (
    <div>
      <h1>Index</h1>
      <p>Some content</p>
      <input type="text" />
      안녕하세요
    </div>
  );
}
