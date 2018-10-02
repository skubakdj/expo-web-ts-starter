
import StorybookUI from './storybook';
import { App } from './build/tsc/App';
import { STORYBOOK_MODE } from 'react-native-dotenv'


module.exports = STORYBOOK_MODE === 'true' ? StorybookUI : App;
