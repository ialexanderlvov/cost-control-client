import React, {
	FC,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
import classNames from 'classnames';
import { IInputWithDropdownProps } from './InputWithDropdown.props';
import { Input } from '../Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { tagsActions } from '../../redux/slices/tags.slice';

export const InputWithDropdown: FC<IInputWithDropdownProps> = ({
	className,
	onClickAddHandler,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const { tags, activeTags } = useAppSelector((state) => state.tagsReducer);
	const [search, setSearch] = useState('');
	const dispatch = useAppDispatch();

	const searchedTags = useMemo(
		() => tags.filter((tag) => tag.name.match(new RegExp(search, 'gim'))),
		[tags, search]
	);

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && search !== '') {
			onClickAddHandler(search)();
			setSearch('');
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) {
			const handler = (e: any) => {
				if (!(e.target instanceof Element)) {
					return;
				}
				if (!e.target.closest('[data-tag-search-wrap]')) {
					setOpen(false);
				}
			};
			window.addEventListener('mousedown', handler);
			window.addEventListener('touchstart', handler);

			return () => {
				window.removeEventListener('mousedown', handler);
				window.removeEventListener('touchstart', handler);
			};
		}
	}, [open]);

	return (
		<div
			data-tag-search-wrap
			className={classNames('relative w-full h-[35px]', className)}
			{...props}
		>
			<div className="flex flex-col gap-2 absolute top-0 left-0 w-full">
				<Input
					onKeyDown={onKeyDownHandler}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={(e) => setOpen(true)}
					placeholder="Тэги"
					className="font-semibold"
				/>
				{open && searchedTags.length !== 0 && (
					<div className="flex flex-col bg-gray-800 rounded-xl border border-gray-700 w-full max-h-[200px] overflow-y-auto shadow-large z-10 mt-2">
						{searchedTags.map((item) => (
							<div
								onClick={(e) => {
									onClickAddHandler(item.name)();
									setOpen(false);
									setSearch('');
								}}
								key={item.name}
								className="w-full px-4 py-2.5 text-sm font-medium cursor-pointer transition-all hover:bg-primary/20 hover:text-primary border-b border-gray-700 last:border-b-0 first:rounded-t-xl last:rounded-b-xl text-white"
							>
								{item.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
