import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'style/semi': ['error', 'always'],
  },
});
