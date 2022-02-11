const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge');

const eventBus = process.env.EVENTBRIDGE_BUS || 'bus-name';
const eventSource = process.env.EVENTBRIDGE_SOURCE || 'moduscreate.default';

exports.handle = async (event, context) => {
  console.log(`Handler::createEvent\n${JSON.stringify(event, null, 2)}`);

  const { type, detail = {} } = JSON.parse(event.body);

  const client = new EventBridgeClient();
  const input = {
    Entries: [
      {
        EventBusName: eventBus,
        Source: eventSource,
        DetailType: type,
        Detail: JSON.stringify(detail),
      },
    ],
  };
  console.log(`EventBridge::PutEventsCommandInput:\n${JSON.stringify(input, null, 2)}`);
  const output = await client.send(new PutEventsCommand(input));
  console.log(`EventBridge::PutEventsCommandOutput\n${JSON.stringify(output, null, 2)}`);

  const response = {
    eventId: output.Entries[0].EventId,
    bus: eventBus,
    source: eventSource,
    detailType: type,
    detail,
  };

  return formatResponse(response);
};

const formatResponse = (response, statusCode = 200) => {
  const body = response ? JSON.stringify(response) : undefined;
  return {
    statusCode,
    body,
  };
};