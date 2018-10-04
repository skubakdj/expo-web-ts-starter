
import StorybookUI from './storybook.mobile';
import { App } from './build/tsc/App';


module.exports = __DEV__ ? StorybookUI : App;
// module.exports = App;
