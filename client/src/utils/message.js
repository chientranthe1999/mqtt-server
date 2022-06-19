import { Message } from 'element-ui'

export default class ToastMessage {
  static success(message = 'Thành công') {
    Message.closeAll()
    return Message({
      message: message,
      type: 'success',
      duration: 2000,
      offset: 10
    })
  }
  static error(message = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.', duration = 3000) {
    Message.closeAll()
    return Message({
      message: message,
      type: 'error',
      duration: duration,
      offset: 10
    })
  }
}
