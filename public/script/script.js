let $ = require('jquery')
let fs = require('fs')
let syncClipboard = require('../../core/fcm')

let filename = 'clipboard_data'
let breaker = '<---->'

$('#sync').on('click', () => {
    let data = $('#data').val()
    if (data != '' || data != '\n')
        fs.appendFile(filename, `${data}\n${breaker}\n`)
    $('#data').val('')
    addEntry(data)
    syncClipboard(data)
})

function addEntry(data) {
    data = data.trim()
    if (data != '' && data != '\n') {
        let str = `<tr><td>${data}</td></tr>`
        $('#table-body').append(str)
    }
}

function loadData() {
    if (fs.existsSync(filename)) {
        console.log('exists')
        let data = fs.readFileSync(filename, 'utf8').split(breaker)

        data.forEach((content) => {
            console.log('content : "' + content + '"')
            addEntry(content)
        })
    } else {
        fs.writeFileSync(filename, '', (err) => {
            console.log(err)
        })
    }
}

loadData()