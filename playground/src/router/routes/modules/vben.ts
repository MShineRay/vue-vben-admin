import type { RouteRecordRaw } from 'vue-router';

import {
  VBEN_ANT_PREVIEW_URL,
  VBEN_DOC_URL,
  VBEN_ELE_PREVIEW_URL,
  VBEN_GITHUB_URL,
  VBEN_LOGO_URL,
  VBEN_NAIVE_PREVIEW_URL,
  VBEN_TD_PREVIEW_URL,
} from '@edp/constants';
import { SvgAntdvLogoIcon, SvgTDesignIcon } from '@edp/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: VBEN_LOGO_URL,
      order: 9998,
      title: $t('demos.edp.title'),
    },
    name: 'VbenProject',
    path: '/edp-admin',
    children: [
      {
        name: 'VbenDocument',
        path: '/edp-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: VBEN_DOC_URL,
          title: $t('demos.edp.document'),
        },
      },
      {
        name: 'VbenGithub',
        path: '/edp-admin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: VBEN_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'VbenAntdv',
        path: '/edp-admin/antdv',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: VBEN_ANT_PREVIEW_URL,
          title: $t('demos.edp.antdv'),
        },
      },
      {
        name: 'VbenNaive',
        path: '/edp-admin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: VBEN_NAIVE_PREVIEW_URL,
          title: $t('demos.edp.naive-ui'),
        },
      },
      {
        name: 'VbenElementPlus',
        path: '/edp-admin/ele',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:element',
          link: VBEN_ELE_PREVIEW_URL,
          title: $t('demos.edp.element-plus'),
        },
      },
      {
        name: 'VbenTDesign',
        path: '/edp-admin/tdesign',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgTDesignIcon,
          link: VBEN_TD_PREVIEW_URL,
          title: $t('demos.edp.tdesign'),
        },
      },
    ],
  },
  {
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      order: 9999,
      title: $t('demos.edp.about'),
    },
    name: 'VbenAbout',
    path: '/edp-admin/about',
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('#/views/_core/profile/index.vue'),
    meta: {
      icon: 'lucide:user',
      hideInMenu: true,
      title: $t('page.auth.profile'),
    },
  },
];

export default routes;
