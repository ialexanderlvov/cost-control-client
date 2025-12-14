import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecordComponentProps } from './RecordComponent.props';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux.hooks';
import {
	deleteRecordById,
	recordsActions,
} from '../../redux/slices/records.slice';
import { modalsActions } from '../../redux/slices/modals.slice';
import { Tag } from '../Tag/Tag';

export const RecordComponent: FC<IRecordComponentProps> = ({
	className,
	record,
	...props
}) => {
	const dispatch = useAppDispatch();

	const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteRecordById(record.id));
	};

	const onOpenHandler = () => {
		dispatch(recordsActions.getRecord(record));
		dispatch(modalsActions.changeModal('update-record'));
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={onOpenHandler}
			className={classNames(
				'text-sm flex items-center gap-4 py-2 px-3 rounded-xl transition-all hover:bg-gray-700 hover:shadow-sm cursor-pointer group border transition-colors hover:shadow-md',
				record.type === 'expense' 
					? 'border-l-4 border-l-danger/50 hover:border-l-danger' 
					: 'border-l-4 border-l-lime-500/50 hover:border-l-lime-500',
				className
			)}
			{...props}
		>
			<div className="w-full grid grid-cols-3 items-center px-4 py-2 pl-4">
				<span className="font-medium text-white">{record.name}</span>
				<span className="font-medium">
					<span className="flex gap-1.5 flex-wrap">
						{record.tags.map((tag) => (
							<Tag
								className="text-xs min-w-fit"
								key={tag}
							>
								{tag}
							</Tag>
						))}
					</span>
				</span>
				<span className={classNames(
					'font-bold justify-self-end text-base flex items-center gap-1',
					record.type === 'expense' ? 'text-danger' : 'text-lime-500'
				)}>
					<span className={record.type === 'expense' ? 'text-danger' : 'text-lime-500'}>
						{record.type === 'expense' ? '-' : '+'}
					</span>
					<span className={record.type === 'expense' ? 'text-danger' : 'text-lime-500'}>
						{record.sum.toLocaleString('ru')}
					</span>
					<span className="text-gray-400">₽</span>
				</span>
			</div>
			<Button
				onDoubleClick={onDeleteHandler}
				variant="danger"
				className="px-3 py-1.5 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100"
			>
				Удалить
			</Button>
		</div>
	);
};
