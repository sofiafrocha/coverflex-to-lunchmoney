import * as fs from 'fs';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { format } from 'date-fns';

dotenv.config();

const currentDate = format(new Date(), 'yyyy-MM-dd_HH:mm');
const config = {
	headers: { Authorization: `Bearer ${process.env.LM_ACCOUNT_TOKEN}` },
};

export function writeToFile(contents, prefix = 'movements') {
	fs.writeFileSync(`logs/${prefix}-${currentDate}`, JSON.stringify(contents));
}

export function createTransactions(request) {
	return axios.post('https://dev.lunchmoney.app/v1/transactions', request, config);
}

export function formatDataToSend(source, shouldWriteToFile = true) {
	const transactions = source.map((entry) => {
		const amount = parseFloat(entry.amount.amount / 100);
		return {
			date: format(new Date(entry.executed_at), 'yyyy-MM-dd'),
			amount: entry.is_debit ? amount * -1 : amount,
			payee: entry.description,
			status: 'cleared',
			external_id: entry.id,
		};
	});
	const result = {
		apply_rules: true,
		skip_duplicates: true,
		check_for_recurring: false,
		debit_as_negative: true,
		transactions,
	};

	if (shouldWriteToFile) {
		writeToFile(result, 'formatted');
	}
	return result;
}
