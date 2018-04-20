// eslint-disable-line no-unused-vars

const urlPaths = {
  'home': 'wx/4.1.10', // default wechat app
  // override wechat app version for some users see tri_wechat_register.module function _goto_path for branches
  'home_auc': 'wx/4.1.17',
  'home_demo': 'wx/4.1.18',
  'home_internal': 'wx/4.0.2',
  'home_edge': 'wx/4.1.19',
  'home_develop': 'wx/develop/index.html'
};

const userPaths = [
  {
    'users': ['pbP1jMDqG6fdBzKl', 'qreLb2tlhSscJA2G', 'qA6mIwkIXEZCl9jQ'],
    'uri': 'home_auc'
  },
  {
    'users': ['6490', '5810'],
    'uri': 'home_edge'
  },
  {
    'users': ['6490', '5810'],
    'uri': 'home_demo'
  },
  {
    'users': ['6490', '5810'],
    'uri': 'home_develop'
  }
];

module.exports = function (options = {}) {
  return async context => {
    const { result } = context;

    const user = result;
    var uri = 'home';
    for(let i=0, len=userPaths.length; i<len; i++) {
      var item = userPaths[i];
      if (user._id && item.users.indexOf(user._id.toString())) {
        uri = item.uri;
        break;
      }
    }

    var path = urlPaths[uri];
    if(!path) {
      path = urlPaths.home;
    }

    user.appVersion = path;

    // Best practise, hooks should always return the context
    return context;
  };
};