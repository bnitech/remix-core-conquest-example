
import { Outlet } from '@remix-run/react';

export default function nested_index() {
    return (
        <div style={{ border: '3px solid red' }}>
            <h1>Nested - index</h1>
            <Outlet />
        </div>
    );
}
