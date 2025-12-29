/**
 * 登录页面 url 地址
 */
export const LOGIN_PATH = '/auth/login';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN';
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

export const PAGE_NUMBER = 1; // 分页页码
export const PAGE_SIZE = 20; // 分页页长
export const PAGE_SIZE_MAX = 1000; // 分页页长最大值
export const PAGE_DEFAULT_OPTIONS = {
  pn: PAGE_NUMBER,
  ps: PAGE_SIZE,
};
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]; // 分页页长选项

export enum SignupModeEnum {
  SIGNUP_MODE_EMAIL_CODE = 'sm_e_c',
  SIGNUP_MODE_MOBILE_CODE = 'sm_m_c',
  SIGNUP_MODE_USERNAME_PWD = 'sm_u_p',
}

export enum OrgNodeTypeEnum {
  ORG_NODE_TYPE_COMPANY,
  ORG_NODE_TYPE_DEPART,
  ORG_NODE_TYPE_STAFF,
  ORG_NODE_TYPE_POSITION,
}

export enum OrgNodeTypeNameEnum {
  ORG_NODE_TYPE_COMPANY = '公司',
  ORG_NODE_TYPE_DEPART = '部门',
  ORG_NODE_TYPE_STAFF = '员工',
  ORG_NODE_TYPE_POSITION = '职位',
}

export enum OrgNodeTypeStrEnum {
  ORG_NODE_TYPE_COMPANY = 'company',
  ORG_NODE_TYPE_DEPART = 'depart',
  ORG_NODE_TYPE_STAFF = 'staff',
  ORG_NODE_TYPE_POSITION = 'position',
}

/**
 * 员工状态
 */
export enum StaffStatusEnum {
  STAFF_STATUS_INACTIVE,
  STAFF_STATUS_NORMAL,
  STAFF_STATUS_FORBIDDEN,
}

/**
 * 员工状态
 */
export const STAFF_STATUS_MAP = {
  [StaffStatusEnum.STAFF_STATUS_FORBIDDEN]: {
    color: 'danger',
    text: '禁用',
  },
  [StaffStatusEnum.STAFF_STATUS_INACTIVE]: {
    color: 'warning',
    text: '未激活',
  },
  [StaffStatusEnum.STAFF_STATUS_NORMAL]: {
    color: 'success',
    text: '正常',
  },
};

export const SelectorTypeEnum = {
  USER: 'user',
  EAB_STAFF: 'staff',
  EAB_DEPART: 'depart',
  EAB_COMPANY: 'company',
  EAB_POSITION: 'position',
  EAB_ROLE: 'role',
  MEMBER: 'member',
  USER_GROUP: 'user_group',
  CLASS: 'class',
  DIVISION: 'division',
  EVENT: 'event',
  EVENT_ORG: 'event_org',
  EVENT_REG_POINT: 'event_reg_point',
};

export const TargetTypeEnum = {
  BTT_WX_NONE: 'none', // 不跳转
  BTT_WX_MP: 'wx.mp', // 微信公众号
  BTT_WX_MA: 'wx.ma', // 微信小程序
  BTT_EDP_CMS_ARTICLE: 'edp.cms.article', // 文章
  BTT_EDP_CMS_CATEGORY: 'edp.cms.category', // 栏目 新闻资讯
  BTT_EDP_CMS_PAGE: 'edp.cms.page',
  BTT_EDP_EVENT_EVENT: 'edp.event.event',
  // BTT_EDP_FORM_FORM:"edp.form.form",
  BTT_EDP_APPLY: 'edp.apply.apply',
  BTT_EXTERNAL_LINK: 'link',
};
