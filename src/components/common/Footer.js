import React from 'react';
function Footer() {
	return (
		<footer tabIndex={0}>
			<div className='inner'>
				<h1>CHROME KITCHEN</h1>
				<ul>
					<li>
						<a href='#'>Policy</a>
					</li>
					<li>
						<a href='#'>Terms</a>
					</li>
					<li>
						<a href='#'>Contact</a>
					</li>
				</ul>

				<address>
					address : Lorem ipsum dolor sit consectetur adipisicin 05645
					<br />
					TEL : +82-2-22-2220-2114 <br />
					FAX : +82-2-22-2220-2115
				</address>
				<p>Copyright &copy; 2022 DCODELAB ALL Right Reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
