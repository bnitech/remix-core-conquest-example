import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => [
  { title: 'New Remix App' },
  { name: 'description', content: 'Welcome to Remix!' },
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
