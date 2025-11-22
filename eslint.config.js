import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  typescript: true,
  jsx: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'style/semi': ['error', 'always'],
    'max-lines': ['error', { max: 80 }],
  },
});
