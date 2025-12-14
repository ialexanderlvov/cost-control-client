import React, { FC } from 'react';
import classNames from 'classnames';
import { IPortalProps } from './Portal.props';
import { createPortal } from 'react-dom';

export const Portal: FC<IPortalProps> = ({ className, children, ...props }) => {
	const modal = document.getElementById('modal')!;

	return createPortal(
		<div className={classNames('', className)} {...props}>
			{children}
		</div>,
		modal
	);
};
