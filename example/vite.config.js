import htmlPlugin from 'vite-plugin-html-config';

const htmlPluginOpt = {
  favicon: './logo.svg',
  // scripts: [
  //   `var msg = 'body script'
  //    console.log(msg);`,
  //   {
  //     async: true,
  //     src: 'https://abc.com/b.js',
  //     type: 'module',
  //   },
  // ],
  metas: [
    { 
      name: 'keywords',
      content: 'vite html meta keywords',
    },
    {
      name: 'description',
      content: 'vite html meta description',
    },
    {
      bar: 'custom meta',
    },
  ]
};

module.exports = {
  plugins: [htmlPlugin(htmlPluginOpt)],
};
