const remote = require('electron').remote
const dialog = remote.dialog

function show_alert() {
    dialog.showErrorBox('告警', '测试告警')
}