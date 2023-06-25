import type { LinksFunction } from '@remix-run/node';
import { V2_MetaFunction } from '@remix-run/node';
import Stylesheet from '~/styles/test.css';

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
  {
    rel: 'stylesheet',
    href: 'https://example-css-six.vercel.app/example.css',
  },
  { rel: 'stylesheet', href: Stylesheet },
  { rel: 'prefetch', href: '/img/cat.png' },
];

export const meta: V2_MetaFunction = () => [
  { title: '나는 제목입니다.' },
  {
    property: 'og:title',
    content: 'OG TITLE 입니다',
  },
  {
    name: 'description',
    content: 'OG DESCRIPTION 입니다',
  },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
  {
    name: 'refresh',
    content: 'test',
    httpEquiv: 'refresh',
  },
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
