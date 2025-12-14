import React, { FC } from 'react';
import classNames from 'classnames';
import { ITagsProps } from './Tags.props';
import { Tag } from '../Tag/Tag';

export const Tags: FC<ITagsProps> = ({
	className,
	tags,
	onDeleteHandler,
	...props
}) => {
	if (tags.length === 0) {
		return <></>;
	}

	return (
		<div
			className={classNames(
				'flex gap-2 max-w-full flex-wrap',
				className
			)}
			{...props}
		>
			{tags.map((tag) => (
				<Tag key={tag} onClick={onDeleteHandler(tag)}>
					{tag}
				</Tag>
			))}
		</div>
	);
};
