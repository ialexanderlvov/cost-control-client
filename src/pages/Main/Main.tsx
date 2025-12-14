import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { IMainProps } from './Main.props';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { Modals } from '../../components/Modals/Modals';
import { InputWithDropdown } from '../../components/InputWithDropdown/InputWithDropdown';
import { fetchTags, tagsActions } from '../../redux/slices/tags.slice';
import { Tags } from '../../components/Tags/Tags';
import { fetchRecords, recordsActions } from '../../redux/slices/records.slice';
import { modalsActions } from '../../redux/slices/modals.slice';
import { fetchCategories } from '../../redux/slices/categories.slice';
import { TotalResults } from '../../components/TotalResults/TotalResults';
import { DateComponent } from '../../components/DateComponent/DateComponent';
import { useDebounce } from '../../hooks/useDebounce';
import { searchActions } from '../../redux/slices/search.slice';
import { IRecord } from '../../interfaces/record.interface';

export const Main: FC<IMainProps> = ({ className, ...props }) => {
	const [searchLocal, setSearchLocal] = useState('');
	const [category, setCategory] = useState('Все категории');
	const updatedSearch = useDebounce(searchLocal, 300);
	const dispatch = useAppDispatch();

	const { type, lastDate, startDate } = useAppSelector(
		(state) => state.recordsReducer
	);
	const { activeTags } = useAppSelector((state) => state.tagsReducer);
	const { records } = useAppSelector((state) => state.recordsReducer);
	const { categories } = useAppSelector((state) => state.categoriesReducer);
	const { search } = useAppSelector((state) => state.searchReducer);

	const currentRecords = useMemo(() => {
		let currentRecords: IRecord[] = records;

		if (search) {
			currentRecords = currentRecords.filter((record) => {
				const isSearch = !!record.name.match(new RegExp(search, 'gim'));
				return isSearch;
			});
		}
		if (activeTags.length) {
			currentRecords = currentRecords.filter((record) => {
				let isTags = false;
				for (const activeTag of activeTags) {
					let check = false;
					for (const tag of record.tags) {
						if (activeTag === tag) {
							check = true;
						}
					}
					if (!check) {
						isTags = false;
						break;
					}
					isTags = true;
				}
				return isTags;
			});
		}
		if (category !== 'Все категории') {
			currentRecords = currentRecords.filter(
				(record) => record.category.name === category
			);
		}
		return currentRecords;
	}, [records, search, activeTags, category]);

	const dates = useMemo(
		() => Array.from(new Set(currentRecords.map((record) => record.date))),
		[currentRecords]
	);

	const onClickAddHandler = (tag: string) => {
		return () => {
			dispatch(tagsActions.changeActiveTags(tag));
		};
	};
	const onDeleteHandler = (name: string) => {
		return () => dispatch(tagsActions.deleteTag(name));
	};

	useEffect(() => {
		dispatch(fetchTags());
		dispatch(fetchCategories());
	}, []);

	useEffect(() => {
		dispatch(fetchRecords());
	}, [type, dispatch, lastDate, startDate]);

	useEffect(() => {
		dispatch(searchActions.changeSearch(updatedSearch));
	}, [updatedSearch, dispatch]);

	return (
		<div
			className={classNames(
				'min-h-screen p-6 pb-[300px]',
				className
			)}
			{...props}
		>
			<Modals />
			<div className="flex gap-3 fixed top-6 right-6 z-40">
				<Button
					onClick={(e) =>
						dispatch(modalsActions.changeModal('create-category'))
					}
					className="!bg-gray-700 !text-white px-6 py-3 hover:!bg-gray-600 shadow-lg hover:shadow-xl transition-all !border-gray-600 rounded-xl font-semibold"
				>
					Новая категория
				</Button>
				<Button
					onClick={(e) =>
						dispatch(modalsActions.changeModal('create-record'))
					}
					className="!bg-primary !text-gray-900 px-6 py-3 hover:!bg-primary-light shadow-lg hover:shadow-xl transition-all !border-primary rounded-xl font-semibold"
				>
					Новая запись
				</Button>
			</div>
			<div className="w-full max-w-5xl mx-auto flex flex-col gap-4 mb-8 bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-medium border border-gray-700/50">
				<div className="flex gap-3 flex-wrap">
					<Button
						onClick={(e) =>
							dispatch(recordsActions.changeType('expense'))
						}
						active={type === 'expense'}
						variant="primary"
						className="min-w-[120px]"
					>
						Расходы
					</Button>
					<Button
						onClick={(e) =>
							dispatch(recordsActions.changeType('income'))
						}
						active={type === 'income'}
						variant="primary"
						className="min-w-[120px]"
					>
						Доходы
					</Button>
					<Button
						onClick={(e) =>
							dispatch(recordsActions.changeType('all'))
						}
						active={type === 'all'}
						variant="primary"
						className="min-w-[120px]"
					>
						Общее
					</Button>
				</div>
				<div className="flex gap-2 flex-wrap">
					<Input
						value={startDate}
						type="date"
						onChange={(e) => {
							if (e.target.value) {
								dispatch(
									recordsActions.changeDateRange({
										startDate: e.target.value,
										lastDate,
									})
								);
							}
						}}
					/>
					<Input
						value={lastDate}
						type="date"
						onChange={(e) => {
							if (e.target.value) {
								dispatch(
									recordsActions.changeDateRange({
										startDate,
										lastDate: e.target.value,
									})
								);
							}
						}}
					/>
				</div>
				<div className="w-full">
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full"
					>
						<option value={'Все категории'}>Все категории</option>
						{categories.map((cat) => (
							<option key={cat.name} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-full">
					<Input
						name="cost-search-input"
						value={searchLocal}
						onChange={(e) => setSearchLocal(e.target.value)}
						placeholder="Поиск по названию"
					/>
				</div>
				<div className="w-full">
					<InputWithDropdown onClickAddHandler={onClickAddHandler} />
				</div>
				<div className="w-full">
					<Tags onDeleteHandler={onDeleteHandler} tags={activeTags} />
				</div>
			</div>
			<main className="w-full max-w-5xl mx-auto mt-6">
				<TotalResults
					className="mb-8"
					records={currentRecords}
					level={1}
					type={type}
				/>
				<div className="mt-6 flex flex-col gap-16">
					{dates.map((date) => (
						<DateComponent
							key={date}
							date={date}
							records={currentRecords.filter(
								(record) => record.date === date
							)}
						/>
					))}
				</div>
			</main>
		</div>
	);
};
