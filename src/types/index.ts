export interface Sport {
	id: string;
	label: string;
	icon: string;
}

export interface Category {
	id: string;
	label: string;
}

export interface Competition {
	id: string;
	label: string;
}

export interface Actor {
	id: string;
	label: string;
}

export interface Choice {
	id: string;
	odd: number;
	actor: {
		label: string;
	};
}

export interface BetData {
	id: string;
	label: string;
	choices: Choice[];
	question: {
		id: string;
		label: string;
	};
}

export interface Event {
	id: string;
	label: string;
	start: string;
	sport: Sport;
	category: Category;
	competition: Competition;
	bet: {
		[key: string]: BetData;
	};
}

export interface SelectedBet {
	key: string;
	eventLabel: string;
	choiceLabel: string;
	odd: number;
	question: string;
	eventId: string;
	choiceId: string;
}
