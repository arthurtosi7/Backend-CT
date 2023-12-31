import type { AWS } from '@serverless/typescript';
import { roomRoutes } from 'src/routes/room.routes';
import { peopleRoutes } from 'src/routes/people.routes';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-template',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', "serverless-offline"],
  provider: {
    timeout: 14,
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { ...roomRoutes, ...peopleRoutes },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
