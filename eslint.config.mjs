import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  {
    ignores: ['convex/_generated/**'],
  },
  ...nextCoreWebVitals,
]

export default eslintConfig
