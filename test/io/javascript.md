---
imports: |
    import AsyncComponent from 'AsyncComponent';

    let resolve = () => import('MyComponent');
---

<AsyncComponent resolve={resolve} />
