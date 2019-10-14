// Your code here
(function()
{
	let main = {
		multi: 0,
		player: true,
		canvas: false,
		ctx: false,
		width: 0,
		height: 0,
		fields: [],
		steps: 0,
		label: false,
		// инициализация объекта
		init: function()
		{
			this.multi = 3;
			this.width = this.height = this.multi * 100;
			this.label = document.getElementById('step-by-value');

			this.initCanvas();

			this.canvas.addEventListener('click', e =>
			{
				this.step(e);
			});
		},
		// создание канваса
		initCanvas()
		{
			this.canvas = document.querySelector('canvas');
			this.ctx = this.canvas.getContext('2d');

			document.querySelector('body').appendChild(this.canvas);

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.initMap();
		},
		// инициализация игрового поля
		initMap()
		{
			for (var i = 0; i < this.multi; i++)
			{
				let row = [];

				for (var j = 0; j < this.multi; j++)
					row.push(false);

				this.fields.push(row);
			}

			this.drawMap();
		},
		// рисует игровое поле
		drawMap()
		{
			this.ctx.beginPath();
			this.ctx.moveTo(0, 0);

			this.ctx.lineTo(0, this.height);
			this.ctx.lineTo(this.width, this.height);
			this.ctx.lineTo(this.width, 0);
			this.ctx.lineTo(0, 0);

			this.ctx.moveTo(this.width/3, 0);
			this.ctx.lineTo(this.width/3, this.height);

			this.ctx.moveTo(this.width/3*2, 0);
			this.ctx.lineTo(this.width/3*2, this.height);

			this.ctx.moveTo(0, this.height/3);
			this.ctx.lineTo(this.width, this.height/3);

			this.ctx.moveTo(0, this.height/3*2);
			this.ctx.lineTo(this.width, this.height/3*2);

			this.ctx.stroke();
		},
		// рассчет хода и вызов отрисовки
		step(e)
		{
			for (var j = 1; j < this.multi+1; j++)
				if (e.y <= this.height /this.multi * j)
					for (var i = 1; i < this.multi+1; i++)
						if (e.x <= this.width  /this.multi * i)
						{
							if (!this.fields[i-1][j-1])
							{
								this.player
								? this.fields[i-1][j-1] = 'X'
								: this.fields[i-1][j-1] = 'O';
								this.player = ! this.player;
								this.drawStep(i-1, j-1, this.fields[i-1][j-1]);
								this.updStepLabel(this.fields[i-1][j-1]);
							}
							return
						}
		},
		// отрисовка хода
		drawStep(x, y, value)
		{
			this.ctx.font = "60px Arial";
			this.ctx.fillText(value, this.width/this.multi*x + (this.multi * 10),  this.height/this.multi*y + (this.multi * 15));
			this.steps++;
			if (this.steps >= (this.multi * 2) -1) this.checkWinner();
		},
		// чей ход
		updStepLabel(value)
		{
			this.player
			? this.label.innerText = 'X'
			: this.label.innerText = 'O';
		},
		// победа
		winnerShow()
		{
			this.step = function(){return};
			document.getElementById('game-label').innerText = 'Победил  ' + this.label.innerText;
		},
		// ничья
		nooneShow()
		{
			this.step = function(){return};
			document.getElementById('game-label').innerText = 'Ничья';
		},
		// проверка на выигрыш
		checkWinner()
		{
			// строки
			for (var i = 0; i < this.multi; i++)
			{
				let row = true;
				for (var x = 1; x < this.multi; x++)
					if (this.fields[x - 1][i] != this.fields[x][i] || !this.fields[x][i])
					{
						row = false;
						break;
					}

				if (row)
				{
					this.winnerShow();
					return
				}
			}
			
			// столбцы
			for (var i = 0; i < this.multi; i++)
			{
				let column = true;

				for (var y = 1; y < this.multi; y++)
					if (this.fields[i][y - 1] != this.fields[i][y] || !this.fields[i][y])
					{
						column = false;
						break;
					}

				if (column)
				{
					this.winnerShow();
					return
				}
			}
			// диагонали
			let diag = true;

			for (var i = 1; i < this.multi; i++)
				if (this.fields[i - 1][i - 1] != this.fields[i][i] || !this.fields[i][i])
				{
					diag = false;
					break;
				}

			if (diag)
			{
				this.winnerShow();
				return
			}

			else
			{
				diag = true;

				for (var i = 1; i < this.multi; i++)
					if (this.fields[i - 1][Math.abs(i - this.multi)] != this.fields[i][Math.abs(i - this.multi + 1)])
					{
						diag = false;
						break;
					}

				if (diag)
				{
					this.winnerShow();
					return
				}
			}

			// ничья
			if(this.steps == this.multi*this.multi)
				this.nooneShow();
		}
	};

	main.init();
})();
