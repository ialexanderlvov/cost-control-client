import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICategoryProps } from './Category.props';
import { Title } from '../Title/Title';
import { RecordComponent } from '../RecordComponent/RecordComponent';
import { TotalResults } from '../TotalResults/TotalResults';

export const Category: FC<ICategoryProps> = ({
	className,
	name,
	records,
	...props
}) => {
	const [open, setOpen] = useState(true);

	return (
		<div
			onClick={(e) => setOpen((p) => !p)}
			className={classNames('flex flex-col pl-6 gap-4', className)}
			{...props}
		>
			<Title
				className={classNames(
					'flex items-center justify-between pb-3 px-4 border-b border-gray-700 transition-all rounded-lg hover:bg-gray-800 cursor-pointer [&>h3]:text-white'
				)}
				level={3}
			>
				<span>{name}</span>
				<span>
					<TotalResults level={4} records={records} />
				</span>
			</Title>
			{open && (
				<div className="flex flex-col gap-1">
					{records
						.sort(
							(a, b) =>
								new Date(b.updatedAt).getTime() -
								new Date(a.updatedAt).getTime()
						)
						.map((record) => (
							<RecordComponent key={record.id} record={record} />
						))}
				</div>
			)}
		</div>
	);
};
