import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-agents', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-agents',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.AGENT);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-agent-and-ticket-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-agent-and-ticket-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    Steps.BUILD_AGENT_TICKET_RELATIONSHIPS,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-agent-group-and-ticket-relationships', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-agent-group-and-ticket-relationships',
  });

  const stepConfig = buildStepTestConfigForStep(
    Steps.BUILD_AGENT_GROUP_TICKET_RELATIONSHIPS,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
