import { format } from 'date-fns';
import { getTransactions } from './get_transactions.js';
import { formatDataToSend, createTransactions, writeToFile } from './send_transactions.js';

// eslint-disable-next-line
console.log('🍏 Starting at:', format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
console.log('🍏 Getting transactions from Coverflex...');
const coverflexResponse = await getTransactions();
const list = coverflexResponse?.data.movements.list;

console.log('🍏 Preparing data...');
writeToFile(list);

console.log('🍏 Sending transactions to LunchMoney...');
const formatedData = formatDataToSend(list);
const requests = createTransactions(formatedData);
Promise.all([requests]).then(([lunchResponse]) => {
	// eslint-disable-next-line
	console.log('🍏 LunchMoney says:', lunchResponse.data);
});
