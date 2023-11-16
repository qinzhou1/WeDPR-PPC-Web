
var title

if (!localStorage.getItem('languageSet') || localStorage.getItem('languageSet') === 'zh') {
  title = '多方大数据隐私计算平台'
} else if (localStorage.getItem('languageSet') === 'en') {
  title = 'PPC'
}

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
