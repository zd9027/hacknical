import koaRouter from 'koa-router';
import User from '../controllers/user';
import platform from '../controllers/helper/platform';
import user from '../controllers/helper/user';
import check from '../controllers/helper/check';
import cache from '../controllers/helper/cache';

const router = koaRouter({
  prefix: '/user'
});

// mobile dashboard page
router.get('/analysis/mobile',
  user.checkIfLogin(),
  platform.setPlatform(),
  platform.checkMobile('/dashboard'),
  User.mobileAnalysis
);
router.get('/setting/mobile',
  user.checkIfLogin(),
  platform.setPlatform(),
  platform.checkMobile('/dashboard'),
  User.mobileSetting
);

// initial finished
router.patch('/initialed',
  user.checkIfLogin(),
  User.initialFinished
);

// user login/logout/signup page
router.get('/login',
  user.checkIfNotLogin(),
  platform.setPlatform(),
  User.loginPage
);

// API
router.get('/logout', User.logout);
router.get(
  '/clearCache',
  check.query('login'),
  User.clearCache,
  cache.del()
);

// github sections
router.get('/githubSections', User.getGithubShareSections);
router.patch('/githubSections',
  user.checkIfLogin(),
  User.setGithubShareSections
);

router.get(
  '/repos/pinned',
  user.checkIfLogin(),
  User.getPinnedRepos
);
router.patch(
  '/repos/pinned',
  user.checkIfLogin(),
  check.body('pinnedRepos'),
  User.setPinnedRepos,
  cache.del()
);

router.get('/login/github', User.githubLogin);

module.exports = router;
