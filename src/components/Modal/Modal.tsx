import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IModalProps } from './Modal.props';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { modalsActions } from '../../redux/slices/modals.slice';

export const Modal: FC<IModalProps> = ({ className, children, ...props }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.body.style.maxHeight = '100vh';
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.maxHeight = '';
			document.body.style.overflow = '';
		};
	}, []);
	return (
		<div
			onClick={(e) => dispatch(modalsActions.changeModal('none'))}
			className={classNames(
				'fixed inset-0 w-screen h-screen bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};
