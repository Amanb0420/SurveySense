import type { NextConfig } from 'next'


plugins: [
  new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
    resource.request = resource.request.replace(/^node:/, "");
  }),
]