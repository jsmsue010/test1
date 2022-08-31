import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const Popup = ({ children, setOpen, setFocusOn, type }) => {
	const [on, setOn] = useState(true);

	const modal = useRef(null);

	useEffect(() => {
		if (modal) {
			modal.current.focus();
		}
	}, []);

	const focusMove = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			modal.current.focus();
		}
	};

	return (
		<AnimatePresence>
			{on && (
				<div className='popup-wrap' ref={modal} tabIndex={0}>
					<motion.aside
						className='popup'
						initial={{ opacity: 0 }} //초기상태
						animate={{ opacity: 1 }} //해당 컴포넌트가 생성될 때 실행될 값.
						exit={{ opacity: 0, transition: { delay: 0.5 } }}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.5 } }}
							exit={{ opacity: 0 }}>
							{children}
						</motion.div>
						<button
							className='close'
							onClick={() => {
								setOn(false);
								setTimeout(() => setOpen(false), 1100);
								if (type === 'adv') {
									setFocusOn('adv');
								} else if (type === 'sps') {
									setFocusOn('sps');
								} else {
									setFocusOn(true);
								}
							}}
							onKeyDown={focusMove}>
							CLOSE
						</button>
					</motion.aside>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Popup;
