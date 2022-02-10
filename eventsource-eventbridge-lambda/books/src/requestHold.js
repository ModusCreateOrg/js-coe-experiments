const { isBookAvailable, isBookAvailableAtBranch } = require('./utils/availability');

exports.handle = async (event, context) => {
  console.log(`Handler::requestHold\n${JSON.stringify(event, null, 2)}`);

  const { detail = {} } = event;
  console.log(`Hold requested for book ${detail.bookId} at branch ${detail.branchId} by account ${detail.accountId}.`);

  // check branch availability
  if (isBookAvailable(detail.bookId)) {
    // if available at branch then transimit 'Ready for Pickup' event;
    if (isBookAvailableAtBranch(detail.bookId, detail.branchId)) {
      console.log(`Book ${detail.bookId} has copies available at branch ${detail.branchId}. Ready for pick up.`);
    } else {
      // otherwise send 'Transfer Requested' event
      console.log(
        `Book ${detail.bookId} has copies available at other branches. Request transfer to branch ${detail.branchId}.`
      );
    }
  } else {
    // send 'Add to Wait List' event
    console.log(`Book ${detail.bookId} not currently available. Adding to wait list.`);
  }

  return {
    status: 200,
    statusText: 'OK',
    data: {
      event,
    },
  };
};
