import DeviceInfo from 'react-native-device-info';

export default {
  "API": "http://206.189.134.208:8080/gym/swagger-ui.html/api/",
  "success": "✅ Success",
  "failed": "❌ Failed",
  "fail_error": "Something went wrong 😭",
  "no_entry": "🚫 Wrong Credentials",
  "not_approved": "⚠️ Approval Pending",
  "warning": "⚠️ Warning",
  "incomplete_info": "⚠️ Warning",
  'header_text': 'white',
  'header': 'black',
  'logout': '#d1274b',
  'card_body': '#ebe6e6',
  'card_header': "#f4f4f4",
  'screen_color': '#F4EAE6',
  "yellow": "#ffd369",
  'admin_tab_background': '#C68D95',
  'admin_tab_active': '#A5525F',
  'item_card': '#A76270',
  'admin_home_hscroll': "#D5ABB2",
  'text_highlight': '#4d80e4',
  'text_highlight_danger': '#801336',
  'active_color': 'green',
  "green_money": "#2c7873",
  "red_money": '#801336',
  'archive_color': 'red',
  "version_number": DeviceInfo.getVersion(),
  "indian_currency": '₹',
  "dollar": '$'
}