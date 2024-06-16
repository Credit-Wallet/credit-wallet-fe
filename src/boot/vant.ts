import { boot } from 'quasar/wrappers';
import { App } from 'vue';
import Vant from 'vant';
import 'src/css/vant.variables.scss';

export default boot(({ app }: { app: App }) => {
  app.use(Vant);
});
