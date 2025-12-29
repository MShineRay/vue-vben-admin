import type { RouteRecordRaw } from 'vue-router';

import {
  EDP_ANT_PREVIEW_URL,
  EDP_DOC_URL,
  EDP_GITHUB_URL,
  EDP_LOGO_URL,
  EDP_NAIVE_PREVIEW_URL,
  EDP_TD_PREVIEW_URL,
} from '@edp/constants';
import { SvgAntdvLogoIcon, SvgTDesignIcon } from '@edp/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: EDP_LOGO_URL,
      order: 9998,
      title: $t('demos.edp.title'),
    },
    name: 'EDPProject',
    path: '/edp-admin',
    children: [
      {
        name: 'EDPDocument',
        path: '/edp-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: EDP_DOC_URL,
          title: $t('demos.edp.document'),
        },
      },
      {
        name: 'EDPGithub',
        path: '/edp-admin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: EDP_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'EDPNaive',
        path: '/edp-admin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: EDP_NAIVE_PREVIEW_URL,
          title: $t('demos.edp.naive-ui'),
        },
      },
      {
        name: 'EDPAntd',
        path: '/edp-admin/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: EDP_ANT_PREVIEW_URL,
          title: $t('demos.edp.antdv'),
        },
      },
      {
        name: 'EDPTDesign',
        path: '/edp-admin/tdesign',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgTDesignIcon,
          link: EDP_TD_PREVIEW_URL,
          title: $t('demos.edp.tdesign'),
        },
      },
    ],
  },
  {
    name: 'EDPAbout',
    path: '/edp-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.edp.about'),
      order: 9999,
    },
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
