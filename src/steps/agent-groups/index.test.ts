import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-agent-groups', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-agent-groups',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.AGENT_GROUP);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-agent-group-and-agent-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-agent-group-and-agent-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    Steps.BUILD_AGENT_GROUP_AGENT_RELATIONSHIPS,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
