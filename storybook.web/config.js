import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.tsx
// const req = require.context('../src', true, /.stories.tsx$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);

configure(() => {
  require('../src/ui/index.stories');
  // require('../storybook.mobile/stories.old');
}, module);