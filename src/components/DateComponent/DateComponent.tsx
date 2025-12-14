import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IDateComponentProps } from './DateComponent.props';
import { Category } from '../Category/Category';
import { Title } from '../Title/Title';
import { TotalResults } from '../TotalResults/TotalResults';

export const DateComponent: FC<IDateComponentProps> = ({
	className,
	records,
	date,
	...props
}) => {
	const [open, setOpen] = useState(true);
	const categories = Array.from(
		new Set(records.map((record) => record.category.name))
	).sort((a, b) => {
		if (a.toLowerCase() < b.toLowerCase()) {
			return -1;
		}
		if (a.toLowerCase() > b.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	return (
		<div className={classNames('', className)} {...props}>
			<Title
				onClick={(e) => setOpen((p) => !p)}
				level={2}
				className={classNames(
					'flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer border-2 border-dashed border-gray-600 bg-gray-800/50 transition-all hover:bg-gray-700 hover:border-primary/40 hover:shadow-sm',
					'[&>h2]:m-0 [&>h3]:m-0 [&>h4]:m-0 [&>h1]:m-0 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-white'
				)}
			>
				<span>
					{new Date(date).toLocaleString('ru').split(', ')[0]}
				</span>
				<span className="text-primary">
					<TotalResults level={3} records={records} />
				</span>
			</Title>
			{open && (
				<div className="mt-6 flex flex-col gap-8">
					{categories.map((cat) => (
						<Category
							key={cat}
							name={cat}
							records={records.filter(
								(record) => record.category.name === cat
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
