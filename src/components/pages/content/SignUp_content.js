import React, { useState, useEffect } from 'react';
import { path } from './main/Main_content';

function SignUp_content() {
	const initVal = {
		id: '',
		pwd1: '',
		pwd2: '',
		name: '',
		gender: null,
		address: '',
		address2: '',
		birth: '',
		phone2: '',
		phone3: '',
		email: '',
	};
	const [val, setVal] = useState(initVal);
	const [pass, setPass] = useState(false);
	const [msg, setMsg] = useState({});
	const [ck, setCk] = useState(false);

	const check = (val) => {
		console.log(val);
		const err = {};

		const string = /[a-zA-Z]/;
		const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		const number = /[0123456789]/;
		const spc = /[~!@#$%^&*()(_+)]/;

		if (!val.agreement) err.agreement = '약관에 동의해주세요';
		if (val.id.length < 5) err.id = '5글자 이상 입력하여주세요';
		if (val.pwd1.length < 8 || !number.test(val.pwd1) || !spc.test(val.pwd1))
			err.pwd1 = '숫자와 특수문자를 포함한 비밀번호를 8자이상 입력하여주세요';
		if (val.pwd1 !== val.pwd2) err.pwd2 = '비밀번호를 확인해주세요';
		if (number.test(val.name) || spc.test(val.name) || !ko.test(val.name))
			err.name = '이름을 정확히 입력해주세요';
		if (!val.gender) err.gender = '성별을 선택하여 주세요';
		if (
			!number.test(val.address) ||
			spc.test(val.address) ||
			string.test(val.address)
		)
			err.address = '우편번호를 정확히 입력해주세요';
		if (spc.test(val.address2) || !string.test(val.address2))
			err.address2 = '나머지 주소를 정확히 입력해주세요';
		if (
			!number.test(val.birth) ||
			spc.test(val.birth) ||
			string.test(val.birth)
		)
			err.birth = '숫자로만 입력해주세요';
		if (
			!number.test(val.phone2) ||
			!number.test(val.phone3) ||
			string.test(val.phone2) ||
			string.test(val.phone3) ||
			spc.test(val.phone2) ||
			spc.test(val.phone3)
		)
			err.phone = '숫자로만 입력해주세요';

		if (!/[@]/.test(val.email))
			err.email = '@를 포함하여 이메일을 입력해주세요';

		return err;
	};
	const submit = () => {
		const res = check(val);
		const data = Object.keys(res);
		if (data.length === 0) {
			alert('회원가입 되셨습니다');
		} else {
			setMsg(res);
			setPass(false);
		}
	};
	const handleVal = (e) => {
		const { name, value } = e.target;
		const trimed = value.trim();
		setVal({ ...val, [name]: trimed });
	};
	const handleRadio = (e) => {
		const { name } = e.target;
		const ch = e.target.checked;
		setVal({ ...val, [name]: ch });
	};
	const handleCheck = (e) => {
		const { name } = e.target;
		const ck = e.target.checked;
		setVal({ ...val, [name]: ck });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		console.log(val);
	}, [val]);

	return (
		<article className='sign-up'>
			<h1>WELCOME TO CHROME KITCHEN</h1>
			<div className='inner'>
				<section className='welcome'>
					<div className='welcome_box'>
						<div className='circle'>
							<img src={`${path}/img/faq.jpg`} alt='' />
						</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
					</div>

					<div className='welcome_box'>
						<div className='circle'>
							<img src={`${path}/img/toast.jpg`} alt='' />
						</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
					</div>

					<div className='welcome_box'>
						<div className='circle'>
							<img src={`${path}/img/Ticino.jpg`} alt='' />
						</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
					</div>
				</section>

				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend className='h'>회원가입 양식</legend>

						<div className='wrapper1'>
							<h2>필수항목</h2>
							<div className='wrap'>
								<label htmlFor='terms'>
									<textarea
										name='terms'
										id='terms'
										cols='30'
										rows='10'
										spellCheck='false'
										defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit.Quod numquam magnam unde eius impedit quisquam repellendus	possimus magni suscipit voluptas soluta ex voluptate iste,aperiam quae in vitae, sapiente deserunt officia at vel. Maxime magnam non, nisi labore atque ipsum esse facilis consequuntur doloribus consectetur quod error natus, consequatur deserunt tenetur dolorem quidem eos, ipsam voluptatum earum incidunt illum. Similique rem a quod, suscipit beatae expedita sapiente nihil velit laboriosam voluptates modiex hic minus id! Labore, tenetur? Maxime sint dolorum quasi architecto beatae, tenetur corrupti magnam nulla atque perferendis ea non, perspiciatis provident labore. Sequi aperiam enim tenetur fugit. Lort. nisi labore atque ipsum esse facilis consequuntur doloribus consectetur quod error natus, consequatur deserunt tenetur dolorem quidem eos, ipsam voluptatum earum incidunt illum. Similique rem a quod, suscipit beatae expedita sapiente nihil velit laboriosam voluptates modiex hic minus id! Labore, tenetur? Maxime sint dolorum. nisi labore atque ipsum esse facilis consequuntur doloribus consectetur quod error natus, consequatur deserunt tenetur dolorem quidem eos, ipsam voluptatum earum incidunt illum. Similique rem a quod, suscipit beatae expedita sapiente nihil velit laboriosam voluptates modiex hic minus id! Labore, tenetur? Maxime sint dolorum
										`}
									/>
								</label>
								<div className='agreement'>
									<label htmlFor='agreement'>
										<input
											type='checkbox'
											id='areement'
											name='agreement'
											onChange={handleCheck}
										/>
										약관에 동의합니다
									</label>
									<span className='err'>{msg.agreement}</span>
								</div>
							</div>

							<table>
								<caption className='h'>회원가입 양식</caption>
								<tbody>
									<tr>
										<th scope='row'>
											<label htmlFor='id'>USER ID</label>
										</th>
										<td>
											<input
												type='text'
												id='id'
												name='id'
												placeholder=' 영어 대소문 구분없이 5자 이상'
												onChange={handleVal}
											/>
											<span className='err'>{msg.id}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='pawd1'>PASSWORD</label>
										</th>
										<td>
											<input
												type='text'
												name='pwd1'
												id='pwd1'
												placeholder='영어, 숫자, 특수문자를 혼합하여 8자 이상'
												onChange={handleVal}
											/>
											<span className='err'>{msg.pwd1}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='pwd2'>RE-PASSWORD</label>
										</th>
										<td>
											<input
												type='text'
												name='pwd2'
												id='pwd2'
												placeholder='입력하신 비밀번호를 한번 더 입력해주세요'
												onChange={handleVal}
											/>
											<span className='err'>{msg.pwd2}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='name'>이름</label>
										</th>
										<td>
											<input
												type='text'
												name='name'
												id='name'
												onChange={handleVal}
											/>
											<span className='err'>{msg.name}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='gender'>성별</label>
										</th>
										<td>
											<input
												type='radio'
												name='gender'
												id='male'
												value='남성'
												onChange={handleRadio}
											/>
											남성
											<input
												type='radio'
												name='gender'
												id='female'
												value='여성'
												onChange={handleRadio}
											/>
											여성
											<span className='err'>{msg.gender}</span>
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='address'>우편번호</label>
										</th>
										<td>
											<input
												type='text'
												name='address'
												id='address'
												onChange={handleVal}
												placeholder='숫자로만 입력해주세요'
											/>
											<button>검색</button>
											<span className='err'>{msg.address}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='address2'>나머지 주소</label>
										</th>
										<td>
											<input
												type='text'
												id='address2'
												name='address2'
												placeholder='나머지 주소를 입력해주세요'
												onChange={handleVal}
											/>
											<span className='err'>{msg.address2}</span>
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='birth'>생년월일</label>
										</th>
										<td>
											<input
												type='text'
												name='birth'
												id='birth'
												onChange={handleVal}
												placeholder='숫자로만 입력해주세요'
											/>
											<span className='err'>{msg.birth}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='phone1'>휴대폰</label>
										</th>
										<td>
											<select name='phone1' id='phone1'>
												<option value='010'>010</option>
												<option value='011'>017</option>
												<option value='011'>018</option>
											</select>
											-
											<input
												type='text'
												id='phone2'
												name='phone2'
												onChange={handleVal}
												placeholder='숫자로만 입력'
											/>
											-
											<input
												type='text'
												id='phone3'
												name='phone3'
												onChange={handleVal}
												placeholder='숫자로만 입력'
											/>
											<span className='err'>{msg.phone}</span>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='email'>Email</label>
										</th>
										<td>
											<input
												name='email'
												id='email'
												type='text'
												placeholder='이메일을 입력해주세요'
												onChange={handleVal}
											/>
											<span className='err'>{msg.email}</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className='wrapper2'>
							<div className='pic'>
								<img src={`${path}/img/join.png`} alt='' />
							</div>

							<h2>선택 항목</h2>
							<table>
								<caption className='h'>회원가입 선택항목</caption>
								<tbody>
									<tr>
										<th rowSpan='2' scope='row'>
											멤버십등록
										</th>
										<td>
											<label htmlFor='store1'>구입처</label>
											<select name='store2' id='store2'>
												<option value='store'>전자상가</option>
												<option value='onlineMall'>온라인 공식몰</option>
												<option value='flagStore'>플래그쉽 스토어</option>
												<option value='departmentStore'>백화점</option>
											</select>
										</td>
									</tr>

									<tr>
										<td>
											<label htmlFor='data'> 구입날짜</label>
											<input type='text' id='date' name='date' />
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='coupon'>쿠폰 번호</label>
										</th>
										<td>
											<input type='text' id='coupon' name='coupon' />
											<button>번호 확인</button>
										</td>
									</tr>
									<tr>
										<th scope='row'>sms 알림</th>
										<td>
											<label htmlFor='sms1'>
												<input type='radio' id='sms1' name='sms' />
												받습니다
											</label>
											<label htmlFor='sms2'>
												<input type='radio' id='sms2' name='sms' />
												받지 않습니다
											</label>
										</td>
									</tr>
									<tr>
										<th scope='row'>
											<label htmlFor='recomend'>추천인</label>
										</th>
										<td>
											<input type='text' id='recomend' name='recomend' />
										</td>
									</tr>
									<tr>
										<th colSpan='2' scope='row'>
											<input
												type='submit'
												id='submit'
												name='submit'
												value='회원가입'
												onClick={submit}
											/>
											<input
												type='reset'
												id='reset'
												name='reset'
												value='가입 취소'
											/>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
					</fieldset>
				</form>
			</div>
		</article>
	);
}

export default SignUp_content;
