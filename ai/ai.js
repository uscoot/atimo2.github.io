var AI = function(m, R) {
	class AI {
		//初始化,开始游戏
		// first 是否电脑先手
		// randomOpening 是否随机开局库，不随机的话电脑会直接下中间
		start(first, randomOpening) {
			if (first) {
				if (randomOpening) {
					const names = []
					for (var k in open26) {
						names.push(k)
					}
					const n = names[parseInt(Math.random() * 26)]
					console.log("n:", n)
					const o = open26[n]();
					board.init(o);
					return {
						board: o,
						name: o.name
					}
				} else {
					var open = open1();
					board.init(open);
					return {
						board: open
					}
				}
			} else {
				board.init(15)
				return {
					board: undefined
				}
			}
		}

		//电脑下棋
		begin() {
			let p
			if (board.allSteps.length > 1) {
				p = opening(board)
			}
			p = p || m(undefined, config.searchDeep)
			board.put(p, R.com, true)
			return p
		}

		//下子并计算
		turn(x, y) {
			this.set(x, y, R.hum)
			return this.begin()
		}

		//只下子，不做计算
		set(x, y, r) {
			board.put([x, y], r, true)
		}

		//悔棋
		backward() {
			board.backward()
		}
		//悔棋
		forward() {
			board.forward()
		}
	}
	return AI;
}(negamax, role);
