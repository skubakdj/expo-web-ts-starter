
import StorybookUI from './storybook.mobile';
import { App } from './src/App';


module.exports = __DEV__ ? StorybookUI : App;
// module.exports = App;
