const returnEightLanguage = (
  zh_CN: string,
  en: string,
  de: string,
  es: string,
  fr: string,
  it: string,
  ja: string,
  ko: string,
) => ({
  zh_CN,
  en,
  de,
  es,
  fr,
  it,
  ja,
  ko,
})

const websiteTitle = {
  title: returnEightLanguage(
    '打造无缝蓝牙体验',
    'Creating a seamless Bluetooth experience',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
  subTitle: returnEightLanguage(
    '每一个音符清晰回响 喧嚣世界悄然退场',
    'where every note resonates with clarity and the noise of the world fades away',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
}

const productDetailInfo = {
  about_this_Item: returnEightLanguage('关于此产品', 'About this Item', '', '', '', '', '', ''),
  productManual: returnEightLanguage('产品手册', 'Product Manual', '', '', '', '', '', ''),
}

const footer = {
  copyright: returnEightLanguage(
    'Copyright © 深圳市爱科贝电子有限公司 | All Rights Reserved',
    'Copyright © 2026 Shenzhen Ankbit Electronics Limited | All Rights Reserved',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
  privacyPolicy: returnEightLanguage('隐私政策', 'Privacy Policy', '', '', '', '', '', ''),
  contactInfo: returnEightLanguage('联系信息', 'Contact Information', '', '', '', '', '', ''),
  AboutUs: returnEightLanguage('关于我们', 'About Us', '', '', '', '', '', ''),
  contactUs: returnEightLanguage('联系我们', 'Contact Us', '', '', '', '', '', ''),
  followUS: returnEightLanguage('关注我们', 'Follow Us', '', '', '', '', '', ''),
  address: returnEightLanguage(
    '地址：  广东省深圳市宝安区固戍润丰工业园B栋',
    'Add: Bldg B, Runfeng Industrial Park, Gushu, Baoan Dist, Shenzhen, China',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
  tel: returnEightLanguage('电话：  +852-27896065', 'Tel: +852-27896065', '', '', '', '', '', ''),
  after_sales_email: returnEightLanguage(
    '邮箱:  sales@ankbit.com',
    'Support Email: sales@ankbit.com',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
  sales_email: returnEightLanguage('', 'Sales Email: sales@ankbit.com', '', '', '', '', '', ''),
  companyProfile: returnEightLanguage('公司简介', 'Company Profile', '', '', '', '', '', ''),
  aboutUs: returnEightLanguage('关于我们', 'aboutUs', '', '', '', '', '', ''),
  ourValue: returnEightLanguage('公司简介', 'Company-profile', '', '', '', '', '', ''),
  R_D: returnEightLanguage('研发中心', 'R&D', '', '', '', '', '', ''),
  globalLayout: returnEightLanguage('全球布局', 'Global Layout', '', '', '', '', '', ''),
  follow_channel: returnEightLanguage(
    'Get our updates, please contact us through one of following channels.',
    'Get our updates, please contact us through one of following channels.',
    '',
    '',
    '',
    '',
    '',
    '',
  ),
}

export default {
  productDetailInfo,
  footer,
  websiteTitle,
}
