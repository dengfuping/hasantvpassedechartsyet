export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'hasantvpassedechartsyet',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
