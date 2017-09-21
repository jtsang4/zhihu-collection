const zhihu = require('zhihu')
const genPostHTMLString = require('./genPostHTMLString') // 用于生成 post 的模块
const genAnswerHTMLString = require('./genAnswerHTMLString') // 用于生成 answer 的模块

const query = '我'
const pathname = window.location.pathname
const url = 'https://www.zhihu.com' + pathname

zhihu.Collection.getAllPageData(url).then(collections => {
	if (Array.isArray(collections)) {
		const results = collections.filter(collection => {
			return collection.question.title.indexOf(query) !== -1
		})

		const htmlStringArray = results.map(collection => {
			// 针对 post 和 answer 分别生成不同的 HTML
			const collectionType = Number.isNaN(collection.aid) ? 'post' : 'answer'
			if (collectionType === 'post') {
				const postHTMLString = genPostHTMLString(collection)
				return postHTMLString
			} else {
				const answerHTMLString = genAnswerHTMLString(collection)
				return answerHTMLString
			}
		})

		// 将得到的字符串回填到页面区域中
		const parentElem = document.getElementById('zh-list-collection-wrap')
		parentElem.innerHTML = htmlStringArray.join('')
	} else {
		// 提示返回数据错误
		console.log('getAllPageData请求，返回数据错误')
	}
})

// Node.js 调用测试
// let url = 'https://www.zhihu.com/collection/89664750?page=1'

// zhihu.Collection.getDataByPage(url).then(function(collections) {
// 	var results = collections.filter(function(collection) {
// 		return collection.question.title.indexOf(query) !== -1
// 	})

// 	console.log(results)
// })