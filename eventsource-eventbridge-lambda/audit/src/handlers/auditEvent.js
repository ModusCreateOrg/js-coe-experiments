exports.handle = async (event, context) => {
  console.log(`Handler::auditEvent`);
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  const { detail = {} } = event;

  return {
    status: 200,
    statusText: 'OK',
  };
};
