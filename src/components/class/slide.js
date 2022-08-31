export class Slide {
	constructor(winWidth, width, num) {
		this.winWidth = winWidth; //모바일 브라우저 너비.
		this.num = num - 1; //슬라이드 갯수
		this.width = width; // 슬라이드 한 칸의 너비(%).
		this.nowPic = 0; // 현재 슬라이드 인덱스.
	}

	set start(n) {
		this.st = n;
	}
	get start() {
		return this.st;
	}

	slideMove(n) {
		//n= e.changedTouches[0].clientX;
		const move = this.st - n;
		const ratio = (move / this.winWidth) * 100;
		return `${this.nowPic * -this.width - ratio}`;
	}

	slideEnd(n) {
		//n= e.changedTouches[0].clientX;
		if (this.st - n > 50) {
			this.nowPic++;
			if (this.nowPic > this.num) this.nowPic = this.num;
		} else if (this.st - n < -50) {
			this.nowPic--;
			if (this.nowPic < 0) this.nowPic = 0;
		}
		return `${this.nowPic * -this.width}`;
	}
}
