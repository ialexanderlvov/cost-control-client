import React, { FC } from 'react';
import classNames from 'classnames';
import { ITotalResultsProps } from './TotalResults.props';
import { Title } from '../Title/Title';

export const TotalResults: FC<ITotalResultsProps> = ({
	className,
	records,
	level,
	type,
	...props
}) => {
	const totalSum = records.reduce(
		(prev, record) =>
			record.type === 'expense' ? prev - record.sum : prev + record.sum,
		0
	);
	
	// Определяем цвет в зависимости от типа
	const getColorClass = () => {
		if (type === 'income') {
			return 'text-lime-500';
		}
		if (type === 'expense') {
			return 'text-danger';
		}
		// Для 'all' или когда type не передан, используем логику по знаку суммы
		return totalSum >= 0 ? 'text-lime-500' : 'text-danger';
	};
	
	return (
		<div className={classNames( className)} {...props}>
			<div className="bg-primary/15 rounded-xl px-6 py-3 shadow-medium border border-primary/30">
				<Title level={level} className="flex items-center gap-3 [&>h1]:text-white">
					<span className="text-gray-300 font-semibold">Итого:</span>
					<span className={classNames(
						'text-3xl font-bold',
						getColorClass()
					)}>
						{totalSum >= 0 ? '+' : ''}{totalSum.toLocaleString('ru')} ₽
					</span>
				</Title>
			</div>
		</div>
	);
};
