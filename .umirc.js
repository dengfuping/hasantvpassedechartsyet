export default {
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'Has AntV passed ECharts yet?',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
