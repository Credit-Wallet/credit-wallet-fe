import { boot } from 'quasar/wrappers';
import { App } from 'vue';
import Vant from 'vant';
import 'src/css/vant.variables.scss';
import { Locale } from 'vant';
import viVN from 'vant/es/locale/lang/vi-VN';

export default boot(({ app }: { app: App }) => {
  app.use(Vant);
  Locale.use('vi-VN', viVN);
});
