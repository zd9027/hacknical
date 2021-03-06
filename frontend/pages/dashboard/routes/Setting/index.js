import { injectReducer } from '../../redux/reducer';
import PATH from '../shared/path';
import reducer from './redux/reducers';

export default store => ({
  path: `${PATH.RAW_PATH}/setting`,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'setting', reducer });
      cb(null, require('./Components/index').default)
    })
  }
});
