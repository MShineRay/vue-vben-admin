export enum ApplyBizEnum {
  // MEMBER_INDIVIDUAL       ("member_individual",   "个人会员申请"),
  // MEMBER_ORG              ("member_org",          "单位会员申请"),
  // APPOINTMENT_ATTEND      ("appointment_attend",  "预约出席"),
  // SPEECH_VIDEO            ("speech_video",        "致辞视频"),
  // NEWS_RESERVATION        ("news_reservation",    "新闻预约"),
  // AD_ENROLLMENT           ("ad_enrollment",       "广告入驻"),
  // OTHER_SERVICES          ("other_services",      "其他服务"),
  "member_individual" = "个人会员申请",
  "member_org" = "单位会员申请",
  "appointment_attend" = "预约出席",
  "speech_video" = "致辞视频",
  "news_reservation" = "新闻预约",
  "ad_enrollment" = "广告入驻",
  "other_services" = "其他服务",
}

// BSS_SPLASH      ("splash"),     // 开屏广告
//   BSS_TOP         ("top"),        // 首页顶部 banner
//   BSS_CENTER      ("center"),     // 首页中部 banner
//   BSS_APPLY_PAGE  ("apply_page"), // 预约中心 banner
export const BannerSenseEnum = {
  "splash": "开屏广告",
  "top": "首页顶部 banner",
  "center": "首页中部 banner",
  "apply_page": "预约中心 banner",
}

export const BannerDurationEnum={
  30:'月',
  90:'季',
  360:'年',
}

export const WxManagedModeEnum= {
  "hosted":"直接托管",
  "sp":"服务商模式接入"
}

/**
 * 订单状态枚举
 */
export enum OrderStatusEnum {
  NEW = "new",            // 新建
  NOT_PAID = "not_paid",  // 待支付
  PARTIAL = "partial",    // 部分支付
  PAID = "paid",          // 已支付
  COMPLETE = "complete",  // 完成
  CANCEL = "cancel",      // 取消
  TIMEOUT = "timeout",    // 超时
  APPROVING = "approving", // 审核中
}

/**
 * 供求类型枚举
 */
export enum GongQiuTypeEnum {
  SUPPLY = "supply",  // 供应
  DEMAND = "demand",  // 需求
}

/**
 * 帖子状态枚举
 */
export enum PostStatusEnum {
  DRAFT = "draft",       // 草稿
  APPROVING = "approving",   // 待审核
  PASS = "pass",        // 已通过
  REJECT = "reject",      // 已驳回
  PUBLISHED = "publish",     // 已发布
}

/**
 * 活动类型枚举
 */
export enum EventTypeEnum {
  WEBINAR = "webinar",      // 研讨会
  COMPETITION = "competition", // 赛事活动
}
